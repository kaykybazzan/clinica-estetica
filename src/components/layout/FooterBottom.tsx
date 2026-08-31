import Link from "next/link";
import { clientConfig } from "@/config/client.config";
import { legalNav } from "@/data/navigation";
import { nexora } from "@/config/site";
import { cn } from "@/utils/cn";
import { CookiePreferencesButton } from "@/components/ui/CookiePreferencesButton";

/** Shared bottom bar so the four footer variants never drift on legal links. */
export function FooterBottom({ onDark = false }: { onDark?: boolean }) {
  const year = new Date().getFullYear();
  const { company } = clientConfig;
  const muted = onDark ? "text-on-dark-muted" : "text-fg-soft";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between",
        onDark ? "border-white/10" : "border-line",
      )}
    >
      <p className={muted}>
        © {year} {company.legalName || company.name}
        {company.cnpj && ` · CNPJ ${company.cnpj}`}
      </p>

      <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", muted)}>
        {legalNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:underline underline-offset-4">
              {item.label}
            </Link>
          </li>
        ))}
        {clientConfig.features.cookieBanner && (
          <li>
            <CookiePreferencesButton />
          </li>
        )}
        {nexora.showFooterCredit && (
          <li>
            {nexora.url ? (
              <a
                href={nexora.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4"
              >
                {nexora.creditLabel}
              </a>
            ) : (
              <span>{nexora.creditLabel}</span>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
