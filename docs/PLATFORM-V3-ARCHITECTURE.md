# Nexora Website Platform v3.0

## O que mudou da v2

A v2 era uma base reutilizável com presets e variantes. A v3 adiciona uma camada de plataforma para que a estrutura do site seja uma configuração, não código de página.

### Principais capacidades

- `PageComposer` e blueprints por segmento;
- Strategy Engine determinístico;
- Design DNA (arquétipo, geometria, layout, imagem, elevação, motion e background);
- blocos home de produtos, projetos e equipe;
- Nexora CLI;
- Core versionado com migração/update;
- Form Engine declarativo;
- Studio local;
- runtime lab + stress lab;
- media audit;
- quality gates arquiteturais;
- Playwright multi-engine;
- axe WCAG 2.2 AA automatizado;
- visual regression em 390/768/1440;
- Lighthouse CI;
- preview `noindex`;
- OG image dinâmica;
- health endpoint e ponto de instrumentação.

## Fluxo de produção

`briefing -> preset de negócio -> template -> strategy -> composition -> Design DNA -> conteúdo/assets -> Studio -> doctor -> build -> E2E/a11y/visual -> Lighthouse -> audit:client --strict -> produção`

## Composition Engine

A home é definida em `clientConfig.composition.home`:

```ts
composition: {
  home: [
    { id: "hero", type: "hero" },
    { id: "services", type: "services", props: { limit: 6 } },
    { id: "projects", type: "projects", props: { limit: 3 } },
    { id: "cta", type: "cta" },
    { id: "contact", type: "contact" },
  ]
}
```

`src/app/page.tsx` não deve voltar a conhecer a ordem dos blocos.

## Core Lifecycle

`platform/core-manifest.json` separa caminhos controlados dos caminhos de cliente. `nexora update --from PATH` atualiza o Core e preserva conteúdo/config/assets. A operação cria backup antes de substituir arquivos.
