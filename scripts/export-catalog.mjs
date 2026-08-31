#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const sectionsRoot = join(ROOT, "src/sections");
const families = {};
for (const family of readdirSync(sectionsRoot, { withFileTypes: true }).filter((x) => x.isDirectory() && x.name !== "catalog")) {
  const variants = readdirSync(join(sectionsRoot, family.name)).filter((name) => /\d+\.tsx$/.test(name)).map((name) => name.replace(/\.tsx$/, "")).sort();
  if (variants.length) families[family.name] = variants;
}
const templatesIndex = JSON.parse(readFileSync(join(ROOT, "templates/index.json"), "utf8"));
const templates = templatesIndex.order.map((id) => JSON.parse(readFileSync(join(ROOT, `templates/${id}.json`), "utf8")));
const designs = JSON.parse(readFileSync(join(ROOT, "src/config/presets/design-presets.json"), "utf8"));
const businesses = JSON.parse(readFileSync(join(ROOT, "src/config/presets/business-presets.json"), "utf8"));
const result = {
  generatedBy: "scripts/export-catalog.mjs",
  platformVersion: JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version,
  blockTypes: ["hero", "benefits", "services", "products", "projects", "team", "stats", "about", "gallery", "testimonials", "faq", "cta", "contact", "custom"],
  sectionFamilies: families,
  templates: templates.map((t) => ({ id: t.id, label: t.label, rationale: t.rationale, strategy: t.strategy, composition: t.composition })),
  designPresets: designs.map((d) => ({ id: d.id, label: d.label, suitedTo: d.suitedTo, archetype: d.design.archetype })),
  businessPresets: businesses,
};
writeFileSync(join(ROOT, "docs/COMPONENT-CATALOG.json"), JSON.stringify(result, null, 2) + "\n");
console.log("[NEXORA] docs/COMPONENT-CATALOG.json atualizado.");
