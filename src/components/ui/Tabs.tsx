"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Follows the ARIA tabs pattern, including arrow-key roving focus. */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = (active + delta + items.length) % items.length;
    setActive(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={onKeyDown}
        className="scrollbar-none flex gap-1 overflow-x-auto border-b border-line"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-[var(--nx-duration-fast)]",
              index === active
                ? "border-primary text-primary"
                : "border-transparent text-fg-soft hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="pt-6"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
