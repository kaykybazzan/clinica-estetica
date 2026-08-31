import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { clientConfig } from "@/config/client.config";
import { deliverLead } from "@/forms/delivery";
import { isRateLimited } from "@/forms/rate-limit";
import { detectLeadSpam, normalizeLead, validateLead } from "@/forms/validation";
import type { LeadPayload } from "@/forms/types";
import { logError, logInfo } from "@/observability/log";

export const runtime = "nodejs";

function json(body: unknown, status = 200, requestId?: string) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(requestId ? { "X-Nexora-Request-ID": requestId } : {}),
    },
  });
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  if (!clientConfig.features.contactForm || clientConfig.forms?.contact?.enabled === false) return json({ ok: false, message: "Formulário indisponível." }, 404, requestId);

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) return json({ ok: false, message: "Content-Type inválido." }, 415, requestId);

  // Cross-site browser posts have no legitimate use here. Same-origin previews remain valid.
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ ok: false, message: "Origem não permitida." }, 403, requestId);

  const maxBodyBytes = clientConfig.forms?.contact?.maxBodyBytes ?? 32768;
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) return json({ ok: false, message: "Requisição muito grande." }, 413, requestId);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) return json({ ok: false, message: "Muitas tentativas. Aguarde e tente novamente." }, 429, requestId);

  let payload: LeadPayload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return json({ ok: false, message: "Requisição muito grande." }, 413, requestId);
    payload = JSON.parse(raw) as LeadPayload;
  } catch {
    return json({ ok: false, message: "Requisição inválida." }, 400, requestId);
  }

  if (detectLeadSpam(payload)) return json({ ok: true }, 200, requestId);
  const errors = validateLead(payload);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422, requestId);

  try {
    await deliverLead(normalizeLead(payload), requestId);
    logInfo("lead.delivered", { requestId, adapterOrder: clientConfig.forms?.contact?.delivery ?? ["resend", "webhook"] });
    return json({ ok: true, requestId }, 200, requestId);
  } catch (error) {
    logError("lead.delivery_failed", error, { requestId });
    return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes.", requestId }, 502, requestId);
  }
}
