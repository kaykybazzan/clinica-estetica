# Segurança — Nexora Website Platform v3

## Modelo

A base trata segurança em camadas. Nenhuma camada isolada é considerada suficiente.

### Aplicação

- CSP, HSTS, Referrer-Policy, Permissions-Policy e proteção contra framing;
- `X-Content-Type-Options: nosniff`;
- preview com `X-Robots-Tag: noindex, nofollow`;
- secrets apenas server-side;
- limite de tamanho de body;
- `Content-Type` obrigatório no formulário;
- bloqueio de POST `cross-site` sinalizado pelo navegador;
- honeypot + timing trap;
- validação server-side compartilhada;
- timeout em integrações externas;
- request id por lead;
- webhook opcionalmente assinado com HMAC-SHA256 (`X-Nexora-Signature`).

### Rate limiting

Existe uma barreira em memória, útil localmente e como segunda linha de defesa. Em produção serverless, **não trate essa memória como limite distribuído**.

Use também firewall/edge rate limiting do provedor de hospedagem ou um storage distribuído.

### CSP

A configuração padrão prioriza compatibilidade com Next.js e provedores opcionais. Não remova CSP para resolver integração de terceiros.

Uma política baseada em nonce pode ser adotada em aplicações que realmente precisem de um perfil mais restritivo, mas deve ser implementada como projeto específico porque altera estratégia de renderização/cache. Não ative um “strict mode” fictício que quebre scripts do Next.

## Segredos

Proibido:

```text
NEXT_PUBLIC_*SECRET*
NEXT_PUBLIC_*TOKEN*
NEXT_PUBLIC_*API_KEY*
```

Credenciais suportadas ficam em `.env.local` / painel do provedor e nunca entram no Git.

## Webhook assinado

Se `CONTACT_WEBHOOK_SECRET` existir, o corpo JSON é assinado:

```text
X-Nexora-Signature: sha256=<hex>
```

O receptor deve recalcular o HMAC usando o **body bruto** e comparar em tempo constante.

## Checklist de produção

1. `npm run predeploy` aprovado;
2. domínio final configurado;
3. preview noindex confirmado;
4. env vars separadas por ambiente;
5. firewall/rate limit configurado para `/api/contact`;
6. credenciais com menor privilégio possível;
7. webhook HTTPS e assinatura ativa quando suportada;
8. logs sem conteúdo sensível desnecessário;
9. dependências auditadas;
10. política de cookies compatível com os scripts habilitados.
