"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import {
  PRODUCT_LABEL,
  SOURCE_LABEL,
  QUOTE_REQUEST_STATUS_META,
} from "@/lib/constants";
import { euro, datum, relatief } from "@/lib/format";
import type { QuoteRequestStatus } from "@/lib/types";
import { FileText, ArrowRight } from "lucide-react";

const FILTERS: { key: QuoteRequestStatus | "alle"; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "nieuw", label: "Nieuw" },
  { key: "in_behandeling", label: "In behandeling" },
  { key: "omgezet", label: "Omgezet" },
  { key: "afgewezen", label: "Afgewezen" },
];

export default function OfferteAanvragenPage() {
  const mounted = useMounted();
  const router = useRouter();
  const quoteRequests = useCrm((s) => s.quoteRequests);
  const leads = useCrm((s) => s.leads);
  const updateQuoteRequest = useCrm((s) => s.updateQuoteRequest);
  const [filter, setFilter] = useState<QuoteRequestStatus | "alle">("alle");

  const gefilterd = useMemo(
    () =>
      quoteRequests
        .filter((q) => (filter === "alle" ? true : q.status === filter))
        .sort((a, b) => +new Date(b.ontvangenOp) - +new Date(a.ontvangenOp)),
    [quoteRequests, filter],
  );

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const tellers = {
    nieuw: quoteRequests.filter((q) => q.status === "nieuw").length,
  };

  return (
    <div>
      <PageHeader
        titel="Offerte aanvragen"
        subtitel={`${tellers.nieuw} nieuwe aanvragen die op behandeling wachten`}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
              filter === f.key ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {gefilterd.map((q) => {
          const lead = leads.find((l) => l.id === q.leadId);
          return (
            <div key={q.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/leads/${q.leadId}`} className="font-bold text-slate-900 hover:text-brand-600">
                    {lead?.naam ?? "Onbekende lead"}
                  </Link>
                  <p className="text-xs text-slate-400">
                    {PRODUCT_LABEL[q.product]} · via {SOURCE_LABEL[q.source]}
                  </p>
                </div>
                <Badge className={QUOTE_REQUEST_STATUS_META[q.status].kleur}>
                  {QUOTE_REQUEST_STATUS_META[q.status].label}
                </Badge>
              </div>

              <p className="mt-3 text-sm text-slate-600">{q.omschrijving}</p>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
                {q.budgetIndicatie && <span>Budget: <b className="text-slate-600">{euro(q.budgetIndicatie)}</b></span>}
                {q.gewensteOpleverdatum && <span>Oplevering: <b className="text-slate-600">{datum(q.gewensteOpleverdatum)}</b></span>}
                <span>Ontvangen {relatief(q.ontvangenOp)}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-slate-50 pt-4">
                <select
                  value={q.status}
                  onChange={(e) => updateQuoteRequest(q.id, { status: e.target.value as QuoteRequestStatus })}
                  className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-brand-500"
                >
                  {Object.entries(QUOTE_REQUEST_STATUS_META).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    updateQuoteRequest(q.id, { status: "in_behandeling" });
                    router.push("/offertes/nieuw");
                  }}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  <FileText className="h-3.5 w-3.5" /> Maak offerte
                </button>
                <Link href={`/leads/${q.leadId}`} className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50">
                  Lead <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
        {gefilterd.length === 0 && (
          <p className="col-span-full py-12 text-center text-slate-400">Geen aanvragen in deze categorie.</p>
        )}
      </div>
    </div>
  );
}
