import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { benefits as allBenefits } from "@/data/benefits";
import type { BenefitsProps } from "../types";

/** benefits-04 — Photograph paired with a checklist. Good when trust is visual. */
export function Benefits04({ id = "diferenciais", eyebrow, title, lead, items }: BenefitsProps) {
  const list = items ?? allBenefits;

  return (
    <Section id={id}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal effect="fade-right">
            <SmartImage
              asset={{
                src: "/images/about/estrutura.jpg",
                alt: "Ambiente de trabalho organizado e equipado",
                width: 1200,
                height: 1200,
              }}
              ratio="1/1"
              sizes="(max-width: 1024px) 100vw, 520px"
              className="rounded-[var(--radius-brand-lg)]"
            />
          </Reveal>

          <Reveal effect="fade-left">
            <SectionHeader
              eyebrow={eyebrow ?? "Por que aqui"}
              title={title ?? "O padrão que aplicamos em todo atendimento"}
              lead={lead}
            />
            <ul className="mt-8 divide-y divide-line">
              {list.map((benefit) => (
                <li key={benefit.title} className="flex gap-4 py-5">
                  <Icon name={benefit.icon} size={24} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-heading text-h4 font-semibold">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-fg-soft">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
