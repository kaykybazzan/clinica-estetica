import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { stats as allStats } from "@/data/stats";
import type { StatsProps } from "../types";

/** stats-05 — Editorial asymmetric metrics. */
export function Stats05({ id = "numeros", eyebrow, title, items }: StatsProps) {
  const list = items ?? allStats; const first=list[0]; const rest=list.slice(1,4);
  return <Section id={id} tone="surface"><Container><div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"><Reveal effect="fade-right"><Eyebrow>{eyebrow??"Nossa escala"}</Eyebrow><Heading level={2} className="mt-4 max-w-lg">{title??"Poucos números. Todos com contexto."}</Heading>{first&&<div className="mt-8"><p className="font-heading text-[clamp(4rem,10vw,8rem)] font-extrabold leading-none text-primary">{first.prefix}{first.value}{first.suffix}</p><p className="mt-3 font-semibold">{first.label}</p><p className="mt-1 text-sm text-fg-soft">{first.description}</p></div>}</Reveal><div className="grid content-end gap-6 sm:grid-cols-3">{rest.map((stat,index)=><Reveal key={stat.label} index={index} className="border-t border-line pt-5"><p className="font-heading text-h2 font-bold">{stat.prefix}{stat.value}{stat.suffix}</p><p className="mt-2 text-sm font-semibold">{stat.label}</p><p className="mt-1 text-xs text-fg-soft">{stat.description}</p></Reveal>)}</div></div></Container></Section>;
}
