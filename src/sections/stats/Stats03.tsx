import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { stats as allStats } from "@/data/stats";
import { companyContent } from "@/data/company";
import type { StatsProps } from "../types";

/** stats-03 — Numbers beside an argument, for pages that need context, not a wall of digits. */
export function Stats03({ id = "numeros", eyebrow, title, items }: StatsProps) {
  const list = items ?? allStats;

  return (
    <Section id={id}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal effect="fade-right">
            <SectionHeader
              eyebrow={eyebrow ?? "Em números"}
              title={title ?? companyContent.mission}
              lead={companyContent.aboutLead}
            />
            <WhatsAppButton size="sm" className="mt-7" source="stats-03">
              Falar com a equipe
            </WhatsAppButton>
          </Reveal>

          <dl className="grid gap-8 sm:grid-cols-2">
            {list.map((stat, index) => (
              <Reveal key={stat.label} index={index} className="border-l-2 border-primary pl-5">
                <dd className="font-heading text-h1 font-extrabold leading-none">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 font-semibold">{stat.label}</dt>
                {stat.description && <p className="mt-1 text-sm text-fg-soft">{stat.description}</p>}
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
