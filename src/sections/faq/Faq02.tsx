import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { faq as allItems } from "@/data/faq";
import type { FaqProps } from "../types";

/** faq-02 — Two balanced columns. Fits long FAQ lists without endless scroll. */
export function Faq02({ id = "duvidas", eyebrow, title, lead, items, limit = 8 }: FaqProps) {
  const list = (items ?? allItems).slice(0, limit);
  const half = Math.ceil(list.length / 2);

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Dúvidas"}
          title={title ?? "Perguntas frequentes"}
          lead={lead}
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-x-14 md:grid-cols-2">
          <Accordion items={list.slice(0, half)} defaultOpen={0} />
          <Accordion items={list.slice(half)} defaultOpen={null} />
        </div>
      </Container>
    </Section>
  );
}
