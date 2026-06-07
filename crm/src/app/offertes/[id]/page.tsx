"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  Check,
  X,
  Eye,
  Send,
  FileText,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { QUOTE_STATUS_META } from "@/lib/constants";
import { euroCent, datum, datumTijd } from "@/lib/format";
import { berekenTotalen } from "@/lib/quote-utils";
import type { Quote, QuoteStatus } from "@/lib/types";

export default function OfferteDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const quoteId = params.id as string;

  const quote = useCrm((s) => s.quotes.find((q) => q.id === quoteId));
  const lead = useCrm((s) => s.leads.find((l) => l.id === quote?.leadId));
  const setQuoteStatus = useCrm((s) => s.setQuoteStatus);
  const updateLead = useCrm((s) => s.updateLead);

  const [bezig, setBezig] = useState<"pdf" | "mail" | null>(null);
  const [melding, setMelding] = useState<string | null>(null);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  if (!quote || !lead) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
        <p className="text-slate-500">Offerte niet gevonden.</p>
        <Link href="/offertes" className="mt-4 inline-block text-sm font-semibold text-brand-600">← Terug naar offertes</Link>
      </div>
    );
  }

  const t = berekenTotalen(quote.regels, quote.korting);

  async function downloadPdf() {
    setBezig("pdf");
    try {
      const res = await fetch("/api/offertes/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, lead }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      setMelding("PDF genereren mislukt.");
    } finally {
      setBezig(null);
    }
  }

  async function mailOfferte() {
    setBezig("mail");
    try {
      const res = await fetch("/api/offertes/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, lead }),
      });
      const data = await res.json();
      if (data.ok) {
        setQuoteStatus(quote!.id, "verstuurd");
        // lead mee laten lopen in de pijplijn
        if (lead && ["nieuwe_lead", "offerte_aanvraag", "gebeld", "afspraak_ingepland"].includes(lead.stage)) {
          updateLead(lead.id, { stage: "offerte_verstuurd" });
        }
        setMelding(data.mock ? `Offerte ge-maild naar ${lead!.email} (mock — geen echte mail verstuurd).` : `Offerte verstuurd naar ${lead!.email}.`);
      } else {
        setMelding("Mailen mislukt.");
      }
    } catch {
      setMelding("Mailen mislukt.");
    } finally {
      setBezig(null);
    }
  }

  // Status-tijdlijn
  const stappen: { status: QuoteStatus; icon: any; tijd?: string }[] = [
    { status: "concept", icon: FileText, tijd: quote.aangemaaktOp },
    { status: "verstuurd", icon: Send, tijd: quote.verstuurdOp },
    { status: "bekeken", icon: Eye, tijd: quote.bekekenOp },
    { status: quote.status === "afgewezen" ? "afgewezen" : "geaccepteerd", icon: quote.status === "afgewezen" ? X : Check, tijd: quote.beslistOp },
  ];
  const volgorde: QuoteStatus[] = ["concept", "verstuurd", "bekeken", "geaccepteerd"];
  const huidigIndex = quote.status === "afgewezen" ? 3 : volgorde.indexOf(quote.status);

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/offertes" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Offertes
      </Link>

      {melding && (
        <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {melding}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900">{quote.nummer}</h1>
            <Badge className={QUOTE_STATUS_META[quote.status].kleur}>{QUOTE_STATUS_META[quote.status].label}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Voor <Link href={`/leads/${lead.id}`} className="font-semibold text-brand-600">{lead.naam}</Link> · geldig tot {datum(quote.geldigTot)}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadPdf} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
            <Download className="h-4 w-4" /> {bezig === "pdf" ? "Bezig…" : "PDF"}
          </button>
          <button onClick={mailOfferte} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
            <Mail className="h-4 w-4" /> {bezig === "mail" ? "Versturen…" : "Mail offerte"}
          </button>
        </div>
      </div>

      {/* Status-tijdlijn */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Status van de offerte</h3>
        <div className="flex items-center">
          {stappen.map((stap, i) => {
            const bereikt = i <= huidigIndex;
            const afgewezen = quote.status === "afgewezen" && i === 3;
            const Icon = stap.icon;
            return (
              <div key={i} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${afgewezen ? "bg-rose-500 text-white" : bereikt ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`mt-1.5 text-[11px] font-semibold ${bereikt ? "text-slate-700" : "text-slate-400"}`}>
                    {QUOTE_STATUS_META[stap.status].label}
                  </p>
                  {stap.tijd && <p className="text-[10px] text-slate-400">{datumTijd(stap.tijd)}</p>}
                </div>
                {i < stappen.length - 1 && (
                  <div className={`mx-1 h-0.5 flex-1 ${i < huidigIndex ? "bg-brand-600" : "bg-slate-100"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Handmatige statusacties */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-50 pt-4">
          <span className="self-center text-xs font-semibold text-slate-400">Status bijwerken:</span>
          {(["concept", "verstuurd", "bekeken", "geaccepteerd", "afgewezen", "verlopen"] as QuoteStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuoteStatus(quote.id, s);
                if (s === "geaccepteerd" && lead) updateLead(lead.id, { stage: "akkoord" });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${quote.status === s ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {QUOTE_STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Offerte-inhoud */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="pb-2 font-semibold">Omschrijving</th>
              <th className="pb-2 text-right font-semibold">Aantal</th>
              <th className="pb-2 text-right font-semibold">Prijs</th>
              <th className="pb-2 text-right font-semibold">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {quote.regels.map((r) => (
              <tr key={r.id}>
                <td className="py-2.5 text-slate-700">{r.omschrijving}</td>
                <td className="py-2.5 text-right text-slate-600">{r.aantal}</td>
                <td className="py-2.5 text-right text-slate-600">{euroCent(r.prijsPerStuk)}</td>
                <td className="py-2.5 text-right font-semibold text-slate-800">{euroCent(r.aantal * r.prijsPerStuk)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex flex-col items-end gap-1 text-sm">
          <div className="flex w-56 justify-between text-slate-500"><span>Subtotaal</span><span>{euroCent(t.subtotaal)}</span></div>
          {t.korting > 0 && <div className="flex w-56 justify-between text-slate-500"><span>Korting</span><span>- {euroCent(t.korting)}</span></div>}
          <div className="flex w-56 justify-between text-slate-500"><span>Btw</span><span>{euroCent(t.btw)}</span></div>
          <div className="mt-1 flex w-56 justify-between border-t border-slate-100 pt-1 text-base font-black text-slate-900"><span>Totaal</span><span>{euroCent(t.totaal)}</span></div>
        </div>

        {quote.notitie && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Notitie</p>
            {quote.notitie}
          </div>
        )}
      </div>
    </div>
  );
}
