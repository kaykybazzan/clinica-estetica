"use client";

import type { ReactNode } from "react";

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper simples para páginas.
 * As transições de página são gerenciadas pelo View Transition API no layout.tsx.
 * Este componente serve apenas como um container opcional para estilos adicionais.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return <div className={className}>{children}</div>;
}
