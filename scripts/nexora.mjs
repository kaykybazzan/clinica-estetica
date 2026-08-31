#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const [command = "help", ...args] = process.argv.slice(2);
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

function run(bin, argv) {
  const result = spawnSync(bin, argv, { cwd: ROOT, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status) process.exit(result.status);
}
function node(script, extra = []) { run(process.execPath, [join(ROOT, script), ...extra]); }

function help() {
  console.log(`\nNEXORA WEBSITE PLATFORM v${pkg.version}\n\nComandos:\n  nexora create [args]       cria um novo cliente\n  nexora doctor              executa diagnóstico técnico rápido\n  nexora audit [--strict]    auditoria de publicação\n  nexora media               audita imagens e duplicidades\n  nexora migrate             migra client.config v2 -> v3\n  nexora update --from PATH  atualiza o Core preservando o cliente\n  nexora strategy <segment>  mostra estratégia e blueprint do segmento\n  nexora catalog             lista templates/presets disponíveis\n  nexora preview             inicia o ambiente de desenvolvimento\n  nexora validate            executa quality gates completos\n`);
}

switch (command) {
  case "help": case "--help": case "-h": help(); break;
  case "create": node("scripts/create-client.mjs", args); break;
  case "audit": node("scripts/audit-client.mjs", args); break;
  case "media": node("scripts/media-audit.mjs", args); break;
  case "migrate": node("scripts/migrate-v3.mjs", args); break;
  case "update": node("scripts/update-core.mjs", args); break;
  case "doctor":
    console.log(`[NEXORA] Node ${process.version} · Platform ${pkg.version}`);
    node("scripts/check-presets.mjs");
    node("scripts/check-composition.mjs");
    node("scripts/check-core-generic.mjs");
    node("scripts/check-architecture.mjs");
    node("scripts/check-images.mjs");
    node("scripts/media-audit.mjs");
    break;
  case "validate": run("npm", ["run", "quality:full"]); break;
  case "preview": run("npm", ["run", "dev", "--", "--hostname", "0.0.0.0"]); break;
  case "catalog": {
    const index = JSON.parse(readFileSync(join(ROOT, "templates/index.json"), "utf8"));
    const businesses = JSON.parse(readFileSync(join(ROOT, "src/config/presets/business-presets.json"), "utf8"));
    const designs = JSON.parse(readFileSync(join(ROOT, "src/config/presets/design-presets.json"), "utf8"));
    console.log(`Templates (${index.order.length}): ${index.order.join(", ")}`);
    console.log(`Negócios (${businesses.length}): ${businesses.map((x) => x.id).join(", ")}`);
    console.log(`Designs (${designs.length}): ${designs.map((x) => x.id).join(", ")}`);
    break;
  }
  case "strategy": {
    const segment = args[0] ?? "local-business";
    const businesses = JSON.parse(readFileSync(join(ROOT, "src/config/presets/business-presets.json"), "utf8"));
    const business = businesses.find((x) => x.id === segment);
    const templateId = business?.template ?? segment;
    let template;
    try { template = JSON.parse(readFileSync(join(ROOT, `templates/${templateId}.json`), "utf8")); }
    catch { console.error(`Segmento/template desconhecido: ${segment}`); process.exit(1); }
    console.log(JSON.stringify({ segment, template: template.id, rationale: template.rationale, strategy: template.strategy, composition: template.composition }, null, 2));
    break;
  }
  default:
    console.error(`Comando desconhecido: ${command}`);
    help();
    process.exit(1);
}
