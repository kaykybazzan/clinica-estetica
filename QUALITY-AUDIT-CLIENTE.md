# Auditoria — Atelier Estética / Nexora v3

Data: 2026-08-31

## Escopo

A versão anterior em HTML foi substituída por um cliente completo sobre a **Nexora Website Platform v3**. A personalização usa `client.config.ts`, `src/data/**`, Design DNA, PageComposer e a camada preservada `src/client/**`.

## Diferenciação visual aplicada

- hero assimétrico com tipografia fantasma, colagem e microtipografia editorial;
- manifesto de alto contraste em preto quente + champanhe;
- “Atlas de Cuidados” em lista editorial sticky, sem grade de cards genéricos;
- jornada em tríptico fotográfico de tela larga;
- uso mais contido do rosé: assinatura em vez de fundo dominante;
- Bodoni Moda + Manrope no lugar do Cormorant/Inter usado anteriormente;
- grid wide/asymmetric, radius reduzido e cards flat;
- galeria editorial da própria base combinada com blocos exclusivos;
- conversão por avaliação/formulário, sem expor WhatsApp, telefone ou endereço fictício.

## Recursos da base realmente utilizados

- Design DNA: `luxury`, `asymmetric`, `editorial`, motion regular/slow;
- PageComposer e composição declarativa;
- `src/client/` com 5 blocos exclusivos;
- `SmartImage`, `Reveal`, `Section`, `Container`, `Button`, `ContactForm`;
- Benefits06, Gallery05, Faq05 e Footer05;
- páginas internas de serviços, galeria, FAQ e contato;
- SEO, JSON-LD, sitemap, robots, OG e health endpoint;
- Form Engine + validação + rate limit + honeypot;
- Studio local `/dev/studio`;
- mobile conversion bar configurada para contato;
- camada legal ajustada para o preview demonstrativo.

## Quality gates executados

Passaram:

- `check-images` — 23 referências verificadas;
- `media-audit` — 53 arquivos / ~2.05 MB;
- `check-core-generic`;
- `check-architecture`;
- `check-composition`;
- `check-presets` — 21 negócios, 16 visuais, 11 templates;
- `audit-client` — 0 erros;
- parser TypeScript — 207 arquivos TS/TSX, 0 erros de sintaxe;
- preview visual revisado em 1440×900 e 390×844.

## Observação do ambiente de build

O ambiente desta execução não conseguiu concluir `npm ci` por restrição/timeout de acesso ao registro NPM. Por isso o `npm run quality:full`/`next build` não pôde ser executado aqui. A estrutura mantém `package-lock.json` e `INICIAR-SITE.bat`, que instala as dependências no computador do usuário antes de iniciar o Next.js.

O `audit-client` apresenta somente o aviso esperado de que nenhum provedor real de entrega de formulário foi configurado. Isso é intencional neste modelo sem dados reais.
