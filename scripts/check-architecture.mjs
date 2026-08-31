#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const roots = ["src/app", "src/components", "src/sections", "src/platform", "src/forms", "src/seo", "src/integrations"];
const errors = [];
const warnings = [];
const rawHex = /#[0-9a-fA-F]{6}\b/g;

function walk(rel, out = []) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    const full = join(abs, name);
    const child = relative(ROOT, full).replaceAll("\\", "/");
    if (statSync(full).isDirectory()) walk(child, out);
    else if (/\.(ts|tsx|js|jsx|css)$/.test(name)) out.push(child);
  }
  return out;
}

for (const root of roots) {
  for (const file of walk(root)) {
    const source = readFileSync(join(ROOT, file), "utf8");
    if (/\<img\b/i.test(source)) errors.push(`${file}: use SmartImage/next/image em vez de <img>.`);
    if (/https?:\/\/wa\.me\/\d+/i.test(source)) errors.push(`${file}: WhatsApp hardcoded; use integrations/whatsapp.`);
    if (/tel:\+?\d{8,}/i.test(source)) errors.push(`${file}: telefone hardcoded.`);
    if (/NEXT_PUBLIC_[A-Z0-9_]*(SECRET|TOKEN|PASSWORD|PRIVATE|API_KEY)/.test(source)) errors.push(`${file}: possível segredo exposto em NEXT_PUBLIC_*.`);
    if (!file.endsWith("JsonLd.tsx") && !file.endsWith("layout.tsx") && /dangerouslySetInnerHTML/.test(source)) warnings.push(`${file}: dangerouslySetInnerHTML requer revisão manual.`);
    if (!file.includes("src/config/") && !file.includes("src/styles/") && !file.endsWith("Icon.tsx")) {
      const matches = source.match(rawHex) ?? [];
      if (matches.length) errors.push(`${file}: cor hexadecimal direta (${[...new Set(matches)].join(", ")}); use tokens.`);
    }
  }
}

const page = readFileSync(join(ROOT, "src/app/page.tsx"), "utf8");
if (!page.includes("<PageComposer")) errors.push("src/app/page.tsx não usa PageComposer.");
const config = readFileSync(join(ROOT, "src/config/client.config.ts"), "utf8");
if (!config.includes('platformVersion: "3.0.0"')) warnings.push("client.config.ts não declara platformVersion 3.0.0.");

warnings.forEach((x) => console.warn(`⚠ ${x}`));
if (errors.length) {
  console.error("[NEXORA] Violações de arquitetura:");
  errors.forEach((x) => console.error(` - ${x}`));
  process.exit(1);
}
console.log(`[NEXORA] Arquitetura OK.${warnings.length ? ` ${warnings.length} aviso(s).` : ""}`);
