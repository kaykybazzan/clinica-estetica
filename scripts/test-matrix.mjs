#!/usr/bin/env node
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const presets = JSON.parse(readFileSync(join(ROOT, "src/config/presets/business-presets.json"), "utf8"));
const temp = mkdtempSync(join(tmpdir(), "nexora-matrix-"));
let failed = 0;
for (const preset of presets) {
  const answers = {
    name: `Fixture ${preset.id}`,
    description: `Fixture de validação para ${preset.id}. Conteúdo temporário usado apenas pelo build matrix do gerador.`,
    whatsapp: "5547999999999",
    phone: "(47) 99999-9999",
    email: "fixture@example.com",
    city: "Timbó",
    state: "SC",
    businessPreset: preset.id,
    siteUrl: "https://example.com",
    keywords: [preset.id]
  };
  const file = join(temp, `${preset.id}.json`);
  writeFileSync(file, JSON.stringify(answers));
  const result = spawnSync(process.execPath, [join(ROOT, "scripts/create-client.mjs"), "--answers", file, "--dry-run", "--force"], { cwd: ROOT, encoding: "utf8" });
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  const ok = result.status === 0 && output.includes('platformVersion: "3.0.0"') && output.includes("strategy:") && output.includes("composition:");
  if (!ok) { failed += 1; console.error(`✗ ${preset.id}\n${output.slice(-800)}`); }
  else console.log(`✓ ${preset.id}`);
}
rmSync(temp, { recursive: true, force: true });
if (failed) process.exit(1);
console.log(`[NEXORA] Build matrix do gerador: ${presets.length}/${presets.length} presets aprovados.`);
