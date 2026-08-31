import { clientConfig } from "@/config/client.config";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "service"; service: string }
  | { kind: "product"; product: string }
  | { kind: "quote"; service?: string }
  | { kind: "schedule"; service?: string }
  | { kind: "custom"; message: string };

/**
 * Verdadeiro apenas quando um número real foi configurado.
 * O schema já valida que `whatsapp` é "" ou 12–13 dígitos (DDI+DDD+número),
 * então checar comprimento é suficiente — não há necessidade de checar contra
 * o placeholder antigo "5500000000000", que não deve mais existir em config algum.
 */
export function isWhatsAppConfigured(): boolean {
  const digits = clientConfig.contact.whatsapp.replace(/\D+/g, "");
  return digits.length >= 12;
}

/**
 * Every WhatsApp entry point in the site goes through this function, so the
 * number lives in exactly one place and each button carries the context of
 * where it was clicked — which is what makes the lead useful to the client.
 */
export function whatsappMessage(context: WhatsAppContext = { kind: "general" }): string {
  const company = clientConfig.company.name;

  switch (context.kind) {
    case "service":
      return `Olá! Vim pelo site da ${company} e gostaria de saber mais sobre ${context.service}.`;
    case "product":
      return `Olá! Vim pelo site da ${company} e tenho interesse no produto ${context.product}.`;
    case "quote":
      return context.service
        ? `Olá! Vim pelo site da ${company} e gostaria de um orçamento para ${context.service}.`
        : `Olá! Vim pelo site da ${company} e gostaria de solicitar um orçamento.`;
    case "schedule":
      return context.service
        ? `Olá! Vim pelo site da ${company} e gostaria de agendar ${context.service}.`
        : `Olá! Vim pelo site da ${company} e gostaria de agendar um horário.`;
    case "custom":
      return context.message;
    case "general":
    default:
      return `Olá! Vim pelo site da ${company} e gostaria de mais informações.`;
  }
}

export function whatsappHref(context: WhatsAppContext = { kind: "general" }): string {
  const number = clientConfig.contact.whatsapp.replace(/\D+/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage(context))}`;
}

/** Human-readable version of the configured number: +55 (47) 99999-7070 */
export function whatsappDisplay(): string {
  const d = clientConfig.contact.whatsapp.replace(/\D+/g, "");
  const country = d.slice(0, 2);
  const area = d.slice(2, 4);
  const rest = d.slice(4);
  const split = rest.length > 8 ? 5 : 4;
  return `+${country} (${area}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}
