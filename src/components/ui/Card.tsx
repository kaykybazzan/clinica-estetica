import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

const TONES = {
  default: "bg-bg border border-line",
  surface: "bg-surface border border-transparent",
  dark: "bg-white/5 border border-white/10 text-on-dark",
  outline: "bg-transparent border border-line",
} as const;

export interface CardProps {
  children: ReactNode;
  tone?: keyof typeof TONES;
  /** Adds hover elevation. Only use when the whole card is a link. */
  interactive?: boolean;
  className?: string;
  as?: "div" | "article" | "li";
}

export function Card({ children, tone = "default", interactive, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-[var(--nx-card-radius)] p-[var(--nx-card-padding)] shadow-[var(--nx-card-shadow)]",
        TONES[tone],
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-[var(--nx-duration)] ease-brand-out hover:-translate-y-1 hover:shadow-lift hover:border-primary/40",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
