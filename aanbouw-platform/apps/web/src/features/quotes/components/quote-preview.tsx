import { Droplets } from "lucide-react";
import { euro } from "@/lib/format";
import type { LineItem } from "../schema";

export interface QuotePreviewData {
  number: string;
  title?: string | null;
  introText?: string | null;
  status: string;
  company: { name: string; email?: string | null; phone?: string | null; logoUrl?: string | null };
  customer: { name: string; city?: string | null; street?: string | null; postcode?: string | null };
  lineItems: LineItem[];
  subtotalCents: number;
  vatRate: number;
  vatCents: number;
  totalCents: number;
  validUntil?: string | null;
  terms?: string | null;
}

// Nette, herbruikbare offerte-preview (aannemer-editor én klant-view).
export function QuotePreview({ data }: { data: QuotePreviewData }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-8 shadow-[var(--shadow-sm)]">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] bg-primary-500 text-white">
            <Droplets className="h-6 w-6" />
          </span>
          <div>
            <div className="font-bold text-neutral-900">{data.company.name}</div>
            <div className="text-sm text-neutral-500">
              {data.company.email} {data.company.phone ? `· ${data.company.phone}` : ""}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-neutral-900">Offerte</div>
          <div className="text-sm text-neutral-500">{data.number}</div>
        </div>
      </div>

      {/* Klant + geldigheid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase text-neutral-500">Voor</div>
          <div className="mt-1 text-sm text-neutral-900">
            {data.customer.name}
            <br />
            {[data.customer.street, data.customer.postcode, data.customer.city].filter(Boolean).join(" ")}
          </div>
        </div>
        {data.validUntil && (
          <div className="sm:text-right">
            <div className="text-xs font-semibold uppercase text-neutral-500">Geldig tot</div>
            <div className="mt-1 text-sm text-neutral-900">
              {new Date(data.validUntil).toLocaleDateString("nl-NL")}
            </div>
          </div>
        )}
      </div>

      {data.title && <h2 className="mt-6 text-xl font-bold text-neutral-900">{data.title}</h2>}
      {data.introText && <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-700">{data.introText}</p>}

      {/* Prijstabel */}
      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-neutral-500">
            <th className="py-2">Omschrijving</th>
            <th className="py-2 text-right">Aantal</th>
            <th className="py-2 text-right">Stukprijs</th>
            <th className="py-2 text-right">Totaal</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((li, i) => (
            <tr key={i} className="border-b border-neutral-100">
              <td className="py-2 text-neutral-900">{li.description}</td>
              <td className="py-2 text-right">{li.qty}</td>
              <td className="py-2 text-right">{euro(li.unitPriceCents / 100)}</td>
              <td className="py-2 text-right">{euro((li.qty * li.unitPriceCents) / 100)}</td>
            </tr>
          ))}
          {data.lineItems.length === 0 && (
            <tr><td colSpan={4} className="py-4 text-center text-neutral-400">Nog geen regels</td></tr>
          )}
        </tbody>
      </table>

      {/* Totalen */}
      <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm">
        <Row label="Subtotaal (excl. btw)" value={euro(data.subtotalCents / 100)} />
        <Row label={`Btw (${data.vatRate}%)`} value={euro(data.vatCents / 100)} />
        <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold text-neutral-900">
          <span>Totaal incl. btw</span>
          <span>{euro(data.totalCents / 100)}</span>
        </div>
      </div>

      {data.terms && (
        <div className="mt-6 border-t border-neutral-200 pt-4">
          <div className="text-xs font-semibold uppercase text-neutral-500">Voorwaarden</div>
          <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-700">{data.terms}</p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-neutral-700">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
