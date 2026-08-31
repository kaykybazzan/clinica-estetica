"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export interface UseSvgTransitionOptions {
  /** Referência para o path SVG do SvgTransitionOverlay */
  pathRef: React.RefObject<SVGPathElement>;
  /** Duração de cada fase da animação em segundos (padrão: 0.6) */
  duration?: number;
  /** Curva de easing (padrão: power4.inOut) */
  ease?: string;
}

/**
 * Hook para controlar transições de página com animação SVG usando GSAP.
 * Fornece a função `navigateWithSvg` que anima o overlay antes/depois da navegação.
 */
export function useSvgTransition({ pathRef, duration = 0.6, ease = "power4.inOut" }: UseSvgTransitionOptions) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const navigateWithSvg = useCallback(
    (href: string) => {
      // Verificar prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      // Evitar cliques múltiplos durante transição
      if (isTransitioning) return;
      setIsTransitioning(true);

      const path = pathRef.current;
      if (!path) {
        router.push(href);
        setIsTransitioning(false);
        return;
      }

      // Criar timeline GSAP
      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          timelineRef.current = null;
        },
      });

      timelineRef.current = tl;

      // Fase 1: Preencher tela (0% → 100%)
      tl.to(path, {
        strokeDashoffset: 0,
        duration,
        ease,
      });

      // Trocar rota após completar fase 1
      tl.call(() => {
        router.push(href);
      });

      // Fase 2: Sumir pela direção oposta (evitar efeito bumerangue)
      tl.to(path, {
        strokeDashoffset: -path.getTotalLength(),
        duration,
        ease,
      });
    },
    [pathRef, router, isTransitioning, duration, ease]
  );

  return { isTransitioning, navigateWithSvg };
}
