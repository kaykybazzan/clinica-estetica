import { clientConfig } from "./client.config";
import { clientConfigSchema } from "./client.schema";

/**
 * Runs once, on the server, when the root layout is first rendered.
 * Imported only from a Server Component, so Zod never reaches the browser
 * bundle. A malformed config fails the build instead of shipping a broken site.
 */
const result = clientConfigSchema.safeParse(clientConfig);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `  · ${issue.path.join(".") || "(raiz)"}: ${issue.message}`)
    .join("\n");
  const message = `client.config.ts inválido:\n${details}`;

  if (process.env.NODE_ENV === "production") throw new Error(message);
  console.error(`\n\u001b[31m[NEXORA]\u001b[0m ${message}\n`);
}

export const configIsValid = result.success;
