"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/utils/cn";

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
}

export interface TreatmentTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

/**
 * Timeline interativa de tratamentos com animação de scroll.
 * Linha central preenchida com scaleY conforme scroll.
 * Pontos pulsam quando atingem o centro da tela.
 */
export function TreatmentTimeline({ steps, className }: TreatmentTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Altura da linha baseada no progresso do scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className={cn("relative py-12", className)}>
      {/* Linha central */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-line -translate-x-1/2">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary"
          style={{ scaleY: lineHeight, transformOrigin: "top" }}
        />
      </div>

      {/* Passos */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <TimelineItem key={step.id} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ step, index }: { step: TimelineStep; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["center center", "center center"],
  });

  // Pulsar quando no centro da tela
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative flex items-center",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
        "flex-col md:gap-8"
      )}
    >
      {/* Conteúdo */}
      <motion.div
        className={cn(
          "flex-1 md:w-1/2",
          isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12",
          "ml-16 md:ml-0"
        )}
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {step.duration && (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
            {step.duration}
          </span>
        )}
        <h3 className="font-heading text-h4 font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-fg-soft">{step.description}</p>
      </motion.div>

      {/* Ponto da timeline */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-primary bg-bg -translate-x-1/2 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          style={{ scale, opacity }}
        />
      </div>

      {/* Espaço vazio para layout */}
      <div className="flex-1 md:w-1/2" />
    </div>
  );
}
