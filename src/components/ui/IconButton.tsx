import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/utils/cn";

const VARIANTS = {
  solid: "bg-primary text-on-primary hover:bg-primary-strong",
  outline: "border border-line-strong text-fg hover:border-primary hover:text-primary",
  ghost: "text-fg hover:bg-secondary-soft",
  onDark: "text-on-dark hover:bg-white/10",
} as const;

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  icon: IconName;
  /** Required: an icon-only control must announce itself. */
  label: string;
  variant?: keyof typeof VARIANTS;
  size?: number;
  className?: string;
}

export function IconButton({ icon, label, variant = "ghost", size = 20, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-[var(--nx-tap-min)] items-center justify-center rounded-[var(--radius-brand-sm)]",
        "transition-colors duration-[var(--nx-duration-fast)] ease-brand",
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  );
}
