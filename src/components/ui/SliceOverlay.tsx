"use client";

import { Logo } from "./Logo";
import { cn } from "@/utils/cn";

export interface SliceOverlayProps {
  /** Estado da transição: 'idle' | 'closing' | 'open' | 'opening' */
  phase: "idle" | "closing" | "open" | "opening";
  /** Cor das fatias (padrão: neutral-900) */
  sliceColor?: string;
}

/**
 * Overlay de transição com efeito de fatias verticais (cortina/onda).
 * Exibe a logo da clínica na fatia central durante a transição.
 */
export function SliceOverlay({ phase, sliceColor = "bg-neutral-900" }: SliceOverlayProps) {
  const slices = [0, 1, 2, 3, 4];
  const delays = [0, 75, 150, 225, 300]; // Stagger em ms

  return (
    <div className="fixed inset-0 z-[9999] flex pointer-events-none" aria-hidden="true">
      {slices.map((index) => (
        <div
          key={index}
          className={cn(
            "flex-1 h-full transition-transform duration-[400ms] ease-out",
            sliceColor,
            phase === "closing" && "translate-y-0",
            phase === "idle" && "-translate-y-full",
            phase === "opening" && "translate-y-full"
          )}
          style={{
            transitionDelay: `${delays[index]}ms`,
          }}
        >
          {/* Logo apenas na fatia central (index 2) */}
          {index === 2 && (
            <div className="absolute inset-0 flex items-center justify-center overflow-visible lg:overflow-hidden">
              <div
                className={cn(
                  "transition-all duration-[400ms] ease-out",
                  phase === "closing" || phase === "open" ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
                style={{
                  transitionDelay: `${delays[index]}ms`,
                }}
              >
                <Logo onDark={true} asText={true} className="text-white" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
