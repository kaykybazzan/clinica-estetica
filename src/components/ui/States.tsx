import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { Button } from "./Button";
import { cn } from "@/utils/cn";

export function Loading({ label = "Carregando", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-12 text-fg-soft", className)} role="status">
      <span className="nx-anim-spin inline-block size-5 rounded-full border-2 border-line border-t-primary" />
      <span className="text-sm">{label}…</span>
    </div>
  );
}

interface StateProps {
  title: string;
  description: string;
  icon?: IconName;
  action?: { label: string; href: string };
  children?: ReactNode;
  className?: string;
}

/** Empty screens are an invitation to act, so they always carry the next step. */
export function EmptyState({ title, description, icon = "search", action, children, className }: StateProps) {
  return (
    <div className={cn("mx-auto max-w-md py-14 text-center", className)}>
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-surface text-fg-soft">
        <Icon name={icon} size={22} />
      </span>
      <p className="font-heading text-h4 font-semibold">{title}</p>
      <p className="mt-2 text-fg-soft">{description}</p>
      {action && (
        <Button href={action.href} variant="outline" size="sm" className="mt-6">
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}

/** States what happened and how to fix it. Never apologizes, never stays vague. */
export function ErrorState({ title, description, action, className }: StateProps) {
  return (
    <div className={cn("mx-auto max-w-md py-14 text-center", className)} role="alert">
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name="shield" size={22} />
      </span>
      <p className="font-heading text-h4 font-semibold">{title}</p>
      <p className="mt-2 text-fg-soft">{description}</p>
      {action && (
        <Button href={action.href} variant="primary" size="sm" className="mt-6">
          {action.label}
        </Button>
      )}
    </div>
  );
}
