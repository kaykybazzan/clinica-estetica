"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type SlicePhase = "idle" | "closing" | "open" | "opening";

interface SliceTransitionContextValue {
  phase: SlicePhase;
  navigateWithSlice: (href: string) => void;
  isTransitioning: boolean;
}

const SliceTransitionContext = createContext<SliceTransitionContextValue | undefined>(undefined);

export function SliceTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SlicePhase>("idle");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithSlice = useCallback((href: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Fase 1: Fechar fatias (descer)
    setPhase("closing");

    // Aguardar animação de fechamento (400ms + maior delay 300ms = 700ms total)
    setTimeout(() => {
      // Trocar rota
      window.location.href = href;
    }, 700);
  }, [isTransitioning]);

  return (
    <SliceTransitionContext.Provider value={{ phase, navigateWithSlice, isTransitioning }}>
      {children}
    </SliceTransitionContext.Provider>
  );
}

export function useSliceTransition() {
  const context = useContext(SliceTransitionContext);
  if (!context) {
    throw new Error("useSliceTransition must be used within SliceTransitionProvider");
  }
  return context;
}
