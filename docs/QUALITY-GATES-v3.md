# Quality Gates v3

A plataforma separa checks de código, navegador e laboratório. O objetivo é impedir que “build passou” seja confundido com “site pronto”.

## 1. Diagnóstico sem build

```bash
npm run doctor
```

Valida presets, composição, Core genérico, arquitetura, referências e mídia.

## 2. Gate rápido

```bash
npm run quality:fast
```

Inclui:

- ESLint;
- TypeScript;
- imagens referenciadas;
- media audit;
- Core genérico;
- architecture guard;
- composition guard;
- presets/templates.

## 3. Gate principal

```bash
npm run quality:full
```

Acrescenta:

- testes do gerador;
- build matrix dos 21 presets;
- build de produção.

## 4. Perfil QA de navegador

As ferramentas pesadas ficam fora das dependências de runtime do cliente.

```bash
npm run setup:qa
npx playwright install chromium firefox webkit
```

Depois:

```bash
npm run test:e2e
```

A matriz cobre Chromium mobile/tablet/desktop, Firefox desktop e WebKit mobile.

### Runtime lab

`/dev/variants` monta todas as variantes registradas para detectar imports/renderizações quebradas.

### Content stress lab

`/dev/stress` usa títulos, descrições e listas deliberadamente grandes para revelar overflow e componentes frágeis.

## 5. Acessibilidade

```bash
npm run test:a11y
```

O suite usa axe e WCAG 2.x A/AA, incluindo tags WCAG 2.2 AA.

Automação não substitui revisão manual de teclado, leitura, contraste contextual e ordem de foco.

## 6. Visual regression

Primeira adoção:

```bash
npm run test:visual:update
```

Revise as imagens geradas antes de commitá-las. Sem baseline aprovado, os testes visuais são explicitamente ignorados em vez de criar uma referência falsa.

Depois:

```bash
npm run test:visual
```

Baselines: home + catálogo de componentes em 390, 768 e 1440 px, Chromium e `reduced-motion`.

## 7. Lighthouse CI

```bash
npm run lighthouse
```

Budgets atuais:

- Performance ≥ 90;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 95;
- CLS ≤ 0,10;
- alerta se LCP > 2,5 s;
- alerta se TBT > 300 ms.

Relatórios ficam em `./lhci_reports`; não são publicados em storage público temporário por padrão.

## 8. Produção

```bash
npm run predeploy
```

Adiciona `audit:client -- --strict` para bloquear dados demo, placeholders, domínio provisório e pendências jurídicas.
