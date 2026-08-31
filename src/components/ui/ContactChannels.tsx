import { Icon } from "./Icon";
import { clientConfig } from "@/config/client.config";
import { isWhatsAppConfigured, whatsappDisplay, whatsappHref } from "@/integrations/whatsapp";
import { mapsDirectionsHref } from "@/integrations/maps";
import { formatFullAddress, summarizeBusinessHours, areAllDaysClosed, telHref } from "@/utils/format";
import { cn } from "@/utils/cn";

export function ContactChannels({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const { contact, address } = clientConfig;
  const muted = onDark ? "text-on-dark-muted" : "text-fg-soft";

  const rows = [
    contact.phone && { icon: "phone" as const, label: "Telefone", value: contact.phone, href: telHref(contact.phone) },
    isWhatsAppConfigured() && { icon: "whatsapp" as const, label: "WhatsApp", value: whatsappDisplay(), href: whatsappHref() },
    { icon: "mail" as const, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: "mapPin" as const,
      label: "Endereço",
      value: formatFullAddress(address),
      href: mapsDirectionsHref(),
    },
  ].filter(Boolean) as { icon: "phone" | "whatsapp" | "mail" | "mapPin"; label: string; value: string; href: string }[];

  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {rows.map((row) => (
        <li key={row.label}>
          <a
            href={row.href}
            {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-start gap-3"
          >
            <span
              className={cn(
                "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full",
                onDark ? "bg-white/10 text-accent" : "bg-primary-soft text-primary",
              )}
            >
              <Icon name={row.icon} size={17} />
            </span>
            <span>
              <span className={cn("block text-xs font-semibold uppercase tracking-[0.12em]", muted)}>
                {row.label}
              </span>
              <span
                className={cn(
                  "block font-medium transition-colors group-hover:text-primary",
                  onDark && "text-on-dark group-hover:text-accent",
                )}
              >
                {row.value}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BusinessHoursList({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const blocks = summarizeBusinessHours(clientConfig.businessHours);
  const { note } = clientConfig.businessHours;
  const allClosed = areAllDaysClosed(clientConfig.businessHours);

  if (allClosed) {
    return (
      <div className={className}>
        <p className={cn("text-sm", onDark ? "text-on-dark-muted" : "text-fg-soft")}>
          {note || "Horários de atendimento a confirmar — fale com a equipe pelos canais ao lado."}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <dl className={cn("flex flex-col gap-2", onDark ? "text-on-dark-muted" : "text-fg-soft")}>
        {blocks.map((block) => (
          <div key={block.days} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className={cn("font-medium", onDark ? "text-on-dark" : "text-fg")}>{block.days}</dt>
            <dd className="tabular-nums">{block.time}</dd>
          </div>
        ))}
      </dl>
      {note && <p className={cn("mt-3 text-xs", onDark ? "text-on-dark-muted" : "text-fg-soft")}>{note}</p>}
    </div>
  );
}
