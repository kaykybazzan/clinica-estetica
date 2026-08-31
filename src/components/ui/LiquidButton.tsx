"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

export interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
}

/**
 * Botão CTA com efeito metálico fluido/glossy.
 * Animação de background-position pausada quando não visível para performance.
 * Respeita prefers-reduced-motion.
 */
export function LiquidButton({ children, className, variant = "primary", size = "md" }: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Verificar prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // IntersectionObserver para pausar animação quando não visível
  useEffect(() => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const variants = {
    primary: "bg-gradient-to-r from-primary via-primary-strong to-primary",
    secondary: "bg-gradient-to-r from-secondary via-secondary-strong to-secondary",
    gold: "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const gradientClass = variants[variant];
  const sizeClass = sizes[size];

  if (prefersReducedMotion) {
    return (
      <button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden rounded-full font-semibold text-on-primary transition-colors hover:opacity-90",
          gradientClass,
          sizeClass,
          className
        )}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-full font-semibold text-on-primary",
        gradientClass,
        sizeClass,
        className
      )}
      animate={{
        backgroundPosition: isVisible ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
      }}
      transition={{
        duration: 3,
        repeat: isVisible ? Infinity : 0,
        ease: "linear",
      }}
     	style={{
        backgroundSize: "200% 200%",
      }}
    >
      <span className="relative z-10">{children}</span>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}
