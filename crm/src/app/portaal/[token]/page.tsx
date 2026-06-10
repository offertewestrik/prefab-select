"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2, Circle, FileText, Receipt, CalendarDays, Paperclip,
  Phone, Mail, MapPin, Download, Check, X, ExternalLink,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { leadByToken, PORTAL_MILESTONES, stageNaarMilestone } from "@/lib/portal";
import {
  QUOTE_STATUS_META, INVOICE_STATUS_META, PRODUCT_LABEL, APPOINTMENT_TYPE_META, BEDRIJF,
} from "@/lib/constants";
import { euro, datum, datumTijd } from "@/lib/format";
import { quoteTotaal } from "@/lib/quote-utils";
import { invoiceTotaal, openstaand, effectieveStatus } from "@/lib/invoice-utils";
import type { Appointment, Invoice, Payment, Quote, UploadedFile } from "@/lib/types";

const TABS = ["Overzicht", "Offertes", "Facturen", "Afspraken", "Documenten", "Contact"] as const;
type Tab = (typeof TABS)[number];

export default function PortaalPage() {
  const mounted = useMounted();
  const params = useParams();
  const token = params.token as string;

  const leads = useCrm((s) => s.leads);
  const lead = leadByToken(leads, token);
  const quotes = useCrm((s) => s.quotes.filter((q) => q.leadId === lead?.id));
  const invoices = useCrm((s) => s.invoices.filter((i) => i.leadId === lead?.id));
  const payments = useCrm((s) => s.payments);
  const appointments = useCrm((s) => s.appointments.filter((a) => a.leadId === lead?.id));
  const files = useCrm((s) => s.files.filter((f) => f.leadId === lead?.id));

  const [tab, setTab] = useState<Tab>("Overzicht");

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (!lead) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-soft">
          <h1 className="text-lg font-bold text-slate-900">Ongeldige portaallink</h1>
          <p className="mt-2 text-sm text-slate-500">Deze link is niet (meer) geldig. Neem contact op met Prefab Select.</p>
        </div>
      </div>
    );
  }

  const milestone = stageNaarMilestone(lead.stage);
  const verloren = lead.stage === "verloren";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Portaal-header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-brand-700">Prefab</span>
            <span className="rounded-md bg-brand-600 px-1.5 py-0.5 text-xl font-black tracking-tight text-white">Select</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">{lead.naam}</p>
            <p className="text-[11px] text-slate-400">Mijn projectportaal</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Welkom, {lead.naam}</h1>
        <p className="mt-1 text-sm text-slate-500">Volg hier uw {PRODUCT_LABEL[lead.product].toLowerCase()}-project bij Prefab Select.</p>

        {/* Statusbalk */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="mb-5 text-sm font-bold text-slate-900">Status van uw project</h2>
          {verloren ? (
            <p className="text-sm text-slate-500">Dit project is afgesloten. Neem gerust contact op als u verder wilt.</p>
          ) : (
            <div className="flex items-center">
              {PORTAL_MILESTONES.map((mlabel, i) => {
                const bereikt = i <= milestone;
                return (
                  <div key={mlabel} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${bereikt ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {bereikt ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </div>
                      <p className={`mt-1.5 text-center text-[11px] font-semibold ${bereikt ? "text-slate-700" : "text-slate-400"}`}>{mlabel}</p>
                    </div>
                    {i < PORTAL_MILESTONES.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${i < milestone ? "bg-brand-600" : "bg-slate-100"}`} />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-1 rounded-xl border border-slate-100 bg-white p-1 shadow-soft">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${tab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "Overzicht" && <Overzicht lead={lead} quotes={quotes} invoices={invoices} payments={payments} appointments={appointments} onTab={setTab} />}
          {tab === "Offertes" && <Offertes quotes={quotes} leadId={lead.id} />}
          {tab === "Facturen" && <Facturen invoices={invoices} payments={payments} leadId={lead.id} />}
          {tab === "Afspraken" && <Afspraken appointments={appointments} />}
          {tab === "Documenten" && <Documenten files={files} />}
          {tab === "Contact" && <Contact />}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">Prefab Select · {BEDRIJF.web} · {BEDRIJF.telefoon}</p>
      </main>
    </div>
  );
}

function Kaart({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-soft ${className ?? ""}`}>{children}</div>;
}

function Overzicht({ lead, quotes, invoices, payments, appointments, onTab }: any) {
  const openOfferte = quotes.find((q: any) => ["verstuurd", "bekeken"].includes(q.status));
  const openFactuur = invoices.find((i: any) => openstaand(i, payments) > 0);
  const volgende = [...appointments].filter((a: any) => new Date(a.start) >= new Date()).sort((a: any, b: any) => +new Date(a.start) - +new Date(b.start))[0];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <button onClick={() => onTab("Offertes")} className="text-left">
        <Kaart>
          <FileText className="h-5 w-5 text-brand-600" />
          <p className="mt-2 text-xs uppercase text-slate-400">Openstaande offerte</p>
          <p className="mt-1 font-bold text-slate-900">{openOfferte ? euro(quoteTotaal(openOfferte)) : "Geen"}</p>
          {openOfferte && <p className="text-xs text-brand-600">Bekijk &amp; accepteer →</p>}
        </Kaart>
      </button>
      <button onClick={() => onTab("Facturen")} className="text-left">
        <Kaart>
          <Receipt className="h-5 w-5 text-amber-600" />
          <p className="mt-2 text-xs uppercase text-slate-400">Openstaande factuur</p>
          <p className="mt-1 font-bold text-slate-900">{openFactuur ? euro(openstaand(openFactuur, payments)) : "Geen"}</p>
          {openFactuur && <p className="text-xs text-brand-600">Bekijk &amp; betaal →</p>}
        </Kaart>
      </button>
      <button onClick={() => onTab("Afspraken")} className="text-left">
        <Kaart>
          <CalendarDays className="h-5 w-5 text-violet-600" />
          <p className="mt-2 text-xs uppercase text-slate-400">Volgende afspraak</p>
          <p className="mt-1 font-bold text-slate-900">{volgende ? datumTijd(volgende.start) : "Geen"}</p>
          {volgende && <p className="truncate text-xs text-slate-500">{volgende.titel}</p>}
        </Kaart>
      </button>
    </div>
  );
}

async function bekijkPdf(endpoint: string, body: any) {
  const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (res.ok) window.open(URL.createObjectURL(await res.blob()), "_blank");
}

function Offertes({ quotes, leadId }: { quotes: Quote[]; leadId: string }) {
  const lead = useCrm((s) => s.leads.find((l) => l.id === leadId));
  const setQuoteStatus = useCrm((s) => s.setQuoteStatus);
  const updateLead = useCrm((s) => s.updateLead);

  if (quotes.length === 0) return <Kaart><p className="text-sm text-slate-400">Er staan nog geen offertes voor u klaar.</p></Kaart>;
  return (
    <div className="space-y-3">
      {quotes.map((q) => {
        const teBeslissen = ["verstuurd", "bekeken"].includes(q.status);
        return (
          <Kaart key={q.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">{q.nummer}</p>
                <p className="text-xs text-slate-400">{PRODUCT_LABEL[q.projecttype]} · geldig tot {datum(q.geldigTot)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-slate-900">{euro(quoteTotaal(q))}</span>
                <Badge className={QUOTE_STATUS_META[q.status].kleur}>{QUOTE_STATUS_META[q.status].label}</Badge>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-50 pt-4">
              <button onClick={() => bekijkPdf("/api/offertes/pdf", { quote: q, lead })} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Download className="h-4 w-4" /> Bekijk PDF
              </button>
              {teBeslissen && (
                <>
                  <button onClick={() => { setQuoteStatus(q.id, "geaccepteerd"); if (lead) updateLead(lead.id, { stage: "akkoord" }); }} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700">
                    <Check className="h-4 w-4" /> Akkoord geven
                  </button>
                  <button onClick={() => setQuoteStatus(q.id, "afgewezen")} className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                    <X className="h-4 w-4" /> Afwijzen
                  </button>
                </>
              )}
              {q.status === "geaccepteerd" && <span className="inline-flex items-center gap-1.5 self-center text-sm font-semibold text-emerald-600"><Check className="h-4 w-4" /> U heeft deze offerte geaccepteerd</span>}
            </div>
          </Kaart>
        );
      })}
    </div>
  );
}

function Facturen({ invoices, payments, leadId }: { invoices: Invoice[]; payments: Payment[]; leadId: string }) {
  const lead = useCrm((s) => s.leads.find((l) => l.id === leadId));
  const registerPayment = useCrm((s) => s.registerPayment);
  const setInvoiceStatus = useCrm((s) => s.setInvoiceStatus);

  if (invoices.length === 0) return <Kaart><p className="text-sm text-slate-400">Er staan nog geen facturen voor u klaar.</p></Kaart>;
  return (
    <div className="space-y-3">
      {invoices.map((i) => {
        const open = openstaand(i, payments);
        const status = effectieveStatus(i, payments);
        return (
          <Kaart key={i.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">{i.nummer}</p>
                <p className="text-xs text-slate-400">{i.termijnLabel ?? "Factuur"} · vervalt {datum(i.vervaldatum)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-slate-900">{euro(invoiceTotaal(i))}</span>
                <Badge className={INVOICE_STATUS_META[status].kleur}>{INVOICE_STATUS_META[status].label}</Badge>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-50 pt-4">
              <button onClick={() => bekijkPdf("/api/facturen/pdf", { invoice: i, lead })} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Download className="h-4 w-4" /> Bekijk PDF
              </button>
              {open > 0 ? (
                <button onClick={() => { registerPayment(i.id, open, "ideal"); setInvoiceStatus(i.id, "betaald"); }} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700">
                  Betaal {euro(open)} met iDEAL
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 self-center text-sm font-semibold text-emerald-600"><Check className="h-4 w-4" /> Betaald</span>
              )}
            </div>
          </Kaart>
        );
      })}
    </div>
  );
}

function Afspraken({ appointments }: { appointments: Appointment[] }) {
  const gesorteerd = [...appointments].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  if (gesorteerd.length === 0) return <Kaart><p className="text-sm text-slate-400">Er zijn nog geen afspraken gepland.</p></Kaart>;
  return (
    <div className="space-y-3">
      {gesorteerd.map((a) => (
        <Kaart key={a.id}>
          <div className="flex items-center gap-4">
            <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: APPOINTMENT_TYPE_META[a.type].hex }} />
            <div className="flex-1">
              <p className="font-bold text-slate-900">{a.titel}</p>
              <p className="text-xs text-slate-400">{datumTijd(a.start)}{a.locatie ? ` · ${a.locatie}` : ""}</p>
            </div>
            <Badge className={APPOINTMENT_TYPE_META[a.type].kleur}>{APPOINTMENT_TYPE_META[a.type].label}</Badge>
          </div>
        </Kaart>
      ))}
    </div>
  );
}

function Documenten({ files }: { files: UploadedFile[] }) {
  if (files.length === 0) return <Kaart><p className="text-sm text-slate-400">Er zijn nog geen documenten gedeeld.</p></Kaart>;
  return (
    <div className="space-y-2">
      {files.map((f) => (
        <Kaart key={f.id} className="!p-4">
          <div className="flex items-center gap-3">
            <Paperclip className="h-4 w-4 text-slate-400" />
            <span className="flex-1 text-sm font-medium text-slate-700">{f.naam}</span>
            <span className="text-xs text-slate-400">{f.grootteKb} KB</span>
            <button className="text-slate-400 hover:text-brand-600"><Download className="h-4 w-4" /></button>
          </div>
        </Kaart>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <Kaart>
      <h3 className="font-bold text-slate-900">Contact</h3>
      <p className="mt-1 text-sm text-slate-500">Vragen over uw project? Wij helpen u graag.</p>
      <div className="mt-4 space-y-2 text-sm">
        <a href={`tel:${BEDRIJF.telefoon}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-600"><Phone className="h-4 w-4 text-slate-400" /> {BEDRIJF.telefoon}</a>
        <a href={`mailto:${BEDRIJF.email}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-600"><Mail className="h-4 w-4 text-slate-400" /> {BEDRIJF.email}</a>
        <p className="flex items-center gap-2 text-slate-600"><MapPin className="h-4 w-4 text-slate-400" /> {BEDRIJF.adres}, {BEDRIJF.postcodePlaats}</p>
        <a href={`https://${BEDRIJF.web}`} target="_blank" className="flex items-center gap-2 text-slate-600 hover:text-brand-600"><ExternalLink className="h-4 w-4 text-slate-400" /> {BEDRIJF.web}</a>
      </div>
    </Kaart>
  );
}
