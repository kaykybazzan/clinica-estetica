# Nexora Studio

Acesse `/dev/studio` em desenvolvimento. A rota não existe em produção.

O Studio permite:

- testar cores principais e radius em preview;
- reordenar blocos da home em tempo real;
- ocultar/mostrar blocos em preview;
- exportar um override JSON.

A comunicação com o iframe é same-origin via `postMessage`; CSP/X-Frame-Options são relaxados somente em desenvolvimento. O Studio não grava diretamente `client.config.ts`, evitando uma rota de escrita perigosa em deploy.
