# Form Engine v3

O formulário não deve voltar a ter campos codificados diretamente no JSX. O contrato fica em `clientConfig.forms.contact`.

## Campos

```ts
forms: {
  contact: {
    enabled: true,
    fields: [
      { name: "name", label: "Nome", type: "text", required: true },
      { name: "phone", label: "WhatsApp", type: "tel", required: true },
      { name: "service", label: "Serviço", type: "select", source: "services" },
      { name: "message", label: "Mensagem", type: "textarea", required: true, fullWidth: true },
    ],
  },
}
```

Tipos suportados: `text`, `email`, `tel`, `textarea`, `select`.

## Segurança

O navegador valida para UX, mas a API repete as regras no servidor. A rota também possui:

- `Content-Type` obrigatório;
- body limit;
- honeypot;
- timing trap;
- bloqueio de POST browser `cross-site`;
- rate limit in-process;
- request id;
- timeout de integrações.

Em serverless, use também rate limit/firewall distribuído na borda.

## Entrega

A ordem é declarativa:

```ts
delivery: ["hubspot", "resend", "webhook"]
```

Adaptadores disponíveis:

- `resend`;
- `webhook`;
- `hubspot`;
- `pipedrive`;
- `rdstation`.

O primeiro adaptador configurado que entregar com sucesso encerra a cadeia. Falhas seguem para o próximo.

## Webhook HMAC

Com `CONTACT_WEBHOOK_SECRET`, o payload recebe:

```text
X-Nexora-Signature: sha256=<assinatura>
X-Nexora-Request-ID: <uuid>
```

## Desenvolvimento

Se nenhum adaptador estiver configurado em desenvolvimento, o lead validado é registrado no console para não bloquear trabalho local. Em produção, ausência de adaptador configurado gera falha explícita.
