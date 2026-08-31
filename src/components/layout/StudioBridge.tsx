"use client";

import { useEffect } from "react";

interface StudioMessage {
  type: "nexora:studio";
  design?: Record<string, unknown>;
  order?: string[];
  hidden?: string[];
}

export function StudioBridge() {
  useEffect(() => {
    function onMessage(event: MessageEvent<StudioMessage>) {
      if (event.origin !== window.location.origin || event.data?.type !== "nexora:studio") return;
      const { design, order = [], hidden = [] } = event.data;
      const root = document.documentElement;
      const map: Record<string, string> = {
        primaryColor: "--nx-primary",
        secondaryColor: "--nx-secondary",
        accentColor: "--nx-accent",
        backgroundColor: "--nx-bg",
        surfaceColor: "--nx-surface",
        foregroundColor: "--nx-fg",
        mutedColor: "--nx-muted",
        borderColor: "--nx-border",
      };
      if (design) {
        for (const [key, cssVar] of Object.entries(map)) {
          const value = design[key];
          if (typeof value === "string") root.style.setProperty(cssVar, value);
        }
        if (typeof design.radius === "number") root.style.setProperty("--nx-radius", `${design.radius}px`);
      }

      const main = document.querySelector("main#conteudo");
      if (!main) return;
      const hiddenSet = new Set(hidden);
      for (const id of order) {
        const element = document.getElementById(id);
        if (!element || element.parentElement !== main) continue;
        element.style.display = hiddenSet.has(id) ? "none" : "";
        main.appendChild(element);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  return null;
}
