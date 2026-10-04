"use client";

import { useState } from "react";

export function CopyCommand({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="rounded-md border border-line bg-paper-2 px-3 py-2.5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <div className="mt-1.5 flex min-w-0 items-center gap-3">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] text-ink">
          <span className="text-accent">$ </span>
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md bg-accent px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] text-accent-ink uppercase hover:brightness-110"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
