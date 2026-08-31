import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { benefits as allBenefits } from "@/data/benefits";
import type { BenefitsProps } from "../types";

/** benefits-02 — Sticky argument on the left, scrollable proof list on the right. */
export function Benefits02({ id = "diferenciais", eyebrow, title, lead, items }: BenefitsProps) {
  const list = items ?? allBenefits;

  return (
    <Section id={id} tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal effect="fade-right" className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow={eyebrow ?? "Por que aqui"}
              title={title ?? "Compromissos que ficam por escrito"}
              lead={lead}
            />
            <WhatsAppButton size="sm" className="mt-7" source="benefits-02">
              Tirar uma dúvida
            </WhatsAppButton>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-brand)] border border-line bg-line sm:grid-cols-2">
            {list.map((benefit, index) => (
              <Reveal as="li" key={benefit.title} index={index} className="bg-bg p-7">
                <Icon name={benefit.icon} size={26} className="text-primary" />
                <h3 className="mt-4 font-heading text-h4 font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-fg-soft">{benefit.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
