import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/seo/metadata";
import { cookiePolicy } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: "/politica-de-cookies",
});

export default function CookiesPage() {
  return <LegalPage document={cookiePolicy} path="/politica-de-cookies" />;
}
