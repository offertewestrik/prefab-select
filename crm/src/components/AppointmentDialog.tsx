"use client";

import { useState } from "react";
import { Modal } from "./ui/Modal";
import { useCrm } from "@/lib/store";
import { APPOINTMENT_TYPE_META } from "@/lib/constants";
import type { Appointment, AppointmentType } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Bestaande afspraak om te bewerken. */
  bestaand?: Appointment;
  /** Voorinvullingen bij nieuw (vanuit lead, offerte of agenda-klik). */
  preset?: { leadId?: string; quoteId?: string; start?: string };
}

function toLocal(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (!iso) {
    d.setHours(d.getHours() + 1, 0, 0, 0);
  }
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export function AppointmentDialog({ open, onClose, bestaand, preset }: Props) {
  const leads = useCrm((s) => s.leads);
  const quotes = useCrm((s) => s.quotes);
  const users = useCrm((s) => s.users);
  const currentUserId = useCrm((s) => s.currentUserId);
  const addAppointment = useCrm((s) => s.addAppointment);
  const updateAppointment = useCrm((s) => s.updateAppointment);

  const [titel, setTitel] = useState(bestaand?.titel ?? "");
  const [type, setType] = useState<AppointmentType>(bestaand?.type ?? "adviesgesprek");
  const [start, setStart] = useState(toLocal(bestaand?.start ?? preset?.start));
  const [duur, setDuur] = useState(() => {
    if (bestaand) return Math.max(15, Math.round((+new Date(bestaand.eind) - +new Date(bestaand.start)) / 60000));
    return 60;
  });
  const [leadId, setLeadId] = useState(bestaand?.leadId ?? preset?.leadId ?? "");
  const [quoteId, setQuoteId] = useState(bestaand?.quoteId ?? preset?.quoteId ?? "");
  const [locatie, setLocatie] = useState(bestaand?.locatie ?? "");
  const [omschrijving, setOmschrijving] = useState(bestaand?.omschrijving ?? "");
  const [medewerkerId, setMedewerkerId] = useState(bestaand?.medewerkerId ?? currentUserId);

  function opslaan() {
    if (!titel.trim() || !start) return;
    const startDate = new Date(start);
    const eindDate = new Date(startDate.getTime() + duur * 60000);
    const data = {
      titel: titel.trim(),
      type,
      start: startDate.toISOString(),
      eind: eindDate.toISOString(),
      leadId: leadId || undefined,
      quoteId: quoteId || undefined,
      locatie: locatie.trim() || undefined,
      omschrijving: omschrijving.trim() || undefined,
      medewerkerId,
      googleSynced: bestaand?.googleSynced ?? false,
    };
    if (bestaand) updateAppointment(bestaand.id, data);
    else addAppointment(data);
    onClose();
  }

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";
  const labelCls = "mb-1 block text-xs font-semibold text-slate-500";

  const leadQuotes = quotes.filter((q) => !leadId || q.leadId === leadId);

  return (
    <Modal open={open} onClose={onClose} title={bestaand ? "Afspraak bewerken" : "Nieuwe afspraak"} breed>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Titel *</label>
          <input className={inputCls} value={titel} onChange={(e) => setTitel(e.target.value)} placeholder="Bijv. Inmeten familie De Vries" />
        </div>
        <div>
          <label className={labelCls}>Type afspraak</label>
          <select className={inputCls} value={type} onChange={(e) => setType(e.target.value as AppointmentType)}>
            {Object.entries(APPOINTMENT_TYPE_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Medewerker</label>
          <select className={inputCls} value={medewerkerId} onChange={(e) => setMedewerkerId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.naam}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Datum &amp; tijd</label>
          <input type="datetime-local" className={inputCls} value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Duur (minuten)</label>
          <input type="number" step={15} min={15} className={inputCls} value={duur} onChange={(e) => setDuur(Number(e.target.value) || 60)} />
        </div>
        <div>
          <label className={labelCls}>Klant / lead</label>
          <select className={inputCls} value={leadId} onChange={(e) => { setLeadId(e.target.value); setQuoteId(""); }}>
            <option value="">— Geen —</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>{l.naam}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Offerte (optioneel)</label>
          <select className={inputCls} value={quoteId} onChange={(e) => setQuoteId(e.target.value)}>
            <option value="">— Geen —</option>
            {leadQuotes.map((q) => (
              <option key={q.id} value={q.id}>{q.nummer}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Locatie</label>
          <input className={inputCls} value={locatie} onChange={(e) => setLocatie(e.target.value)} placeholder="Adres of 'Showroom Prefab Select'" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Omschrijving</label>
          <textarea className={inputCls} rows={2} value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Annuleren</button>
        <button onClick={opslaan} disabled={!titel.trim() || !start} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40">
          {bestaand ? "Opslaan" : "Afspraak inplannen"}
        </button>
      </div>
    </Modal>
  );
}
