import { clientConfig } from "@/config/client.config";
import type { SocialLink } from "@/types/content";

const CATALOG: { key: keyof typeof clientConfig.social; label: string; icon: SocialLink["icon"] }[] = [
  { key: "instagram", label: "Instagram", icon: "instagram" },
  { key: "facebook", label: "Facebook", icon: "facebook" },
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "youtube", label: "YouTube", icon: "youtube" },
  { key: "tiktok", label: "TikTok", icon: "tiktok" },
  { key: "googleBusiness", label: "Google", icon: "mapPin" },
];

/** Only networks that were actually filled in reach the UI — no dead links. */
export const socialLinks: SocialLink[] = CATALOG.filter(
  (entry) => clientConfig.social[entry.key].length > 0,
).map((entry) => ({
  label: entry.label,
  href: clientConfig.social[entry.key],
  icon: entry.icon,
}));
