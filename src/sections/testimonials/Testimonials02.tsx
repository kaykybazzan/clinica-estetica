import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Carousel } from "@/components/ui/Carousel";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { testimonials as allItems } from "@/data/testimonials";
import type { TestimonialsProps } from "../types";

/** testimonials-02 — Carousel, for clients with many reviews to show. */
export function Testimonials02({ id = "depoimentos", eyebrow, title, lead, items }: TestimonialsProps) {
  const list = items ?? allItems;

  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Quem já veio"}
          title={title ?? "Depoimentos"}
          lead={lead}
        />

        <Carousel label="Depoimentos de clientes" className="mt-10">
          {list.map((item) => (
            <Card key={item.name} as="article" className="flex h-full flex-col">
              <Rating value={item.rating} />
              <blockquote className="mt-4 flex-1 text-fg-soft">{item.quote}</blockquote>
              <footer className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-fg-soft">{item.role}</p>
              </footer>
            </Card>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
