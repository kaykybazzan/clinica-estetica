import type { SVGProps } from "react";

/**
 * Self-contained icon set. Chosen over lucide-react/react-icons because the base
 * needs ~30 glyphs: shipping a whole icon package would add a dependency, a
 * bundle-size risk and a licensing surface for a file that is 4 KB of markup.
 * All icons share a 24x24 grid and inherit `currentColor`.
 */
const PATHS = {
  wrench: "M15.5 3.5a5 5 0 0 0-6.2 6.6L3 16.4 7.6 21l6.3-6.3a5 5 0 0 0 6.6-6.2l-3.1 3.1-2.8-.7-.7-2.8z",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  gauge: "M12 14.5V9m0 11a8 8 0 1 1 8-8m-3.2 5.7L20 20",
  battery: "M3 8h13v8H3zM19 11v2M16 8h3v8h-3M6 12h4",
  snowflake: "M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17M12 6l2.5-2.5M12 6 9.5 3.5M12 18l2.5 2.5M12 18l-2.5 2.5",
  shield: "M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6z",
  clock: "M12 7v5l3.2 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  check: "m4.5 12.5 5 5 10-11",
  checkCircle: "M9 12.5l2.2 2.2L15.5 10M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  arrowRight: "M4 12h15m0 0-6-6m6 6-6 6",
  arrowUp: "M12 20V5m0 0-6 6m6-6 6 6",
  arrowUpRight: "M7 17 17 7m0 0H8m9 0v9",
  phone: "M4 5c0-1 .8-2 1.8-2h2L9.5 8 7.8 9.6a12 12 0 0 0 6.6 6.6L16 14.5l5 1.7v2c0 1-1 1.8-2 1.8A15 15 0 0 1 4 5Z",
  whatsapp:
    "M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.4zM9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1.3-.4 1.3-1.1l-.1-.9-1.9-.7-.9 1a5.6 5.6 0 0 1-2.2-2.2l1-.9-.7-1.9-.9-.1c-.7 0-1.1.7-1.1 1.3Z",
  mail: "M3 7h18v10H3zM3 7l9 6 9-6",
  mapPin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  chevronDown: "m6 9 6 6 6-6",
  chevronLeft: "m15 6-6 6 6 6",
  chevronRight: "m9 6 6 6-6 6",
  star: "m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z",
  quote: "M9 6c-3 1.4-4.5 3.8-4.5 7.2V18h6v-6H7c0-1.9.7-3.3 2-4.2zm10 0c-3 1.4-4.5 3.8-4.5 7.2V18h6v-6H17c0-1.9.7-3.3 2-4.2z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "m20 20-3.5-3.5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  calendar: "M4 7h16v13H4zM8 3v4M16 3v4M4 11h16",
  users: "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M9 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4a3.5 3.5 0 0 1 0 6.8M22 20v-1.5a4 4 0 0 0-3-3.8",
  award: "M12 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  target: "M12 12h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-4.5 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z",
  layers: "m12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6.5h.01",
  facebook: "M14 8.5V7c0-.8.5-1.2 1.2-1.2H17V3h-2.5C12 3 10.5 4.6 10.5 7v1.5H8V12h2.5v9H14v-9h2.6l.4-3.5z",
  linkedin: "M5 9v12M5 5.5h.01M10 21V9m0 4.5c0-2 1.4-3.5 3.5-3.5S17 11.5 17 14v7",
  youtube: "M3 8.5A3 3 0 0 1 6 5.5h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10.5 9.5v5l4.5-2.5z",
  tiktok: "M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.6 2.6 2.4 4.2 5 4.4",
  paw: "M6.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-2 4c-3 0-5 2.2-5 4.6C7 18.6 9 20 12 20s5-1.4 5-3.9c0-2.4-2-4.6-5-4.6Z",
  utensils: "M6 3v8a2 2 0 0 0 4 0V3M8 11v10M17 3c-1.7 1-2.5 3-2.5 5.5S15.3 13 17 13.5V21",
  leaf: "M20 4C10 4 4 8.5 4 15c0 2 .6 3.7 1.6 5C7 17 10.5 14 15 12.5 11 15 8 18 7 21c9 1 13-4.5 13-17Z",
  factory: "M3 21V10l6 4V10l6 4V6h6v15zM7 21v-3M12 21v-3M17 21v-3",
  home: "M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z",
  scale: "M12 4v17M7 21h10M12 6 5 9l-2 5a4 4 0 0 0 8 0zM12 6l7 3 2 5a4 4 0 0 1-8 0z",
  heart: "M12 20S4 15.5 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8C20 15.5 12 20 12 20Z",
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  image: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6M8.5 9.5h.01",
  fileText: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  headset: "M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2zM18 18v1a3 3 0 0 1-3 3h-3",
} as const;

export type IconName = keyof typeof PATHS;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  /** Icons are decorative by default; pass a label when the icon is the only content. */
  label?: string;
}

export function Icon({ name, size = 24, label, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export const iconNames = Object.keys(PATHS) as IconName[];
