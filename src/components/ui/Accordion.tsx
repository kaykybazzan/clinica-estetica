"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render. Use 0 for FAQs so the block never looks empty. */
  defaultOpen?: number | null;
  /** When false, several panels can stay open at the same time. */
  single?: boolean;
  tone?: "default" | "dark";
  className?: string;
}

export function Accordion({ items, defaultOpen = 0, single = true, tone = "default", className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen]);

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (single) return isOpen ? [] : [index];
      return isOpen ? current.filter((i) => i !== index) : [...current, index];
    });
  };

  const dark = tone === "dark";

  return (
    <div className={cn("divide-y", dark ? "divide-white/10" : "divide-line", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-5 text-left font-heading text-h4 font-semibold",
                  "transition-colors duration-[var(--nx-duration-fast)]",
                  dark ? "text-on-dark hover:text-accent" : "hover:text-primary",
                )}
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-[var(--nx-duration)] ease-brand-out",
                    dark ? "bg-white/10 text-on-dark" : "bg-surface text-primary",
                    isOpen && "rotate-180",
                  )}
                >
                  <Icon name="chevronDown" size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn("pb-6 pr-12 leading-relaxed", dark ? "text-on-dark-muted" : "text-fg-soft")}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
