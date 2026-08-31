import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { faq as allItems } from "@/data/faq";
import type { FaqProps } from "../types";

/** faq-01 — Sticky question block beside the accordion. */
export function Faq01({ id = "duvidas", eyebrow, title, lead, items, limit = 6 }: FaqProps) {
  const list = (items ?? allItems).slice(0, limit);

  return (
    <Section id={id} tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow={eyebrow ?? "Dúvidas"}
              title={title ?? "Perguntas frequentes"}
              lead={lead ?? "Se a sua pergunta não estiver aqui, mande no WhatsApp — respondemos direto."}
            />
            <WhatsAppButton size="sm" variant="outline" className="mt-7" source="faq-01">
              Perguntar agora
            </WhatsAppButton>
          </div>

          <Accordion items={list} />
        </div>
      </Container>
    </Section>
  );
}
