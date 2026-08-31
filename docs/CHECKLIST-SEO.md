# Checklist de SEO

Meta: 95+ na categoria SEO do Lighthouse e indexação limpa na primeira semana.

## Metadata
- [ ] `seo.siteUrl` é a URL final, com `https://` e sem barra no fim
- [ ] `defaultTitle` com até 60 caracteres e a palavra-chave principal no começo
- [ ] `titleTemplate` fazendo sentido nas páginas internas (`%s | %n`)
- [ ] `description` entre 120 e 160 caracteres, com chamada para ação
- [ ] `keywords` com 5 a 10 termos reais (o campo influencia pouco o Google, mas
      organiza o trabalho e alimenta outras ferramentas)
- [ ] `ogImage` em 1200×630, legível em miniatura
- [ ] `businessType` com o subtipo correto do Schema.org (`AutoRepair`,
      `Bakery`, `Dentist`, `LegalService`…) — `LocalBusiness` é o genérico

## Por página
- [ ] Cada página tem título único — nenhum repetido no site
- [ ] Cada página tem description própria
- [ ] Exatamente um `<h1>` por página
- [ ] Hierarquia de títulos sem pular nível (h1 → h2 → h3)
- [ ] Canonical apontando para a própria URL (gerado por `buildMetadata`)
- [ ] Breadcrumb visível e marcado em todas as páginas internas

## Dados estruturados
- [ ] `LocalBusiness` com nome, endereço, telefone, horário e `priceRange`
- [ ] `geo` preenchido quando o cliente atende no endereço
- [ ] `Service` nas páginas de serviço, `Product` nas de produto
- [ ] `FAQPage` **somente** em `/faq`
- [ ] Validado no [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Sem entidade duplicada — os `@id` do grafo devem ser únicos

## Rastreamento
- [ ] `/sitemap.xml` listando só páginas ativas
- [ ] `/robots.txt` bloqueando `/api/` e `/dev/`
- [ ] Nenhuma página ativa com `noindex`
- [ ] Nenhum link para página desligada nas `pages`

## SEO local
- [ ] Cidade no `defaultTitle` ou na `description`
- [ ] `serviceAreas` com as cidades reais de atendimento
- [ ] NAP (nome, endereço, telefone) idêntico ao do Google Business Profile
- [ ] Link do Google Business Profile preenchido em `social`
- [ ] Endereço e horário visíveis no rodapé de todas as páginas

## Depois de publicar
- [ ] Domínio verificado no Google Search Console
- [ ] Sitemap enviado no Search Console
- [ ] `verification.google` preenchido se usar verificação por meta tag
- [ ] Primeira indexação conferida com `site:dominio.com.br` em 3 a 7 dias
