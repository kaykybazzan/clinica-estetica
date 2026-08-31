import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  label: string;
  href: string;
  /** Set when the entry must disappear if a page/feature is turned off. */
  requires?: keyof import("@/config/client.schema").ClientPages;
  children?: NavItem[];
}

export interface MediaAsset {
  src: string;
  /** Never leave empty on meaningful images. Use "" only for decoration. */
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  icon: IconName;
  image: MediaAsset;
  deliverables: string[];
  /** Shown as "a partir de" — omit when the client does not publish prices. */
  startingAt?: number;
  featured?: boolean;
}

export interface Benefit {
  title: string;
  description: string;
  icon: IconName;
}

export interface Stat {
  /** Numeric part, animated by the counter. */
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: MediaAsset;
  source?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: MediaAsset;
}

export interface Product {
  slug: string;
  name: string;
  excerpt: string;
  description: string;
  /** Optional catalog grouping used by filters, e.g. Hardware or Rações. */
  category?: string;
  price?: number;
  /** Previous/reference price. Show only when it is real and current. */
  compareAtPrice?: number;
  badge?: string;
  installment?: string;
  stockLabel?: string;
  tags?: string[];
  featured?: boolean;
  /** Set only when stock status is actually known; omitted from Schema otherwise. */
  availability?: "InStock" | "OutOfStock" | "PreOrder" | "BackOrder" | "Discontinued";
  sku?: string;
  brand?: string;
  image: MediaAsset;
  specs: { label: string; value: string }[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: MediaAsset;
}

export interface GalleryItem {
  image: MediaAsset;
  caption: string;
  category: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}
