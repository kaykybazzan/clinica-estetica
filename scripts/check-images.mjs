#!/usr/bin/env node
/**
 * NEXORA · check-images
 * ---------------------------------------------------------------
 * Verifica se todo caminho de imagem citado no código existe em /public.
 *
 * Um `src` quebrado não derruba o build do Next: ele vira um 404 silencioso
 * que só aparece na produção. Este script transforma isso em erro de CI.
 *
 * Uso:  npm run check-images
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { exit } from "node:process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const SCAN_DIRS = ["src"];
const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const IMAGE_PATTERN = /["'`](\/[A-Za-z0-9._\-/]+\.(?:jpg|jpeg|png|webp|avif|svg|ico))["'`]/g;

const c = { red: "\u001b[31m", green: "\u001b[32m", dim: "\u001b[2m", bold: "\u001b[1m", reset: "\u001b[0m" };

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, files);
    } else if (CODE_EXTENSIONS.has(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

const references = new Map();

for (const scanDir of SCAN_DIRS) {
  const base = join(ROOT, scanDir);
  if (!existsSync(base)) continue;

  for (const file of walk(base)) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(IMAGE_PATTERN)) {
      const path = match[1];
      if (!references.has(path)) references.set(path, new Set());
      references.get(path).add(file.replace(`${ROOT}/`, ""));
    }
  }
}

const missing = [...references.entries()].filter(([path]) => !existsSync(join(PUBLIC_DIR, path)));

console.log(`${c.bold}NEXORA · check-images${c.reset}`);
console.log(`${c.dim}${references.size} caminho(s) de imagem referenciado(s) no código.${c.reset}`);

if (missing.length === 0) {
  console.log(`${c.green}✓ Todas as imagens existem em /public.${c.reset}`);
  exit(0);
}

console.log(`\n${c.red}✗ ${missing.length} imagem(ns) não encontrada(s):${c.reset}`);
for (const [path, users] of missing) {
  console.log(`  ${c.red}·${c.reset} public${path}`);
  for (const user of users) console.log(`      ${c.dim}usado em ${user}${c.reset}`);
}
console.log(
  `\n${c.dim}Adicione os arquivos em /public ou corrija os caminhos em src/data/.${c.reset}`,
);
exit(1);
