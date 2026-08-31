"use client";

import { Icon } from "./Icon";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { cn } from "@/utils/cn";

export function BackToTop({ offsetForWhatsApp = false }: { offsetForWhatsApp?: boolean }) {
  const visible = useScrolledPast(900);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-5 z-[var(--nx-z-floating)] grid size-11 place-items-center rounded-full",
        "border border-line bg-bg text-fg shadow-soft transition-[opacity,transform] duration-[var(--nx-duration)] ease-brand-out hover:border-primary hover:text-primary",
        offsetForWhatsApp ? "bottom-24" : "bottom-5",
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
