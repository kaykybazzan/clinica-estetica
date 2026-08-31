"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Modal } from "./Modal";
import { IconButton } from "./IconButton";
import type { GalleryItem } from "@/types/content";

export interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Keyboard-navigable image viewer. Arrow keys move, Escape closes (via Modal). */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const move = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, move]);

  if (index === null) return null;
  const current = items[index];

  return (
    <Modal open onClose={onClose} title={current.caption} hideTitle className="max-w-5xl p-3 sm:p-4">
      <figure>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-brand-sm)] bg-surface">
          <Image
            src={current.image.src}
            alt={current.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-4 px-1">
          <span className="text-sm">
            <span className="font-semibold">{current.caption}</span>
            <span className="text-fg-soft"> · {index + 1} de {items.length}</span>
          </span>
          <span className="flex gap-2">
            <IconButton icon="chevronLeft" label="Imagem anterior" variant="outline" onClick={() => move(-1)} />
            <IconButton icon="chevronRight" label="Próxima imagem" variant="outline" onClick={() => move(1)} />
          </span>
        </figcaption>
      </figure>
    </Modal>
  );
}
