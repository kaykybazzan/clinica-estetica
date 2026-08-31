import Link from "next/link";
import { clientConfig } from "@/config/client.config";
import { cn } from "@/utils/cn";

export interface LogoProps {
  onDark?: boolean;
  className?: string;
  asText?: boolean;
}

/**
 * Wordmark tipográfico. Projetos sem logo continuam com uma assinatura coerente;
 * quando um SVG real existir, este componente pode ser trocado sem alterar o shell.
 */
export function Logo({ onDark = false, className, asText = false }: LogoProps) {
  const { name } = clientConfig.company;
  const editorial = clientConfig.design.archetype === "luxury" || clientConfig.design.archetype === "editorial";
  const [first, ...rest] = name.split(" ");

  const content = editorial ? (
    <span className={cn("inline-flex items-baseline gap-2", onDark ? "text-on-dark" : "text-fg", className)}>
      <span className="font-heading text-[1.32rem] font-medium uppercase leading-none tracking-[-.04em]">{first}</span>
      {rest.length > 0 && <span className="text-[.58rem] font-bold uppercase tracking-[.22em] text-primary">/ {rest.join(" ")}</span>}
    </span>
  ) : (
    <span className={cn("font-heading text-[1.35rem] font-extrabold leading-none tracking-[-0.03em]", onDark ? "text-on-dark" : "text-fg", className)}>
      {first}{rest.length > 0 && <span className="text-primary"> {rest.join(" ")}</span>}
    </span>
  );

  if (asText) return content;
  return <Link href="/" aria-label={`${name} — página inicial`} className="inline-flex items-center">{content}</Link>;
}
