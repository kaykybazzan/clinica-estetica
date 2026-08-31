"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { cn } from "@/utils/cn";

export interface CarouselProps {
  children: React.ReactNode[];
  label: string;
  /** Tailwind width classes applied to each slide. */
  slideClassName?: string;
  tone?: "default" | "dark";
  className?: string;
}

/**
 * CSS scroll-snap does the work; JS only moves the scroll position and tracks
 * the active slide. No animation library, no layout thrash, and it degrades to
 * a plain horizontal scroller when scripts fail.
 */
export function Carousel({
  children,
  label,
  slideClassName = "w-[86%] sm:w-[48%] lg:w-[32%]",
  tone = "default",
  className,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[target] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const closest = slides.reduce(
        (best, slide, i) => {
          const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { distance, i } : best;
        },
        { distance: Infinity, i: 0 },
      );
      setIndex(closest.i);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const atStart = index === 0;
  const atEnd = index >= children.length - 1;

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={trackRef}
        aria-label={label}
        className="scrollbar-none -mx-[var(--nx-gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--nx-gutter)] pb-2"
      >
        {children.map((child, i) => (
          <li key={i} className={cn("shrink-0 snap-start", slideClassName)}>
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2">
        <IconButton
          icon="chevronLeft"
          label="Item anterior"
          variant={tone === "dark" ? "onDark" : "outline"}
          onClick={() => scrollToIndex(Math.max(0, index - 1))}
          disabled={atStart}
          className={cn(atStart && "opacity-40")}
        />
        <IconButton
          icon="chevronRight"
          label="Próximo item"
          variant={tone === "dark" ? "onDark" : "outline"}
          onClick={() => scrollToIndex(Math.min(children.length - 1, index + 1))}
          disabled={atEnd}
          className={cn(atEnd && "opacity-40")}
        />
        <span className={cn("ml-2 text-sm", tone === "dark" ? "text-on-dark-muted" : "text-fg-soft")}>
          {index + 1} / {children.length}
        </span>
      </div>
    </div>
  );
}
