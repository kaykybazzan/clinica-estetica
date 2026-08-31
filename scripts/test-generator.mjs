#!/usr/bin/env node
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const example = "docs/client.answers.example.json";

function run(cwd, args) {
  return spawnSync(process.execPath, args, { cwd, encoding: "utf8" });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("NEXORA · teste do gerador");

const dry = run(ROOT, ["scripts/create-client.mjs", "--answers", example, "--dry-run", "--force"]);
assert(dry.status === 0, `dry-run falhou:\n${dry.stderr || dry.stdout}`);
assert(dry.stdout.includes("Configuração válida"), "dry-run não confirmou configuração válida");
console.log("✓ dry-run por JSON");

const temp = mkdtempSync(join(tmpdir(), "nexora-generator-"));
try {
  cpSync(ROOT, temp, {
    recursive: true,
    filter(source) {
      const normalized = source.replaceAll("\\", "/");
      return !normalized.includes("/node_modules/") &&
        !normalized.endsWith("/node_modules") &&
        !normalized.includes("/.next/") &&
        !normalized.endsWith("/.next") &&
        !normalized.includes("/.git/") &&
        !normalized.endsWith("/.git") &&
        !normalized.includes("/.backup/") &&
        !normalized.endsWith("/.backup");
    },
  });

  const write = run(temp, ["scripts/create-client.mjs", "--answers", example, "--force"]);
  assert(write.status === 0, `geração completa falhou:\n${write.stderr || write.stdout}`);

  const config = readFileSync(join(temp, "src/config/client.config.ts"), "utf8");
  const services = readFileSync(join(temp, "src/data/services.ts"), "utf8");
  assert(config.includes("Empresa Exemplo"), "configuração não recebeu os dados do arquivo de respostas");
  assert(!config.includes("Torque Sete"), "dados da demo permaneceram na configuração");
  assert(services.includes("export const services: Service[] = [];"), "serviços demo não foram neutralizados");
  assert(existsSync(join(temp, "docs/CLIENTE-empresa-exemplo.md")), "checklist do cliente não foi criado");
  assert(existsSync(join(temp, ".env.local")), ".env.local não foi criado");
  assert(existsSync(join(temp, ".backup")), "backup não foi criado");
  console.log("✓ geração completa em workspace temporário");

  const productionAudit = run(temp, ["scripts/audit-client.mjs", "--strict"]);
  assert(productionAudit.status !== 0, "auditoria estrita deveria bloquear um cliente ainda não preenchido");
  assert(
    `${productionAudit.stdout}\n${productionAudit.stderr}`.includes("Conteúdo pendente") ||
      `${productionAudit.stdout}\n${productionAudit.stderr}`.includes("domínio de exemplo"),
    "auditoria estrita falhou sem explicar uma pendência conhecida",
  );
  console.log("✓ auditoria estrita bloqueia publicação prematura");

  const invalidAnswers = join(temp, "invalid.answers.json");
  await import("node:fs").then(({ writeFileSync }) => writeFileSync(invalidAnswers, JSON.stringify({ name: "Teste" }), "utf8"));
  const invalid = run(temp, ["scripts/create-client.mjs", "--answers", invalidAnswers, "--dry-run", "--force"]);
  assert(invalid.status !== 0, "arquivo de respostas inválido deveria falhar");
  console.log("✓ validação rejeita respostas incompletas");

  const typedAnswers = join(temp, "invalid-features.answers.json");
  const baseAnswers = JSON.parse(readFileSync(join(temp, example), "utf8"));
  await import("node:fs").then(({ writeFileSync }) =>
    writeFileSync(typedAnswers, JSON.stringify({ ...baseAnswers, features: { gallery: "sim" } }), "utf8"),
  );
  const typed = run(temp, ["scripts/create-client.mjs", "--answers", typedAnswers, "--dry-run", "--force"]);
  assert(typed.status !== 0, "override de feature com tipo inválido deveria falhar");
  console.log("✓ validação rejeita overrides com tipo inválido");
} finally {
  rmSync(temp, { recursive: true, force: true });
}

console.log("✓ gerador aprovado");
