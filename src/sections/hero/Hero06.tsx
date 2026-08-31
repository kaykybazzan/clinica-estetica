import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ui/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rating } from "@/components/ui/Rating";
import { companyContent } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { benefits } from "@/data/benefits";
import { uiContent } from "@/data/ui";
import { clientConfig } from "@/config/client.config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { HeroProps } from "../types";

/** hero-06 — Conversion-first: the form is above the fold, proof sits beside it. */
export function Hero06({ id = "inicio", eyebrow, title, subtitle }: HeroProps) {
  const proof = testimonials[0];

  return (
    <Section id={id} tone="dark" flush className="relative isolate overflow-hidden py-16 lg:py-24">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <Reveal effect="fade-right">
            <Eyebrow className="text-accent">{eyebrow ?? companyContent.eyebrow}</Eyebrow>
            <Heading level={1} size="h1" className="mt-4 text-on-dark">
              {title ?? companyContent.headline}
            </Heading>
            <Lead className="mt-5 max-w-lg text-on-dark-muted">
              {subtitle ?? companyContent.subheadline}
            </Lead>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.slice(0, 4).map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <Icon name={benefit.icon} size={20} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold text-on-dark">{benefit.title}</span>
                    <span className="block text-sm text-on-dark-muted">{benefit.description}</span>
                  </span>
                </li>
              ))}
            </ul>

            {proof && (
              <figure className="mt-9 max-w-md border-l-2 border-accent pl-5">
                <Rating value={proof.rating} />
                <blockquote className="mt-2 text-on-dark-muted">“{proof.quote}”</blockquote>
                <figcaption className="mt-2 text-sm font-semibold text-on-dark">
                  {proof.name} · {proof.role}
                </figcaption>
              </figure>
            )}
          </Reveal>

          <Reveal effect="fade-left">
            <Card className="bg-bg">
              <p className="font-heading text-h3 font-semibold">{uiContent.hero.formTitle}</p>
              <p className="mt-1 text-sm text-fg-soft">{uiContent.hero.formLead}</p>
              {clientConfig.features.contactForm ? (
                <ContactForm className="mt-6" />
              ) : (
                <WhatsAppButton fullWidth size="lg" className="mt-6" source="hero-06">
                  Falar com a equipe
                </WhatsAppButton>
              )}
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
