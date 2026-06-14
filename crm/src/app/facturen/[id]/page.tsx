"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Trash2, Plus, FileText } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { INVOICE_STATUS_META, PAYMENT_METHODE_LABEL } from "@/lib/constants";
import { euroCent, euro, datum, datumTijd } from "@/lib/format";
import { berekenTotalen, btwPerTarief } from "@/lib/quote-utils";
import { invoiceTotaal, betaaldBedrag, openstaand, effectieveStatus } from "@/lib/invoice-utils";
import type { InvoiceStatus, PaymentMethode } from "@/lib/types";

export default function FactuurDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;

  const invoice = useCrm((s) => s.invoices.find((i) => i.id === invoiceId));
  const lead = useCrm((s) => s.leads.find((l) => l.id === invoice?.leadId));
  const quote = useCrm((s) => s.quotes.find((q) => q.id === invoice?.quoteId));
  const payments = useCrm((s) => s.payments.filter((p) => p.invoiceId === invoiceId));
  const allePayments = useCrm((s) => s.payments);
  const setInvoiceStatus = useCrm((s) => s.setInvoiceStatus);
  const deleteInvoice = useCrm((s) => s.deleteInvoice);
  const registerPayment = useCrm((s) => s.registerPayment);

  const [bezig, setBezig] = useState<"pdf" | "mail" | null>(null);
  const [melding, setMelding] = useState<string | null>(null);
  const [betaalOpen, setBetaalOpen] = useState(false);
  const [bedrag, setBedrag] = useState("");
  const [methode, setMethode] = useState<PaymentMethode>("overboeking");

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  if (!invoice || !lead) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
        <p className="text-slate-500">Factuur niet gevonden.</p>
        <Link href="/facturen" className="mt-4 inline-block text-sm font-semibold text-brand-600">← Terug naar facturen</Link>
      </div>
    );
  }

  const t = berekenTotalen(invoice.regels, invoice.korting);
  const btw = btwPerTarief(invoice.regels, invoice.korting);
  const totaal = invoiceTotaal(invoice);
  const betaald = betaaldBedrag(allePayments, invoice.id);
  const open = openstaand(invoice, allePayments);
  const status = effectieveStatus(invoice, allePayments);

  async function downloadPdf() {
    setBezig("pdf");
    try {
      const res = await fetch("/api/facturen/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ invoice, lead }) });
      if (!res.ok) throw new Error();
      window.open(URL.createObjectURL(await res.blob()), "_blank");
    } catch { setMelding("PDF mislukt."); } finally { setBezig(null); }
  }

  async function mailFactuur() {
    setBezig("mail");
    try {
      const res = await fetch("/api/facturen/mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ invoice, lead }) });
      const data = await res.json();
      if (data.ok) {
        if (invoice!.status === "concept") setInvoiceStatus(invoice!.id, "verzonden");
        setMelding(data.mock ? `Factuur ge-maild naar ${lead!.email} (mock).` : `Factuur verstuurd naar ${lead!.email}.`);
      } else setMelding("Mailen mislukt.");
    } catch { setMelding("Mailen mislukt."); } finally { setBezig(null); }
  }

  function voegBetalingToe() {
    const b = Number(bedrag);
    if (!b || b <= 0) return;
    registerPayment(invoice!.id, b, methode);
    setBedrag(""); setBetaalOpen(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/facturen" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Facturen
      </Link>

      {melding && <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">{melding}</div>}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900">{invoice.nummer}</h1>
            <Badge className={INVOICE_STATUS_META[status].kleur}>{INVOICE_STATUS_META[status].label}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Voor <Link href={`/leads/${lead.id}`} className="font-semibold text-brand-600">{lead.naam}</Link> · vervalt {datum(invoice.vervaldatum)}
            {quote && <> · uit offerte <Link href={`/offertes/${quote.id}`} className="text-brand-600">{quote.nummer}</Link></>}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={downloadPdf} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Download className="h-4 w-4" /> {bezig === "pdf" ? "Bezig…" : "PDF"}</button>
          <button onClick={mailFactuur} disabled={bezig !== null} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"><Mail className="h-4 w-4" /> {bezig === "mail" ? "Versturen…" : "Mail factuur"}</button>
        </div>
      </div>

      {invoice.termijnLabel && (
        <div className="mb-4 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">Termijnfactuur: {invoice.termijnLabel}</div>
      )}

      {/* Bedragoverzicht */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><p className="text-xs uppercase text-slate-400">Totaal</p><p className="mt-1 text-2xl font-black text-slate-900">{euro(totaal)}</p></div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><p className="text-xs uppercase text-slate-400">Betaald</p><p className="mt-1 text-2xl font-black text-emerald-600">{euro(betaald)}</p></div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><p className="text-xs uppercase text-slate-400">Openstaand</p><p className="mt-1 text-2xl font-black text-amber-600">{euro(open)}</p></div>
      </div>

      {/* Status + betaling acties */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <span className="text-xs font-semibold text-slate-400">Status:</span>
        {(["concept", "verzonden", "betaald", "gecrediteerd"] as InvoiceStatus[]).map((sKey) => (
          <button key={sKey} onClick={() => setInvoiceStatus(invoice.id, sKey)} className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${invoice.status === sKey ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {INVOICE_STATUS_META[sKey].label}
          </button>
        ))}
        <button onClick={() => { setBedrag(String(Math.round(open))); setBetaalOpen((o) => !o); }} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
          <Plus className="h-3.5 w-3.5" /> Betaling registreren
        </button>
        <button onClick={() => { if (confirm("Factuur verwijderen?")) { deleteInvoice(invoice.id); router.push("/facturen"); } }} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
          <Trash2 className="h-3.5 w-3.5" /> Verwijderen
        </button>
      </div>

      {betaalOpen && (
        <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Bedrag (€)</label>
            <input type="number" value={bedrag} onChange={(e) => setBedrag(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Methode</label>
            <select value={methode} onChange={(e) => setMethode(e.target.value as PaymentMethode)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500">
              {Object.entries(PAYMENT_METHODE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <button onClick={voegBetalingToe} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Registreren</button>
        </div>
      )}

      {/* Regels */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
            <tr><th className="pb-2 font-semibold">Omschrijving</th><th className="pb-2 text-right font-semibold">Aantal</th><th className="pb-2 text-center font-semibold">Eenheid</th><th className="pb-2 text-right font-semibold">Prijs</th><th className="pb-2 text-right font-semibold">Totaal</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoice.regels.map((r) => (
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
          {btw.map((b) => <div key={b.percentage} className="flex w-56 justify-between text-slate-500"><span>Btw {b.percentage}%</span><span>{euroCent(b.btw)}</span></div>)}
          <div className="mt-1 flex w-56 justify-between border-t border-slate-100 pt-1 text-base font-black text-slate-900"><span>Totaal</span><span>{euroCent(t.totaal)}</span></div>
        </div>
      </div>

      {/* Betalingen */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="mb-3 text-sm font-bold text-slate-900">Betalingen</h3>
        {payments.length === 0 ? (
          <p className="text-sm text-slate-400">Nog geen betalingen geregistreerd.</p>
        ) : (
          <ul className="space-y-2">
            {payments.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
                <span className="text-slate-700">{datumTijd(p.datum)} · {PAYMENT_METHODE_LABEL[p.methode]}</span>
                <span className="font-semibold text-emerald-600">{euro(p.bedrag)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
