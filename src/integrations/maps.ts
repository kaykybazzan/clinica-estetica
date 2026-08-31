import { clientConfig } from "@/config/client.config";
import { formatFullAddress } from "@/utils/format";

function query(): string {
  const { address } = clientConfig;
  return address.mapsEmbedQuery.trim() || formatFullAddress(address);
}

/**
 * Keyless Google Maps embed. Chosen over the Maps JavaScript API because it
 * needs no billing account, adds no JS to the bundle and can be lazy-loaded —
 * the brief requires the base to avoid paid API dependencies.
 */
export function mapsEmbedSrc(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query())}&output=embed`;
}

export function mapsDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query())}`;
}
