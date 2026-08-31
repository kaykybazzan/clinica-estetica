import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/seo/metadata";
import { termsOfUse } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: termsOfUse.title,
  description: termsOfUse.description,
  path: "/termos-de-uso",
});

export default function TermsPage() {
  return <LegalPage document={termsOfUse} path="/termos-de-uso" />;
}
