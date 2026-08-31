import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/** services-06 — Numbered editorial service list for consulting/B2B. */
export function Services06({ id = "servicos", eyebrow, title, lead, items, limit = 6 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);
  return (
    <Section id={id}>
      <Container>
        <SectionHeader eyebrow={eyebrow ?? "Especialidades"} title={title ?? "Como podemos ajudar"} lead={lead ?? "Escolha a frente que melhor corresponde à sua necessidade."} />
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {list.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index}>
              <Link href={`/servicos/${service.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="font-heading text-h3 font-bold text-primary/60">{String(index + 1).padStart(2, "0")}</span>
                <span><strong className="block font-heading text-h4 font-semibold group-hover:text-primary">{service.title}</strong><span className="mt-1 block max-w-2xl text-sm text-fg-soft">{service.excerpt}</span></span>
                <Icon name="arrowUpRight" size={20} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
