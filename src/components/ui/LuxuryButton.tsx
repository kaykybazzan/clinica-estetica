"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

interface LuxuryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: IconName;
  href?: string;
}

export function LuxuryButton({
  children,
  variant = "primary",
  className = "",
  icon,
  href,
  ...props
}: LuxuryButtonProps) {
  if (variant === "secondary") {
    return (
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center gap-2 py-2 text-sm font-medium tracking-wide text-neutral-800 dark:text-neutral-200 transition-colors ${className}`}
        {...(props as any)}
      >
        <span>{children}</span>
        {icon && (
          <motion.span
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          >
            <Icon name={icon} size={16} />
          </motion.span>
        )}
        {/* Linha animada inferior do centro para fora */}
        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(122, 53, 67, 0.4)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#6B2D39] px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Brilho Shimmer Metalizado no Hover */}
      <motion.span
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && (
          <motion.span
            whileHover={{ rotate: 45, x: 2, y: -2 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          >
            <Icon name={icon} size={16} />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
