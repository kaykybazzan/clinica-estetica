import type { JsonLdObject } from "./schema";

/**
 * Renders structured data. `<` is escaped so a stray character in client copy
 * can never break out of the script tag — the only XSS surface JSON-LD has.
 */
export function JsonLd({ data, id }: { data: JsonLdObject; id?: string }) {
  const json = JSON.stringify(data, (_key, value) => (value === undefined ? undefined : value)).replace(
    /</g,
    "\\u003c",
  );

  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
