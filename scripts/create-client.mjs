#!/usr/bin/env node
/**
 * NEXORA · create-client
 * ---------------------------------------------------------------
 * Cria a configuração inicial de um novo cliente a partir de presets
 * comerciais e visuais.
 *
 * Uso interativo:
 *   npm run create-client
 *
 * Uso por arquivo JSON:
 *   npm run create-client -- --answers docs/client.answers.example.json
 *   npm run create-client -- --answers cliente.json --dry-run
 *
 * Flags:
 *   --force    sobrescreve sem confirmação (mantém backup)
 *   --dry-run  valida e mostra o resultado sem escrever arquivos
 */

import { createInterface } from "node:readline";
import { stdin, stdout, exit } from "node:process";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const FORCE = argv.includes("--force");
const DRY_RUN = argv.includes("--dry-run");
const answersIndex = argv.indexOf("--answers");
const answersPath = answersIndex >= 0 ? argv[answersIndex + 1] : "";

if (answersIndex >= 0 && !answersPath) {
  console.error("--answers exige o caminho de um arquivo JSON.");
  exit(1);
}

const c = {
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  dim: "\u001b[2m",
  cyan: "\u001b[36m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  red: "\u001b[31m",
};

const say = (msg = "") => console.log(msg);
const title = (msg) => say(`\n${c.bold}${c.cyan}${msg}${c.reset}`);
const readJson = (relative) => JSON.parse(readFileSync(join(ROOT, relative), "utf8"));

const templates = readJson("templates/index.json").order.map((id) => readJson(`templates/${id}.json`));
const designPresets = readJson("src/config/presets/design-presets.json");
const businessPresets = readJson("src/config/presets/business-presets.json");

const FEATURE_DEFAULTS = {
  whatsappFloating: true,
  contactForm: true,
  maps: true,
  testimonials: true,
  gallery: true,
  projects: false,
  products: false,
  team: false,
  faq: true,
  stats: true,
  benefits: true,
  cookieBanner: true,
  backToTop: true,
  animations: true,
  announcementBar: false,
  catalogSearch: false,
  catalogFilters: false,
  catalogBrands: false,
  mobileConversionBar: true,
};

const PAGE_DEFAULTS = {
  about: true,
  services: true,
  products: false,
  projects: false,
  gallery: true,
  testimonials: true,
  faq: true,
  contact: true,
};

function parseAnswers() {
  if (!answersPath) return null;
  const absolute = answersPath.startsWith("/") ? answersPath : join(process.cwd(), answersPath);
  try {
    const parsed = JSON.parse(readFileSync(absolute, "utf8"));
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      throw new Error("o JSON precisa ser um objeto");
    }
    return parsed;
  } catch (error) {
    console.error(`${c.red}Falhou ao ler --answers:${c.reset}`, error.message);
    exit(1);
  }
}

const supplied = parseAnswers();
const interactive = !supplied;
const rl = interactive
  ? createInterface({ input: stdin, output: stdout, terminal: Boolean(stdin.isTTY) })
  : null;
const lines = rl?.[Symbol.asyncIterator]();

async function readLine(prompt) {
  if (!lines) throw new Error("Tentativa de leitura interativa no modo --answers.");
  stdout.write(prompt);
  const { value, done } = await lines.next();
  if (done) throw new Error("A entrada terminou antes de todas as respostas.");
  return value;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function requiredValue(value, label) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} é obrigatório.`);
  return value.trim();
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function validHex(value) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

async function ask(label, { fallback = "", validate } = {}) {
  for (;;) {
    const suffix = fallback ? ` ${c.dim}(${fallback})${c.reset}` : "";
    const answer = (await readLine(`${label}${suffix}: `)).trim() || fallback;
    if (!answer) {
      say(`${c.red}Campo obrigatório.${c.reset}`);
      continue;
    }
    const problem = validate?.(answer);
    if (!problem) return answer;
    say(`${c.red}${problem}${c.reset}`);
  }
}

async function optional(label, hint = "opcional") {
  return (await readLine(`${label} ${c.dim}(${hint})${c.reset}: `)).trim();
}

async function choose(label, options, fallbackId = "") {
  options.forEach((option, index) => {
    const mark = fallbackId && option.value === fallbackId ? ` ${c.green}← sugerido${c.reset}` : "";
    const note = option.note ? `\n      ${c.dim}${option.note}${c.reset}` : "";
    say(`  ${String(index + 1).padStart(2)}. ${c.bold}${option.label}${c.reset}${mark}${note}`);
  });
  for (;;) {
    const answer = (await readLine(`${label} (1-${options.length}): `)).trim();
    const index = Number(answer) - 1;
    if (Number.isInteger(index) && options[index]) return options[index].value;
    say(`${c.red}Escolha um número entre 1 e ${options.length}.${c.reset}`);
  }
}

async function confirm(label, fallback = true) {
  const hint = fallback ? "S/n" : "s/N";
  const answer = (await readLine(`${label} (${hint}): `)).trim().toLowerCase();
  if (!answer) return fallback;
  return ["s", "sim", "y", "yes"].includes(answer);
}

const q = (value) => JSON.stringify(value ?? "");

function toTs(value, indent = 2) {
  const json = JSON.stringify(value, null, indent);
  return json ?? "undefined";
}

function buildConfig(data) {
  const { template, designPreset, businessPreset } = data;
  return `import type { ClientConfig } from "./client.schema";

/**
 * ============================================================
 *  CLIENT CONFIG — ${data.name}
 * ============================================================
 * Gerado por \`npm run create-client\` em ${data.today}.
 * Preset de negócio: "${businessPreset.id}".
 * Template estrutural: "${template.id}".
 * Preset visual: "${designPreset.id}".
 *
 * A lista completa de variações aparece em /dev/components
 * somente em ambiente de desenvolvimento.
 */
export const clientConfig: ClientConfig = {
  platformVersion: "3.0.0",
  slug: ${q(data.slug)},
  segment: ${q(businessPreset.id)},

  company: {
    name: ${q(data.name)},
    legalName: ${q(data.legalName)},
    slogan: ${q(data.slogan)},
    description: ${q(data.description)},
    cnpj: "",
    priceRange: "$$",
  },

  contact: {
    phone: ${q(data.phone)},
    whatsapp: ${q(data.whatsapp)},
    email: ${q(data.email)},
  },

  address: {
    street: ${q(data.street)},
    number: ${q(data.number)},
    complement: ${q(data.complement)},
    district: ${q(data.district)},
    city: ${q(data.city)},
    state: ${q(data.state)},
    zipCode: ${q(data.zipCode)},
    country: "BR",
    // Preencha se quiser geo preciso no JSON-LD:
    // geo: { latitude: 0, longitude: 0 },
    serviceAreas: [${q(data.city)}],
    mapsEmbedQuery: ${q(data.mapsEmbedQuery)},
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    googleBusiness: "",
  },

  businessHours: {
    monday: { opens: "08:00", closes: "18:00", closed: false },
    tuesday: { opens: "08:00", closes: "18:00", closed: false },
    wednesday: { opens: "08:00", closes: "18:00", closed: false },
    thursday: { opens: "08:00", closes: "18:00", closed: false },
    friday: { opens: "08:00", closes: "18:00", closed: false },
    saturday: { opens: "08:00", closes: "12:00", closed: false },
    sunday: { closed: true },
    note: "",
  },

  strategy: ${toTs(template.strategy)},
  design: ${toTs(data.design)},
  sections: ${toTs(template.sections)},
  composition: ${toTs(data.composition)},
  features: ${toTs(data.features)},
  pages: ${toTs(data.pages)},

  mobileConversion: ${toTs(data.mobileConversion)},
  forms: ${toTs(data.forms)},

  seo: {
    siteUrl: ${q(data.siteUrl)},
    titleTemplate: "%s | %n",
    defaultTitle: ${q(data.defaultTitle)},
    description: ${q(data.description)},
    keywords: [${data.keywords.map(q).join(", ")}],
    locale: "pt_BR",
    ogImage: "/opengraph-image",
    twitterHandle: "",
    businessType: ${q(businessPreset.businessType || template.businessType || "LocalBusiness")},
    verification: { google: "", bing: "" },
  },

  legal: {
    controllerName: ${q(data.legalName || data.name)},
    dpoEmail: ${q(data.email)},
    lastReviewed: ${q(data.today)},
  },
};
`;
}

function buildStarterData(data) {
  const description = q(data.description);
  const businessLabel = q(data.businessPreset.label);

  return {
    "src/data/announcement.ts": `/** CLIENT STARTER — use apenas uma mensagem curta e operacional. */
export const announcementContent = {
  text: ${q(`Atendimento da ${data.name} em ${data.city} e região.`)},
  ctaLabel: "Fale conosco",
  ctaHref: "/contato",
} as const;
`,
    "src/data/catalog.ts": `/** CLIENT STARTER — marcas que merecem destaque no catálogo. */
export const catalogBrands: string[] = [];
`,
    "src/data/company.ts": `import { clientConfig } from "@/config/client.config";

/** CLIENT STARTER — personalize os textos abaixo antes de publicar. */
export const companyContent = {
  eyebrow: ${businessLabel},
  headline: ${q(data.slogan || data.name)},
  subheadline: ${description},
  aboutTitle: ${q(`Conheça a ${data.name}`)},
  aboutLead: ${description},
  aboutParagraphs: [
    ${q(`${data.name} está em ${data.city}. Substitua este parágrafo pela história real da empresa antes da publicação.`)},
  ],
  mission: "[PREENCHER] Descreva a missão real da empresa.",
  differentiators: [],
  ctaTitle: ${q(`Fale com a ${data.name}`)},
  ctaText: "Conte o que você precisa e a equipe retorna pelos canais informados.",
  cityLine: \`${'${clientConfig.address.city}'} e região\`,
} as const;
`,
    "src/data/services.ts": `import type { Service } from "@/types/content";

/** CLIENT STARTER — cadastre apenas serviços reais. */
export const services: Service[] = [];
export const featuredServices = services.filter((service) => service.featured);
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
`,
    "src/data/benefits.ts": `import type { Benefit } from "@/types/content";

/** CLIENT STARTER — adicione diferenciais verificáveis. */
export const benefits: Benefit[] = [];
`,
    "src/data/stats.ts": `import type { Stat } from "@/types/content";

/** CLIENT STARTER — nunca invente números. */
export const stats: Stat[] = [];
`,
    "src/data/faq.ts": `import type { FaqItem } from "@/types/content";

/** CLIENT STARTER — use dúvidas reais recebidas pela empresa. */
export const faq: FaqItem[] = [];
`,
    "src/data/testimonials.ts": `import type { Testimonial } from "@/types/content";

/** CLIENT STARTER — somente depoimentos reais e autorizados. */
export const testimonials: Testimonial[] = [];
`,
    "src/data/gallery.ts": `import type { GalleryItem } from "@/types/content";

/** CLIENT STARTER — use fotos reais ou autorizadas. */
export const gallery: GalleryItem[] = [];
export const galleryCategories = ["Todos", ...Array.from(new Set(gallery.map((item) => item.category)))];
`,
    "src/data/team.ts": `import type { TeamMember } from "@/types/content";

/** CLIENT STARTER — inclua apenas pessoas com autorização. */
export const team: TeamMember[] = [];
`,
    "src/data/products.ts": `import type { Product } from "@/types/content";

/** CLIENT STARTER — cadastre apenas produtos reais. */
export const products: Product[] = [];
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
`,
    "src/data/projects.ts": `import type { Project } from "@/types/content";

/** CLIENT STARTER — cases precisam ser reais e autorizados. */
export const projects: Project[] = [];
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
`,
  };
}

function isDemoContent(relative, text) {
  if (text.includes("DEMO DATA")) return true;
  const markers = {
    "src/data/company.ts": "Seu carro sai daqui diagnosticado",
    "src/data/services.ts": "diagnostico-eletronico",
    "src/data/benefits.ts": "Laudo antes do orçamento",
    "src/data/faq.ts": "O diagnóstico é cobrado à parte?",
  };
  return Boolean(markers[relative] && text.includes(markers[relative]));
}

function starterFilesToReplace(data) {
  const starters = buildStarterData(data);
  return Object.entries(starters).filter(([relative]) => {
    const target = join(ROOT, relative);
    if (!existsSync(target)) return true;
    return isDemoContent(relative, readFileSync(target, "utf8"));
  });
}

function buildChecklist(data) {
  return `# Checklist — ${data.name}

Gerado por \`create-client\` em ${data.today}.
Preset \`${data.businessPreset.id}\` · Template \`${data.template.id}\` · Visual \`${data.designPreset.id}\`

## 1. Conteúdo

- [ ] \`src/data/company.ts\` — completar história, missão e posicionamento real
- [ ] \`src/data/ui.ts\` — revisar tom, mensagens de formulário e CTAs operacionais
- [ ] \`src/data/services.ts\` — serviços reais
- [ ] \`src/data/benefits.ts\` — diferenciais verificáveis
- [ ] \`src/data/stats.ts\` — somente números comprováveis
- [ ] \`src/data/faq.ts\` — perguntas reais
- [ ] \`src/data/testimonials.ts\` — depoimentos autorizados
- [ ] \`src/data/gallery.ts\` — fotos próprias
- [ ] \`src/data/team.ts\` — se equipe estiver ativa
- [ ] \`src/data/products.ts\` e \`projects.ts\` — quando as páginas estiverem ativas
- [ ] \`src/data/navigation.ts\` — rótulos e rotas

## 2. Imagens

- [ ] Substituir imagens demo em \`public/images/\`
- [ ] Atualizar \`public/og/default.jpg\` em 1200×630
- [ ] Atualizar favicon e logo
- [ ] Rodar \`npm run check-images\`

## 3. Configuração

- [ ] Conferir domínio em \`seo.siteUrl\`
- [ ] Conferir endereço, CEP, áreas atendidas e, se necessário, \`geo\`
- [ ] Horários reais em \`businessHours\`
- [ ] Redes sociais
- [ ] CNPJ e razão social
- [ ] Revisar feature flags e páginas habilitadas

## 4. Privacidade e jurídico

- [ ] Revisar \`src/data/legal.ts\` e todos os marcadores \`[REVISAR]\`
- [ ] Confirmar se ferramentas de medição serão utilizadas
- [ ] Se houver Analytics/Pixel/Clarity com banner ativo, testar aceitar e recusar cookies

## 5. Publicação

- [ ] \`npm run check\` sem erros
- [ ] Variáveis corretas em \`.env.local\`
- [ ] Deploy de produção
- [ ] Domínio e HTTPS
- [ ] Search Console e sitemap
- [ ] Conferir NAP com Google Business Profile
`;
}

function buildMapsQuery(data) {
  const pieces = [data.street, data.number, data.district, data.city, data.state].filter(Boolean);
  return pieces.length > 2 ? pieces.join(", ") : `${data.name}, ${data.city} - ${data.state}`;
}

function resolveCatalog(id, catalog, label) {
  const found = catalog.find((item) => item.id === id);
  if (!found) throw new Error(`${label} inválido: ${id}`);
  return found;
}

function normalizeKeywords(value) {
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
}

function normalizeBooleanOverrides(value, defaults, label) {
  if (value == null) return {};
  if (Array.isArray(value) || typeof value !== "object") {
    throw new Error(`${label} precisa ser um objeto.`);
  }
  const allowed = new Set(Object.keys(defaults));
  const normalized = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!allowed.has(key)) throw new Error(`${label}.${key} não é uma opção reconhecida.`);
    if (typeof raw !== "boolean") throw new Error(`${label}.${key} precisa ser true ou false.`);
    normalized[key] = raw;
  }
  return normalized;
}

function resolveComposition(template, features, pages) {
  const disabled = new Set();
  if (!features.products || !pages.products) disabled.add("products");
  if (!features.projects || !pages.projects) disabled.add("projects");
  if (!features.team) disabled.add("team");
  if (!features.gallery || !pages.gallery) disabled.add("gallery");
  if (!features.testimonials) disabled.add("testimonials");
  if (!features.faq) disabled.add("faq");
  if (!features.stats) disabled.add("stats");
  if (!features.benefits) disabled.add("benefits");
  return { home: template.composition.home.filter((block) => !disabled.has(block.type)) };
}

function mobileActionsFor(strategy, features, pages) {
  const out = [];
  if (strategy.primaryConversion === "catalog" && pages.products) out.push("catalog");
  if (strategy.primaryConversion === "form") out.push("contact");
  if (features.whatsappFloating || strategy.primaryConversion === "whatsapp" || strategy.primaryConversion === "booking") out.push("whatsapp");
  if (strategy.primaryConversion === "phone" || strategy.urgency === "high") out.push("phone");
  if (strategy.localSeoImportance === "critical") out.push("directions");
  return [...new Set(out)].slice(0, 3).length ? [...new Set(out)].slice(0, 3) : ["whatsapp"];
}

function fromJson(a) {
  const name = requiredValue(a.name, "name");
  const slug = a.slug ? String(a.slug) : slugify(name);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error("slug deve ser kebab-case.");

  const whatsapp = requiredValue(a.whatsapp, "whatsapp");
  if (!/^\d{12,13}$/.test(whatsapp)) throw new Error("whatsapp deve conter 12 ou 13 dígitos com DDI e DDD.");
  const email = requiredValue(a.email, "email");
  if (!validEmail(email)) throw new Error("email inválido.");
  const city = requiredValue(a.city, "city");
  const state = requiredValue(a.state, "state").toUpperCase();
  if (!/^[A-Z]{2}$/.test(state)) throw new Error("state deve ter duas letras.");

  const businessPreset = resolveCatalog(a.businessPreset ?? "local-business", businessPresets, "businessPreset");
  const template = resolveCatalog(businessPreset.template, templates, "template");
  const designPreset = resolveCatalog(
    a.designPreset ?? businessPreset.designPreset ?? template.designPreset,
    designPresets,
    "designPreset",
  );
  const design = { ...designPreset.design };
  if (a.primaryColor) {
    if (!validHex(a.primaryColor)) throw new Error("primaryColor inválida. Use hexadecimal, ex.: #175CFF.");
    design.primaryColor = a.primaryColor;
  }

  const description = requiredValue(a.description, "description");
  if (description.length > 170) throw new Error("description deve ter no máximo 170 caracteres.");
  const siteUrl = String(a.siteUrl ?? "https://example.com").replace(/\/$/, "");
  if (!/^https?:\/\/.+/.test(siteUrl)) throw new Error("siteUrl precisa começar com https://");

  const featureOverrides = normalizeBooleanOverrides(a.features, FEATURE_DEFAULTS, "features");
  const pageOverrides = normalizeBooleanOverrides(a.pages, PAGE_DEFAULTS, "pages");
  const features = { ...FEATURE_DEFAULTS, ...template.features, ...featureOverrides };
  const pages = { ...PAGE_DEFAULTS, ...template.pages, ...pageOverrides };
  pages.products = Boolean(features.products && pages.products !== false);
  pages.projects = Boolean(features.projects && pages.projects !== false);
  pages.gallery = Boolean(features.gallery && pages.gallery !== false);

  const data = {
    name,
    slug,
    legalName: String(a.legalName ?? ""),
    slogan: String(a.slogan ?? ""),
    description,
    whatsapp,
    phone: String(a.phone ?? ""),
    email,
    street: String(a.street ?? ""),
    number: String(a.number ?? ""),
    complement: String(a.complement ?? ""),
    district: String(a.district ?? ""),
    city,
    state,
    zipCode: String(a.zipCode ?? ""),
    businessPreset,
    template,
    designPreset,
    design,
    features,
    pages,
    composition: resolveComposition(template, features, pages),
    mobileConversion: { enabled: true, actions: mobileActionsFor(template.strategy, features, pages) },
    forms: { contact: { enabled: features.contactForm, delivery: ["resend", "webhook"], maxBodyBytes: 32768, rateLimit: { requests: 5, windowSeconds: 60 } } },
    siteUrl,
    defaultTitle: String(a.defaultTitle ?? `${name} em ${city}`),
    keywords: normalizeKeywords(a.keywords),
    today: new Date().toISOString().slice(0, 10),
  };
  data.mapsEmbedQuery = buildMapsQuery(data);
  return data;
}

async function fromInteractive() {
  title("1 · Empresa");
  const name = await ask("Nome fantasia");
  const slug = await ask("Slug do projeto", {
    fallback: slugify(name),
    validate: (value) => (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value) ? null : "Use kebab-case."),
  });
  const legalName = await optional("Razão social");
  const slogan = await optional("Slogan");
  const description = await ask("Descrição curta (até 170 caracteres)", {
    validate: (value) => (value.length <= 170 ? null : `Máximo de 170 caracteres — ${value.length} informados.`),
  });

  title("2 · Contato");
  const whatsapp = await ask("WhatsApp — só dígitos, com DDI e DDD", {
    validate: (value) => (/^\d{12,13}$/.test(value) ? null : "Use 12 ou 13 dígitos."),
  });
  const phone = await optional("Telefone", "opcional, ex.: (47) 3200-0000");
  const email = await ask("E-mail", {
    validate: (value) => (validEmail(value) ? null : "E-mail inválido."),
  });

  title("3 · Localização");
  const street = await optional("Rua");
  const number = await optional("Número");
  const complement = await optional("Complemento");
  const district = await optional("Bairro");
  const city = await ask("Cidade");
  const state = (await ask("UF", {
    validate: (value) => (/^[A-Za-z]{2}$/.test(value) ? null : "Use a sigla de 2 letras."),
  })).toUpperCase();
  const zipCode = await optional("CEP", "opcional, ex.: 89120-000");

  title("4 · Preset de negócio");
  const businessPresetId = await choose(
    "Tipo de negócio",
    businessPresets.map((item) => ({ value: item.id, label: `${item.label} (${item.id})` })),
  );
  const businessPreset = resolveCatalog(businessPresetId, businessPresets, "businessPreset");
  const template = resolveCatalog(businessPreset.template, templates, "template");
  say(`${c.dim}Template estrutural selecionado automaticamente: ${template.label}.${c.reset}`);

  title("5 · Identidade visual");
  const designPresetId = await choose(
    "Preset visual",
    designPresets.map((item) => ({ value: item.id, label: `${item.label} (${item.id})`, note: item.suitedTo })),
    businessPreset.designPreset ?? template.designPreset,
  );
  const designPreset = resolveCatalog(designPresetId, designPresets, "designPreset");
  const primaryColor = await optional("Cor principal da marca", "Enter usa a cor do preset");
  const design = { ...designPreset.design };
  if (primaryColor) {
    if (validHex(primaryColor)) design.primaryColor = primaryColor;
    else say(`${c.yellow}Cor ignorada: formato inválido.${c.reset}`);
  }

  title("6 · Páginas e recursos");
  const features = { ...FEATURE_DEFAULTS, ...template.features };
  const pages = { ...PAGE_DEFAULTS, ...template.pages };
  features.products = await confirm("Terá página de produtos?", features.products);
  features.projects = await confirm("Terá página de projetos/cases?", features.projects);
  features.team = await confirm("Vai exibir a equipe?", features.team);
  features.contactForm = await confirm("Vai usar formulário de contato?", features.contactForm);
  features.gallery = await confirm("Vai ter galeria de fotos?", features.gallery);
  pages.products = features.products;
  pages.projects = features.projects;
  pages.gallery = features.gallery;

  title("7 · SEO");
  const siteUrl = (await ask("URL final do site", {
    fallback: "https://example.com",
    validate: (value) => (/^https?:\/\/.+/.test(value) ? null : "Precisa começar com https://"),
  })).replace(/\/$/, "");
  const defaultTitle = await ask("Título da home", {
    fallback: `${name} em ${city}`,
    validate: (value) => (value.length <= 70 ? null : "Máximo de 70 caracteres."),
  });
  const keywords = normalizeKeywords(await optional("Palavras-chave separadas por vírgula"));

  const data = {
    name,
    slug,
    legalName,
    slogan,
    description,
    whatsapp,
    phone,
    email,
    street,
    number,
    complement,
    district,
    city,
    state,
    zipCode,
    businessPreset,
    template,
    designPreset,
    design,
    features,
    pages,
    composition: resolveComposition(template, features, pages),
    mobileConversion: { enabled: true, actions: mobileActionsFor(template.strategy, features, pages) },
    forms: { contact: { enabled: features.contactForm, delivery: ["resend", "webhook"], maxBodyBytes: 32768, rateLimit: { requests: 5, windowSeconds: 60 } } },
    siteUrl,
    defaultTitle,
    keywords,
    today: new Date().toISOString().slice(0, 10),
  };
  data.mapsEmbedQuery = buildMapsQuery(data);
  return data;
}

function backupConfig(configPath) {
  if (!existsSync(configPath)) return "";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = join(ROOT, ".backup");
  mkdirSync(backupDir, { recursive: true });
  const backupPath = join(backupDir, `client.config.${stamp}.ts`);
  copyFileSync(configPath, backupPath);
  return backupPath;
}

async function main() {
  say(`${c.bold}${c.cyan}\n╔══════════════════════════════════════════╗\n║   NEXORA · novo projeto de cliente       ║\n╚══════════════════════════════════════════╝${c.reset}`);
  if (DRY_RUN) say(`${c.yellow}Modo dry-run: nenhum arquivo será alterado.${c.reset}`);

  const configPath = join(ROOT, "src/config/client.config.ts");
  if (existsSync(configPath) && !FORCE && interactive) {
    const ok = await confirm(`\n${c.yellow}client.config.ts já existe. Sobrescrever?${c.reset}`, false);
    if (!ok) {
      say("Cancelado. Nada foi alterado.");
      rl?.close();
      return;
    }
  } else if (existsSync(configPath) && !FORCE && supplied && !DRY_RUN) {
    throw new Error("client.config.ts já existe. Use --force para sobrescrever em modo --answers.");
  }

  const data = supplied ? fromJson(supplied) : await fromInteractive();
  const configText = buildConfig(data);
  const checklistText = buildChecklist(data);

  if (DRY_RUN) {
    say(`\n${c.green}✓ Configuração válida${c.reset}`);
    say(`Empresa: ${data.name}`);
    say(`Preset: ${data.businessPreset.id}`);
    say(`Template: ${data.template.id}`);
    say(`Visual: ${data.designPreset.id}`);
    say(`Destino: src/config/client.config.ts`);
    say(`Checklist: docs/CLIENTE-${data.slug}.md`);
    say(`Conteúdo demo a neutralizar: ${starterFilesToReplace(data).length} arquivo(s)`);
    say(`\n--- Prévia de client.config.ts ---\n`);
    say(configText);
    rl?.close();
    return;
  }

  const backup = backupConfig(configPath);
  if (backup) say(`${c.dim}Backup em ${backup.replace(`${ROOT}/`, "")}${c.reset}`);

  const starterFiles = starterFilesToReplace(data);
  if (starterFiles.length > 0) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const dataBackupDir = join(ROOT, ".backup", `data-${stamp}`);
    mkdirSync(dataBackupDir, { recursive: true });
    for (const [relative, content] of starterFiles) {
      const target = join(ROOT, relative);
      if (existsSync(target)) {
        copyFileSync(target, join(dataBackupDir, relative.split("/").at(-1)));
      }
      writeFileSync(target, content, "utf8");
    }
    say(`${c.green}✓${c.reset} conteúdo demo removido de ${starterFiles.length} arquivo(s)`);
  }

  writeFileSync(configPath, configText, "utf8");
  say(`${c.green}✓${c.reset} src/config/client.config.ts`);

  const checklistPath = join(ROOT, `docs/CLIENTE-${data.slug}.md`);
  writeFileSync(checklistPath, checklistText, "utf8");
  say(`${c.green}✓${c.reset} docs/CLIENTE-${data.slug}.md`);

  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath) && existsSync(join(ROOT, ".env.example"))) {
    copyFileSync(join(ROOT, ".env.example"), envPath);
    say(`${c.green}✓${c.reset} .env.local`);
  } else if (existsSync(envPath)) {
    say(`${c.dim}· .env.local já existia — mantido${c.reset}`);
  }

  say(`\n${c.bold}Próximos passos${c.reset}`);
  say(`  1. npm run dev`);
  say(`  2. Editar src/data/*.ts`);
  say(`  3. Trocar public/images/`);
  say(`  4. npm run check`);
  rl?.close();
}

main().catch((error) => {
  console.error(`${c.red}Falhou:${c.reset}`, error.message ?? error);
  rl?.close();
  exit(1);
});
