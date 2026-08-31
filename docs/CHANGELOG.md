# Changelog

## 3.0.0 — 2026-08-29

- transforma a base em Nexora Website Platform;
- adiciona Composition Engine e blueprints por segmento;
- adiciona Strategy Engine e Design DNA 2.0;
- amplia a biblioteca de 46 para 71 variantes de seções;
- redistribui os 11 templates para usar as novas linguagens visuais;
- adiciona camada preservada `src/client/` para extensões exclusivas;
- adiciona `nexora` CLI, migração v2→v3, manifest/lock e update de Core com backup;
- adiciona Form Engine declarativo, webhook HMAC e adaptadores opcionais de CRM;
- adiciona barra mobile de conversão, Studio, runtime lab e content stress lab;
- adiciona media audit, architecture guard, composition guard e build matrix de 21 presets;
- adiciona Playwright multi-engine, axe, visual regression e Lighthouse CI;
- adiciona Open Graph dinâmica, preview noindex, health endpoint e logging estruturado;
- documenta segurança, QA, lifecycle, CLI e limitações de validação do ambiente.

## 2.0.0 — 2026-08-27

- compila a v1.2 com os módulos úteis da Base Universal v2;
- adiciona templates `beauty`, `landscaping` e `tech-retail`;
- amplia para 21 presets de negócio e 16 identidades visuais;
- adiciona faixa de anúncio e catálogo pesquisável/filtrável;
- adiciona marcas, categoria, badge, preço anterior, parcelamento, estoque, tags e destaque em produtos;
- adiciona WhatsApp contextual por produto e vitrine na home;
- adiciona `.bat`, exemplos tech e `check-presets`;
- sincroniza a versão em 2.0.0.

## 1.2.0 — 2026-08-26

- adiciona auditoria de cliente com modo estrito para pré-publicação;
- adiciona teste automatizado do gerador em workspace temporário;
- adiciona CI com GitHub Actions;
- adiciona fluxo documentado de deploy na Vercel;
- centraliza mais copy operacional e de páginas em `src/data/ui.ts`;
- adiciona `check-core-generic` para impedir regressão de copy específica dentro do Core;
- endurece `/api/contact` com limite de corpo, normalização, limpeza do rate limit e desativação por feature flag;
- adiciona reabertura/revogação de preferências de cookies no rodapé;
- bloqueia o iframe do Google Maps antes do opt-in e oferece link externo como fallback;
- remove disponibilidade `InStock` inventada do Schema de produtos/serviços; estoque só entra quando informado explicitamente;
- valida tipos e chaves de overrides de `features`/`pages` no gerador JSON;
- remove suposição de domínio oficial da Nexora no crédito do rodapé;
- troca o domínio padrão do gerador por `example.com`, detectado pela auditoria;
- sincroniza `BASE_VERSION`, `package.json` e `package-lock.json` em 1.2.0.

## 1.1.0 — 2026-08-26

- Copy específica da demo removida do Core; textos operacionais ficam em `src/data/ui.ts`.
- Gerador neutraliza automaticamente os 10 arquivos de conteúdo da demo ao criar um cliente novo, sem apagar conteúdo já personalizado em execuções futuras.
- 14 presets de negócio adicionados sobre os 8 templates estruturais.
- `create-client` agora suporta endereço completo, `--answers`, `--dry-run`, `--force` e backups em `.backup/`.
- Analytics, GTM, Meta Pixel e Clarity ficam bloqueados antes do consentimento quando o Cookie Banner está ativo.
- `contactForm=false` é respeitado por todas as variações de contato e pelo Hero 06.
- Formulário pode entregar via Resend ou webhook; produção retorna erro quando não há destino configurado.
- CSP passou a incluir provedores somente quando configurados; `unsafe-eval` fica restrito ao desenvolvimento.
- Documentação, checklists e `.env.example` atualizados para refletir o comportamento real.
