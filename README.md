# NEXORA WEBSITE PLATFORM v3.0

Base-mestre da Nexora para produzir, validar e manter sites profissionais de clientes em **Next.js 16, React 19 e TypeScript**.

A v3 não é apenas um template. Ela separa **estratégia, composição, Design DNA, conteúdo e Core**, permitindo criar sites realmente diferentes sem duplicar a fundação técnica.

## O que existe na v3

- Page Composition Engine: a home é um blueprint declarativo;
- Strategy Engine determinístico por segmento;
- Design DNA com arquétipo, geometria, layout, imagem, elevação, motion e background;
- **71 variantes de seções curadas**;
- 11 templates de estratégia/estrutura;
- 21 presets de negócio;
- 16 identidades visuais;
- blocos de produtos, projetos e equipe;
- camada preservada `src/client/` para exceções realmente exclusivas;
- Form Engine declarativo com Resend, webhook assinado e adaptadores opcionais de CRM;
- Nexora CLI (`create`, `doctor`, `audit`, `media`, `migrate`, `update`, `strategy`, `catalog`, `preview`, `validate`);
- Core versionado + migração v2→v3 + atualização com backup;
- Studio local, runtime lab e content stress lab;
- media audit, architecture guard e composition guard;
- Playwright multi-engine, axe, visual regression e Lighthouse CI;
- preview `noindex`, OG dinâmica e sitemap/robots por ambiente;
- health endpoint e logging estruturado.

## Primeiro uso

```bash
npm ci
npm run nexora -- create
npm run dev
```

Em Windows, o fluxo legado por `.bat` continua disponível onde já existia na base.

## Ambiente interno

- `/dev/components` — catálogo visual do design system;
- `/dev/studio` — sandbox para Design DNA e composição;
- `/dev/stress` — conteúdo extremo para revelar overflow;
- `/dev/variants` — monta todas as variantes registradas em runtime.

Essas rotas retornam 404 em produção.

## Quality gates

Validação rápida:

```bash
npm run doctor
npm run quality:fast
```

Validação principal:

```bash
npm run quality:full
```

QA de navegador é um perfil separado para não aumentar o runtime do cliente:

```bash
npm run setup:qa
npx playwright install chromium firefox webkit
npm run test:e2e
```

Na primeira adoção da regressão visual, gere e **revise conscientemente** os baselines:

```bash
npm run test:visual:update
```

Depois disso:

```bash
npm run test:visual
npm run lighthouse
```

## Criar um cliente

```bash
npm run nexora -- create
```

Ou consulte a estratégia de um segmento antes:

```bash
npm run nexora -- strategy industry
npm run nexora -- strategy pet-shop
```

A ordem da home não pertence mais a `page.tsx`. Ela vive em:

```ts
clientConfig.composition.home
```

## Atualizar o Core

No repositório de um cliente:

```bash
npm run nexora -- update --from ../NEXORA-WEBSITE-PLATFORM
npm install
npm run nexora -- migrate
npm run doctor
```

A operação cria backup e preserva `client.config.ts`, `src/data/**`, `src/client/**`, assets e ambientes do cliente.

## Regra de arquitetura

Personalização normal fica em:

- `src/config/client.config.ts`;
- `src/data/**`;
- `public/**`.

Exceção específica de um único cliente fica em:

- `src/client/**`.

Não adicione `if (clientConfig.slug === "cliente")` ao Core.

## Antes de publicar

```bash
npm run predeploy
```

O `audit:client -- --strict` deve bloquear domínio de exemplo, conteúdo demo, textos jurídicos não revisados e configuração incompleta.

## Documentação essencial

Leia nesta ordem:

1. `ARCHITECTURE.md`
2. `AI-CONTRACT.md`
3. `CHANGE-POLICY.md`
4. `docs/PLATFORM-V3-ARCHITECTURE.md`
5. `docs/NEXORA-CLI.md`
6. `docs/QUALITY-GATES-v3.md`
7. `docs/SECURITY-v3.md`
8. `docs/FORM-ENGINE-v3.md`
9. `docs/STUDIO-v3.md`
10. `docs/MIGRATION-v2-v3.md`
