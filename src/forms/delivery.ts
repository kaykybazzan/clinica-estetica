import { createHmac } from "node:crypto";
import { clientConfig } from "@/config/client.config";
import { contactFields } from "./config";
import type { LeadPayload } from "./types";

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function stringValue(values: LeadPayload, key: string): string {
  const value = values[key];
  return typeof value === "string" ? value.trim() : "";
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

function publicFields(values: LeadPayload) {
  return contactFields().map((field) => ({ label: field.label, name: field.name, value: String(values[field.name] ?? "") }));
}

async function byWebhook(endpoint: string, values: LeadPayload, requestId: string) {
  const body = JSON.stringify({
    source: "website",
    company: clientConfig.company.name,
    requestId,
    occurredAt: new Date().toISOString(),
    fields: Object.fromEntries(publicFields(values).map((field) => [field.name, field.value])),
  });
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  const signature = secret ? createHmac("sha256", secret).update(body).digest("hex") : undefined;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Nexora-Request-ID": requestId,
      ...(signature ? { "X-Nexora-Signature": `sha256=${signature}` } : {}),
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook respondeu ${response.status}`);
}

async function byResend(apiKey: string, values: LeadPayload, requestId: string) {
  const to = process.env.CONTACT_TO_EMAIL || clientConfig.contact.formRecipient || clientConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error("CONTACT_FROM_EMAIL não configurado para o Resend.");
  const subjectValue = stringValue(values, "subject");
  const subject = subjectValue || `Novo contato pelo site — ${clientConfig.company.name}`;
  const rows = publicFields(values)
    .filter((field) => field.value)
    .map((field) => `<p><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(field.value).replaceAll("\n", "<br>")}</p>`)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "NexoraWebsitePlatform/3.0" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: stringValue(values, "email") || undefined,
      subject,
      html: `<h2>Novo contato pelo site</h2><p><small>ID: ${escapeHtml(requestId)}</small></p>${rows}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend respondeu ${response.status}: ${(await response.text().catch(() => "")).slice(0, 300)}`);
}

async function byHubSpot(accessToken: string, values: LeadPayload) {
  const name = stringValue(values, "name");
  const { firstName, lastName } = splitName(name);
  const properties: Record<string, string> = {};
  const email = stringValue(values, "email");
  const phone = stringValue(values, "phone");
  if (email) properties.email = email;
  if (firstName) properties.firstname = firstName;
  if (lastName) properties.lastname = lastName;
  if (phone) properties.phone = phone;
  properties.lifecyclestage = "lead";

  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ properties }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`HubSpot respondeu ${response.status}: ${(await response.text().catch(() => "")).slice(0, 300)}`);
}

async function byPipedrive(apiToken: string, companyDomain: string, values: LeadPayload) {
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(companyDomain)) throw new Error("PIPEDRIVE_COMPANY_DOMAIN inválido.");
  const base = `https://${companyDomain}.pipedrive.com`;
  const name = stringValue(values, "name") || "Lead do site";
  const email = stringValue(values, "email");
  const phone = stringValue(values, "phone");
  const personResponse = await fetch(`${base}/api/v2/persons?api_token=${encodeURIComponent(apiToken)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      ...(email ? { emails: [{ value: email, primary: true, label: "work" }] } : {}),
      ...(phone ? { phones: [{ value: phone, primary: true, label: "mobile" }] } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const personJson = await personResponse.json().catch(() => null) as { data?: { id?: number } } | null;
  if (!personResponse.ok || !personJson?.data?.id) throw new Error(`Pipedrive person respondeu ${personResponse.status}`);

  const service = stringValue(values, "service");
  const subject = stringValue(values, "subject");
  const leadResponse = await fetch(`${base}/api/v1/leads?api_token=${encodeURIComponent(apiToken)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: subject || service || `Lead do site — ${name}`, person_id: personJson.data.id }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!leadResponse.ok) throw new Error(`Pipedrive lead respondeu ${leadResponse.status}: ${(await leadResponse.text().catch(() => "")).slice(0, 300)}`);
}

async function byRdStation(apiKey: string, values: LeadPayload) {
  const email = stringValue(values, "email");
  if (!email) throw new Error("RD Station exige e-mail para esta integração.");
  const payload: Record<string, string> = {
    conversion_identifier: process.env.RDSTATION_CONVERSION_IDENTIFIER || "Contato pelo site",
    email,
  };
  const name = stringValue(values, "name");
  const phone = stringValue(values, "phone");
  const service = stringValue(values, "service");
  if (name) payload.name = name;
  if (phone) payload.personal_phone = phone;
  if (service) payload.cf_servico_interesse = service;

  const response = await fetch(`https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_type: "CONVERSION", event_family: "CDP", payload }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`RD Station respondeu ${response.status}: ${(await response.text().catch(() => "")).slice(0, 300)}`);
}

export async function deliverLead(values: LeadPayload, requestId: string): Promise<void> {
  const order = clientConfig.forms?.contact?.delivery ?? ["resend", "webhook"];
  const failures: string[] = [];
  let configured = false;

  for (const adapter of order) {
    try {
      if (adapter === "resend" && process.env.RESEND_API_KEY) {
        configured = true;
        await byResend(process.env.RESEND_API_KEY, values, requestId);
        return;
      }
      if (adapter === "webhook" && process.env.CONTACT_WEBHOOK_URL) {
        configured = true;
        await byWebhook(process.env.CONTACT_WEBHOOK_URL, values, requestId);
        return;
      }
      if (adapter === "hubspot" && process.env.HUBSPOT_ACCESS_TOKEN) {
        configured = true;
        await byHubSpot(process.env.HUBSPOT_ACCESS_TOKEN, values);
        return;
      }
      if (adapter === "pipedrive" && process.env.PIPEDRIVE_API_TOKEN && process.env.PIPEDRIVE_COMPANY_DOMAIN) {
        configured = true;
        await byPipedrive(process.env.PIPEDRIVE_API_TOKEN, process.env.PIPEDRIVE_COMPANY_DOMAIN, values);
        return;
      }
      if (adapter === "rdstation" && process.env.RDSTATION_API_KEY) {
        configured = true;
        await byRdStation(process.env.RDSTATION_API_KEY, values);
        return;
      }
    } catch (error) {
      failures.push(`${adapter}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (process.env.NODE_ENV !== "production" && !configured) {
    console.info("[NEXORA] Lead validado em desenvolvimento", { requestId, fields: Object.fromEntries(publicFields(values).map((f) => [f.name, f.value])) });
    return;
  }
  throw new Error(failures.length ? failures.join(" | ") : "Nenhum adaptador de entrega configurado.");
}
