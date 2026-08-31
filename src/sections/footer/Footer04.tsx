import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Heading } from "@/components/ui/Heading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ContactChannels } from "@/components/ui/ContactChannels";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { legalNav } from "@/data/navigation";
import { companyContent } from "@/data/company";
import type { FooterProps } from "../types";

/** footer-04 — Footer that closes with a map and a final prompt. */
export function Footer04({ id }: FooterProps) {
  return (
    <Section id={id} as="footer" tone="surface" flush className="pt-14 lg:pt-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-brand-lg)] bg-secondary p-8 sm:p-10">
          <div className="max-w-lg">
            <Heading level={2} size="h3" className="text-on-dark">
              {companyContent.ctaTitle}
            </Heading>
            <p className="mt-2 text-on-dark-muted">{companyContent.ctaText}</p>
          </div>
          <WhatsAppButton size="lg" variant="accent" source="footer-04" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <Logo />
            <ContactChannels className="mt-5" />
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-heading text-h4 font-semibold">Páginas</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-fg-soft">
              {[...visibleNav, ...legalNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MapEmbed ratio="aspect-[4/3]" />
        </div>

        <div className="mt-12 pb-8">
          <FooterBottom />
        </div>
      </Container>
    </Section>
  );
}
