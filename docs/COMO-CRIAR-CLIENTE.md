# Como criar um cliente novo

A base foi feita para o código estrutural ser reaproveitado e o conteúdo do cliente ficar separado.

## 1. Copiar a base

```bash
cp -r NEXORA-WEBSITE-BASE cliente-nome
cd cliente-nome
rm -rf .git node_modules .next
npm install
```

## 2. Rodar o gerador interativo

```bash
npm run create-client
```

O gerador pergunta nome, slug, razão social, slogan, descrição, contatos, endereço, cidade/UF, tipo de negócio, identidade visual, páginas, recursos e SEO.

### Presets de negócio disponíveis

- `pet-shop`
- `veterinary`
- `restaurant`
- `pizzeria`
- `workshop`
- `auto-electric`
- `lawyer`
- `accountant`
- `real-estate`
- `clinic`
- `dentist`
- `industry`
- `agriculture`
- `barbershop`
- `hair-salon`
- `beauty-salon`
- `landscaping`
- `garden-maintenance`
- `computer-store`
- `computer-repair`
- `local-business`

Cada preset escolhe um template estrutural e um tipo Schema.org. Alguns também sugerem um preset visual próprio, que ainda pode ser trocado no gerador.

## 3. Modo por arquivo JSON

Copie o exemplo:

```bash
cp docs/client.answers.example.json cliente.json
```

Edite os dados e rode:

```bash
npm run create-client -- --answers cliente.json --force
```

Para validar sem escrever nada:

```bash
npm run create-client -- --answers cliente.json --dry-run
```

No modo `--answers`, se `client.config.ts` já existir, use `--force` para confirmar a substituição. Mesmo com `--force`, a versão anterior é salva em `.backup/`.

## 4. Backup

Antes de sobrescrever `src/config/client.config.ts`, o gerador cria automaticamente:

```text
.backup/client.config.<data-hora>.ts
```

`--dry-run` nunca cria backup nem altera arquivos.

## 5. O que o gerador escreve

| Arquivo | Conteúdo |
| --- | --- |
| `src/config/client.config.ts` | configuração do cliente, endereço, template, visual, recursos e SEO |
| `docs/CLIENTE-<slug>.md` | checklist específico do projeto |
| `.env.local` | cópia de `.env.example`, somente se ainda não existir |

O gerador neutraliza apenas arquivos ainda marcados como conteúdo demo/base. Arquivos já personalizados são preservados.

## 6. Preencher conteúdo

Revise principalmente:

- `src/data/announcement.ts`
- `src/data/catalog.ts`
- `src/data/company.ts`
- `src/data/ui.ts`
- `src/data/services.ts`
- `src/data/benefits.ts`
- `src/data/stats.ts`
- `src/data/faq.ts`
- `src/data/testimonials.ts`
- `src/data/gallery.ts`
- `src/data/team.ts`
- `src/data/products.ts`
- `src/data/projects.ts`
- `src/data/navigation.ts`

`src/data/ui.ts` concentra frases operacionais de interface e formulário para evitar texto específico de segmento dentro dos componentes.

## 7. Imagens

Troque as imagens demo por arquivos reais do cliente. Mantenha proporção e dimensões coerentes.

Também revise:

- `public/favicon/*`
- `public/icons/logo.svg`
- `public/og/default.jpg`

Depois execute:

```bash
npm run check-images
```

## 8. Analytics e consentimento

As integrações de medição são configuradas em `.env.local`.

Quando `features.cookieBanner` estiver ativo, GA, GTM, Meta Pixel e Clarity só são carregados depois que o visitante seleciona **Aceitar**.

Se o visitante escolher **Só essenciais**, os scripts de medição não são carregados.

Se `cookieBanner` for desativado, a decisão sobre consentimento passa a ser responsabilidade da implementação do cliente e da revisão jurídica do projeto.

## 9. Auditar

```bash
npm run check
```

Esse comando executa lint, typecheck, auditoria de imagens e build de produção.

Depois siga:

- `docs/CHECKLIST-CLIENTE.md`
- `docs/CHECKLIST-PUBLICACAO.md`
- `docs/CHECKLIST-SEO.md`
- `docs/CHECKLIST-PERFORMANCE.md`
