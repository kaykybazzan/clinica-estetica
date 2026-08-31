import type { MetadataRoute } from "next";
import { clientConfig } from "@/config/client.config";

export default function manifest(): MetadataRoute.Manifest {
  const { company, design, seo } = clientConfig;

  return {
    name: `${company.name} — ${seo.defaultTitle}`,
    short_name: company.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: design.backgroundColor,
    theme_color: design.primaryColor,
    icons: [
      { src: "/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
