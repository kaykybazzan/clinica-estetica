import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { companyContent } from "@/data/company";
import { benefits } from "@/data/benefits";
import type { AboutProps } from "../types";

/** about-03 — Dark statement band. No imagery, maximum contrast on the promise. */
export function About03({ id = "sobre", eyebrow, title, paragraphs }: AboutProps) {
  return (
    <Section id={id} tone="dark" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-accent">{eyebrow ?? "Nosso compromisso"}</Eyebrow>
          <Heading level={2} size="h1" className="mt-4 text-on-dark">
            {title ?? companyContent.mission}
          </Heading>
          <p className="mt-5 text-lead text-on-dark-muted">
            {(paragraphs ?? companyContent.aboutParagraphs)[0]}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.slice(0, 3).map((benefit, index) => (
            <Reveal as="li" key={benefit.title} index={index}>
              <Icon name={benefit.icon} size={28} className="text-accent" />
              <p className="mt-4 font-heading text-h4 font-semibold text-on-dark">{benefit.title}</p>
              <p className="mt-2 text-on-dark-muted">{benefit.description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <WhatsAppButton size="lg" variant="accent" source="about-03">
            Conversar com a equipe
          </WhatsAppButton>
        </Reveal>
      </Container>
    </Section>
  );
}
