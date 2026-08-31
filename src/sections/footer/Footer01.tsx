import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { clientConfig } from "@/config/client.config";
import { services } from "@/data/services";
import type { FooterProps } from "../types";

/** footer-01 — Four columns on the light surface. The everyday default. */
export function Footer01({ id }: FooterProps) {
  return (
    <Section id={id} as="footer" tone="surface" className="py-14 lg:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-fg-soft">{clientConfig.company.description}</p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-heading text-h4 font-semibold">Navegação</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-fg-soft">
              {visibleNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços">
            <h2 className="font-heading text-h4 font-semibold">Serviços</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-fg-soft">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicos/${service.slug}`} className="hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-h4 font-semibold">Contato</h2>
            <ContactChannels className="mt-4" />
            <BusinessHoursList className="mt-6" />
          </div>
        </div>

        <FooterBottom />
      </Container>
    </Section>
  );
}
