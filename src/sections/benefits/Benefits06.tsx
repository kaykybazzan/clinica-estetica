import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { benefits as allBenefits } from "@/data/benefits";
import type { BenefitsProps } from "../types";

/** benefits-06 — Large numbered value propositions. */
export function Benefits06({ id = "beneficios", eyebrow, title, lead, items }: BenefitsProps) {
  const list = items ?? allBenefits;
  return (
    <Section id={id}>
      <Container>
        <SectionHeader eyebrow={eyebrow ?? "Por que escolher"} title={title ?? "Diferenças que aparecem no processo"} lead={lead ?? "O valor está na forma como o atendimento acontece, não apenas no resultado final."} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {list.slice(0, 6).map((benefit, index) => <Reveal key={benefit.title} index={index} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line pt-5"><span className="font-heading text-h2 font-bold text-primary/40">{String(index + 1).padStart(2, "0")}</span><div><Icon name={benefit.icon} size={22} className="text-primary" /><h3 className="mt-3 font-heading text-h4 font-semibold">{benefit.title}</h3><p className="mt-2 text-sm text-fg-soft">{benefit.description}</p></div></Reveal>)}
        </div>
      </Container>
    </Section>
  );
}
