# Deploy na Vercel — Nexora Platform v3

## 1. Gate local obrigatório

```bash
npm ci
npm run predeploy
```

O `predeploy` executa quality gates principais e auditoria estrita do cliente. Ele deve falhar enquanto houver dados demo, domínio provisório, placeholders ou textos jurídicos não revisados.

Quando o perfil QA estiver disponível:

```bash
npm run setup:qa
npx playwright install chromium firefox webkit
npm run test:e2e
npm run lighthouse
```

## 2. Variáveis de ambiente

Cadastre somente o que o projeto realmente usa.

### Analytics

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_ID`

Com Cookie Banner ativo, integrações não essenciais dependem do consentimento.

### Leads — Resend

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL` (opcional)

### Leads — Webhook

- `CONTACT_WEBHOOK_URL`
- `CONTACT_WEBHOOK_SECRET` (recomendado quando o receptor puder validar HMAC)

### Leads — CRM opcionais

- HubSpot: `HUBSPOT_ACCESS_TOKEN`
- Pipedrive: `PIPEDRIVE_COMPANY_DOMAIN` + `PIPEDRIVE_API_TOKEN`
- RD Station: `RDSTATION_API_KEY` + `RDSTATION_CONVERSION_IDENTIFIER`

Nunca coloque essas credenciais em `NEXT_PUBLIC_*`.

## 3. Projeto

1. Importe o repositório do cliente.
2. Framework: Next.js.
3. Node: compatível com `package.json` (>=20.9; CI usa Node 22).
4. Build command padrão.
5. Cadastre env vars por ambiente.
6. Faça deploy Preview.

## 4. Preview

O código aplica `noindex, nofollow` automaticamente quando `VERCEL_ENV=preview`.

Ainda assim confirme no Preview:

- header `X-Robots-Tag`;
- `/robots.txt` bloqueado;
- formulário e integrações usando credenciais de teste quando aplicável.

## 5. Segurança de borda

Configure firewall/rate limit para `/api/contact` no provedor de hospedagem. O limiter interno da aplicação é apenas uma segunda barreira e não substitui controle distribuído em serverless.

## 6. Domínio final

1. adicione o domínio oficial;
2. atualize `clientConfig.seo.siteUrl`;
3. confirme HTTPS;
4. execute novamente `npm run predeploy`;
5. publique produção.

Não deixe `example.com`, localhost ou domínio de Preview como canonical.

## 7. Pós-deploy

Confira:

- `/`;
- `/robots.txt`;
- `/sitemap.xml`;
- `/opengraph-image`;
- `/api/health`;
- páginas legais;
- formulário e destino do lead;
- WhatsApp e telefone;
- mapa/rota;
- consentimento;
- 404 das rotas `/dev/*` em produção;
- Search Console quando o domínio estiver pronto;
- Web Vitals reais após tráfego suficiente.
