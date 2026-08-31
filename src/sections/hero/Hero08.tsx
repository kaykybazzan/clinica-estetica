import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { benefits } from "@/data/benefits";
import { stats } from "@/data/stats";
import type { HeroProps } from "../types";

/** hero-08 — Proof-first hero for technical/B2B businesses. */
export function Hero08({ id = "inicio", eyebrow, title, subtitle }: HeroProps) {
  return (
    <Section id={id} tone="dark" flush className="overflow-hidden py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,.9fr)] lg:gap-20">
          <Reveal effect="fade-right">
            <Eyebrow className="text-accent">{eyebrow ?? companyContent.eyebrow}</Eyebrow>
            <Heading level={1} size="display" className="mt-4 max-w-[14ch] text-on-dark">{title ?? companyContent.headline}</Heading>
            <Lead className="mt-6 max-w-2xl text-on-dark-muted">{subtitle ?? companyContent.subheadline}</Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" source="hero-08" context={{ kind: "quote" }}>Solicitar atendimento</WhatsAppButton>
              <Button href="/servicos" size="lg" variant="light" icon="arrowRight">Ver capacidades</Button>
            </div>
          </Reveal>
          <Reveal effect="fade-left">
            <div className="grid gap-px overflow-hidden rounded-[var(--nx-card-radius)] border border-white/10 bg-white/10 sm:grid-cols-2">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="bg-secondary p-6">
                  <p className="font-heading text-h2 font-bold text-on-dark">{stat.prefix}{stat.value}{stat.suffix}</p>
                  <p className="mt-2 text-sm text-on-dark-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 border-t border-white/10 pt-7 md:grid-cols-2 lg:grid-cols-4">
          {benefits.slice(0, 4).map((benefit, index) => (
            <Reveal as="li" key={benefit.title} index={index} className="flex gap-3">
              <Icon name={benefit.icon} size={20} className="mt-0.5 shrink-0 text-accent" />
              <div><p className="font-semibold text-on-dark">{benefit.title}</p><p className="mt-1 text-sm text-on-dark-muted">{benefit.description}</p></div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
