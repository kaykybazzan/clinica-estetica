#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const roots = ["src/app", "src/components", "src/sections", "src/integrations", "src/seo", "src/utils"];
const forbidden = [
  { label: "Torque Sete", re: /Torque Sete/i },
  { label: "carro", re: /\bcarros?\b/i },
  { label: "veículo", re: /\bve[ií]culos?\b/i },
  { label: "oficina", re: /\boficinas?\b/i },
  { label: "mecânica", re: /\bmec[aâ]nic[ao]s?\b/i },
  { label: "auto elétrica", re: /\bauto\s*el[eé]trica\b/i },
];

function walk(dir, files = []) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return files;
  for (const entry of readdirSync(abs)) {
    const full = join(abs, entry);
    const rel = relative(ROOT, full).replaceAll("\\", "/");
    const info = statSync(full);
    if (info.isDirectory()) walk(rel, files);
    else if (/\.(ts|tsx|js|jsx)$/.test(rel)) files.push(rel);
  }
  return files;
}

const hits = [];
for (const root of roots) {
  for (const file of walk(root)) {
    const source = readFileSync(join(ROOT, file), "utf8");
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const rule of forbidden) {
        if (rule.re.test(line)) hits.push(`${file}:${index + 1} — ${rule.label}`);
      }
    });
  }
}

if (hits.length) {
  console.error("Core contém copy específica de segmento:\n  - " + hits.join("\n  - "));
  process.exit(1);
}

console.log("✓ Core genérico: nenhuma copy automotiva da demo encontrada");
