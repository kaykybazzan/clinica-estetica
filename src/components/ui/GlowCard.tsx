"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Cor da borda no hover (padrão: neutral-400) */
  hoverBorderColor?: string;
  /** Habilitar elevação no hover */
  enableHoverElevation?: boolean;
}

/**
 * Card com borda iluminada no hover.
 * Transição suave de cor da borda e elevação opcional.
 */
export function GlowCard({ 
  children, 
  className, 
  hoverBorderColor = "border-neutral-400",
  enableHoverElevation = true 
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--nx-card-radius)] border border-neutral-200 transition-all duration-300",
        hoverBorderColor,
        enableHoverElevation && "hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
