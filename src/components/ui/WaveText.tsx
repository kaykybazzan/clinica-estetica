"use client";

import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
  delay?: number;
  className?: string;
  italic?: boolean;
}

export function WaveText({ text, delay = 0, className = "", italic = false }: WaveTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 180,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-[0.25em] ${className} ${italic ? "italic font-serif" : ""}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
