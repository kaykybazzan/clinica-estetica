import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

const TONES = {
  default: "bg-bg text-fg",
  surface: "bg-surface text-fg",
  dark: "bg-secondary text-on-dark",
  primary: "bg-primary text-on-primary",
  accent: "bg-accent-soft text-fg",
} as const;

export type SectionTone = keyof typeof TONES;

export interface SectionProps {
  children: ReactNode;
  /** Anchor id — also the target of in-page navigation. */
  id?: string;
  tone?: SectionTone;
  as?: ElementType;
  className?: string;
  /** Removes the vertical rhythm when a child controls its own spacing. */
  flush?: boolean;
  "aria-labelledby"?: string;
}

/**
 * Every band of the page goes through this component. Vertical rhythm comes
 * from a single token scaled by the client's `density`, which is why sections
 * never fight each other over margins.
 */
export function Section({
  children,
  id,
  tone = "default",
  as: Tag = "section",
  className,
  flush = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full",
        TONES[tone],
        !flush && "py-[var(--nx-section-y)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
