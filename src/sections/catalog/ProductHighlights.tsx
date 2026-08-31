import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { features, pages } from "@/config/features";
import { formatCurrencyBRL } from "@/utils/format";
export function ProductHighlightsSection({ limit = 4, id }: { limit?: number; id?: string }) {
  if (!features.products || !pages.products || products.length === 0) return null;
  const highlighted = [...products].sort((a,b) => Number(Boolean(b.featured))-Number(Boolean(a.featured))).slice(0,limit);
  return <Section id={id} tone="surface"><Container><SectionHeader eyebrow="Catálogo" title="Produtos em destaque" lead="Encontre os principais itens e consulte disponibilidade, compatibilidade e condições com a equipe." /><ul className="mt-[var(--nx-block-gap)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{highlighted.map((product) => <li key={product.slug} className="overflow-hidden rounded-[var(--radius-brand)] border border-line bg-bg shadow-soft"><Link href={`/produtos/${product.slug}`} className="group block"><div className="relative"><SmartImage asset={product.image} ratio="1/1" sizes="(max-width: 640px) 100vw, 25vw" />{product.badge && <Badge className="absolute left-3 top-3">{product.badge}</Badge>}</div><div className="p-5">{product.category && <p className="text-eyebrow font-bold uppercase tracking-[0.14em] text-fg-soft">{product.category}</p>}<h3 className="mt-1 font-heading text-h4 font-semibold transition-colors group-hover:text-primary">{product.name}</h3><p className="mt-2 text-sm text-fg-soft">{product.excerpt}</p><p className="mt-4 font-heading text-h4 font-bold text-primary">{product.price ? formatCurrencyBRL(product.price) : "Consulte"}</p></div></Link></li>)}</ul><div className="mt-8 flex justify-center"><Button href="/produtos" variant="outline" icon="arrowRight">Ver catálogo completo</Button></div></Container></Section>;
}
