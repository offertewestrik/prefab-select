"use client";

import { useState } from "react";
import { Modal } from "./ui/Modal";
import { useCrm } from "@/lib/store";
import { TASK_STATUS_META, TASK_STATUS_ORDER } from "@/lib/constants";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  bestaand?: Task;
  preset?: { leadId?: string; quoteId?: string; projectId?: string };
}

function toLocal(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (!iso) d.setHours(d.getHours() + 24, 0, 0, 0);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export function TaskDialog({ open, onClose, bestaand, preset }: Props) {
  const leads = useCrm((s) => s.leads);
  const users = useCrm((s) => s.users);
  const currentUserId = useCrm((s) => s.currentUserId);
  const addTask = useCrm((s) => s.addTask);
  const updateTask = useCrm((s) => s.updateTask);

  const [titel, setTitel] = useState(bestaand?.titel ?? "");
  const [omschrijving, setOmschrijving] = useState(bestaand?.omschrijving ?? "");
  const [prioriteit, setPrioriteit] = useState<TaskPriority>(bestaand?.prioriteit ?? "normaal");
  const [status, setStatus] = useState<TaskStatus>(bestaand?.status ?? "open");
  const [deadline, setDeadline] = useState(toLocal(bestaand?.deadline));
  const [medewerkerId, setMedewerkerId] = useState(bestaand?.medewerkerId ?? currentUserId);
  const [leadId, setLeadId] = useState(bestaand?.leadId ?? preset?.leadId ?? "");
  const [reminder, setReminder] = useState(String(bestaand?.reminderMinuten ?? 30));

  function opslaan() {
    if (!titel.trim()) return;
    const data = {
      titel: titel.trim(),
      omschrijving: omschrijving.trim() || undefined,
      prioriteit,
      status,
      deadline: new Date(deadline).toISOString(),
      medewerkerId,
      leadId: leadId || undefined,
      quoteId: bestaand?.quoteId ?? preset?.quoteId,
      projectId: bestaand?.projectId ?? preset?.projectId,
      reminderMinuten: reminder === "geen" ? null : Number(reminder),
    };
    if (bestaand) updateTask(bestaand.id, data);
    else addTask(data);
    onClose();
  }

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";
  const labelCls = "mb-1 block text-xs font-semibold text-slate-500";

  return (
    <Modal open={open} onClose={onClose} title={bestaand ? "Taak bewerken" : "Nieuwe taak"} breed>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Titel *</label>
          <input className={inputCls} value={titel} onChange={(e) => setTitel(e.target.value)} placeholder="Wat moet er gebeuren?" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Omschrijving</label>
          <textarea className={inputCls} rows={2} value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Prioriteit</label>
          <select className={inputCls} value={prioriteit} onChange={(e) => setPrioriteit(e.target.value as TaskPriority)}>
            <option value="laag">Laag</option>
            <option value="normaal">Normaal</option>
            <option value="hoog">Hoog</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            {TASK_STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{TASK_STATUS_META[s].label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Deadline</label>
          <input type="datetime-local" className={inputCls} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
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
          <label className={labelCls}>Gekoppelde lead</label>
          <select className={inputCls} value={leadId} onChange={(e) => setLeadId(e.target.value)}>
            <option value="">— Geen —</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>{l.naam}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Reminder</label>
          <select className={inputCls} value={reminder} onChange={(e) => setReminder(e.target.value)}>
            <option value="geen">Geen</option>
            <option value="15">15 min vooraf</option>
            <option value="30">30 min vooraf</option>
            <option value="60">1 uur vooraf</option>
            <option value="1440">1 dag vooraf</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Annuleren</button>
        <button onClick={opslaan} disabled={!titel.trim()} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40">
          {bestaand ? "Opslaan" : "Taak aanmaken"}
        </button>
      </div>
    </Modal>
  );
}
