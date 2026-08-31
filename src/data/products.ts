import type { Product } from "@/types/content";
export const products: Product[] = [];
export const featuredProducts = products.filter((item) => item.featured);
export function getProductBySlug(slug: string){ return products.find((item)=>item.slug===slug); }
