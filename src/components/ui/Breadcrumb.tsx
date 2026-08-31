import Link from "next/link";
import { Icon } from "./Icon";
import type { Crumb } from "@/seo/breadcrumbs";
import { cn } from "@/utils/cn";

export function Breadcrumb({ trail, className }: { trail: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Trilha de navegação" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-fg-soft">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && <Icon name="chevronRight" size={14} className="text-line-strong" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-fg">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-primary hover:underline underline-offset-4">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
