import type { MetadataRoute } from "next";
import { clientConfig } from "@/config/client.config";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/utils/url";

/** Only routes that are actually enabled are listed — no orphan URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { pages } = clientConfig;
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
  ];

  const push = (path: string, priority: number) =>
    entries.push({ url: absoluteUrl(path), changeFrequency: "monthly", priority });

  if (pages.about) push("/sobre", 0.7);
  if (pages.services) {
    push("/servicos", 0.9);
    for (const service of services) push(`/servicos/${service.slug}`, 0.8);
  }
  if (pages.products) {
    push("/produtos", 0.8);
    for (const product of products) push(`/produtos/${product.slug}`, 0.7);
  }
  if (pages.projects) {
    push("/projetos", 0.6);
    for (const project of projects) push(`/projetos/${project.slug}`, 0.5);
  }
  if (pages.gallery) push("/galeria", 0.5);
  if (pages.testimonials) push("/depoimentos", 0.5);
  if (pages.faq) push("/faq", 0.6);
  if (pages.contact) push("/contato", 0.8);

  push("/politica-de-privacidade", 0.2);
  push("/politica-de-cookies", 0.2);
  push("/termos-de-uso", 0.2);

  return entries;
}
