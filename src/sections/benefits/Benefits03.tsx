import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { benefits as allBenefits } from "@/data/benefits";
import { uiContent } from "@/data/ui";
import type { BenefitsProps } from "../types";

/** benefits-03 — Dark band with large paired cards. Highest visual weight of the four. */
export function Benefits03({ id = "diferenciais", eyebrow, title, lead, items }: BenefitsProps) {
  const list = items ?? allBenefits;

  return (
    <Section id={id} tone="dark" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Por que aqui"}
          title={title ?? uiContent.benefits.title}
          lead={lead}
          tone="dark"
          align="center"
          className="mx-auto"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {list.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              index={index}
              className="rounded-[var(--radius-brand)] border border-white/10 bg-white/5 p-8"
            >
              <Icon name={benefit.icon} size={30} className="text-accent" />
              <h3 className="mt-5 font-heading text-h3 font-semibold text-on-dark">{benefit.title}</h3>
              <p className="mt-3 text-on-dark-muted">{benefit.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
