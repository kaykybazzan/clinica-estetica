import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Gallery02 } from "@/sections/gallery/Gallery02";
import { CtaSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Galeria",
  description: uiContent.pages.galleryDescription,
  path: "/galeria",
});

export default function GalleryPage() {
  if (!isPageEnabled("gallery")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Galeria"
        title="Veja com seus olhos"
        lead={uiContent.pages.galleryLead}
        trail={[{ label: "Galeria", href: "/galeria" }]}
      />
      {/* The full page always uses the filterable variant, regardless of the
          variant chosen for the home section. */}
      <Gallery02 title="Todas as fotos" eyebrow="" lead="" />
      <CtaSection />
    </PageWrapper>
  );
}
