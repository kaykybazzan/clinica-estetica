# AI Contract — Nexora Platform v3

Regras obrigatórias para qualquer IA que modifique um projeto Nexora.

## O que pode mudar para personalizar um cliente

- `src/config/client.config.ts`
- `src/data/**`
- `public/**`
- arquivos de ambiente e documentação específica do cliente

## O que não deve ser alterado para personalização comum

- `src/components/**`
- `src/sections/**`
- `src/platform/**`
- `src/forms/**`
- `src/seo/**`
- `src/styles/**`

Alterar Core só é aceitável quando a mudança é **genérica, reutilizável e acompanhada de teste**.

## Proibições

- Não hardcodar telefone, WhatsApp, empresa ou domínio no Core.
- Não usar `<img>`; usar `SmartImage`/`next/image`.
- Não adicionar HEX diretamente em componentes; criar/usar token.
- Não criar uma nova variante apenas para mudar copy.
- Não duplicar formulário/SEO/analytics por cliente.
- Não expor segredo em variável `NEXT_PUBLIC_*`.
- Não remover quality gates para fazer um build passar.

## Antes de concluir

Executar `npm run doctor`, `npm run quality:full` e, quando browsers estiverem instalados, `npm run test:e2e`.
