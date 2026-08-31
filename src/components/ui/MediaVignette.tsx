"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface MediaVignetteProps {
  children: ReactNode;
  className?: string;
  /** Intensidade da vinheta (0-1) */
  vignetteIntensity?: number;
}

/**
 * Wrapper de mídia com efeito de vinheta elegante e zoom de lente.
 * Vinheta intensifica suavemente no hover.
 * Imagem interna faz zoom suave (scale-100 -> scale-105).
 */
export function MediaVignette({ children, className, vignetteIntensity = 0.7 }: MediaVignetteProps) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      {/* Conteúdo com zoom */}
      <div className="transition-transform duration-700 ease-out group-hover:scale-105">
        {children}
      </div>
      
      {/* Overlay de vinheta */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${vignetteIntensity}) 0%, rgba(0,0,0,${vignetteIntensity * 0.3}) 40%, transparent 100%)`,
        }}
      />
    </div>
  );
}
