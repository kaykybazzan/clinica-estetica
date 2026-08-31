import { clientConfig } from "@/config/client.config";

export const alt = `${clientConfig.company.name} — ${clientConfig.company.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Temporarily disabled due to @vercel/og compatibility issue with Next.js 16
// TODO: Re-enable when library is updated or find alternative solution
export default function OpenGraphImage() {
  return new Response("OpenGraph image temporarily disabled", { status: 503 });
}
