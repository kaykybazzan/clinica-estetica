"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper para transições de página suaves.
 * Aplica fade + translateY ao trocar de rota para evitar corte brusco.
 * Respeita prefers-reduced-motion.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    startTransition(() => {
      setIsAnimating(true);
    });

    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "transition-all duration-600 ease-out",
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
