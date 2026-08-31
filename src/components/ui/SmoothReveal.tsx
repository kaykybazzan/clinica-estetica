"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SmoothRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function SmoothReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: SmoothRevealProps) {
  const directions = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(6px)",
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier para desaceleração fluida
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
