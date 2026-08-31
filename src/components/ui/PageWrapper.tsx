"use client";

import type { ReactNode } from "react";
import { PageTransition } from "./PageTransition";

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper para páginas com transições suaves.
 * Aplica PageTransition para animações de entrada/saída entre rotas.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <PageTransition className={className}>
      {children}
    </PageTransition>
  );
}
