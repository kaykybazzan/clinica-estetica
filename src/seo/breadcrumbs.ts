export interface Crumb {
  label: string;
  href: string;
}

/** Home is always the first crumb, so pages only declare their own trail. */
export function withHome(trail: Crumb[]): Crumb[] {
  return [{ label: "Início", href: "/" }, ...trail];
}
