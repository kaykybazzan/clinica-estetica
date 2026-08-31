"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode, ComponentProps } from "react";

export interface TransitionLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    const hrefString = href.toString();

    // Se for link interno (#âncora), permite o comportamento nativo de rolagem
    if (hrefString.startsWith("#")) {
      return;
    }

    // Se for link externo ou nova aba, abre nativamente
    if (hrefString.startsWith("http") || props.target === "_blank") {
      return;
    }

    e.preventDefault();
    router.push(hrefString);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
