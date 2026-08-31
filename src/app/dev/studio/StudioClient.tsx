"use client";

import { useMemo, useRef, useState } from "react";
import type { ClientDesign, PageBlock } from "@/config/client.schema";

export function StudioClient({ initialDesign, initialBlocks }: { initialDesign: ClientDesign; initialBlocks: PageBlock[] }) {
  const [design, setDesign] = useState(initialDesign);
  const [blocks, setBlocks] = useState(initialBlocks);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const payload = useMemo(() => ({
    type: "nexora:studio" as const,
    design,
    order: blocks.map((b) => b.id),
    hidden: blocks.filter((b) => b.enabled === false).map((b) => b.id),
  }), [design, blocks]);

  function sync() { iframeRef.current?.contentWindow?.postMessage(payload, window.location.origin); }
  function move(index: number, direction: -1 | 1) {
    setBlocks((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      queueMicrotask(() => iframeRef.current?.contentWindow?.postMessage({ ...payload, order: next.map((b) => b.id), hidden: next.filter((b) => b.enabled === false).map((b) => b.id) }, window.location.origin));
      return next;
    });
  }
  function toggle(index: number) {
    setBlocks((current) => current.map((block, i) => i === index ? { ...block, enabled: block.enabled === false ? true : false } : block));
    setTimeout(sync, 0);
  }
  function updateDesign(key: keyof ClientDesign, value: string | number) {
    const next = { ...design, [key]: value } as ClientDesign;
    setDesign(next);
    iframeRef.current?.contentWindow?.postMessage({ ...payload, design: next }, window.location.origin);
  }
  function exportJson() {
    const content = JSON.stringify({ design, composition: { home: blocks } }, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nexora-studio.override.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid min-h-[calc(100vh-var(--nx-header-h))] lg:grid-cols-[22rem_1fr]">
      <aside className="border-r border-line bg-surface p-5 lg:h-[calc(100vh-var(--nx-header-h))] lg:overflow-y-auto">
        <h1 className="font-heading text-h3 font-bold">Nexora Studio</h1>
        <p className="mt-2 text-sm text-fg-soft">Sandbox local para estrutura e Design DNA. Exporte o override e aplique no cliente.</p>

        <h2 className="mt-7 font-heading font-bold">Marca</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(["primaryColor","secondaryColor","accentColor","surfaceColor"] as const).map((key) => (
            <label key={key} className="text-xs font-semibold text-fg-soft">{key}
              <input type="color" value={String(design[key])} onChange={(e) => updateDesign(key, e.target.value)} className="mt-1 block h-10 w-full rounded border border-line bg-bg p-1" />
            </label>
          ))}
        </div>
        <label className="mt-4 block text-xs font-semibold text-fg-soft">Radius: {design.radius}px
          <input type="range" min="0" max="32" value={design.radius} onChange={(e) => updateDesign("radius", Number(e.target.value))} className="mt-2 w-full" />
        </label>

        <h2 className="mt-8 font-heading font-bold">Home</h2>
        <ol className="mt-3 flex flex-col gap-2">
          {blocks.map((block, index) => (
            <li key={block.id} className="rounded-[var(--radius-brand-sm)] border border-line bg-bg p-3">
              <div className="flex items-center justify-between gap-2">
                <div><strong className="block text-sm">{block.type}</strong><code className="text-[10px] text-fg-soft">#{block.id}</code></div>
                <button type="button" onClick={() => toggle(index)} className="rounded border border-line px-2 py-1 text-xs">{block.enabled === false ? "Mostrar" : "Ocultar"}</button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="rounded border border-line py-1 text-xs disabled:opacity-30">↑ Subir</button>
                <button type="button" disabled={index === blocks.length - 1} onClick={() => move(index, 1)} className="rounded border border-line py-1 text-xs disabled:opacity-30">↓ Descer</button>
              </div>
            </li>
          ))}
        </ol>
        <button type="button" onClick={exportJson} className="mt-6 w-full rounded-[var(--nx-button-radius)] bg-primary px-4 py-3 text-sm font-bold text-on-primary">Exportar configuração</button>
      </aside>
      <div className="bg-[#111] p-3">
        <iframe ref={iframeRef} src="/" title="Preview do site" onLoad={sync} className="h-[calc(100vh-var(--nx-header-h)-1.5rem)] w-full rounded-lg bg-bg" />
      </div>
    </div>
  );
}
