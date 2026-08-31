import { clientConfig } from "./client.config";
import { primaryNav } from "@/data/navigation";
import type { NavItem } from "@/types/content";

export const features = clientConfig.features;
export const pages = clientConfig.pages;

/** Menu entries whose page was switched off simply do not exist. */
export const visibleNav: NavItem[] = primaryNav.filter(
  (item) => !item.requires || pages[item.requires],
);

/** Guard used by disabled routes to return a 404 instead of a thin page. */
export function isPageEnabled(page: keyof typeof pages): boolean {
  return pages[page];
}
