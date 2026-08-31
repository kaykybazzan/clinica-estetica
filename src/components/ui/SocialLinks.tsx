import { Icon } from "./Icon";
import { socialLinks } from "@/data/social";
import { cn } from "@/utils/cn";

export function SocialLinks({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  if (socialLinks.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "inline-flex size-[var(--nx-tap-min)] items-center justify-center rounded-full border transition-colors duration-[var(--nx-duration-fast)]",
              onDark
                ? "border-white/15 text-on-dark hover:border-white/40 hover:bg-white/10"
                : "border-line text-fg-soft hover:border-primary hover:text-primary",
            )}
          >
            <Icon name={link.icon} size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
