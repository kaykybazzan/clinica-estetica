import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { clientConfig } from "@/config/client.config";
import { whatsappDisplay } from "@/integrations/whatsapp";
import { formatFullAddress, telHref } from "@/utils/format";
import type { FooterProps } from "../types";

/** footer-03 — Compact single band. For small sites where a four-column grid looks padded. */
export function Footer03({ id }: FooterProps) {
  const { contact, address } = clientConfig;

  return (
    <Section id={id} as="footer" className="border-t border-line py-12">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-fg-soft">{formatFullAddress(address)}</p>
            <p className="mt-2 text-sm">
              {contact.phone && (
                <a href={telHref(contact.phone)} className="font-semibold hover:text-primary">
                  {contact.phone}
                </a>
              )}
              <span className="text-fg-soft"> · {whatsappDisplay()}</span>
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-soft">
              {visibleNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-10">
          <FooterBottom />
        </div>
      </Container>
    </Section>
  );
}
