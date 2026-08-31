import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/** services-04 — Horizontal carousel of image cards. Strong on mobile, compact on desktop. */
export function Services04({ id = "servicos", eyebrow, title, lead, items, limit = 8 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);

  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "O que fazemos"}
          title={title ?? "Serviços"}
          lead={lead ?? "Arraste para percorrer. Cada card leva à página com escopo e prazo."}
        />

        <Carousel label="Serviços" className="mt-10">
          {list.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group block h-full overflow-hidden rounded-[var(--radius-brand)] border border-line bg-bg transition-shadow hover:shadow-lift"
            >
              <SmartImage
                asset={service.image}
                ratio="3/2"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 380px"
              />
              <div className="p-6">
                <span className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.16em] text-primary">
                  <Icon name={service.icon} size={16} />
                  Serviço
                </span>
                <h3 className="mt-2 font-heading text-h4 font-semibold group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-fg-soft">{service.excerpt}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
