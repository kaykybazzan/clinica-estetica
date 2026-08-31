import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { gallery as allItems } from "@/data/gallery";
import type { GalleryProps } from "../types";

/**
 * gallery-04 — Mosaic with one lead image. Server-rendered and script-free, so
 * it costs nothing in JavaScript when the page already has a heavy hero.
 */
export function Gallery04({ id = "galeria", eyebrow, title, lead, items, limit = 5 }: GalleryProps) {
  const list = (items ?? allItems).slice(0, limit);
  const [feature, ...rest] = list;
  if (!feature) return null;

  return (
    <Section id={id}>
      <Container>
        <SectionHeader eyebrow={eyebrow ?? "Galeria"} title={title ?? "Onde o serviço acontece"} lead={lead} />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Reveal>
            <SmartImage
              asset={feature.image}
              ratio="4/3"
              sizes="(max-width: 1024px) 100vw, 700px"
              className="h-full rounded-[var(--radius-brand-lg)]"
            />
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {rest.map((item, index) => (
              <Reveal key={item.image.src} index={index}>
                <SmartImage
                  asset={item.image}
                  ratio="1/1"
                  sizes="(max-width: 1024px) 50vw, 220px"
                  className="rounded-[var(--radius-brand)]"
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Button href="/galeria" variant="outline" icon="arrowRight" className="mt-10">
          Ver a galeria completa
        </Button>
      </Container>
    </Section>
  );
}
