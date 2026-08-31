"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

export interface ServicesBentoGridProps {
  services: ServiceItem[];
  className?: string;
}

/**
 * Bento Grid de serviços com efeito spotlight no hover.
 * Iluminação segue as coordenadas do mouse.
 * Animação em cascata com staggerChildren ao entrar na viewport.
 */
export function ServicesBentoGrid({ services, className }: ServicesBentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveredCard(cardId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-2 row-span-1",
    large: "col-span-2 row-span-2",
  };

  return (
    <div ref={containerRef} className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-lift",
            sizeClasses[service.size || "medium"]
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onMouseMove={(e) => handleMouseMove(e, service.id)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Spotlight effect */}
          {hoveredCard === service.id && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
              }}
            />
          )}

          {/* Border beam effect */}
          {hoveredCard === service.id && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--nx-primary), transparent 40%)`,
                opacity: 0.1,
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10">
            {service.icon && (
              <div className="mb-4 text-4xl">{service.icon}</div>
            )}
            <h3 className="font-heading text-h4 font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-fg-soft">{service.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
