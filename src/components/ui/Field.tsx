import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  className?: string;
}

/** Wires label, hint and error message to the control via aria-describedby. */
export function Field({ id, label, error, hint, required, children, className }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && (
          <span className="text-primary" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-fg-soft">
          {hint}
        </p>
      )}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error && (
        <p id={errorId} className="text-xs font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export const controlClass =
  "w-full rounded-[var(--radius-brand-sm)] border bg-bg px-3.5 py-2.5 text-[0.95rem] " +
  "min-h-[var(--nx-tap-min)] transition-colors duration-[var(--nx-duration-fast)] " +
  "placeholder:text-muted/70 focus:border-primary focus:outline-none";

export function controlClassFor(invalid: boolean): string {
  return cn(controlClass, invalid ? "border-primary" : "border-line");
}
