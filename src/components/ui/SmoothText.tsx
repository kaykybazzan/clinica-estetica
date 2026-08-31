"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SmoothTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SmoothText({ children, delay = 0, className = "" }: SmoothTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 1, 0.5, 1], // Desaceleração suave estilo Apple
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
