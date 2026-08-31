import { JsonLd } from "@/seo/JsonLd";
import { homeGraph } from "@/seo/schema";
import { buildMetadata } from "@/seo/metadata";
import { clientConfig } from "@/config/client.config";
import { PageComposer } from "@/platform/composition/PageComposer";
import { PageWrapper } from "@/components/ui/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: clientConfig.seo.defaultTitle,
  description: clientConfig.seo.description,
  path: "/",
  keywords: clientConfig.seo.keywords,
});

/**
 * NEXORA v3: this route is intentionally boring. The client's narrative lives
 * in `clientConfig.composition.home` and is rendered by PageComposer.
 */
export default function HomePage() {
  return (
    <PageWrapper>
      <PageComposer />
      <JsonLd data={homeGraph()} id="nx-home-graph" />
    </PageWrapper>
  );
}
