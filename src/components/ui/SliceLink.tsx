"use client";

import type { ReactNode, AnchorHTMLAttributes } from "react";
import { useSliceTransition } from "./SliceTransitionContext";
import { cn } from "@/utils/cn";

export interface SliceLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Link interno que aciona a transição de fatias verticais (cortina/onda).
 * Filtra links de âncora e externos, usando navegação normal para esses casos.
 */
export function SliceLink({ href, children, className, onClick, target, ...rest }: SliceLinkProps) {
  const { navigateWithSlice, isTransitioning } = useSliceTransition();

  // Não aplicar transição em links de âncora ou externos
  const shouldSkipTransition = href.startsWith("#") || target === "_blank" || href.startsWith("http");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldSkipTransition || isTransitioning) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);
    navigateWithSlice(href);
  };

  if (shouldSkipTransition) {
    return (
      <a href={href} onClick={onClick} target={target} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(isTransitioning && "pointer-events-none", className)}
      {...rest}
    >
      {children}
    </a>
  );
}
