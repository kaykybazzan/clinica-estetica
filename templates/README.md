# Templates por segmento

Cada arquivo deste diretório é um **template**: a combinação de seções,
funcionalidades e páginas que costuma funcionar melhor para um tipo de negócio,
mais o preset de identidade sugerido.

Um template **não duplica código**. Ele só descreve escolhas — as mesmas 46
variações de seção do NEXORA CORE são reaproveitadas por todos.

A ordem em que os templates aparecem no gerador é definida por `index.json`.
Para adicionar um segmento novo: crie o `.json`, inclua o id em `index.json` e,
se ele mudar o tipo de negócio, ajuste `businessType` (subtipo do Schema.org
usado pelo JSON-LD).

## Como usar

O gerador aplica o template automaticamente:

```bash
npm run create-client
```

Para aplicar manualmente, copie os blocos `sections`, `features` e `pages` do
template para o `src/config/client.config.ts` e ajuste o `design` com o preset
indicado (`src/config/presets/design-presets.ts`).

| Template | Arquivo | Preset sugerido |
| --- | --- | --- |
| Pet shop / veterinária | `pet.json` | `pet-coral` |
| Alimentação | `food.json` | `food-crimson` |
| Automotivo | `auto.json` | `torque-orange` |
| Serviços profissionais | `professional.json` | `legal-navy` |
| Saúde | `health.json` | `clinic-teal` |
| Industrial | `industrial.json` | `industrial-steel` |
| Agronegócio | `agriculture.json` | `forest-green` |
| Comércio local | `local.json` | `nexora-blue` |
| Barbearia / salão / estética | `beauty.json` | `barber-charcoal` (barbearia) ou `beauty-plum` |
| Paisagismo | `landscaping.json` | `forest-green` |
| Informática / tecnologia | `tech-retail.json` | `tech-retail-blue` |

## Presets de negócio

Os 11 templates acima são estruturais. O gerador expõe uma camada mais específica
em `src/config/presets/business-presets.json`, com presets como `pet-shop`,
`veterinary`, `pizzeria`, `dentist`, `real-estate`, `workshop` e outros.

O preset de negócio aponta para um template estrutural, define o `businessType`
do Schema.org e pode sugerir um preset visual específico. Assim, dois negócios podem compartilhar a mesma arquitetura sem
perder a semântica específica do segmento.
