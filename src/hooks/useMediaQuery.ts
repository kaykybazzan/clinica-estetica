"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query.
 *
 * `useSyncExternalStore` is the right primitive here: matchMedia IS an external
 * store. Reading it through an effect + setState would cause a cascading render
 * on every mount and is flagged by react-hooks/set-state-in-effect.
 * The server snapshot is always `false`, so the markup never mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
