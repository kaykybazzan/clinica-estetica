#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const warnings = [];
const errors = [];
const files = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(png|jpe?g|webp|gif|avif)$/i.test(name)) files.push(full);
  }
}

function dimensions(buffer, ext) {
  try {
    if (ext === ".png" && buffer.length >= 24) return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    if ([".jpg", ".jpeg"].includes(ext)) {
      let i = 2;
      while (i + 9 < buffer.length) {
        if (buffer[i] !== 0xff) { i += 1; continue; }
        const marker = buffer[i + 1];
        const len = buffer.readUInt16BE(i + 2);
        if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
        i += 2 + len;
      }
    }
    if (ext === ".webp" && buffer.toString("ascii", 12, 16) === "VP8X") return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  } catch {}
  return null;
}

walk(PUBLIC);
const hashes = new Map();
let total = 0;
for (const file of files) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  const buffer = readFileSync(file);
  const size = buffer.length;
  total += size;
  const ext = extname(file).toLowerCase();
  const dim = dimensions(buffer, ext);
  if (size > 8 * 1024 * 1024) errors.push(`${rel}: ${(size/1024/1024).toFixed(1)} MB — imagem excessivamente pesada.`);
  else if (size > 1.5 * 1024 * 1024) warnings.push(`${rel}: ${(size/1024/1024).toFixed(1)} MB — considere otimizar.`);
  if (dim && !rel.includes("public/favicon/") && (dim.width < 320 || dim.height < 240)) warnings.push(`${rel}: ${dim.width}×${dim.height} — resolução baixa para conteúdo principal.`);
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (hashes.has(hash)) warnings.push(`${rel}: arquivo duplicado de ${hashes.get(hash)}.`);
  else hashes.set(hash, rel);
}

const srcFiles = [];
function walkSource(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkSource(full);
    else if (/\.(ts|tsx)$/.test(name)) srcFiles.push(full);
  }
}
walkSource(join(ROOT, "src"));
for (const file of srcFiles) {
  const source = readFileSync(file, "utf8");
  const objectPattern = /\{[^{}]{0,500}src:\s*["'](\/[^"']+)["'][^{}]{0,500}alt:\s*["']([^"']*)["'][^{}]{0,500}\}/gs;
  for (const match of source.matchAll(objectPattern)) {
    if (!match[2].trim() && !/decor|background|textura/i.test(match[1])) warnings.push(`${relative(ROOT,file)}: alt vazio para ${match[1]}.`);
  }
}

warnings.forEach((x) => console.warn(`⚠ ${x}`));
if (errors.length) {
  errors.forEach((x) => console.error(`✗ ${x}`));
  process.exit(1);
}
console.log(`[NEXORA] Media audit: ${files.length} arquivo(s), ${(total/1024/1024).toFixed(2)} MB.${warnings.length ? ` ${warnings.length} aviso(s).` : ""}`);
