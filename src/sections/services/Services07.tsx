import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/** services-07 — Image-led cards with strong visual hierarchy. */
export function Services07({ id = "servicos", eyebrow, title, lead, items, limit = 6 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);
  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader eyebrow={eyebrow ?? "Serviços"} title={title ?? "Soluções que você consegue ver"} lead={lead ?? "Cada frente tem escopo claro, detalhes e um canal direto para orçamento."} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index} className="overflow-hidden rounded-[var(--nx-card-radius)] bg-bg shadow-[var(--nx-card-shadow)]">
              <Link href={`/servicos/${service.slug}`} className="group block h-full">
                <SmartImage asset={service.image} ratio="4/3" className="rounded-none" imageClassName="transition-transform duration-[var(--nx-duration)] group-hover:scale-[1.03]" />
                <div className="p-[var(--nx-card-padding)]"><div className="flex items-start justify-between gap-3"><h3 className="font-heading text-h4 font-semibold">{service.title}</h3><Icon name="arrowUpRight" size={18} className="shrink-0 text-primary" /></div><p className="mt-2 text-sm text-fg-soft">{service.excerpt}</p></div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
