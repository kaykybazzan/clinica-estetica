# Como usar a base

## Para que ela serve

Produzir sites de cliente rápido, sem que a qualidade dependa de quem está
executando. Tudo que costuma variar entre um cliente e outro — identidade,
seções, páginas, conteúdo, SEO — está isolado em três lugares:

1. `src/config/client.config.ts` — as decisões
2. `src/data/` — o conteúdo
3. `public/images/` — as imagens

O resto é core e vale para todos os projetos.

## Fluxo de trabalho

```
1. copiar a base            → cp -r NEXORA-WEBSITE-BASE cliente-x
2. gerar a configuração     → npm run create-client
3. preencher o conteúdo     → src/data/*
4. trocar as imagens        → public/images/*
5. revisar SEO e jurídico   → docs/CHECKLIST-SEO.md e src/data/legal.ts
6. auditar                  → npm run check
7. publicar                 → docs/CHECKLIST-PUBLICACAO.md
```

## As três alavancas do `client.config.ts`

### `sections` — qual layout
Cada família tem várias variações. Trocar `hero: "hero-02"` por `"hero-04"` muda
o layout inteiro do herói sem tocar em código. Veja todas em
`http://localhost:3000/dev/components`.

### `features` — o que existe no site
Desliga blocos e recursos: galeria, depoimentos, estatísticas, botão flutuante
do WhatsApp, formulário, mapa, banner de cookies, animações, faixa de anúncio e recursos do catálogo. Um recurso
desligado não é escondido por CSS — ele não é renderizado.

### `pages` — quais páginas existem
Desligar uma página faz três coisas ao mesmo tempo: some do menu, some do
sitemap e passa a responder 404. Não sobra rota órfã para o Google indexar.

## Identidade visual

Todo o visual sai de `design`. As cores derivadas (hover, versões suaves,
contornos) são calculadas com `color-mix()` a partir das cores base — você
define 9 cores e o sistema resolve as dezenas de variações.

Para trocar tipografia, mude `headingFont` e `bodyFont` para qualquer família do
Google Fonts. Para zero webfont, use o preset `system-neutral` ou
`fontProvider: "system"`.

## Conteúdo

Cada arquivo em `src/data/` exporta um array tipado. O tipo está em
`src/types/content.ts` — se faltar um campo obrigatório, o TypeScript avisa
antes do build.

Ordem sugerida de preenchimento: `company.ts` → `services.ts` → `faq.ts` →
`testimonials.ts` → `benefits.ts` → `stats.ts` → `gallery.ts` → o resto.

## Imagens

Mantenha os nomes de arquivo dos placeholders e substitua o conteúdo — assim
nada quebra. As proporções esperadas estão no rótulo de cada placeholder e nas
`width`/`height` declaradas em `src/data/`. Sempre exporte na proporção certa:
o `SmartImage` recorta com `object-cover`, mas uma proporção errada desperdiça
bytes e corta o que importa.

Rode `npm run check-images` para confirmar que nada ficou faltando.

## Catálogo avançado

Com produtos ativos, use `catalogSearch`, `catalogFilters` e `catalogBrands`.
`Product` aceita também `category`, `compareAtPrice`, `badge`, `installment`, `stockLabel`, `tags` e `featured`. O CTA de cada item abre o WhatsApp com produto e SKU.

Exemplo: `docs/snippets/products-informatica.example.ts`.
