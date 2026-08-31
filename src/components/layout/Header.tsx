"use client";

import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { isWhatsAppConfigured } from "@/integrations/whatsapp";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { clientConfig } from "@/config/client.config";
import { visibleNav } from "@/config/features";
import { telHref } from "@/utils/format";
import { CONVERSION_EVENTS, trackEvent } from "@/analytics/track";
import { cn } from "@/utils/cn";

function HeaderConversionAction() {
  const conversion = clientConfig.strategy.primaryConversion;
  if (conversion === "whatsapp" && isWhatsAppConfigured()) {
    return <WhatsAppButton size="sm" source="header" className="hidden sm:inline-flex">Falar agora</WhatsAppButton>;
  }
  const label = conversion === "booking" ? "Agendar" : conversion === "visit" ? "Ver contato" : "Solicitar contato";
  return <Button href="/contato" size="sm" className="hidden sm:inline-flex" icon="arrowUpRight">{label}</Button>;
}

export function Header() {
  const menu = useDisclosure();
  const scrolled = useScrolledPast(16);
  const { phone } = clientConfig.contact;
  const editorial = clientConfig.design.archetype === "luxury" || clientConfig.design.archetype === "editorial";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[var(--nx-z-header)] w-full border-b transition-[background-color,border-color,box-shadow] duration-[var(--nx-duration)]",
          scrolled ? "border-line bg-bg/92 shadow-soft backdrop-blur-md" : "border-transparent bg-bg",
        )}
      >
        <Container size={editorial ? "wide" : "default"} className="flex h-[var(--nx-header-h)] items-center justify-between gap-4">
          <Logo />

          <Navbar items={visibleNav} className="hidden lg:block" />

          <div className="flex items-center gap-2">
            {phone && (
              <a
                href={telHref(phone)}
                onClick={() => trackEvent(CONVERSION_EVENTS.phoneClick, { source: "header" })}
                className="hidden min-h-[var(--nx-tap-min)] items-center gap-2 px-2 text-sm font-semibold text-fg-soft transition-colors hover:text-primary xl:inline-flex"
              >
                <Icon name="phone" size={16} />
                {phone}
              </a>
            )}

            <HeaderConversionAction />

            <button
              type="button"
              onClick={menu.toggle}
              aria-expanded={menu.isOpen}
              aria-controls="nx-mobile-menu"
              aria-label={menu.isOpen ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-[var(--nx-tap-min)] items-center justify-center rounded-[var(--radius-brand-sm)] border border-line text-fg lg:hidden"
            >
              <Icon name={menu.isOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menu.isOpen} onClose={menu.close} items={visibleNav} />
    </>
  );
}
