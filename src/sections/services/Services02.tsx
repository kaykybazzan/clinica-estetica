import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { services as allServices } from "@/data/services";
import { cn } from "@/utils/cn";
import type { ServicesProps } from "../types";

/**
 * services-02 — Alternating rows with a real photograph and the deliverables of
 * each service. Use when the client sells few, high-consideration services.
 */
export function Services02({ id = "servicos", eyebrow, title, lead, items, limit = 3 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "O que fazemos"}
          title={title ?? "Serviços"}
          lead={lead ?? "Três frentes principais, com o mesmo método: medir, provar e só então consertar."}
        />

        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {list.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <Reveal
                key={service.slug}
                effect={reversed ? "fade-left" : "fade-right"}
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                  reversed && "lg:[&>*:first-child]:order-2",
                )}
              >
                <SmartImage
                  asset={service.image}
                  ratio="4/3"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="rounded-[var(--radius-brand-lg)]"
                />

                <div>
                  <span className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.16em] text-primary">
                    <Icon name={service.icon} size={18} />
                    {service.title}
                  </span>
                  <h3 className="mt-3 font-heading text-h2 font-bold">{service.excerpt}</h3>
                  <p className="mt-4 text-fg-soft">{service.description}</p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Icon name="check" size={16} className="mt-1 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <WhatsAppButton
                      size="sm"
                      source={`services-02:${service.slug}`}
                      context={{ kind: "service", service: service.title }}
                    >
                      Falar sobre isso
                    </WhatsAppButton>
                    <Button href={`/servicos/${service.slug}`} size="sm" variant="ghost" icon="arrowRight">
                      Ver a página
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Button href="/servicos" variant="outline" icon="arrowRight" className="mt-14">
          Ver todos os serviços
        </Button>
      </Container>
    </Section>
  );
}
