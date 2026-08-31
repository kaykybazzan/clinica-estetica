"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

export type RevealEffect = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "scale-up" | "blur-in";

export interface RevealProps {
  children: ReactNode;
  effect?: RevealEffect;
  index?: number;
  staggerMs?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Content is rendered in its final state on the server. The offset is only
 * applied after mount, so a visitor with JS disabled — or a crawler — always
 * sees the finished layout.
 *
 * `data-reveal-ready` is written straight to the DOM instead of through state:
 * it is a one-way signal to CSS, not something React needs to re-render for.
 */
export function Reveal({
  children,
  effect = "fade-up",
  index = 0,
  staggerMs = 70,
  as: Tag = "div",
  className,
}: RevealProps) {
  const options = useMemo(() => ({}), []);
  const { ref, inView } = useInView<HTMLDivElement>(options);

  useEffect(() => {
    const node = ref.current;
    if (node) node.dataset.revealReady = "true";
  }, [ref]);

  return (
    <Tag
      ref={ref}
      data-reveal={effect}
      data-reveal-ready="false"
      data-reveal-visible={inView ? "true" : "false"}
      style={{ "--nx-reveal-delay": `${Math.min(index, 6) * staggerMs}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
