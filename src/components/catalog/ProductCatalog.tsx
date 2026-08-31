"use client";

import { useMemo, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatCurrencyBRL } from "@/utils/format";
import { productWhatsAppMessage } from "@/utils/catalog";
import type { Product } from "@/types/content";

interface ProductCatalogProps {
  products: Product[];
  extraBrands?: string[];
  searchEnabled?: boolean;
  filtersEnabled?: boolean;
  brandsEnabled?: boolean;
}

function searchText(product: Product): string {
  return [product.name, product.excerpt, product.category, product.brand, product.sku, ...(product.tags ?? []), ...product.specs.flatMap((spec) => [spec.label, spec.value])]
    .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
}

export function ProductCatalog({ products, extraBrands = [], searchEnabled = true, filtersEnabled = true, brandsEnabled = true }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((product) => product.category).filter((value): value is string => Boolean(value))))], [products]);
  const brands = useMemo(() => Array.from(new Set([...extraBrands, ...products.map((product) => product.brand).filter((value): value is string => Boolean(value))])), [extraBrands, products]);
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => !filtersEnabled || category === "Todos" || product.category === category)
      .filter((product) => !searchEnabled || !normalized || searchText(product).includes(normalized))
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [category, filtersEnabled, products, query, searchEnabled]);

  return <div>
    {(searchEnabled || (filtersEnabled && categories.length > 1)) && <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      {searchEnabled && <label className="relative block"><span className="sr-only">Buscar no catálogo</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busque por produto, categoria, marca ou código…" className="min-h-[var(--nx-control-lg)] w-full rounded-[var(--radius-brand-sm)] border border-line bg-bg px-4 text-[0.95rem] placeholder:text-muted/70 focus:border-primary focus:outline-none" /></label>}
      {filtersEnabled && categories.length > 1 && <div className="scrollbar-none flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filtrar por categoria">
        {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={item === category} className={"min-h-[var(--nx-tap-min)] shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors " + (item === category ? "border-primary bg-primary text-on-primary" : "border-line bg-bg text-fg-soft hover:border-primary hover:text-primary")}>{item}</button>)}
      </div>}
    </div>}
    {brandsEnabled && brands.length > 0 && <div className="mb-8 rounded-[var(--radius-brand)] border border-line bg-surface p-5"><p className="mb-3 text-eyebrow font-bold uppercase tracking-[0.16em] text-fg-soft">Marcas e linhas</p><div className="flex flex-wrap gap-2">{brands.map((brand) => <span key={brand} className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm font-semibold text-fg-soft">{brand}</span>)}</div></div>}
    <div className="mb-4 flex items-center justify-between gap-4 text-sm text-fg-soft" aria-live="polite"><span>{visible.length} {visible.length === 1 ? "item encontrado" : "itens encontrados"}</span>{(query || category !== "Todos") && <button type="button" className="font-semibold text-primary hover:underline" onClick={() => { setQuery(""); setCategory("Todos"); }}>Limpar filtros</button>}</div>
    {visible.length === 0 ? <div className="rounded-[var(--radius-brand)] border border-dashed border-line-strong bg-surface px-6 py-12 text-center"><h2 className="font-heading text-h3 font-semibold">Nenhum produto encontrado</h2><p className="mx-auto mt-2 max-w-xl text-fg-soft">Tente outro termo ou consulte a equipe diretamente.</p><WhatsAppButton className="mt-6" source="catalog-empty">Consultar pelo WhatsApp</WhatsAppButton></div> : <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product) => <li key={product.slug} className="overflow-hidden rounded-[var(--radius-brand)] border border-line bg-bg shadow-soft transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lift">
      <div className="relative"><SmartImage asset={product.image} ratio="1/1" sizes="(max-width: 640px) 100vw, 33vw" />{product.badge && <Badge className="absolute left-4 top-4 shadow-soft">{product.badge}</Badge>}</div>
      <div className="p-5 sm:p-6">{(product.category || product.brand) && <p className="mb-2 text-eyebrow font-bold uppercase tracking-[0.14em] text-fg-soft">{[product.category, product.brand].filter(Boolean).join(" · ")}</p>}<h2 className="font-heading text-h4 font-semibold">{product.name}</h2><p className="mt-2 text-sm text-fg-soft">{product.excerpt}</p>
      <div className="mt-5 min-h-16">{product.compareAtPrice && product.price && product.compareAtPrice > product.price && <p className="text-sm text-muted line-through">{formatCurrencyBRL(product.compareAtPrice)}</p>}{product.price ? <p className="font-heading text-h3 font-bold text-primary">{formatCurrencyBRL(product.price)}</p> : <p className="font-heading text-h4 font-bold text-primary">Consulte</p>}{product.installment && <p className="mt-1 text-xs text-fg-soft">{product.installment}</p>}</div>
      {(product.stockLabel || product.sku) && <div className="mt-3 space-y-1 text-xs text-fg-soft">{product.stockLabel && <p>{product.stockLabel}</p>}{product.sku && <p>Código: {product.sku}</p>}</div>}
      <div className="mt-5 grid gap-2"><WhatsAppButton fullWidth source={`catalog:${product.slug}`} context={{ kind: "custom", message: productWhatsAppMessage(product) }}>Consultar no WhatsApp</WhatsAppButton><Button href={`/produtos/${product.slug}`} variant="outline" fullWidth>Ver detalhes</Button></div></div>
    </li>)}</ul>}
  </div>;
}
