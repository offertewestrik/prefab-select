"use client";

import { useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Tag,
  Plus,
  Trash2,
  FileText,
  Upload,
  CheckCircle2,
  Circle,
  CalendarDays,
  StickyNote,
  PhoneCall,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge, Avatar } from "@/components/ui/Badge";
import { TaskDialog } from "@/components/TaskDialog";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import {
  PRODUCT_LABEL,
  SOURCE_LABEL,
  STAGE_META,
  STAGE_ORDER,
  TEAM,
  QUOTE_STATUS_META,
  TASK_STATUS_META,
  APPOINTMENT_TYPE_META,
} from "@/lib/constants";
import { euro, datum, datumTijd, relatief } from "@/lib/format";
import { quoteTotaal } from "@/lib/quote-utils";
import type { NoteType, PipelineStage } from "@/lib/types";

const TABS = ["Overzicht", "Notities", "Taken", "Afspraken", "Bestanden", "Offertes"] as const;
type Tab = (typeof TABS)[number];

export default function LeadDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const lead = useCrm((s) => s.leads.find((l) => l.id === leadId));
  const notes = useCrm((s) => s.notes.filter((n) => n.leadId === leadId));
  const tasks = useCrm((s) => s.tasks.filter((t) => t.leadId === leadId));
  const appointments = useCrm((s) => s.appointments.filter((a) => a.leadId === leadId));
  const files = useCrm((s) => s.files.filter((f) => f.leadId === leadId));
  const quotes = useCrm((s) => s.quotes.filter((q) => q.leadId === leadId));
  const quoteRequests = useCrm((s) => s.quoteRequests.filter((q) => q.leadId === leadId));

  const updateLead = useCrm((s) => s.updateLead);
  const [tab, setTab] = useState<Tab>("Overzicht");

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  if (!lead) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
        <p className="text-slate-500">Lead niet gevonden.</p>
        <Link href="/leads" className="mt-4 inline-block text-sm font-semibold text-brand-600">
          ← Terug naar leads
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" /> Terug
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Linker kolom: contact + fase */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-base font-black text-brand-700">
                {lead.naam.split(" ").map((d) => d[0]).slice(0, 2).join("").toUpperCase()}
              </span>
              <div>
                <h1 className="text-lg font-black text-slate-900">{lead.naam}</h1>
                <p className="text-sm text-brand-600">{PRODUCT_LABEL[lead.product]}</p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <ContactRij icon={Mail} waarde={lead.email} href={`mailto:${lead.email}`} />
              <ContactRij icon={Phone} waarde={lead.telefoon} href={`tel:${lead.telefoon}`} />
              {(lead.adres || lead.plaats) && (
                <ContactRij icon={MapPin} waarde={[lead.adres, lead.postcode, lead.plaats].filter(Boolean).join(", ")} />
              )}
              <div className="flex items-center gap-2 text-slate-500">
                <Tag className="h-4 w-4 shrink-0" />
                <span>{SOURCE_LABEL[lead.source]}</span>
              </div>
            </dl>

            {lead.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {lead.tags.map((t) => (
                  <Badge key={t} className="bg-brand-50 text-brand-700">#{t}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Fase & gegevens bewerken */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Fase & toewijzing</h3>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Pijplijn-fase</label>
            <select
              value={lead.stage}
              onChange={(e) => updateLead(lead.id, { stage: e.target.value as PipelineStage })}
              className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>{STAGE_META[s].label}</option>
              ))}
            </select>

            <label className="mb-1 block text-xs font-semibold text-slate-500">Toegewezen aan</label>
            <select
              value={lead.toegewezenAan}
              onChange={(e) => updateLead(lead.id, { toegewezenAan: e.target.value })}
              className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {TEAM.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">Waarde (€)</label>
                <input
                  type="number"
                  value={lead.waarde}
                  onChange={(e) => updateLead(lead.id, { waarde: Number(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">Kans (%)</label>
                <input
                  type="number"
                  value={lead.kans}
                  onChange={(e) => updateLead(lead.id, { kans: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rechter kolom: tabs */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-slate-100 bg-white p-1 shadow-soft">
            {TABS.map((t) => {
              const tellers: Record<Tab, number> = {
                Overzicht: 0,
                Notities: notes.length,
                Taken: tasks.length,
                Afspraken: appointments.length,
                Bestanden: files.length,
                Offertes: quotes.length,
              };
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    tab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {t}
                  {tellers[t] > 0 && (
                    <span className={`rounded-full px-1.5 text-[10px] ${tab === t ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                      {tellers[t]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            {tab === "Overzicht" && <OverzichtTab leadId={lead.id} bericht={lead.bericht} quoteRequests={quoteRequests} />}
            {tab === "Notities" && <NotitiesTab leadId={lead.id} notes={notes} />}
            {tab === "Taken" && <TakenTab leadId={lead.id} tasks={tasks} />}
            {tab === "Afspraken" && <AfsprakenTab leadId={lead.id} appointments={appointments} />}
            {tab === "Bestanden" && <BestandenTab leadId={lead.id} files={files} />}
            {tab === "Offertes" && <OffertesTab leadId={lead.id} quotes={quotes} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRij({ icon: Icon, waarde, href }: { icon: any; waarde: string; href?: string }) {
  const inhoud = (
    <span className="flex items-center gap-2 text-slate-600">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" /> {waarde}
    </span>
  );
  return href ? (
    <a href={href} className="block hover:text-brand-600">{inhoud}</a>
  ) : (
    <div>{inhoud}</div>
  );
}

// --- Overzicht ---
function OverzichtTab({ leadId, bericht, quoteRequests }: { leadId: string; bericht?: string; quoteRequests: any[] }) {
  return (
    <div className="space-y-6">
      {bericht && (
        <div>
          <h3 className="mb-2 text-sm font-bold text-slate-900">Oorspronkelijk bericht</h3>
          <p className="rounded-xl bg-slate-50 p-4 text-sm italic text-slate-600">&ldquo;{bericht}&rdquo;</p>
        </div>
      )}
      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-900">Offerte-aanvragen</h3>
        {quoteRequests.length === 0 ? (
          <p className="text-sm text-slate-400">Geen aanvragen.</p>
        ) : (
          <ul className="space-y-2">
            {quoteRequests.map((q) => (
              <li key={q.id} className="rounded-xl border border-slate-100 p-3 text-sm">
                <p className="font-medium text-slate-700">{q.omschrijving}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {SOURCE_LABEL[q.source as keyof typeof SOURCE_LABEL]} · ontvangen {relatief(q.ontvangenOp)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href={`/offertes/nieuw?lead=${leadId}`} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        <FileText className="h-4 w-4" /> Offerte maken
      </Link>
    </div>
  );
}

// --- Notities ---
function NotitiesTab({ leadId, notes }: { leadId: string; notes: any[] }) {
  const addNote = useCrm((s) => s.addNote);
  const [tekst, setTekst] = useState("");
  const [type, setType] = useState<NoteType>("notitie");

  const iconVoor = (t: NoteType) =>
    t === "telefoon" ? PhoneCall : t === "email" ? Mail : StickyNote;

  return (
    <div>
      <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
        <textarea
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          rows={3}
          placeholder="Voeg een notitie toe…"
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <div className="mt-2 flex items-center justify-between">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as NoteType)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none"
          >
            <option value="notitie">Notitie</option>
            <option value="telefoon">Telefoongesprek</option>
            <option value="email">E-mail</option>
          </select>
          <button
            onClick={() => {
              if (!tekst.trim()) return;
              addNote(leadId, tekst.trim(), type);
              setTekst("");
            }}
            disabled={!tekst.trim()}
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            Toevoegen
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {notes.map((n) => {
          const Icon = iconVoor(n.type);
          return (
            <li key={n.id} className="flex gap-3 rounded-xl border border-slate-100 p-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-700">{n.tekst}</p>
                <p className="mt-1 text-xs text-slate-400">{n.auteur} · {datumTijd(n.aangemaaktOp)}</p>
              </div>
            </li>
          );
        })}
        {notes.length === 0 && <p className="text-sm text-slate-400">Nog geen notities.</p>}
      </ul>
    </div>
  );
}

// --- Taken ---
function TakenTab({ leadId, tasks }: { leadId: string; tasks: any[] }) {
  const [dialog, setDialog] = useState(false);
  return (
    <div>
      <button onClick={() => setDialog(true)} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        <Plus className="h-4 w-4" /> Nieuwe taak
      </button>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id}>
            <Link href={`/taken/${t.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50/60">
              <Badge className={TASK_STATUS_META[t.status as keyof typeof TASK_STATUS_META].kleur}>
                {TASK_STATUS_META[t.status as keyof typeof TASK_STATUS_META].label}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700">{t.titel}</p>
                <p className="text-xs text-slate-400">{datumTijd(t.deadline)} · {t.prioriteit}</p>
              </div>
            </Link>
          </li>
        ))}
        {tasks.length === 0 && <p className="text-sm text-slate-400">Geen taken voor deze lead.</p>}
      </ul>
      <TaskDialog open={dialog} onClose={() => setDialog(false)} preset={{ leadId }} />
    </div>
  );
}

// --- Afspraken ---
function AfsprakenTab({ leadId, appointments }: { leadId: string; appointments: any[] }) {
  const [dialog, setDialog] = useState(false);
  return (
    <div>
      <button onClick={() => setDialog(true)} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        <Plus className="h-4 w-4" /> Nieuwe afspraak
      </button>
      <ul className="space-y-2">
        {appointments.map((a) => (
          <li key={a.id}>
            <Link href={`/agenda/${a.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700">{a.titel}</p>
                <p className="text-xs text-slate-400">
                  {APPOINTMENT_TYPE_META[a.type as keyof typeof APPOINTMENT_TYPE_META].label} · {datumTijd(a.start)}{a.locatie ? ` · ${a.locatie}` : ""}
                </p>
              </div>
              {a.googleSynced && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">✓ Google</span>}
            </Link>
          </li>
        ))}
        {appointments.length === 0 && <p className="text-sm text-slate-400">Geen afspraken.</p>}
      </ul>
      <AppointmentDialog open={dialog} onClose={() => setDialog(false)} preset={{ leadId }} />
    </div>
  );
}

// --- Bestanden ---
function BestandenTab({ leadId, files }: { leadId: string; files: any[] }) {
  const addFile = useCrm((s) => s.addFile);
  const deleteFile = useCrm((s) => s.deleteFile);
  const inputRef = useRef<HTMLInputElement>(null);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const lijst = e.target.files;
    if (!lijst) return;
    for (const f of Array.from(lijst)) {
      addFile({
        leadId,
        naam: f.name,
        type: f.type.includes("pdf") ? "pdf" : f.type.startsWith("image") ? "afbeelding" : "bestand",
        grootteKb: Math.round(f.size / 1024),
        geuploadDoor: "Jij",
      });
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-6 text-sm font-semibold text-slate-500 transition hover:border-brand-400 hover:text-brand-600"
      >
        <Upload className="h-5 w-5" /> Klik om bestanden te uploaden
      </button>
      <input ref={inputRef} type="file" multiple className="hidden" onChange={onUpload} />

      <ul className="space-y-2">
        {files.map((f) => (
          <li key={f.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-700">{f.naam}</p>
              <p className="text-xs text-slate-400">{f.grootteKb} KB · {f.geuploadDoor} · {datum(f.geuploadOp)}</p>
            </div>
            <button onClick={() => deleteFile(f.id)} className="text-slate-300 hover:text-rose-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {files.length === 0 && <p className="text-sm text-slate-400">Nog geen bestanden.</p>}
      </ul>
    </div>
  );
}

// --- Offertes ---
function OffertesTab({ leadId, quotes }: { leadId: string; quotes: any[] }) {
  return (
    <div>
      <Link href={`/offertes/nieuw?lead=${leadId}`} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        <Plus className="h-4 w-4" /> Nieuwe offerte
      </Link>
      <ul className="space-y-2">
        {quotes.map((q) => (
          <li key={q.id}>
            <Link href={`/offertes/${q.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{q.nummer}</p>
                <p className="text-xs text-slate-400">Geldig tot {datum(q.geldigTot)}</p>
              </div>
              <Badge className={QUOTE_STATUS_META[q.status as keyof typeof QUOTE_STATUS_META].kleur}>
                {QUOTE_STATUS_META[q.status as keyof typeof QUOTE_STATUS_META].label}
              </Badge>
              <span className="text-sm font-bold text-slate-900">{euro(quoteTotaal(q))}</span>
            </Link>
          </li>
        ))}
        {quotes.length === 0 && <p className="text-sm text-slate-400">Nog geen offertes.</p>}
      </ul>
    </div>
  );
}
