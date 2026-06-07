"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM } from "@/lib/constants";
import { datumTijd, relatief } from "@/lib/format";
import { CheckCircle2, Circle, Trash2, Plus, Bell } from "lucide-react";
import type { TaskPriority } from "@/lib/types";

const PRIO_META: Record<TaskPriority, { label: string; kleur: string; dot: string }> = {
  hoog: { label: "Hoog", kleur: "text-rose-600", dot: "bg-rose-500" },
  normaal: { label: "Normaal", kleur: "text-amber-600", dot: "bg-amber-500" },
  laag: { label: "Laag", kleur: "text-slate-500", dot: "bg-slate-300" },
};

export default function TakenPage() {
  const mounted = useMounted();
  const tasks = useCrm((s) => s.tasks);
  const leads = useCrm((s) => s.leads);
  const addTask = useCrm((s) => s.addTask);
  const toggleTask = useCrm((s) => s.toggleTask);
  const deleteTask = useCrm((s) => s.deleteTask);

  const [filter, setFilter] = useState<"open" | "klaar" | "alle">("open");
  const [titel, setTitel] = useState("");
  const [vervaldatum, setVervaldatum] = useState("");
  const [prio, setPrio] = useState<TaskPriority>("normaal");
  const [persoon, setPersoon] = useState(TEAM[0]);
  const [reminder, setReminder] = useState("30");

  const gefilterd = useMemo(() => {
    return tasks
      .filter((t) => (filter === "alle" ? true : filter === "open" ? !t.voltooid : t.voltooid))
      .sort((a, b) => +new Date(a.vervaldatum) - +new Date(b.vervaldatum));
  }, [tasks, filter]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const open = tasks.filter((t) => !t.voltooid);
  const teLaat = open.filter((t) => new Date(t.vervaldatum) < new Date());

  function voegToe() {
    if (!titel.trim()) return;
    addTask({
      titel: titel.trim(),
      vervaldatum: vervaldatum ? new Date(vervaldatum).toISOString() : new Date().toISOString(),
      prioriteit: prio,
      toegewezenAan: persoon,
      reminderMinuten: reminder === "geen" ? null : Number(reminder),
    });
    setTitel("");
    setVervaldatum("");
  }

  const inputCls = "rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";

  return (
    <div>
      <PageHeader titel="Taken & reminders" subtitel={`${open.length} open · ${teLaat.length} te laat`} />

      {/* Nieuwe taak */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-xs font-semibold text-slate-500">Taak</label>
            <input value={titel} onChange={(e) => setTitel(e.target.value)} placeholder="Wat moet er gebeuren?" className={`w-full ${inputCls}`} onKeyDown={(e) => e.key === "Enter" && voegToe()} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Vervaldatum</label>
            <input type="datetime-local" value={vervaldatum} onChange={(e) => setVervaldatum(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Prioriteit</label>
            <select value={prio} onChange={(e) => setPrio(e.target.value as TaskPriority)} className={inputCls}>
              <option value="laag">Laag</option>
              <option value="normaal">Normaal</option>
              <option value="hoog">Hoog</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Wie</label>
            <select value={persoon} onChange={(e) => setPersoon(e.target.value)} className={inputCls}>
              {TEAM.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Reminder</label>
            <select value={reminder} onChange={(e) => setReminder(e.target.value)} className={inputCls}>
              <option value="geen">Geen</option>
              <option value="15">15 min vooraf</option>
              <option value="30">30 min vooraf</option>
              <option value="60">1 uur vooraf</option>
              <option value="1440">1 dag vooraf</option>
            </select>
          </div>
          <button onClick={voegToe} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Toevoegen
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        {(["open", "klaar", "alle"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold capitalize ${filter === f ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
            {f === "open" ? "Openstaand" : f === "klaar" ? "Voltooid" : "Alle"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {gefilterd.map((t) => {
          const lead = t.leadId ? leads.find((l) => l.id === t.leadId) : null;
          const teLaat = !t.voltooid && new Date(t.vervaldatum) < new Date();
          return (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
              <button onClick={() => toggleTask(t.id)} className="text-brand-600">
                {t.voltooid ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5 text-slate-300" />}
              </button>
              <span className={`h-2 w-2 shrink-0 rounded-full ${PRIO_META[t.prioriteit].dot}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${t.voltooid ? "text-slate-400 line-through" : "text-slate-800"}`}>{t.titel}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-slate-400">
                  <span className={teLaat ? "font-semibold text-rose-500" : ""}>{datumTijd(t.vervaldatum)} · {relatief(t.vervaldatum)}</span>
                  <span>{t.toegewezenAan}</span>
                  {t.reminderMinuten !== null && (
                    <span className="flex items-center gap-1"><Bell className="h-3 w-3" /> {t.reminderMinuten} min</span>
                  )}
                  {lead && <Link href={`/leads/${lead.id}`} className="hover:text-brand-600">→ {lead.naam}</Link>}
                </div>
              </div>
              <button onClick={() => deleteTask(t.id)} className="text-slate-300 hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
        {gefilterd.length === 0 && <p className="py-12 text-center text-slate-400">Geen taken in deze weergave.</p>}
      </div>
    </div>
  );
}
