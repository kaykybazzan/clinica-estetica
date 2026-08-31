# Client extension layer

`src/client/` is the only code directory intentionally preserved during a Core update.

Use it only for behavior that is genuinely unique to one client and cannot be represented by:

1. `client.config.ts`;
2. content in `src/data/`;
3. an existing generic section variant;
4. a new generic variant that is useful for multiple clients.

## Custom blocks

Register a component in `blocks.tsx` and add it to `composition.home` as:

```ts
{ id: "campaign", type: "custom", variant: "campaign-special" }
```

The component receives the standard composition props. Never import client code back into shared sections/components.
