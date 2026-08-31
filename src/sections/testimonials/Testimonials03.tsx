import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials as allItems } from "@/data/testimonials";
import type { TestimonialsProps } from "../types";

/** testimonials-03 — Dark band, two long quotes with generous space. */
export function Testimonials03({ id = "depoimentos", eyebrow, title, lead, items }: TestimonialsProps) {
  const list = (items ?? allItems).slice(0, 2);

  return (
    <Section id={id} tone="dark" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Quem já veio"}
          title={title ?? "Palavras de quem voltou"}
          lead={lead}
          tone="dark"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {list.map((item, index) => (
            <Reveal as="figure" key={item.name} index={index}>
              <Rating value={item.rating} />
              <blockquote className="mt-5 font-heading text-h3 font-semibold leading-snug text-on-dark">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/15 pt-5 text-on-dark-muted">
                <span className="block font-semibold text-on-dark">{item.name}</span>
                {item.role}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
