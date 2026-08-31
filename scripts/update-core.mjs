#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve, join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const fromIndex = args.indexOf("--from");
const sourceRoot = resolve(fromIndex >= 0 ? args[fromIndex + 1] ?? "" : process.env.NEXORA_CORE_SOURCE ?? "");
const DRY = args.includes("--dry-run");
if (!sourceRoot || sourceRoot === resolve("")) {
  console.error("Uso: nexora update --from <caminho-da-base-mestre> [--dry-run]");
  process.exit(1);
}
if (sourceRoot === resolve(ROOT)) {
  console.log("[NEXORA] A origem é este próprio projeto; nada a atualizar.");
  process.exit(0);
}
const manifestPath = join(sourceRoot, "platform/core-manifest.json");
if (!existsSync(manifestPath)) {
  console.error(`Manifesto não encontrado em ${manifestPath}`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sourcePkg = JSON.parse(readFileSync(join(sourceRoot, "package.json"), "utf8"));
const targetPkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupRoot = join(ROOT, ".backup", `core-update-${stamp}`);

function backup(rel) {
  const target = join(ROOT, rel);
  if (!existsSync(target)) return;
  const dest = join(backupRoot, rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(target, dest, { recursive: true });
}
function copy(rel) {
  const source = join(sourceRoot, rel);
  if (!existsSync(source)) return console.warn(`⚠ origem sem ${rel}`);
  const target = join(ROOT, rel);
  if (DRY) return console.log(`would update ${rel}`);
  backup(rel);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
  console.log(`✓ ${rel}`);
}

console.log(`[NEXORA] Core update ${targetPkg.version} → ${manifest.version}${DRY ? " (dry-run)" : ""}`);
for (const rel of manifest.controlledPaths) copy(rel);

// Seed extension scaffolding only when the target does not have it yet. Once
// created, src/client remains entirely owned by the client project.
if (!DRY && !existsSync(join(ROOT, "src/client")) && existsSync(join(sourceRoot, "src/client"))) {
  cpSync(join(sourceRoot, "src/client"), join(ROOT, "src/client"), { recursive: true });
  console.log("✓ src/client (seed inicial; daqui em diante preservado)");
}

if (!DRY) {
  const mergedPkg = {
    ...targetPkg,
    name: targetPkg.name,
    version: manifest.version,
    scripts: { ...(targetPkg.scripts ?? {}), ...(sourcePkg.scripts ?? {}) },
    dependencies: { ...(targetPkg.dependencies ?? {}), ...(sourcePkg.dependencies ?? {}) },
    devDependencies: { ...(targetPkg.devDependencies ?? {}), ...(sourcePkg.devDependencies ?? {}) },
    engines: sourcePkg.engines ?? targetPkg.engines,
  };
  backup("package.json");
  writeFileSync(join(ROOT, "package.json"), JSON.stringify(mergedPkg, null, 2) + "\n");
  writeFileSync(join(ROOT, "core.lock.json"), JSON.stringify({ platform: manifest.name, version: manifest.version, updatedAt: new Date().toISOString(), channel: "stable" }, null, 2) + "\n");
  console.log(`\nBackup: ${relative(ROOT, backupRoot)}`);
  console.log("Core atualizado. Execute: npm install && npm run nexora -- migrate && npm run doctor");
}
