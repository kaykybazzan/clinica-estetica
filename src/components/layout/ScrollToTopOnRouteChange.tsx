"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Componente sem render que reseta o scroll ao trocar de rota.
 * Montado uma vez no layout.tsx para garantir que o usuário sempre
 * comece do topo da página ao navegar.
 */
export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
