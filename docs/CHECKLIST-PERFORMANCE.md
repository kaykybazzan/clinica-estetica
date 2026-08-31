# Checklist de performance

Meta: 90+ em Performance no Lighthouse mobile, com throttling padrão.

## Imagens — onde quase todo problema mora
- [ ] Todas passando por `SmartImage` ou `next/image`
- [ ] `sizes` declarado e coerente com o layout real da coluna
- [ ] Só a imagem do herói com `priority`; nenhuma outra
- [ ] Proporção do arquivo igual à proporção exibida
- [ ] Nenhum arquivo acima de 400 KB (`npm run check-images`)
- [ ] `width` e `height` sempre declarados — é o que segura o CLS

## JavaScript
- [ ] Nenhuma seção marcada como `"use client"` inteira
- [ ] `"use client"` só nas folhas que precisam
- [ ] Nenhuma biblioteca adicionada sem necessidade comprovada
- [ ] Nenhum ícone importado de pacote externo (use `Icon.tsx`)

## CSS e fontes
- [ ] No máximo duas famílias de fonte
- [ ] No máximo três pesos por família
- [ ] `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com` presente
- [ ] Considere `fontProvider: "system"` quando o cliente não tiver marca tipográfica

## Terceiros
- [ ] Só os analytics realmente usados estão no `.env`
- [ ] Mapa com `loading="lazy"` (padrão do `MapEmbed`)
- [ ] Nenhum widget de chat/pop-up adicionado sem medir o impacto antes e depois

## Core Web Vitals — o que costuma quebrar cada um
- **LCP**: imagem do herói pesada, ou sem `priority`, ou fonte bloqueando o render
- **CLS**: imagem sem dimensão, banner que empurra o conteúdo, fonte trocando com salto
- **INP**: JavaScript de terceiro, ou listener de scroll sem `passive`

## Medição
- [ ] Lighthouse rodado sobre `npm run build && npm run start` — nunca sobre `dev`
- [ ] Testado em 360px de largura e em rede lenta simulada
- [ ] Conferido também em uma página interna, não só na home
