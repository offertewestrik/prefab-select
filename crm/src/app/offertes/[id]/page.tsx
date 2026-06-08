"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  History,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import {
  QUOTE_STATUS_META,
  PRODUCT_LABEL,
  BETALINGSTERMIJNEN,
  BETALINGSVOORWAARDEN_TEKST,
} from "@/lib/constants";
import { euroCent, datum, datumTijd } from "@/lib/format";
import { berekenTotalen } from "@/lib/quote-utils";
import type { QuoteStatus } from "@/lib/types";

export default function OfferteDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const quoteId = params.id as string;

  const quote = useCrm((s) => s.quotes.find((q) => q.id === quoteId));
  const lead = useCrm((s) => s.leads.find((l) => l.id === quote?.leadId));
  const emailLogs = useCrm((s) => s.emailLogs.filter((e) => e.quoteId === quoteId));
  const setQuoteStatus = useCrm((s) => s.setQuoteStatus);
  const updateLead = useCrm((s) => s.updateLead);
  const addEmailLog = useCrm((s) => s.addEmailLog);
  const genereerTermijnfacturen = useCrm((s) => s.genereerTermijnfacturen);
  const deleteQuote = useCrm((s) => s.deleteQuote);
  const router = useRouter();

  const [bezig, setBezig] = useState<"pdf" | "mail" | "preview" | null>(null);
  const [melding, setMelding] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  async function haalPdf(): Promise<Blob> {
    const res = await fetch("/api/offertes/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, lead }),
    });
    if (!res.ok) throw new Error("pdf");
    return res.blob();
  }

  async function downloadPdf() {
    setBezig("pdf");
    try {
      const blob = await haalPdf();
      window.open(URL.createObjectURL(blob), "_blank");
    } catch {
      setMelding("PDF genereren mislukt.");
    } finally {
      setBezig(null);
    }
  }

  async function togglePreview() {
    if (previewUrl) {
      setPreviewUrl(null);
      return;
    }
    setBezig("preview");
    try {
      const blob = await haalPdf();
      setPreviewUrl(URL.createObjectURL(blob));
    } catch {
      setMelding("PDF-preview mislukt.");
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
        // 1) offerte-status → Verzonden (+ verzonddatum), 2) lead → Offerte verstuurd
        setQuoteStatus(quote!.id, "verstuurd");
        if (lead && ["nieuwe_lead", "offerte_aanvraag", "gebeld", "afspraak_ingepland"].includes(lead.stage)) {
          updateLead(lead.id, { stage: "offerte_verstuurd" });
        }
        // 3) e-maillog vastleggen (tabel quote_email_logs)
        addEmailLog({
          quoteId: quote!.id,
          naar: lead!.email,
          onderwerp: data.onderwerp ?? "Uw offerte van Prefab Select",
          status: "verzonden",
          messageId: data.messageId,
          mock: !!data.mock,
        });
        setMelding(data.mock ? `Offerte ge-maild naar ${lead!.email} (mock — geen echte mail verstuurd).` : `Offerte verstuurd naar ${lead!.email}.`);
      } else {
        addEmailLog({ quoteId: quote!.id, naar: lead!.email, onderwerp: "Uw offerte van Prefab Select", status: "mislukt", mock: true });
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
            {PRODUCT_LABEL[quote.projecttype]} voor{" "}
            <Link href={`/leads/${lead.id}`} className="font-semibold text-brand-600">{lead.naam}</Link> · geldig tot {datum(quote.geldigTot)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/offertes/nieuw?bewerk=${quote.id}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Pencil className="h-4 w-4" /> Bewerken
          </Link>
          <button onClick={togglePreview} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
            <Eye className="h-4 w-4" /> {bezig === "preview" ? "Bezig…" : previewUrl ? "Sluit preview" : "Preview"}
          </button>
          <button onClick={downloadPdf} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
            <Download className="h-4 w-4" /> {bezig === "pdf" ? "Bezig…" : "PDF"}
          </button>
          <button onClick={mailOfferte} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
            <Mail className="h-4 w-4" /> {bezig === "mail" ? "Versturen…" : "Mail offerte"}
          </button>
          <button
            onClick={() => { if (confirm(`Offerte ${quote.nummer} definitief verwijderen?`)) { deleteQuote(quote.id); router.push("/offertes"); } }}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" /> Verwijderen
          </button>
        </div>
      </div>

      {quote.status === "geaccepteerd" && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-sm font-medium text-emerald-800">Offerte geaccepteerd — genereer de termijnfacturen (40/30/20/10).</p>
          <button
            onClick={() => {
              const ids = genereerTermijnfacturen(quote.id);
              if (ids.length) {
                setMelding(`${ids.length} termijnfacturen aangemaakt.`);
                router.push("/facturen");
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Genereer termijnfacturen
          </button>
        </div>
      )}

      {/* Online ondertekend */}
      {quote.ondertekendOp && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-800">Digitaal ondertekend via het klantportaal</p>
            <p className="text-xs text-emerald-700">Door {quote.ondertekendDoor} op {datumTijd(quote.ondertekendOp)}</p>
          </div>
          {quote.handtekening && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={quote.handtekening} alt="Handtekening" className="h-16 rounded-lg border border-emerald-200 bg-white px-2" />
          )}
        </div>
      )}

      {/* PDF-preview */}
      {previewUrl && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <iframe src={previewUrl} title="PDF-preview" className="h-[600px] w-full" />
        </div>
      )}

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

      {/* Projectgegevens */}
      {(quote.projectomschrijving || quote.afmetingen || quote.werkzaamheden || quote.planning) && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h3 className="mb-3 text-sm font-bold text-slate-900">Projectgegevens</h3>
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <Veld label="Projecttype" waarde={PRODUCT_LABEL[quote.projecttype]} />
            {quote.afmetingen && <Veld label="Afmetingen" waarde={quote.afmetingen} />}
            {quote.projectomschrijving && <Veld label="Omschrijving" waarde={quote.projectomschrijving} breed />}
            {quote.werkzaamheden && <Veld label="Werkzaamheden" waarde={quote.werkzaamheden} breed />}
            {quote.planning && <Veld label="Planning & levertijd" waarde={quote.planning} breed />}
          </dl>
        </div>
      )}

      {/* Offerte-inhoud */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="pb-2 font-semibold">Omschrijving</th>
              <th className="pb-2 text-right font-semibold">Aantal</th>
              <th className="pb-2 text-center font-semibold">Eenheid</th>
              <th className="pb-2 text-right font-semibold">Prijs</th>
              <th className="pb-2 text-right font-semibold">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {quote.regels.map((r) => (
              <tr key={r.id}>
                <td className="py-2.5 text-slate-700">{r.omschrijving}</td>
                <td className="py-2.5 text-right text-slate-600">{r.aantal}</td>
                <td className="py-2.5 text-center text-slate-600">{r.eenheid}</td>
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
          <div className="mt-1 flex w-56 justify-between border-t border-slate-100 pt-1 text-base font-black text-slate-900"><span>Totaal incl. btw</span><span>{euroCent(t.totaal)}</span></div>
        </div>

        {quote.notitie && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Opmerkingen</p>
            {quote.notitie}
          </div>
        )}
        {quote.voorwaarden && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Voorwaarden</p>
            {quote.voorwaarden}
          </div>
        )}

        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Betalingsvoorwaarden</p>
          <ul className="space-y-1 text-sm">
            {BETALINGSTERMIJNEN.map((term) => (
              <li key={term.pct} className="flex items-center justify-between gap-3">
                <span className="text-slate-600">
                  <b className="text-slate-800">{term.pct}%</b> {term.moment}
                </span>
                <span className="shrink-0 font-semibold text-slate-800">{euroCent((t.totaal * term.pct) / 100)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{BETALINGSVOORWAARDEN_TEKST}</p>
        </div>
      </div>

      {/* Verzendgeschiedenis */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
          <History className="h-4 w-4 text-brand-600" /> Verzendgeschiedenis
        </h3>
        {emailLogs.length === 0 ? (
          <p className="text-sm text-slate-400">Deze offerte is nog niet per e-mail verzonden.</p>
        ) : (
          <ul className="space-y-2">
            {emailLogs.map((log) => (
              <li key={log.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-sm">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${log.status === "verzonden" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-700">{log.onderwerp} → <span className="font-medium">{log.naar}</span></p>
                  <p className="text-xs text-slate-400">{datumTijd(log.verstuurdOp)}{log.mock ? " · mock" : ""}</p>
                </div>
                <Badge className={log.status === "verzonden" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}>
                  {log.status === "verzonden" ? "Verzonden" : "Mislukt"}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Veld({ label, waarde, breed }: { label: string; waarde: string; breed?: boolean }) {
  return (
    <div className={breed ? "sm:col-span-3" : ""}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-slate-700">{waarde}</dd>
    </div>
  );
}
