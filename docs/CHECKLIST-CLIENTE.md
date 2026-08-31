# Checklist do cliente

Antes de mostrar o site ao cliente pela primeira vez.

## Configuração
- [ ] `slug` e `segment` corretos
- [ ] Nome fantasia e razão social
- [ ] Descrição da empresa sem jargão e sem promessa vazia
- [ ] Ano de fundação (`foundedYear`) ou removido
- [ ] CNPJ preenchido ou vazio — nunca inventado
- [ ] Telefone no formato de exibição
- [ ] WhatsApp só com dígitos e DDI (`55…`) — **teste o link antes**
- [ ] E-mail que alguém realmente lê
- [ ] Endereço completo, ou vazio se o cliente não recebe no local
- [ ] `serviceAreas` com as cidades que o cliente atende de fato
- [ ] `businessHours` conferido dia a dia, inclusive o `note`
- [ ] Redes sociais: só as ativas (link para perfil abandonado prejudica)

## Identidade
- [ ] Cores da marca aplicadas em `design`
- [ ] Contraste do texto sobre a cor primária conferido
- [ ] Fontes escolhidas e carregando
- [ ] `radius` e `density` coerentes com o segmento

## Conteúdo
- [ ] Nenhuma marca `DEMO DATA` restante em `src/data/`
- [ ] Serviços com escopo real e entregáveis concretos
- [ ] FAQ com as perguntas que o cliente responde toda semana
- [ ] Depoimentos autorizados por escrito
- [ ] Estatísticas que o cliente consegue sustentar
- [ ] Equipe: fotos e cargos conferidos (ou `features.team: false`)
- [ ] Produtos e projetos preenchidos, ou desligados nas `features`/`pages`

## Imagens
- [ ] Nenhum placeholder gerado restante
- [ ] `npm run check-images` sem alerta de arquivo acima de 400 KB
- [ ] Todo `alt` descreve a imagem — não repete o nome da empresa
- [ ] Favicon, logo e `og/default.jpg` trocados

## Estrutura
- [ ] Páginas desnecessárias desligadas em `pages`
- [ ] Menu com no máximo 6 itens
- [ ] Variações de seção escolhidas conscientemente (não as do template por inércia)

## Jurídico
- [ ] Todos os `[REVISAR]` de `src/data/legal.ts` resolvidos
- [ ] Controlador e e-mail de privacidade corretos
- [ ] `lastReviewed` com a data da revisão real
- [ ] Textos revisados por profissional habilitado

## Funcionamento
- [ ] Formulário enviado de verdade e recebido no destino
- [ ] Todos os links do WhatsApp abrindo com a mensagem certa
- [ ] Mapa mostrando o endereço correto
- [ ] Telefone abrindo o discador no celular
- [ ] 404 testada em uma URL inventada
