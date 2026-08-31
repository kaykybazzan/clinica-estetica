import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/utils/cn";

const TONES = {
  primary: "bg-primary-soft text-primary",
  neutral: "bg-surface text-fg-soft border border-line",
  dark: "bg-white/10 text-on-dark",
  accent: "bg-accent-soft text-fg",
} as const;

export function Badge({
  children,
  tone = "primary",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  icon?: IconName;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow font-semibold",
        TONES[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
