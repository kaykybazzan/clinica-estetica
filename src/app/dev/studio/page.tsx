import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { clientConfig } from "@/config/client.config";
import { StudioClient } from "./StudioClient";

export const metadata: Metadata = { title: "Nexora Studio", robots: { index: false, follow: false } };

export default function StudioPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <StudioClient initialDesign={clientConfig.design} initialBlocks={clientConfig.composition.home} />;
}
