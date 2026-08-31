# AI-INSTRUCTIONS — Nexora Website Platform v3

Leia `AI-CONTRACT.md`, `ARCHITECTURE.md` e este arquivo **antes de alterar código**.

## Regra número um

**Não edite o Core para personalizar conteúdo de um cliente.**

Antes de escrever código, classifique o pedido:

1. conteúdo/dados → `src/data/**`;
2. telefone, cores, estratégia, features, SEO → `src/config/client.config.ts`;
3. ordem da home → `clientConfig.composition.home`;
4. variante visual genérica → `clientConfig.sections` ou `block.variant`;
5. capacidade reutilizável ausente → implemente de forma genérica no Core;
6. exceção realmente única → `src/client/**`.

Nunca use `if (clientConfig.slug === "...")` no Core.

## Áreas do repositório

### Core compartilhado

- `src/components/`
- `src/sections/`
- `src/styles/`
- `src/utils/`
- `src/hooks/`
- `src/forms/`
- `src/seo/`
- `src/integrations/`
- `src/analytics/`
- `src/platform/`
- `src/observability/`
- `src/app/` (rotas da plataforma)

### Contrato do cliente

- `src/config/client.config.ts`
- `src/data/**`
- `public/**`

### Extensão exclusiva preservada

- `src/client/**`

## Mapeamento de pedidos

| Pedido | Local correto |
| --- | --- |
| cor, fonte, densidade, radius | `client.config.ts -> design` |
| linguagem visual | `design.archetype` + Design DNA |
| objetivo comercial | `strategy` |
| ordem da home | `composition.home` |
| outro hero/serviços/etc. | `sections` ou `block.variant` |
| remover recurso/página | `features` / `pages` |
| conteúdo de serviços/produtos | `src/data/**` |
| telefone/endereço/horário | `client.config.ts` |
| SEO | `client.config.ts -> seo` |
| campos do formulário | `forms.contact.fields` |
| ordem de entrega do lead | `forms.contact.delivery` |
| exceção de um cliente | `src/client/**` |

## Ao criar uma variante genérica

1. crie `src/sections/<family>/<Family>NN.tsx`;
2. use a interface da família em `src/sections/types.ts`;
3. todo conteúdo padrão vem de `src/data/**` e pode ser sobrescrito por props;
4. documente em uma linha quando usar a variante;
5. registre em `src/sections/registry.ts`;
6. adicione o id ao enum em `client.schema.ts`;
7. rode `node scripts/export-catalog.mjs`;
8. rode `npm run doctor` e `npm run validate`.

## Ao criar um bloco exclusivo

1. implemente em `src/client/`;
2. registre em `src/client/blocks.tsx`;
3. use `{ type: "custom", variant: "..." }` na composição;
4. não importe esse bloco para `src/sections/` nem `src/components/`.

## Convenções obrigatórias

- Server Components por padrão; `"use client"` apenas onde evento/estado/browser forem necessários.
- Nada de `<img>` cru; use `SmartImage` ou `next/image` com `sizes`.
- Nada de cor hex em JSX do Core; use tokens.
- Nada de segredo em `NEXT_PUBLIC_*`.
- Nada de classes Tailwind construídas por interpolação dinâmica.
- Nunca invente depoimentos, certificações, estatísticas ou estoque de cliente real.
- Controles precisam de nome acessível, foco visível e alvo de toque adequado.
- Respeite `prefers-reduced-motion`.
- Não altere snapshots visuais apenas para “fazer CI passar”; primeiro confirme que a mudança visual é intencional.
- Não publique preview/indexação provisória.

## Form Engine

Não volte a codificar campos diretamente no `ContactForm`. Campos pertencem ao schema/config.

A API deve continuar validando no servidor mesmo que a UI valide no navegador. Adaptadores de entrega nunca podem expor tokens ao frontend.

## Antes de entregar qualquer alteração

```bash
npm run doctor
npm run quality:full
```

Quando QA de navegador estiver instalado:

```bash
npm run test:e2e
npm run lighthouse
```

Antes de produção:

```bash
npm run predeploy
```

Qualquer falha precisa ser resolvida ou explicitamente documentada; não esconda erro para concluir a tarefa.
