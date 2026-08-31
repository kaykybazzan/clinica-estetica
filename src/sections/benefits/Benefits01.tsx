import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { benefits as allBenefits } from "@/data/benefits";
import type { BenefitsProps } from "../types";

/** benefits-01 — Four columns, icon over text. Reads well down to 360px as 1 column. */
export function Benefits01({ id = "diferenciais", eyebrow, title, lead, items }: BenefitsProps) {
  const list = items ?? allBenefits;

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Por que aqui"}
          title={title ?? "O que você leva junto com o serviço"}
          lead={lead}
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} index={index}>
              <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon name={benefit.icon} size={22} />
              </span>
              <h3 className="mt-5 font-heading text-h4 font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-fg-soft">{benefit.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
