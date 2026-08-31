"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

export interface Project3DCardProps {
  title: string;
  description: string;
  image: string;
  category?: string;
  className?: string;
}

/**
 * Card com efeito 3D e brilho direcional baseado no movimento do cursor.
 * Rotação em perspectiva (rotateX, rotateY) calculada pela posição do mouse.
 * Camada de reflexo que acompanha o ângulo do cursor.
 */
export function Project3DCard({ title, description, image, category, className }: Project3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular rotação baseada na posição do mouse (centro = 0 rotação)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateYValue = ((x - centerX) / centerX) * 10; // Max 10 graus
    const rotateXValue = ((y - centerY) / centerY) * -10; // Invertido para efeito natural

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-surface border border-line cursor-pointer",
        "perspective-1000",
        className
      )}
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Imagem */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Camada de brilho/reflexo direcional */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
            {category}
          </span>
        )}
        <h3 className="font-heading text-h4 font-semibold mb-2">{title}</h3>
        <p className="text-sm text-fg-soft">{description}</p>
      </div>

      {/* Efeito de borda brilhante */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--nx-primary), transparent 50%)`,
            opacity: 0.05,
          }}
        />
      )}
    </motion.div>
  );
}
