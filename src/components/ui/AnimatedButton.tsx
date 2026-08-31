import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/utils/cn";

const VARIANTS = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-strong shadow-soft hover:shadow-lift",
  secondary: "bg-secondary text-on-dark hover:opacity-90",
  outline: "border border-line-strong text-fg hover:border-primary hover:text-primary bg-transparent",
  ghost: "text-fg hover:bg-secondary-soft bg-transparent",
  light: "bg-bg text-fg hover:bg-surface shadow-soft",
  accent: "bg-accent text-secondary hover:brightness-105",
} as const;

const SIZES = {
  sm: "h-[var(--nx-control-sm)] px-4 text-sm gap-1.5",
  md: "h-[var(--nx-control-md)] px-5 text-[0.95rem] gap-2",
  lg: "h-[var(--nx-control-lg)] px-7 text-base gap-2.5",
} as const;

type BaseProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  icon?: IconName;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  className?: string;
};

export type AnimatedButtonProps = BaseProps & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

const base =
  "inline-flex items-center justify-center rounded-[var(--nx-button-radius)] font-semibold " +
  "relative overflow-hidden " +
  "transition-[background-color,color,box-shadow,border-color,transform] duration-[var(--nx-duration-fast)] " +
  "ease-brand active:scale-95 hover:-translate-y-0.5 hover:shadow-md hover:shadow-lg " +
  "disabled:pointer-events-none disabled:opacity-55 " +
  "min-h-[var(--nx-tap-min)] whitespace-nowrap " +
  "before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full " +
  "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent " +
  "before:transition-transform before:duration-1000 before:ease-in-out";

/**
 * Botão interativo com efeitos de shimmer/glossy e feedback tátil.
 * Inclui elevação no hover e escala ao clicar.
 */
export function AnimatedButton(props: AnimatedButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "end",
    fullWidth,
    className,
    ...rest
  } = props;

  const classes = cn(base, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
  const content = (
    <>
      {icon && iconPosition === "start" && <Icon name={icon} size={18} />}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} size={18} />}
    </>
  );

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
