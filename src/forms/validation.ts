import { contactFields } from "./config";
import type { FieldErrors, LeadPayload } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(values: LeadPayload): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of contactFields()) {
    const raw = values[field.name];
    const value = typeof raw === "string" ? raw.trim() : String(raw ?? "").trim();

    if (field.required && !value) {
      errors[field.name] = `${field.label} é obrigatório.`;
      continue;
    }
    if (!value) continue;

    if (field.type === "email" && !EMAIL_RE.test(value)) {
      errors[field.name] = "Informe um e-mail válido, como nome@empresa.com.br.";
    }
    if (field.type === "tel") {
      const digits = value.replace(/\D+/g, "");
      if (digits.length < 10 || digits.length > 13) errors[field.name] = "Informe DDD e número válidos.";
    }
    if (field.minLength != null && value.length < field.minLength) {
      errors[field.name] = `${field.label} precisa ter pelo menos ${field.minLength} caracteres.`;
    }
    if (field.maxLength != null && value.length > field.maxLength) {
      errors[field.name] = `${field.label} deve ter no máximo ${field.maxLength} caracteres.`;
    }
    if (field.type === "select" && field.options?.length && !field.options.includes(value)) {
      errors[field.name] = `Selecione uma opção válida para ${field.label}.`;
    }
  }

  if (values.consent !== true) errors.consent = "É necessário aceitar a Política de Privacidade.";
  return errors;
}

export function detectLeadSpam(values: LeadPayload, now = Date.now()): string | null {
  if (String(values.website ?? "").trim()) return "honeypot";
  const renderedAt = Number(values.renderedAt ?? 0);
  if (!renderedAt || renderedAt > now || now - renderedAt < 2500) return "timing";
  return null;
}

export const detectSpam = detectLeadSpam;

export function normalizeLead(values: LeadPayload): LeadPayload {
  const normalized: LeadPayload = { consent: true, website: "", renderedAt: Number(values.renderedAt ?? 0) };
  for (const field of contactFields()) {
    const raw = values[field.name];
    normalized[field.name] = typeof raw === "string" ? raw.trim() : raw;
  }
  if (typeof normalized.email === "string") normalized.email = normalized.email.toLowerCase();
  return normalized;
}

export function formatPhoneBR(raw: string): string {
  const d = raw.replace(/\D+/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
