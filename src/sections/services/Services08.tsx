import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/** services-08 — Compact capability grid for dense service catalogs. */
export function Services08({ id = "servicos", eyebrow, title, lead, items, limit = 8 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);
  return (
    <Section id={id} tone="dark">
      <Container>
        <SectionHeader tone="dark" eyebrow={eyebrow ?? "Capacidades"} title={title ?? "Tudo que entregamos"} lead={lead ?? "Uma visão rápida das principais frentes, sem esconder o acesso aos detalhes."} />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--nx-card-radius)] bg-white/10 md:grid-cols-2">
          {list.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index} className="bg-secondary">
              <Link href={`/servicos/${service.slug}`} className="group flex h-full gap-4 p-6 hover:bg-white/[.04]">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-accent"><Icon name={service.icon} size={20} /></span>
                <span className="min-w-0"><strong className="flex items-center gap-2 font-heading text-h4 font-semibold text-on-dark">{service.title}<Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" /></strong><span className="mt-1 block text-sm text-on-dark-muted">{service.excerpt}</span></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
