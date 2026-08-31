import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

const WIDTHS = {
  narrow: "max-w-[var(--nx-container-narrow)]",
  default: "max-w-[var(--nx-layout-container)]",
  wide: "max-w-[var(--nx-container-wide)]",
  full: "max-w-none",
} as const;

export interface ContainerProps {
  children: ReactNode;
  size?: keyof typeof WIDTHS;
  as?: ElementType;
  className?: string;
}

export function Container({ children, size = "default", as: Tag = "div", className }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-[var(--nx-gutter)]", WIDTHS[size], className)}>{children}</Tag>
  );
}
