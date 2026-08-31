"use client";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/content";
import { cn } from "@/utils/cn";

export function Navbar({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className={className}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center rounded-[var(--radius-brand-sm)] px-3 text-[0.94rem] font-medium",
                  "transition-colors duration-[var(--nx-duration-fast)] hover:text-primary",
                  active ? "text-primary" : "text-fg",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-primary transition-transform duration-[var(--nx-duration)] ease-brand-out",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
