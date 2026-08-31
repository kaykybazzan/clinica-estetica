import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/**
 * services-03 — Dense directory. Best for clients with a long catalogue, where a
 * card grid would force endless scrolling on mobile.
 */
export function Services03({ id = "servicos", eyebrow, title, lead, items, limit = 12 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);

  return (
    <Section id={id}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal effect="fade-right" className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow={eyebrow ?? "Catálogo"}
              title={title ?? "Tudo o que resolvemos"}
              lead={lead ?? "Se o que você precisa não estiver aqui, pergunte: indicamos quem faz."}
            />
          </Reveal>

          <ul className="divide-y divide-line border-y border-line">
            {list.map((service, index) => (
              <Reveal as="li" key={service.slug} index={Math.min(index, 5)}>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group flex items-center gap-5 py-6 transition-colors hover:bg-surface"
                >
                  <Icon name={service.icon} size={26} className="shrink-0 text-primary" />
                  <span className="flex-1">
                    <span className="block font-heading text-h4 font-semibold group-hover:text-primary">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm text-fg-soft">{service.excerpt}</span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    size={20}
                    className="shrink-0 text-line-strong transition-colors group-hover:text-primary"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
