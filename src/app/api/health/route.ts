import { NextResponse } from "next/server";
import { BASE_VERSION } from "@/config/site";
import { clientConfig } from "@/config/client.config";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    platform: "nexora-website-platform",
    version: BASE_VERSION,
    client: clientConfig.slug,
    now: new Date().toISOString(),
  }, { headers: { "Cache-Control": "no-store" } });
}
