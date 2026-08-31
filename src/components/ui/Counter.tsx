"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { formatNumberBR } from "@/utils/format";

export interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up once, on entry. Reduced motion gets the final number immediately. */
export function Counter({ value, prefix = "", suffix = "", duration = 1200, className }: CounterProps) {
  const options = useMemo(() => ({ threshold: 0.5 }), []);
  const { ref, inView } = useInView<HTMLSpanElement>(options);
  const reduced = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(0);
  const frame = useRef(0);

  // Reduced motion is decided at render time — no effect, no extra render.
  const display = reduced ? value : animated;

  useEffect(() => {
    if (!inView || reduced) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(value * eased));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumberBR(display)}
      {suffix}
    </span>
  );
}
