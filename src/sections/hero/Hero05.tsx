import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { services } from "@/data/services";
import { uiContent } from "@/data/ui";
import type { HeroProps } from "../types";

/** hero-05 — Service-led: the visitor picks the problem before reading the pitch. */
export function Hero05({ id = "inicio", eyebrow, title, subtitle, image }: HeroProps) {
  const asset = image ?? {
    src: "/images/hero/principal.jpg",
    alt: uiContent.hero.fallbackImageAlt,
    width: 1600,
    height: 900,
  };

  return (
    <Section id={id} tone="surface" flush className="pb-[var(--nx-section-y)] pt-12 lg:pt-16">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow ?? companyContent.eyebrow}</Eyebrow>
          <Heading level={1} size="h1" className="mt-4">
            {title ?? companyContent.headline}
          </Heading>
          <Lead className="mt-4">{subtitle ?? companyContent.subheadline}</Lead>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <Reveal effect="fade-up">
            <SmartImage
              asset={asset}
              ratio="16/9"
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="rounded-[var(--radius-brand-lg)]"
            />
          </Reveal>

          <Reveal effect="fade-up" index={1}>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fg-soft">
              Escolha por onde começar
            </p>
            <ul className="mt-4 divide-y divide-line rounded-[var(--radius-brand)] border border-line bg-bg">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="flex min-h-[var(--nx-tap-min)] items-center gap-4 px-5 py-4 transition-colors hover:bg-surface"
                  >
                    <Icon name={service.icon} size={22} className="shrink-0 text-primary" />
                    <span className="flex-1">
                      <span className="block font-semibold">{service.title}</span>
                      <span className="block text-sm text-fg-soft">{service.excerpt}</span>
                    </span>
                    <Icon name="chevronRight" size={18} className="shrink-0 text-line-strong" />
                  </Link>
                </li>
              ))}
            </ul>
            <WhatsAppButton fullWidth size="lg" className="mt-5" source="hero-05" context={{ kind: "general" }}>
              Não sei o que é — quero ajuda
            </WhatsAppButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
