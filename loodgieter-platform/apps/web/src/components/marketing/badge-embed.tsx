"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Toont de partner-badges met kant-en-klare embedcode die aangesloten vakmensen
 * op hun eigen website kunnen plaatsen. De link wijst (dofollow) terug naar het
 * platform — schaalbare, natuurlijke linkbuilding vanuit echte vakmansites.
 */
type Variant = { key: string; label: string; file: string; previewBg: string };

const VARIANTS: Variant[] = [
  { key: "donker", label: "Donker", file: "loodgieterplatform-badge-donker.svg", previewBg: "bg-neutral-50" },
  { key: "licht", label: "Licht", file: "loodgieterplatform-badge-licht.svg", previewBg: "bg-navy-800" },
];

function embedCode(siteUrl: string, file: string) {
  const img = `${siteUrl}/badge/${file}`;
  return `<a href="${siteUrl}/" target="_blank" rel="noopener" title="Aangesloten bij Loodgieterplatform.nl">
  <img src="${img}" alt="Aangesloten bij Loodgieterplatform.nl" width="280" height="64" loading="lazy" />
</a>`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Gekopieerd!" : "Kopieer code"}
    </button>
  );
}

export function BadgeEmbed({ siteUrl }: { siteUrl: string }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {VARIANTS.map((v) => {
        const code = embedCode(siteUrl, v.file);
        return (
          <div key={v.key} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-neutral-900">Badge — {v.label}</h3>
            </div>
            <div className={`mt-4 flex items-center justify-center rounded-[var(--radius-lg)] p-6 ${v.previewBg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${siteUrl}/badge/${v.file}`}
                alt="Aangesloten bij Loodgieterplatform.nl"
                width={280}
                height={64}
              />
            </div>
            <pre className="mt-4 overflow-x-auto rounded-[var(--radius-md)] bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100">
              <code>{code}</code>
            </pre>
            <div className="mt-3">
              <CopyButton text={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
