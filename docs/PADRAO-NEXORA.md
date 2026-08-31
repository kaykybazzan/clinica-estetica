# Padrão Nexora — decisões de arquitetura

Este documento registra **por que** a base é assim. Quando algo aqui deixar de
fazer sentido, mude o documento junto com o código.

## 1. Configuração como fonte única

Um único arquivo (`client.config.ts`) controla identidade, seções, páginas, SEO
e integrações. O schema Zod (`client.schema.ts`) é a fonte dos tipos **e** da
validação — os tipos são inferidos com `z.infer`, então não existe a
possibilidade clássica de o tipo dizer uma coisa e o validador outra.

A validação roda em `assert-config.ts`, importado apenas pelo layout raiz (um
Server Component). Resultado: erro de configuração aparece imediatamente no
`npm run dev`, e o Zod não vai para o bundle do navegador.

## 2. Seleção de variação por registry, nunca por condicional

`src/sections/registry.ts` mapeia id → componente. `src/sections/index.tsx`
expõe slots tipados (`<HeroSection />`) que leem o id do config.

Por que não `if/else`: com 46 variações, uma cadeia condicional vira o ponto em
que todo mundo mexe e ninguém entende. Com o registry, adicionar variação é uma
linha no mapa e um id no enum — e o TypeScript garante que todo id do enum tem
componente correspondente, porque o mapa é `Record<ClientSections["hero"], …>`.

## 3. Server Components por padrão

Todas as seções são Server Components. Interatividade fica em folhas client
pequenas: `Accordion`, `Carousel`, `Modal`, `Tabs`, `Lightbox`, `Counter`,
`Reveal`, `ContactForm`, `Header`, `CookieBanner`, `BackToTop`.

Consequência importante: **o registry estático não pesa no bundle**. Um Server
Component que não é renderizado nunca é serializado para o cliente, então
importar as 46 variações não custa JavaScript ao visitante. Foi por isso que
`next/dynamic` foi descartado — ele resolveria um problema que não existe e
custaria uma cascata de loading.

## 4. Tokens de design em CSS, tema injetado no servidor

`src/styles/tokens.css` define os tokens `--nx-*`; o `@theme inline` do Tailwind
v4 os expõe como utilitários (`bg-primary`, `text-fg-soft`). O tema do cliente é
gerado por `buildThemeCss()` e injetado como `<style>` no `<head>` durante o
render do servidor — sem flash de identidade errada.

Cores derivadas (hover, versões suaves, contornos) saem de `color-mix()`. Você
define 9 cores; o sistema calcula as dezenas de variações. Nenhuma biblioteca
de cor foi necessária.

## 5. Fontes por `<link>`, não por `next/font`

`next/font` baixa a fonte em build e a fixa no código. Como a base precisa que
trocar de tipografia seja **só editar o config**, as famílias são carregadas por
`<link>` com `preconnect`.

Trade-off assumido: uma conexão externa a mais. Se um projeto específico exigir
LCP máximo, migre para `next/font` naquele projeto — ou use
`fontProvider: "system"`, que não carrega webfont nenhuma.

## 6. Zero dependências além de Next, React e Zod

Ícones (`Icon.tsx`, ~45 glifos), utilitário de classes (`cn`) e animações
(`animations.css` + `Reveal`) são próprios. Cada dependência evitada é uma
atualização de segurança que não precisamos acompanhar e alguns KB a menos.

## 7. Animações por CSS e atributo de dado

`Reveal` marca o elemento com `data-reveal`, `data-reveal-ready` e
`data-reveal-visible`; o CSS faz o resto. O estado "pronto" é escrito direto no
DOM, não em `useState`, porque é um sinal de mão única para o CSS — React não
precisa re-renderizar por causa dele.

O conteúdo é renderizado no estado final no servidor e só recebe o deslocamento
depois de montado. Quem está sem JavaScript, ou um crawler, vê o layout
completo. `prefers-reduced-motion` desliga tudo.

## 8. Estado externo com `useSyncExternalStore`

`useMediaQuery`, `useScrolledPast` e o consentimento de cookies leem fontes
externas (matchMedia, scroll, localStorage). Todos usam `useSyncExternalStore`
com snapshot de servidor estável — sem `setState` dentro de efeito, sem
mismatch de hidratação, sem re-render a cada evento de scroll.

## 9. JSON-LD em grafo único

`schema.ts` monta um `@graph` com `@id` estáveis (`/#website`, `/#business`,
`/#place`). Entidades se referenciam por `@id` em vez de repetir o objeto —
é o que evita o Google ver a mesma empresa declarada cinco vezes.

`FAQPage` existe **apenas** em `/faq`. O bloco de FAQ da home é HTML comum, sem
marcação: duas páginas marcando as mesmas perguntas é motivo de penalização.

## 10. Formulário: validação em três camadas

1. No cliente, para feedback imediato e acessível (`aria-invalid`, resumo com
   foco automático).
2. Honeypot invisível + carimbo de tempo, para bot que preenche tudo em 200ms.
3. No servidor (`/api/contact`), que revalida, limita o corpo a 32 KB, aplica
   rate limit básico por IP e só então entrega. A rota responde 404 quando
   `features.contactForm=false`.

A entrega suporta duas rotas sem expor segredo no navegador:

- **Resend**: `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` e, opcionalmente, `CONTACT_TO_EMAIL`.
- **Webhook**: `CONTACT_WEBHOOK_URL` para Make, n8n, Zapier, CRM ou endpoint próprio.

Em produção, se o formulário estiver ativo e nenhum destino estiver configurado, a API retorna erro em vez de fingir sucesso.

O rate limit em memória protege contra abuso simples, mas é local a cada instância
serverless. Projetos com tráfego ou risco de abuso elevados devem complementar
isso com Vercel Firewall/WAF ou um limitador distribuído.

## 11. Analytics é opt-in

Nenhum script de medição carrega sem a variável de ambiente correspondente. Com
`features.cookieBanner=true`, GA, GTM, Meta Pixel e Clarity também ficam
bloqueados até o visitante aceitar cookies de medição e conteúdo externo. A opção **Só essenciais**
mantém essas tags descarregadas. O mapa incorporado também fica bloqueado e é
substituído por endereço + link externo. O rodapé oferece **Preferências de cookies**
para reabrir o banner; se uma autorização anterior for revogada, a página é
recarregada para iniciar novamente sem os scripts de medição.

## 12. Convenções de código

- Identificadores e comentários em inglês; texto de interface em português.
- Um arquivo por componente, nome do arquivo igual ao do export.
- Props opcionais com valor padrão vindo de `src/data/`.
- Comentário no topo de cada variação dizendo **quando** usá-la.
- Nada de classe Tailwind por interpolação de string.
