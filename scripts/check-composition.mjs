#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatesDir = join(ROOT, "templates");
const allowedTypes = new Set(["hero", "benefits", "services", "products", "projects", "team", "stats", "about", "gallery", "testimonials", "faq", "cta", "contact", "custom"]);
const familyPrefix = { hero: "hero", about: "about", services: "services", benefits: "benefits", stats: "stats", gallery: "gallery", testimonials: "testimonials", faq: "faq", cta: "cta", contact: "contact", footer: "footer" };
const allowedVariants = {};
for (const [family, prefix] of Object.entries(familyPrefix)) {
  const dir = join(ROOT, "src/sections", family);
  allowedVariants[family] = new Set(
    existsSync(dir)
      ? readdirSync(dir).filter((name) => new RegExp(`^${family[0].toUpperCase()}${family.slice(1)}\\d+\\.tsx$`, "i").test(name)).map((name) => {
          const number = name.match(/(\d+)\.tsx$/)?.[1];
          return `${prefix}-${number}`;
        })
      : [],
  );
}
const errors = [];
const warnings = [];

for (const name of readdirSync(templatesDir).filter((x) => x.endsWith(".json") && x !== "index.json")) {
  const path = join(templatesDir, name);
  const t = JSON.parse(readFileSync(path, "utf8"));
  for (const [family, variant] of Object.entries(t.sections ?? {})) {
    if (!allowedVariants[family]?.has(variant)) errors.push(`${name}: sections.${family} usa variante inexistente '${variant}'.`);
  }
  const blocks = t.composition?.home;
  if (!Array.isArray(blocks) || blocks.length < 3) {
    errors.push(`${name}: composition.home precisa de pelo menos 3 blocos.`);
    continue;
  }
  const ids = new Set();
  for (const block of blocks) {
    if (!allowedTypes.has(block.type)) errors.push(`${name}: tipo de bloco desconhecido '${block.type}'.`);
    if (!block.id || ids.has(block.id)) errors.push(`${name}: id de bloco ausente ou duplicado '${block.id ?? ""}'.`);
    ids.add(block.id);
    if (block.type === "custom" && !block.variant) errors.push(`${name}: bloco custom exige variant.`);
    if (block.variant && allowedVariants[block.type] && !allowedVariants[block.type].has(block.variant)) {
      errors.push(`${name}: variante '${block.variant}' não pertence a ${block.type}.`);
    }
  }
  if (blocks[0]?.type !== "hero") warnings.push(`${name}: o primeiro bloco não é hero.`);
  const conversionIndex = Math.max(blocks.findIndex((b) => b.type === "cta"), blocks.findIndex((b) => b.type === "contact"));
  if (conversionIndex < 0) errors.push(`${name}: não existe CTA nem contato na home.`);
  if (!t.strategy?.primaryConversion) errors.push(`${name}: strategy.primaryConversion ausente.`);
}

for (const warning of warnings) console.warn(`⚠ ${warning}`);
if (errors.length) {
  console.error("[NEXORA] Falhas no motor de composição:");
  errors.forEach((error) => console.error(` - ${error}`));
  process.exit(1);
}
console.log(`[NEXORA] Composição OK: variantes reais, templates, ids e estratégia validados.${warnings.length ? ` ${warnings.length} aviso(s).` : ""}`);
