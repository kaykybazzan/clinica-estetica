#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const STRICT = process.argv.includes("--strict");
const errors = [];
const warnings = [];
const ok = [];

const read = (path) => readFileSync(join(ROOT, path), "utf8");
const addError = (msg) => errors.push(msg);
const addWarning = (msg) => warnings.push(msg);
const addOk = (msg) => ok.push(msg);

function extractString(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*[\"']([^\"']*)[\"']`));
  return match?.[1] ?? "";
}

function walk(dir, out = []) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    const full = join(abs, name);
    const rel = relative(ROOT, full).replaceAll("\\\\", "/");
    const info = statSync(full);
    if (info.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}


function extractObject(source, key) {
  const startMatch = new RegExp(`${key}\\s*:\\s*\\{`).exec(source);
  if (!startMatch) return "";
  const start = startMatch.index + startMatch[0].lastIndexOf("{");
  let depth = 0;
  for (let i = start; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start + 1, i);
    }
  }
  return "";
}

function extractBoolean(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*(true|false)`));
  return match ? match[1] === "true" : null;
}

function sourceLooksEmptyArray(path, exportName) {
  if (!existsSync(join(ROOT, path))) return true;
  const source = read(path);
  return new RegExp(`export\\s+const\\s+${exportName}[^=]*=\\s*\\[\\s*\\]`, "m").test(source);
}

function scanMarkers() {
  const files = [
    ...walk("src/data"),
    "src/config/client.config.ts",
  ].filter((file) => existsSync(join(ROOT, file)));

  const markers = ["[PREENCHER", "[REVISAR", "Lorem ipsum", "TODO_CLIENT", "FIXME_CLIENT"];
  const found = [];
  for (const file of files) {
    const text = read(file);
    for (const marker of markers) {
      if (text.includes(marker)) found.push(`${file}: ${marker}`);
    }
  }
  if (found.length) addError(`Conteúdo pendente encontrado:\n  - ${found.join("\n  - ")}`);
  else addOk("Nenhum marcador de conteúdo pendente encontrado");
}

function auditConfig() {
  const path = "src/config/client.config.ts";
  if (!existsSync(join(ROOT, path))) {
    addError(`${path} não existe`);
    return;
  }
  const source = read(path);
  const name = extractString(source, "name");
  const email = extractString(source, "email");
  const whatsapp = extractString(source, "whatsapp");
  const city = extractString(source, "city");
  const state = extractString(source, "state");
  const siteUrl = extractString(source, "siteUrl");

  if (!name) addError("Nome da empresa não encontrado em client.config.ts");
  if (!email) addError("E-mail não encontrado em client.config.ts");
  if (!/^\d{12,13}$/.test(whatsapp)) addError("WhatsApp precisa ter DDI+DDD+número, apenas dígitos");
  if (!city || !/^[A-Z]{2}$/.test(state)) addError("Cidade/UF precisam estar configuradas");

  if (!siteUrl) addError("seo.siteUrl não encontrado");
  else if (/example\.(com|org|net)|exemplo\.|localhost|127\.0\.0\.1/i.test(siteUrl)) {
    addError(`seo.siteUrl ainda usa domínio de exemplo: ${siteUrl}`);
  } else {
    addOk(`Domínio configurado: ${siteUrl}`);
  }

  const demoMarkers = [
    "Torque Sete",
    "Seu carro sai daqui diagnosticado",
    "Diagnóstico eletrônico e mecânica de precisão",
  ];
  if (demoMarkers.some((marker) => source.includes(marker))) {
    addError("client.config.ts ainda contém dados da empresa demo");
  } else {
    addOk("Configuração principal não contém marcadores conhecidos da demo");
  }
}

function auditDemoData() {
  const markers = [
    "DEMO DATA",
    "diagnostico-eletronico",
    "Seu carro sai daqui diagnosticado",
    "Laudo antes do orçamento",
  ];
  const hits = [];
  for (const file of walk("src/data")) {
    if (!/\.(ts|tsx|json|md)$/.test(file)) continue;
    const text = read(file);
    if (markers.some((marker) => text.includes(marker))) hits.push(file);
  }
  if (hits.length) addError(`Dados demo ainda presentes em: ${hits.join(", ")}`);
  else addOk("Conteúdo demo removido dos dados do cliente");
}


function auditContentConsistency() {
  const source = read("src/config/client.config.ts");
  const features = extractObject(source, "features");
  const pages = extractObject(source, "pages");
  const checks = [
    { flag: "benefits", scope: features, path: "src/data/benefits.ts", name: "benefits", label: "diferenciais" },
    { flag: "stats", scope: features, path: "src/data/stats.ts", name: "stats", label: "números/estatísticas" },
    { flag: "gallery", scope: features, path: "src/data/gallery.ts", name: "gallery", label: "galeria" },
    { flag: "testimonials", scope: features, path: "src/data/testimonials.ts", name: "testimonials", label: "depoimentos" },
    { flag: "faq", scope: features, path: "src/data/faq.ts", name: "faq", label: "FAQ" },
    { flag: "team", scope: features, path: "src/data/team.ts", name: "team", label: "equipe" },
    { flag: "products", scope: pages, path: "src/data/products.ts", name: "products", label: "página de produtos" },
    { flag: "projects", scope: pages, path: "src/data/projects.ts", name: "projects", label: "página de projetos" },
  ];

  for (const check of checks) {
    if (extractBoolean(check.scope, check.flag) === true && sourceLooksEmptyArray(check.path, check.name)) {
      addError(`${check.label} está habilitado(a), mas ${check.path} está vazio`);
    }
  }

  if (extractBoolean(pages, "services") === true && sourceLooksEmptyArray("src/data/services.ts", "services")) {
    addError("página de serviços está habilitada, mas src/data/services.ts está vazio");
  }
}

function auditAssets() {
  const expected = ["public/favicon/favicon.svg", "public/favicon/favicon-32.png"];
  for (const file of expected) {
    if (!existsSync(join(ROOT, file))) addWarning(`Arquivo recomendado ausente: ${file}`);
  }
}

function auditAgencyCredit() {
  const site = read("src/config/site.ts");
  const show = /showFooterCredit\s*:\s*true/.test(site);
  const url = extractString(site, "url");
  if (show && !url) {
    addOk("Crédito Nexora está ativo sem link; defina nexora.url apenas quando houver domínio oficial");
  }
}

function auditEnvironment() {
  const source = read("src/config/client.config.ts");
  const features = extractObject(source, "features");
  const analytics = [
    "NEXT_PUBLIC_GA_ID",
    "NEXT_PUBLIC_GTM_ID",
    "NEXT_PUBLIC_META_PIXEL_ID",
    "NEXT_PUBLIC_CLARITY_ID",
  ].filter((key) => Boolean(process.env[key]));
  if (analytics.length) {
    addOk(`Integrações de medição detectadas: ${analytics.join(", ")}`);
    if (extractBoolean(features, "cookieBanner") === false) {
      addWarning("Há ferramentas de medição configuradas com cookieBanner=false; confirme a base legal e a política de consentimento antes de publicar");
    }
  }

  const delivery = Boolean(process.env.RESEND_API_KEY || process.env.CONTACT_WEBHOOK_URL);
  if (extractBoolean(features, "contactForm") === true && !delivery) {
    addWarning("Formulário está ativo, mas nenhum provedor de entrega foi detectado neste ambiente (RESEND_API_KEY ou CONTACT_WEBHOOK_URL)");
  }
}

function auditVersion() {
  const pkg = JSON.parse(read("package.json"));
  const site = read("src/config/site.ts");
  const match = site.match(/BASE_VERSION\s*=\s*["']([^"']+)["']/);
  const baseVersion = match?.[1] ?? "";
  if (pkg.version !== baseVersion) addError(`Versão divergente: package.json=${pkg.version}, BASE_VERSION=${baseVersion || "ausente"}`);
  else addOk(`Versão da base consistente: ${pkg.version}`);
  const config = read("src/config/client.config.ts");
  const platform = config.match(/platformVersion\s*:\s*["']([^"']+)/)?.[1] ?? "";
  if (platform !== pkg.version) addError(`client.config platformVersion=${platform || "ausente"}; esperado ${pkg.version}`);
  else addOk(`client.config compatível com Platform ${platform}`);
}

console.log("\nNEXORA · auditoria de cliente\n");
auditVersion();
auditConfig();
auditDemoData();
scanMarkers();
auditContentConsistency();
auditAssets();
auditAgencyCredit();
auditEnvironment();

for (const msg of ok) console.log(`✓ ${msg}`);
for (const msg of warnings) console.warn(`⚠ ${msg}`);
for (const msg of errors) console.error(`✗ ${msg}`);

console.log(`\nResultado: ${errors.length} erro(s), ${warnings.length} aviso(s).${STRICT ? " Modo estrito." : ""}`);
if (errors.length || (STRICT && warnings.length)) process.exit(1);
