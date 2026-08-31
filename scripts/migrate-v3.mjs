#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(ROOT, "src/config/client.config.ts");
if (!existsSync(configPath)) throw new Error("src/config/client.config.ts não encontrado.");
let source = readFileSync(configPath, "utf8");
if (/platformVersion\s*:\s*["']3\./.test(source)) {
  console.log("[NEXORA] Projeto já declara platformVersion 3.x. Nada a migrar.");
  process.exit(0);
}

const templateId = (() => {
  const segment = source.match(/segment\s*:\s*["']([^"']+)/)?.[1] ?? "local-business";
  const businesses = JSON.parse(readFileSync(join(ROOT, "src/config/presets/business-presets.json"), "utf8"));
  return businesses.find((x) => x.id === segment)?.template ?? "local";
})();
const template = JSON.parse(readFileSync(join(ROOT, `templates/${templateId}.json`), "utf8"));
const backupDir = join(ROOT, ".backup");
mkdirSync(backupDir, { recursive: true });
const backup = join(backupDir, `client.config.pre-v3.${Date.now()}.ts`);
copyFileSync(configPath, backup);

source = source.replace(/export const clientConfig[^=]*=\s*\{/, (m) => `${m}\n  platformVersion: "3.0.0",`);
if (!/\n\s*strategy\s*:/.test(source)) source = source.replace(/\n\s*design\s*:/, `\n\n  strategy: ${JSON.stringify(template.strategy, null, 2)},\n\n  design:`);
if (!/\n\s*composition\s*:/.test(source)) source = source.replace(/\n\s*features\s*:/, `\n\n  composition: ${JSON.stringify(template.composition, null, 2)},\n\n  features:`);
if (!/mobileConversionBar\s*:/.test(source)) source = source.replace(/catalogBrands\s*:\s*(true|false),?/, (m) => `${m.replace(/,$/, "")},\n    mobileConversionBar: true,`);
if (!/\n\s*mobileConversion\s*:/.test(source)) {
  source = source.replace(/\n\s*seo\s*:/, `\n\n  mobileConversion: { enabled: true, actions: ["whatsapp", "phone"] },\n  forms: { contact: { enabled: true, delivery: ["resend", "webhook"], maxBodyBytes: 32768, rateLimit: { requests: 5, windowSeconds: 60 } } },\n\n  seo:`);
}
writeFileSync(configPath, source, "utf8");
console.log(`[NEXORA] Migração v3 aplicada. Backup: ${backup.replace(ROOT + "/", "")}`);
