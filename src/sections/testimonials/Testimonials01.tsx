import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials as allItems } from "@/data/testimonials";
import type { TestimonialsProps } from "../types";

/** testimonials-01 — Three quote cards. Reads as evidence, not as decoration. */
export function Testimonials01({ id = "depoimentos", eyebrow, title, lead, items }: TestimonialsProps) {
  const list = (items ?? allItems).slice(0, 3);

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Quem já veio"}
          title={title ?? "O que os clientes contam"}
          lead={lead}
        />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {list.map((item, index) => (
            <Reveal as="li" key={item.name} index={index} className="h-full">
              <Card as="article" className="flex h-full flex-col">
                <Icon name="quote" size={28} className="text-primary-soft" />
                <blockquote className="mt-4 flex-1 text-fg-soft">{item.quote}</blockquote>
                <footer className="mt-6 border-t border-line pt-5">
                  <Rating value={item.rating} />
                  <p className="mt-2 font-semibold">{item.name}</p>
                  <p className="text-sm text-fg-soft">{item.role}</p>
                </footer>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
