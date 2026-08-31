import { clientConfig } from "@/config/client.config";
import type { LeadFieldDefinition } from "./types";

export const DEFAULT_CONTACT_FIELDS: LeadFieldDefinition[] = [
  { name: "name", label: "Nome", type: "text", required: true, minLength: 2, maxLength: 100 },
  { name: "phone", label: "Telefone / WhatsApp", type: "tel", required: true },
  { name: "email", label: "E-mail", type: "email", required: true, maxLength: 254 },
  { name: "service", label: "Serviço de interesse", type: "select", source: "services" },
  { name: "subject", label: "Assunto", type: "text", maxLength: 160, fullWidth: true },
  { name: "message", label: "Mensagem", type: "textarea", required: true, minLength: 10, maxLength: 5000, fullWidth: true },
];

export function contactFields(): LeadFieldDefinition[] {
  return clientConfig.forms?.contact?.fields ?? DEFAULT_CONTACT_FIELDS;
}
