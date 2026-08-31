import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { clientConfig } from "@/config/client.config";
import type { FooterProps } from "../types";

/** footer-02 — Dark, brand-forward, with a last conversion prompt. */
export function Footer02({ id }: FooterProps) {
  const { company, address } = clientConfig;

  return (
    <Section id={id} as="footer" tone="dark" className="relative isolate overflow-hidden py-14 lg:py-16">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-sm text-sm text-on-dark-muted">{company.description}</p>
            {address.serviceAreas.length > 0 && (
              <p className="mt-4 text-sm text-on-dark-muted">
                <span className="font-semibold text-on-dark">Atendemos: </span>
                {address.serviceAreas.join(" · ")}
              </p>
            )}
            <WhatsAppButton variant="accent" className="mt-6" source="footer-02" />
            <SocialLinks onDark className="mt-6" />
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-heading text-h4 font-semibold text-on-dark">Navegação</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-on-dark-muted">
              {visibleNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-h4 font-semibold text-on-dark">Contato</h2>
            <ContactChannels onDark className="mt-4" />
            <BusinessHoursList onDark className="mt-6" />
          </div>
        </div>

        <FooterBottom onDark />
      </Container>
    </Section>
  );
}
