import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { uiContent } from "@/data/ui";
import { clientConfig } from "@/config/client.config";
import type { HeroProps } from "../types";

/**
 * hero-04 — Typographic. No photography at all, which makes it the right choice
 * for clients who do not yet have usable images: nothing here degrades with a
 * placeholder. LCP is a text node, so it is also the fastest variant.
 */
export function Hero04({ id = "inicio", eyebrow, title, subtitle }: HeroProps) {
  return (
    <Section id={id} tone="dark" flush className="relative isolate overflow-hidden py-24 lg:py-36">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />

      <Container>
        <Reveal className="max-w-4xl">
          <Eyebrow className="text-accent">{eyebrow ?? companyContent.eyebrow}</Eyebrow>
          <Heading level={1} size="display" className="mt-6 text-on-dark">
            {title ?? companyContent.headline}
          </Heading>
          <Lead className="mt-6 max-w-2xl text-on-dark-muted">
            {subtitle ?? companyContent.subheadline}
          </Lead>

          <div className="mt-10 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" variant="accent" source="hero-04" context={{ kind: "quote" }}>
              {uiContent.hero.directCta}
            </WhatsAppButton>
            <Button href="/sobre" size="lg" variant="ghost" icon="arrowUpRight" className="text-on-dark hover:bg-white/10">
              Conhecer a empresa
            </Button>
          </div>
        </Reveal>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { term: "Onde atendemos", detail: clientConfig.address.serviceAreas.slice(0, 3).join(" · ") || clientConfig.address.city },
            { term: "Especialidade", detail: clientConfig.company.slogan },
            { term: "Contato direto", detail: clientConfig.contact.phone || clientConfig.contact.email },
          ].map((row) => (
            <div key={row.term} className="bg-secondary p-6">
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-on-dark-muted">
                {row.term}
              </dt>
              <dd className="mt-2 font-heading text-h4 font-semibold text-on-dark">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
