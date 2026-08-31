import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { benefits as allBenefits } from "@/data/benefits";
import type { BenefitsProps } from "../types";

/** benefits-05 — Compact proof strip. */
export function Benefits05({ id = "beneficios", items }: BenefitsProps) {
  const list = items ?? allBenefits;
  return (
    <Section id={id} tone="surface" className="py-8 lg:py-10">
      <Container>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, 4).map((benefit, index) => <Reveal as="li" key={benefit.title} index={index} className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Icon name={benefit.icon} size={19} /></span><div><h3 className="text-sm font-semibold">{benefit.title}</h3><p className="mt-1 text-xs leading-relaxed text-fg-soft">{benefit.description}</p></div></Reveal>)}
        </ul>
      </Container>
    </Section>
  );
}
