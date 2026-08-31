import { logInfo } from "@/observability/log";

/** Entry point recognized by Next.js. Add an OTEL SDK here without touching app code. */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logInfo("platform.register", { runtime: process.env.NEXT_RUNTIME, deployment: process.env.VERCEL_ENV ?? "local" });
  }
}
