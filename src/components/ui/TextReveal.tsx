"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export type TextRevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up";

export interface TextRevealProps {
  children: React.ReactNode;
  variant?: TextRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Componente reutilizável para revelar textos e elementos com animação CSS.
 * Usa IntersectionObserver para acionar a animação apenas quando o elemento entra na viewport.
 * Respeita prefers-reduced-motion.
 */
export function TextReveal({ 
  children, 
  variant = "fade-up", 
  delay = 0, 
  duration = 600,
  className 
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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
    if (prefersReducedMotion || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const variantClasses = {
    "fade-up": "animate-fade-up",
    "fade-down": "animate-fade-down",
    "fade-left": "animate-fade-left",
    "fade-right": "animate-fade-right",
    "scale-up": "animate-scale-up",
  };

  return (
    <div
      ref={ref}
      className={cn(
        variantClasses[variant],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
        animationDuration: `${duration}ms`,
        opacity: prefersReducedMotion ? 1 : (isVisible ? 1 : 0),
      }}
    >
      {children}
    </div>
  );
}
