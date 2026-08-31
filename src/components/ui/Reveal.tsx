"use client";

import type { ElementType, ReactNode } from "react";
import { useMemo } from "react";
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

  return (
    <Tag
      ref={ref}
      data-reveal={effect}
      data-reveal-visible={inView ? "true" : "false"}
      style={{ "--nx-reveal-delay": `${Math.min(index, 6) * staggerMs}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
