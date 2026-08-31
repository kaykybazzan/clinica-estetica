"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ElegantButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function ElegantButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ElegantButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 ${
        isPrimary
          ? "bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-md"
          : "border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500"
      } ${className}`}
      {...(props as any)}
    >
      {/* Brilho Dourado/Claro Deslizante no Hover */}
      <motion.span
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
