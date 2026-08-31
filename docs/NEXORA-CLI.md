# Nexora CLI

```bash
npm run nexora -- help
npm run nexora -- create
npm run nexora -- doctor
npm run nexora -- audit --strict
npm run nexora -- media
npm run nexora -- strategy auto-electric
npm run nexora -- catalog
npm run nexora -- migrate
npm run nexora -- update --from ../NEXORA-WEBSITE-PLATFORM
npm run nexora -- preview
npm run nexora -- validate
```

## `doctor`

Verifica presets, composição, Core genérico, arquitetura, imagens e mídia sem precisar abrir o navegador.

## `update`

A origem precisa conter `platform/core-manifest.json`. A atualização faz backup em `.backup/core-update-*`, sincroniza caminhos controlados e mescla scripts/dependências de `package.json`, preservando dependências extras do projeto cliente.
