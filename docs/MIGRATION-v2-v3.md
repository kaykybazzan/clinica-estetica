# Migração v2 -> v3

```bash
npm run nexora -- migrate
```

O migrador:

1. detecta `platformVersion`;
2. resolve o template a partir do segmento;
3. cria backup de `client.config.ts`;
4. adiciona Strategy, Composition, mobile conversion e Form Engine;
5. mantém os dados existentes do cliente.

Depois execute `npm run doctor` e `npm run quality:full`.
