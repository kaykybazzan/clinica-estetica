# Checklist de publicação

## Antes do deploy

- [ ] `npm run check` passando (lint + typecheck + imagens + build)
- [ ] `docs/CHECKLIST-CLIENTE.md` concluído
- [ ] `docs/CHECKLIST-SEO.md` concluído
- [ ] `docs/CHECKLIST-PERFORMANCE.md` concluído
- [ ] `.env.local` **não** versionado
- [ ] Nenhum `console.log` de depuração
- [ ] Nenhum dado da empresa fictícia Torque Sete restante

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Obrigatória | Observação |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recomendada | usa `seo.siteUrl` se ausente |
| `NEXT_PUBLIC_GA_ID` | não | vazio = sem Google Analytics |
| `NEXT_PUBLIC_GTM_ID` | não | vazio = sem Tag Manager |
| `NEXT_PUBLIC_META_PIXEL_ID` | não | vazio = sem Meta Pixel |
| `NEXT_PUBLIC_CLARITY_ID` | não | vazio = sem Clarity |
| `RESEND_API_KEY` | uma das opções, se o formulário está ativo | segredo de servidor |
| `CONTACT_FROM_EMAIL` | sim, quando usar Resend | remetente verificado |
| `CONTACT_TO_EMAIL` | não | se vazio, usa o e-mail do `client.config.ts` |
| `CONTACT_WEBHOOK_URL` | alternativa ao Resend | **sem** `NEXT_PUBLIC_` |

## Deploy na Vercel

1. Suba o repositório
2. Importe o projeto (framework detectado automaticamente)
3. Configure as variáveis acima
4. Deploy
5. Aponte o domínio e aguarde o certificado
6. Force o domínio principal (com ou sem `www` — escolha um e redirecione o outro)

## Testes após o deploy

- [ ] Home abrindo no domínio final, em HTTPS
- [ ] `https://dominio.com.br/sitemap.xml` respondendo
- [ ] `https://dominio.com.br/robots.txt` respondendo
- [ ] `https://dominio.com.br/dev/components` respondendo **404**
- [ ] Formulário enviado do site publicado e recebido no destino
- [ ] Link do WhatsApp abrindo o número correto em um celular real
- [ ] Compartilhamento no WhatsApp mostrando a imagem de Open Graph
- [ ] Cabeçalhos de segurança presentes (aba Network → Response Headers)
- [ ] Banner de cookies aparecendo e a escolha persistindo

## LGPD

- [ ] Política de Privacidade publicada e revisada por profissional habilitado
- [ ] Política de Cookies listando só as ferramentas efetivamente instaladas
- [ ] Termos de Uso com foro conferido
- [ ] Consentimento no formulário com link para a política
- [ ] Com `features.cookieBanner=true`, confirmar no Network que Analytics/Pixel/Clarity **não carregam** antes de aceitar
- [ ] Clicar em **Só essenciais** e confirmar que as tags de medição continuam bloqueadas

## Entrega ao cliente

- [ ] Acessos entregues (repositório, Vercel, analytics)
- [ ] Explicado como pedir alteração de texto e de imagem
- [ ] Combinado quem mantém o conteúdo daqui para frente
