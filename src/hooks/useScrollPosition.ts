"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Whether the page is scrolled past `threshold`.
 *
 * The scroll position is an external store, so it is read through
 * `useSyncExternalStore` instead of effect + setState. The listener is passive
 * and React only re-renders when the boolean actually flips — not on every
 * scroll event.
 */
export function useScrolledPast(threshold = 24): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    let frame = 0;
    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        onChange();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
