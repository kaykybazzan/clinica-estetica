import { clientConfig } from "@/config/client.config";

const hits = new Map<string, { count: number; resetAt: number }>();
let lastSweep = 0;

/**
 * In-process guard. Production deployments should additionally enforce an edge
 * rate limit/WAF rule; this layer is intentionally dependency-free and remains
 * useful in local, Node and single-instance deployments.
 */
export function isRateLimited(key: string): boolean {
  const config = clientConfig.forms?.contact?.rateLimit ?? { requests: 5, windowSeconds: 60 };
  const windowMs = config.windowSeconds * 1000;
  const now = Date.now();

  if (now - lastSweep > windowMs) {
    for (const [entryKey, value] of hits) if (now > value.resetAt) hits.delete(entryKey);
    lastSweep = now;
  }

  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > config.requests;
}
