import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

const SIZES = {
  display: "text-display font-extrabold",
  h1: "text-h1 font-bold",
  h2: "text-h2 font-bold",
  h3: "text-h3 font-semibold",
  h4: "text-h4 font-semibold",
} as const;

const ALIGN = { left: "text-left", center: "text-center mx-auto", right: "text-right ms-auto" } as const;

export interface HeadingProps {
  children: ReactNode;
  /** Semantic level — chosen independently from the visual size. */
  level?: 1 | 2 | 3 | 4;
  size?: keyof typeof SIZES;
  align?: keyof typeof ALIGN;
  className?: string;
  id?: string;
}

export function Heading({ children, level = 2, size, align = "left", className, id }: HeadingProps) {
  const Tag = `h${level}` as const;
  const visual = size ?? (`h${level}` as keyof typeof SIZES);

  return (
    <Tag id={id} className={cn("font-heading", SIZES[visual], ALIGN[align], className)}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase tracking-[0.16em] text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-lead leading-relaxed text-fg-soft", className)}>{children}</p>;
}
