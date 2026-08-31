import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/seo/JsonLd";
import { productSchema } from "@/seo/schema";
import { buildMetadata } from "@/seo/metadata";
import { getProductBySlug, products } from "@/data/products";
import { formatCurrencyBRL } from "@/utils/format";
import { productWhatsAppMessage } from "@/utils/catalog";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";
interface PageProps { params: Promise<{ slug: string }>; }
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { slug } = await params; const product = getProductBySlug(slug); if (!product) return buildMetadata({ title: "Produto não encontrado", description: "", path: "/produtos", noindex: true }); return buildMetadata({ title: product.name, description: product.excerpt, path: `/produtos/${product.slug}`, image: product.image.src }); }
export default async function ProductDetailPage({ params }: PageProps) {
  if (!isPageEnabled("products")) notFound(); const { slug } = await params; const product = getProductBySlug(slug); if (!product) notFound();
  return <><PageHeader eyebrow={product.category || "Produto"} title={product.name} lead={product.excerpt} trail={[{ label: "Produtos", href: "/produtos" },{ label: product.name, href: `/produtos/${product.slug}` }]} />
  <Section><Container><div className="grid gap-12 lg:grid-cols-2 lg:gap-16"><div className="relative"><SmartImage asset={product.image} ratio="1/1" priority sizes="(max-width: 1024px) 100vw, 520px" className="rounded-[var(--radius-brand-lg)]" />{product.badge && <Badge className="absolute left-5 top-5 shadow-soft">{product.badge}</Badge>}</div><div>
  {(product.brand || product.sku) && <p className="mb-3 text-eyebrow font-bold uppercase tracking-[0.15em] text-fg-soft">{[product.brand, product.sku ? `Cód. ${product.sku}` : ""].filter(Boolean).join(" · ")}</p>}
  {product.compareAtPrice && product.price && product.compareAtPrice > product.price && <p className="text-sm text-muted line-through">{formatCurrencyBRL(product.compareAtPrice)}</p>}
  {product.price ? <p className="font-heading text-h1 font-bold text-primary">{formatCurrencyBRL(product.price)}</p> : <p className="font-heading text-h2 font-bold text-primary">Preço sob consulta</p>}
  {product.installment && <p className="mt-1 text-sm text-fg-soft">{product.installment}</p>}{product.stockLabel && <p className="mt-4 inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-fg-soft">{product.stockLabel}</p>}<p className="mt-6 text-fg-soft">{product.description}</p>
  {product.specs.length > 0 && <dl className="mt-8 divide-y divide-line border-y border-line">{product.specs.map((spec) => <div key={spec.label} className="flex items-baseline justify-between gap-4 py-3.5"><dt className="text-sm font-semibold">{spec.label}</dt><dd className="text-right text-sm text-fg-soft">{spec.value}</dd></div>)}</dl>}
  <WhatsAppButton size="lg" className="mt-8" source={`product-page:${product.slug}`} context={{ kind: "custom", message: productWhatsAppMessage(product) }}>{uiContent.pages.productDetail.availabilityCta}</WhatsAppButton><p className="mt-4 max-w-xl text-xs text-muted">{uiContent.pages.productsCatalogNotice}</p>
  </div></div></Container></Section><JsonLd data={productSchema(product)} id="nx-product" /></>;
}
