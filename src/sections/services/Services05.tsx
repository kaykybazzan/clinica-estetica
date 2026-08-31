"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Tabs } from "@/components/ui/Tabs";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { services as allServices } from "@/data/services";
import type { ServicesProps } from "../types";

/**
 * services-05 — Tabbed detail. Fits clients whose services differ a lot from one
 * another and who want depth without a long page.
 */
export function Services05({ id = "servicos", eyebrow, title, lead, items, limit = 5 }: ServicesProps) {
  const list = (items ?? allServices).slice(0, limit);

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "O que fazemos"}
          title={title ?? "Serviços em detalhe"}
          lead={lead ?? "Escolha uma frente para ver o escopo, o que está incluso e como pedir."}
        />

        <Tabs
          className="mt-10"
          items={list.map((service) => ({
            id: service.slug,
            label: service.title,
            content: (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
                <SmartImage
                  asset={service.image}
                  ratio="4/3"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="rounded-[var(--radius-brand)]"
                />
                <div>
                  <h3 className="font-heading text-h3 font-semibold">{service.title}</h3>
                  <p className="mt-3 text-fg-soft">{service.description}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Icon name="check" size={16} className="mt-1 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <WhatsAppButton
                      size="sm"
                      source={`services-05:${service.slug}`}
                      context={{ kind: "service", service: service.title }}
                    >
                      Pedir orçamento
                    </WhatsAppButton>
                    <Link
                      href={`/servicos/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >
                      Página completa
                      <Icon name="arrowRight" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ),
          }))}
        />
      </Container>
    </Section>
  );
}
