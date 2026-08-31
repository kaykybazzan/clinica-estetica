# Change Policy

## Client change
Mudança de conteúdo, marca, ordem da página, feature flag, SEO, contatos ou assets. Deve permanecer fora do Core.

## Core patch
Correção compatível sem alterar contrato público. Incrementa PATCH e precisa de teste de regressão.

## Core minor
Nova capacidade compatível: bloco, adapter, comando CLI, quality gate. Incrementa MINOR.

## Core major
Mudança incompatível no `ClientConfig`, contratos de bloco ou estrutura de atualização. Exige migração e incrementa MAJOR.

## Definition of Done

- lint e typecheck passam;
- arquitetura e composição passam;
- build passa;
- testes do gerador passam;
- mudança visual relevante tem baseline revisado;
- acessibilidade automatizada sem violações críticas;
- documentação/manifesto atualizados;
- nenhuma personalização de cliente vazou para o Core.
