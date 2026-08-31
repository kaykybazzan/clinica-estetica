"use client";

import { useRef, useLayoutEffect, forwardRef } from "react";
import gsap from "gsap";

export interface SvgTransitionOverlayProps {
  /** Cor do traçado SVG (padrão: cor primária do tema) */
  strokeColor?: string;
  /** Espessura do traçado (padrão: 150) */
  strokeWidth?: number;
}

/**
 * Overlay de transição com SVG animável usando GSAP.
 * Cria um efeito de "curtina" vetorial durante navegações.
 * Expõe o pathRef via forwardRef para controle externo pelo hook.
 */
export const SvgTransitionOverlay = forwardRef<SVGPathElement, SvgTransitionOverlayProps>(
  ({ strokeColor = "currentColor", strokeWidth = 150 }, ref) => {
    const internalRef = useRef<SVGPathElement>(null);

    // Combinar refs para permitir controle externo
    useLayoutEffect(() => {
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else if (ref) {
        ref.current = internalRef.current;
      }
    }, [ref]);

    useLayoutEffect(() => {
      const path = internalRef.current;
      if (!path) return;

      // Configurar estado inicial do path
      gsap.set(path, {
        strokeDasharray: path.getTotalLength(),
        strokeDashoffset: path.getTotalLength(),
      });
    }, []);

    return (
      <div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            ref={internalRef}
            d="M0,100 L100,100"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        </svg>
      </div>
    );
  }
);

SvgTransitionOverlay.displayName = "SvgTransitionOverlay";
