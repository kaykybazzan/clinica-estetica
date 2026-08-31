import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { stats as allStats } from "@/data/stats";
import type { StatsProps } from "../types";

/** stats-04 — Dark technical scorecard. */
export function Stats04({ id = "numeros", eyebrow, title, items }: StatsProps) {
  const list = items ?? allStats;
  return <Section id={id} tone="dark"><Container><SectionHeader tone="dark" eyebrow={eyebrow ?? "Em números"} title={title ?? "Indicadores que contextualizam nosso trabalho"} /><dl className="mt-10 grid overflow-hidden rounded-[var(--nx-card-radius)] border border-white/10 sm:grid-cols-2 lg:grid-cols-4">{list.slice(0, 4).map((stat,index)=><Reveal as="div" key={stat.label} index={index} className="border-b border-white/10 p-6 last:border-b-0 sm:border-r lg:border-b-0"><dd className="font-heading text-display font-extrabold text-accent">{stat.prefix}{stat.value}{stat.suffix}</dd><dt className="mt-2 font-semibold text-on-dark">{stat.label}</dt>{stat.description&&<p className="mt-1 text-sm text-on-dark-muted">{stat.description}</p>}</Reveal>)}</dl></Container></Section>;
}
