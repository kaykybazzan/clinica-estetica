import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats as allStats } from "@/data/stats";
import type { StatsProps } from "../types";

/** stats-02 — Dark divided grid. Works as a break between two light sections. */
export function Stats02({ id = "numeros", items }: StatsProps) {
  const list = items ?? allStats;

  return (
    <Section id={id} tone="dark" className="py-14 lg:py-16">
      <Container>
        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-brand)] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((stat, index) => (
            <Reveal key={stat.label} index={index} className="bg-secondary p-7">
              <dd className="font-heading text-h1 font-extrabold leading-none text-accent">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 font-semibold text-on-dark">{stat.label}</dt>
              {stat.description && <p className="mt-1 text-sm text-on-dark-muted">{stat.description}</p>}
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
