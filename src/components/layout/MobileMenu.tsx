"use client";

import { useEffect } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { isWhatsAppConfigured } from "@/integrations/whatsapp";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { clientConfig } from "@/config/client.config";
import { telHref } from "@/utils/format";
import type { NavItem } from "@/types/content";
import { cn } from "@/utils/cn";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

function MobilePrimaryAction({ onClose }: { onClose: () => void }) {
  const conversion = clientConfig.strategy.primaryConversion;
  if (conversion === "whatsapp" && isWhatsAppConfigured()) return <WhatsAppButton fullWidth size="lg" source="mobile-menu" />;
  return (
    <Button href="/contato" fullWidth size="lg" icon="arrowUpRight" onClick={onClose}>
      {conversion === "booking" ? "Agendar avaliação" : "Solicitar contato"}
    </Button>
  );
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const pathname = usePathname();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="nx-mobile-menu"
      hidden={!open}
      className="fixed inset-0 z-[var(--nx-z-overlay)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <button type="button" aria-label="Fechar menu" onClick={onClose} className="nx-anim-overlay absolute inset-0 cursor-default bg-secondary/60 backdrop-blur-sm" />

      <div className="nx-anim-sheet absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bg shadow-lift">
        <div className="flex h-[var(--nx-header-h)] items-center justify-between border-b border-line px-5">
          <Logo />
          <IconButton icon="close" label="Fechar menu" onClick={onClose} variant="outline" />
        </div>

        <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <TransitionLink href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={cn("flex min-h-[var(--nx-tap-min)] items-center justify-between border-b border-line py-3.5 font-heading text-h4 font-semibold", active ? "text-primary" : "text-fg") }>
                    {item.label}
                    <Icon name="chevronRight" size={18} className="text-line-strong" />
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-5">
          <MobilePrimaryAction onClose={onClose} />
          {clientConfig.contact.phone && (
            <a href={telHref(clientConfig.contact.phone)} className="mt-3 flex min-h-[var(--nx-tap-min)] items-center justify-center gap-2 text-sm font-semibold text-fg-soft">
              <Icon name="phone" size={16} />{clientConfig.contact.phone}
            </a>
          )}
          <SocialLinks className="mt-4 justify-center" />
        </div>
      </div>
    </div>
  );
}
