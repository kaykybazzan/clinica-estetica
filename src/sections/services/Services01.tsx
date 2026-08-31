import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/** services-01 — Icon cards in a responsive grid. The safest default. */
export function Services01({ id = "servicos", eyebrow, title, lead, items, limit = 6 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);

  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "O que fazemos"}
          title={title ?? "Serviços"}
          lead={lead ?? "Cada serviço começa por um diagnóstico documentado e termina com garantia por escrito."}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index} className="h-full">
              <Card interactive className="flex h-full flex-col">
                <span className="grid size-12 place-items-center rounded-[var(--radius-brand-sm)] bg-primary-soft text-primary">
                  <Icon name={service.icon} size={24} />
                </span>
                <h3 className="mt-5 font-heading text-h4 font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-fg-soft">{service.excerpt}</p>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Ver detalhes
                  <Icon name="arrowRight" size={16} />
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>

        {(items ?? allServices).length > limit && (
          <Button href="/servicos" variant="outline" icon="arrowRight" className="mt-10">
            Ver todos os serviços
          </Button>
        )}
      </Container>
    </Section>
  );
}
