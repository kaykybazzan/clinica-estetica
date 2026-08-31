# Nexora Website Platform v3 — Architecture

## Objetivo

A Platform v3 é uma base-mestre para produção de sites de clientes. O cliente fornece **dados e decisões**; o Core fornece **implementação, qualidade e atualização**.

## Camadas

1. **Client Contract** — `src/config/client.config.ts` + `src/data/*` + `public/*`.
2. **Strategy Engine** — estratégia comercial e blueprint inicial por segmento.
3. **Composition Engine** — `PageComposer` transforma `composition.home` em uma página real.
4. **Design Engine** — Design DNA vira custom properties no servidor, sem flash de tema.
5. **Block Library** — variantes registradas em `src/sections/registry.ts`.
6. **Form Engine** — campos declarativos, validação compartilhada, anti-spam e adapters.
7. **SEO / Analytics / Integrations** — capacidades transversais sem copy de cliente no Core.
8. **Quality Platform** — lint, TypeScript, arquitetura, composição, mídia, build, Playwright, axe e Lighthouse.
9. **Core Lifecycle** — `platformVersion`, `core.lock.json`, migrações e `nexora update`.

## Regra de dependência

`client config/data -> platform/core`, nunca o inverso para copy específica. Componentes de Core podem consumir data contracts, mas não podem conter nomes, telefones, domínio ou linguagem de um cliente específico.

## Arquivos preservados em update

- `src/config/client.config.ts`
- `src/data/**`
- `public/**`
- `.env*`

O manifesto completo está em `platform/core-manifest.json`.
