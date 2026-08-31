import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/seo/metadata";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/politica-de-privacidade",
});

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} path="/politica-de-privacidade" />;
}
