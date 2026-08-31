"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { gallery as allItems } from "@/data/gallery";
import type { GalleryProps } from "../types";

/** gallery-01 — Uniform grid with a lightbox. The dependable default. */
export function Gallery01({ id = "galeria", eyebrow, title, lead, items, limit = 8 }: GalleryProps) {
  const list = (items ?? allItems).slice(0, limit);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Galeria"}
          title={title ?? "A estrutura por dentro"}
          lead={lead ?? "Fotos do espaço, dos equipamentos e do trabalho em andamento."}
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {list.map((item, index) => (
            <Reveal as="li" key={item.image.src} index={Math.min(index, 5)}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`Ampliar imagem: ${item.caption}`}
                className="group block w-full overflow-hidden rounded-[var(--radius-brand-sm)]"
              >
                <SmartImage
                  asset={item.image}
                  ratio="1/1"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  enableHoverEffects
                />
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Lightbox items={list} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </Section>
  );
}
