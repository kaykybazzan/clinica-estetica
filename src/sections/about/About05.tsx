import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { stats } from "@/data/stats";
import type { AboutProps } from "../types";

/** about-05 — Narrative timeline with proof column. */
export function About05({ id = "sobre", eyebrow, title, lead, paragraphs, highlights }: AboutProps) {
  const copy = paragraphs ?? companyContent.aboutParagraphs;
  return (
    <Section id={id} tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <Reveal effect="fade-right">
            <SectionHeader eyebrow={eyebrow ?? "Nossa história"} title={title ?? companyContent.aboutTitle} lead={lead ?? companyContent.aboutLead} />
            <ol className="mt-9 grid gap-7 border-l border-line pl-7">
              {copy.slice(0, 3).map((text, index) => (
                <li key={text} className="relative">
                  <span aria-hidden="true" className="absolute -left-[2.1rem] top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-on-primary">{index + 1}</span>
                  <p className="leading-relaxed text-fg-soft">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal effect="fade-left" className="grid content-start gap-4">
            {stats.slice(0, 2).map((stat) => <div key={stat.label} className="border-b border-line pb-5"><p className="font-heading text-display font-extrabold text-primary">{stat.prefix}{stat.value}{stat.suffix}</p><p className="mt-1 font-semibold">{stat.label}</p></div>)}
            <ul className="grid gap-3 pt-2">
              {(highlights ?? companyContent.differentiators).slice(0, 4).map((item) => <li key={item} className="flex gap-2 text-sm"><Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-primary" />{item}</li>)}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
