"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./IconButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Hides the visual title but keeps it for screen readers (lightbox use). */
  hideTitle?: boolean;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, children, hideTitle = false, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  useLockBodyScroll(open);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 20);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      restoreTo.current?.focus?.();
    };
  }, [open, onKeyDown]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[var(--nx-z-modal)] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="nx-anim-overlay absolute inset-0 cursor-default bg-secondary/70 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className={cn(
          "nx-anim-sheet relative max-h-[88vh] w-full max-w-3xl overflow-auto rounded-[var(--radius-brand-lg)] bg-bg p-6 shadow-lift sm:p-8",
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className={cn("font-heading text-h3 font-semibold", hideTitle && "sr-only")}>{title}</h2>
          <IconButton icon="close" label="Fechar" onClick={onClose} variant="ghost" className="-mr-2 -mt-2" />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
