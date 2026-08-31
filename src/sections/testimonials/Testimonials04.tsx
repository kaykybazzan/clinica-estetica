import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { testimonials as allItems } from "@/data/testimonials";
import { clientConfig } from "@/config/client.config";
import type { TestimonialsProps } from "../types";

/**
 * testimonials-04 — Column flow, so quotes of different lengths sit naturally.
 * Shows an average only when it can be computed from the quotes on the page —
 * never a rating typed by hand.
 */
export function Testimonials04({ id = "depoimentos", eyebrow, title, lead, items }: TestimonialsProps) {
  const list = items ?? allItems;
  const average = list.reduce((sum, item) => sum + item.rating, 0) / (list.length || 1);

  return (
    <Section id={id}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow={eyebrow ?? "Quem já veio"}
            title={title ?? "Avaliações de clientes"}
            lead={lead}
          />
          <div className="rounded-[var(--radius-brand)] border border-line px-5 py-4">
            <p className="font-heading text-h2 font-bold leading-none">{average.toFixed(1)}</p>
            <Rating value={Math.round(average)} className="mt-2" />
            <p className="mt-1 text-sm text-fg-soft">{list.length} depoimentos publicados</p>
          </div>
        </div>

        <div className="mt-12 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {list.map((item, index) => (
            <Reveal
              as="figure"
              key={item.name}
              index={Math.min(index, 5)}
              className="rounded-[var(--radius-brand)] border border-line bg-bg p-6"
            >
              <Rating value={item.rating} />
              <blockquote className="mt-3 text-fg-soft">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="block font-semibold">{item.name}</span>
                <span className="text-fg-soft">{item.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {clientConfig.social.googleBusiness && (
          <Button href={clientConfig.social.googleBusiness} variant="outline" icon="arrowUpRight" className="mt-10">
            Ver avaliações no Google
          </Button>
        )}
      </Container>
    </Section>
  );
}
