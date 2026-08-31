#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (rel) => JSON.parse(readFileSync(join(ROOT, rel), "utf8"));
const templatesIndex = readJson("templates/index.json").order;
const designs = readJson("src/config/presets/design-presets.json");
const businesses = readJson("src/config/presets/business-presets.json");
const failures = []; const designIds = new Set(designs.map(x=>x.id)); const templateIds = new Set(templatesIndex);
for (const id of templatesIndex) { const rel=`templates/${id}.json`; if (!existsSync(join(ROOT,rel))) { failures.push(`Template listado mas ausente: ${rel}`); continue; } const t=readJson(rel); if(t.id!==id) failures.push(`${rel}: id interno diferente.`); if(!designIds.has(t.designPreset)) failures.push(`${rel}: designPreset inexistente ${t.designPreset}.`); }
for (const b of businesses) { if(!templateIds.has(b.template)) failures.push(`Preset ${b.id}: template inexistente ${b.template}.`); if(b.designPreset&&!designIds.has(b.designPreset)) failures.push(`Preset ${b.id}: designPreset inexistente ${b.designPreset}.`); }
for (const [items,label] of [[designs,"Design preset"],[businesses,"Business preset"]]) { const seen=new Set(); for(const item of items){ if(seen.has(item.id)) failures.push(`${label} duplicado: ${item.id}`); seen.add(item.id); } }
if(failures.length){ console.error("[NEXORA] Falhas em presets/templates:"); failures.forEach(x=>console.error(` - ${x}`)); process.exit(1); }
console.log(`[NEXORA] Presets OK: ${businesses.length} negócios, ${designs.length} visuais, ${templatesIndex.length} templates.`);
