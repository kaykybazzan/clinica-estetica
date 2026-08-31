"use client";

import { usePathname } from "next/navigation";
import { clientConfig } from "@/config/client.config";
import { isWhatsAppConfigured, whatsappHref } from "@/integrations/whatsapp";
import { mapsDirectionsHref } from "@/integrations/maps";
import { Icon, type IconName } from "@/components/ui/Icon";

const actionMeta: Record<string, { label: string; icon: IconName; href: () => string }> = {
  whatsapp: { label: "WhatsApp", icon: "whatsapp", href: () => whatsappHref() },
  phone: { label: "Ligar", icon: "phone", href: () => `tel:${clientConfig.contact.phone.replace(/[^\d+]/g, "")}` },
  directions: { label: "Como chegar", icon: "mapPin", href: () => mapsDirectionsHref() },
  contact: { label: "Contato", icon: "mail", href: () => "/contato" },
  catalog: { label: "Catálogo", icon: "search", href: () => "/produtos" },
};

export function MobileConversionBar() {
  const pathname = usePathname();
  const config = clientConfig.mobileConversion;
  if (!clientConfig.features.mobileConversionBar || !config.enabled) return null;
  if (pathname === "/contato") return null; // redundante nessa página

  // Filtrar WhatsApp se não estiver configurado
  const filteredActions = config.actions.filter((action) => action !== "whatsapp" || isWhatsAppConfigured());
  if (filteredActions.length === 0) return null;

  return (
    <nav aria-label="Ações rápidas" className="fixed inset-x-3 bottom-3 z-[var(--nx-z-floating)] md:hidden">
      <div className="grid overflow-hidden rounded-[var(--nx-button-radius)] border border-line bg-bg/95 shadow-lift backdrop-blur" style={{ gridTemplateColumns: `repeat(${filteredActions.length}, minmax(0, 1fr))` }}>
        {filteredActions.map((action, index) => {
          const meta = actionMeta[action];
          if (!meta) return null;
          return (
            <a
              key={action}
              href={meta.href()}
              target={action === "whatsapp" || action === "directions" ? "_blank" : undefined}
              rel={action === "whatsapp" || action === "directions" ? "noopener noreferrer" : undefined}
              className={`flex min-h-[3.5rem] items-center justify-center gap-2 px-2 text-center text-xs font-bold ${index ? "border-l border-line" : ""}`}
            >
              <Icon name={meta.icon} size={18} />
              <span>{meta.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
