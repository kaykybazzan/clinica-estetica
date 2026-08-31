import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Carousel } from "@/components/ui/Carousel";
import { gallery as allItems } from "@/data/gallery";
import type { GalleryProps } from "../types";

/** gallery-03 — Wide carousel. Keeps a photo-heavy page short. */
export function Gallery03({ id = "galeria", eyebrow, title, lead, items, limit = 10 }: GalleryProps) {
  const list = (items ?? allItems).slice(0, limit);

  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader eyebrow={eyebrow ?? "Galeria"} title={title ?? "Por dentro do dia a dia"} lead={lead} />

        <Carousel label="Galeria de fotos" slideClassName="w-[86%] sm:w-[54%] lg:w-[38%]" className="mt-10">
          {list.map((item) => (
            <figure key={item.image.src} className="overflow-hidden rounded-[var(--radius-brand)] bg-bg">
              <SmartImage
                asset={item.image}
                ratio="3/2"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 54vw, 460px"
              />
              <figcaption className="px-5 py-4 text-sm">
                <span className="font-semibold">{item.caption}</span>
                <span className="text-fg-soft"> · {item.category}</span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
