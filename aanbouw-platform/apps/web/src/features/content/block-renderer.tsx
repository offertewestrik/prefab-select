import type { ContentBlock, ContentBlocks } from "@repo/content";
import { LeadCta } from "@/components/marketing/lead-cta";
import { priceRange } from "@/lib/format";

// Tijdelijke basis-renderer voor het blokken-systeem. Claude Design vervangt
// later de visuele componenten; de blok-contracten (packages/content) blijven.
// Data-gedreven blokken (reviews/relatedServices zonder ids) worden in latere
// iteraties van live data voorzien.

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "hero":
      return (
        <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white py-14">
          <div className="mx-auto max-w-(--container-max) px-6">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{block.title}</h1>
            {block.subtitle && <p className="mt-4 max-w-2xl text-lg text-neutral-500">{block.subtitle}</p>}
          </div>
        </section>
      );
    case "intro":
      return (
        <section className="mx-auto max-w-(--container-max) px-6 py-8">
          {block.heading && <h2 className="text-2xl font-bold text-neutral-900">{block.heading}</h2>}
          <p className="mt-3 whitespace-pre-wrap text-neutral-700">{block.body}</p>
        </section>
      );
    case "priceSection":
      return (
        <section className="mx-auto max-w-(--container-max) px-6 py-8">
          {block.heading && <h2 className="text-2xl font-bold text-neutral-900">{block.heading}</h2>}
          <p className="mt-3 text-lg font-semibold text-primary-700">
            {priceRange(block.from, block.to, block.unit)}
          </p>
          {block.note && <p className="mt-1 text-sm text-neutral-500">{block.note}</p>}
        </section>
      );
    case "faq":
      return (
        <section className="mx-auto max-w-(--container-max) px-6 py-8">
          {block.heading && <h2 className="text-2xl font-bold text-neutral-900">{block.heading}</h2>}
          <div className="mt-4 divide-y divide-neutral-200 rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
            {block.items.map((f, i) => (
              <details key={i} className="p-5">
                <summary className="cursor-pointer list-none font-medium text-neutral-900">{f.question}</summary>
                <p className="mt-2 text-sm text-neutral-500">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "howItWorks":
      return (
        <section className="mx-auto max-w-(--container-max) px-6 py-8">
          {block.heading && <h2 className="text-2xl font-bold text-neutral-900">{block.heading}</h2>}
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {(block.steps ?? []).map((s, i) => (
              <div key={i} className="rounded-[var(--radius-xl)] border border-neutral-200 p-6">
                <span className="text-sm font-semibold text-primary-600">Stap {i + 1}</span>
                <h3 className="mt-2 font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "trustBlock":
      return (
        <section className="mx-auto max-w-(--container-max) px-6 py-8">
          {block.heading && <h2 className="text-2xl font-bold text-neutral-900">{block.heading}</h2>}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {(block.items ?? []).map((it, i) => (
              <li key={i} className="text-sm text-neutral-700">• {it}</li>
            ))}
          </ul>
        </section>
      );
    case "cta":
      return (
        <div className="mx-auto max-w-(--container-max) px-6 py-8">
          <LeadCta title={block.title} subtitle={block.subtitle} />
        </div>
      );
    // Data-gedreven blokken (reviews, relatedServices, relatedCities, calculator,
    // brandBlock, knowledgeBlock) worden in latere iteraties gekoppeld aan live
    // data. Voorlopig overgeslagen zodat ze geen lege UI tonen.
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: ContentBlocks }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}
