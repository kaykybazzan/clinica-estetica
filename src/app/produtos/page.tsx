import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/States";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import { CtaSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { products } from "@/data/products";
import { catalogBrands } from "@/data/catalog";
import { features, isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({ title: "Produtos", description: uiContent.pages.productsDescription, path: "/produtos" });

export default function ProductsPage() {
  if (!isPageEnabled("products")) notFound();
  return (
    <PageWrapper>
      <PageHeader eyebrow="Catálogo" title="Produtos" lead={uiContent.pages.productsLead} trail={[{ label: "Produtos", href: "/produtos" }]} />
      <Section>
        <Container>
          {products.length === 0 ? (
            <EmptyState
              title={uiContent.pages.productsEmptyTitle}
              description={uiContent.pages.productsEmptyDescription}
              action={{ label: "Falar com a equipe", href: "/contato" }}
            />
          ) : (
            <>
              <p className="mb-6 rounded-[var(--radius-brand-sm)] border border-line bg-surface px-4 py-3 text-sm text-fg-soft">
                {uiContent.pages.productsCatalogNotice}
              </p>
              <ProductCatalog
                products={products}
                extraBrands={catalogBrands}
                searchEnabled={features.catalogSearch}
                filtersEnabled={features.catalogFilters}
                brandsEnabled={features.catalogBrands}
              />
            </>
          )}
        </Container>
      </Section>
      <CtaSection />
    </PageWrapper>
  );
}
