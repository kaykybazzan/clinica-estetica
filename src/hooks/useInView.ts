"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se a API não for suportada, força o elemento a aparecer imediatamente
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.01, // Dispara assim que apenas 1% do elemento aparece
        rootMargin: "50px", // Margem de antecipação de 50px
        ...options,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}
