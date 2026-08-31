"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "@/components/ui/Lightbox";
import { EmptyState } from "@/components/ui/States";
import { gallery as allItems, galleryCategories } from "@/data/gallery";
import { cn } from "@/utils/cn";
import type { GalleryProps } from "../types";

/** gallery-02 — Filterable by category. Use when the client has 20+ photos. */
export function Gallery02({ id = "galeria", eyebrow, title, lead, items }: GalleryProps) {
  const source = items ?? allItems;
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "Todos" ? source : source.filter((item) => item.category === filter)),
    [filter, source],
  );

  const categories = [{ id: "Todos", label: "Todos" }, ...galleryCategories];

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Galeria"}
          title={title ?? "Nosso trabalho em imagens"}
          lead={lead}
        />

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar galeria">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
              className={cn(
                "min-h-[var(--nx-tap-min)] rounded-full border px-4 text-sm font-semibold transition-colors",
                filter === category.id
                  ? "border-primary bg-primary text-on-primary"
                  : "border-line text-fg-soft hover:border-primary hover:text-primary",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="Nenhuma foto nesta categoria"
            description="Escolha outra categoria ou volte para Todos."
            icon="image"
          />
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, index) => (
              <li key={item.image.src}>
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`Ampliar imagem: ${item.caption}`}
                  className="group block w-full overflow-hidden rounded-[var(--radius-brand)] border border-line text-left"
                >
                  <SmartImage
                    asset={item.image}
                    ratio="4/3"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    enableHoverEffects
                  />
                  <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <span className="font-semibold">{item.caption}</span>
                    <span className="text-fg-soft">{item.category}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Container>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </Section>
  );
}
