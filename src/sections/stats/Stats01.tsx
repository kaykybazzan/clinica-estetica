import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats as allStats } from "@/data/stats";
import type { StatsProps } from "../types";

/** stats-01 — Clean counter row on the light surface. */
export function Stats01({ id = "numeros", eyebrow, title, items }: StatsProps) {
  const list = items ?? allStats;

  return (
    <Section id={id} tone="surface">
      <Container>
        {title && <SectionHeader eyebrow={eyebrow} title={title} align="center" className="mx-auto mb-12" />}

        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((stat, index) => (
            <Reveal key={stat.label} index={index} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-heading text-display font-extrabold leading-none text-primary">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-3 font-semibold">{stat.label}</p>
                {stat.description && <p className="mt-1 text-sm text-fg-soft">{stat.description}</p>}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
