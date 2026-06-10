"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Bell, MessageSquare } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { TaskDialog } from "@/components/TaskDialog";
import { TASK_STATUS_META, TASK_STATUS_ORDER } from "@/lib/constants";
import { datumTijd, relatief, initialen } from "@/lib/format";
import type { Task, TaskStatus } from "@/lib/types";

const PRIO_DOT: Record<string, string> = { hoog: "bg-rose-500", normaal: "bg-amber-500", laag: "bg-slate-300" };

export default function TakenPage() {
  const mounted = useMounted();
  const tasks = useCrm((s) => s.tasks);
  const users = useCrm((s) => s.users);
  const leads = useCrm((s) => s.leads);
  const comments = useCrm((s) => s.taskComments);
  const currentUserId = useCrm((s) => s.currentUserId);
  const setTaskStatus = useCrm((s) => s.setTaskStatus);
  const [alleenIk, setAlleenIk] = useState(false);
  const [dialog, setDialog] = useState(false);

  const zichtbaar = useMemo(
    () => tasks.filter((t) => (alleenIk ? t.medewerkerId === currentUserId : true)),
    [tasks, alleenIk, currentUserId],
  );

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const open = tasks.filter((t) => t.status !== "gereed");
  const teLaat = open.filter((t) => new Date(t.deadline) < new Date());

  return (
    <div>
      <PageHeader
        titel="Taken & reminders"
        subtitel={`${open.length} open · ${teLaat.length} over deadline`}
        actie={
          <button onClick={() => setDialog(true)} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Nieuwe taak
          </button>
        }
      />

      <div className="mb-4 flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <input type="checkbox" checked={alleenIk} onChange={(e) => setAlleenIk(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Alleen mijn taken
        </label>
      </div>

      {/* Statusbord */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {TASK_STATUS_ORDER.map((status) => {
          const kolom = zichtbaar
            .filter((t) => t.status === status)
            .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
          return (
            <div key={status} className="flex flex-col">
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className={`h-2.5 w-2.5 rounded-full ${TASK_STATUS_META[status].dot}`} />
                <h3 className="text-sm font-bold text-slate-700">{TASK_STATUS_META[status].label}</h3>
                <span className="rounded-full bg-slate-100 px-1.5 text-xs font-semibold text-slate-500">{kolom.length}</span>
              </div>
              <div className="flex-1 space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-2" style={{ minHeight: 120 }}>
                {kolom.map((t) => (
                  <TaakKaart
                    key={t.id}
                    taak={t}
                    user={users.find((u) => u.id === t.medewerkerId)}
                    leadNaam={t.leadId ? leads.find((l) => l.id === t.leadId)?.naam : undefined}
                    aantalComments={comments.filter((c) => c.taskId === t.id).length}
                    onStatus={(s) => setTaskStatus(t.id, s)}
                  />
                ))}
                {kolom.length === 0 && <p className="py-6 text-center text-xs text-slate-300">Geen taken</p>}
              </div>
            </div>
          );
        })}
      </div>

      <TaskDialog open={dialog} onClose={() => setDialog(false)} />
    </div>
  );
}

function TaakKaart({
  taak,
  user,
  leadNaam,
  aantalComments,
  onStatus,
}: {
  taak: Task;
  user?: { naam: string; kleur: string };
  leadNaam?: string;
  aantalComments: number;
  onStatus: (s: TaskStatus) => void;
}) {
  const teLaat = taak.status !== "gereed" && new Date(taak.deadline) < new Date();
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft">
      <div className="flex items-start gap-2">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${PRIO_DOT[taak.prioriteit]}`} />
        <Link href={`/taken/${taak.id}`} className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 hover:text-brand-600">{taak.titel}</p>
        </Link>
        {user && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: user.kleur }} title={user.naam}>
            {initialen(user.naam)}
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-4 text-[11px] text-slate-400">
        <span className={teLaat ? "font-semibold text-rose-500" : ""}>{datumTijd(taak.deadline)}</span>
        {taak.reminderMinuten !== null && <span className="flex items-center gap-1"><Bell className="h-3 w-3" /> {taak.reminderMinuten}m</span>}
        {aantalComments > 0 && <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {aantalComments}</span>}
        {leadNaam && <Link href={`/taken/${taak.id}`} className="truncate hover:text-brand-600">→ {leadNaam}</Link>}
      </div>
      <select
        value={taak.status}
        onChange={(e) => onStatus(e.target.value as TaskStatus)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-brand-500"
      >
        {TASK_STATUS_ORDER.map((s) => (
          <option key={s} value={s}>{TASK_STATUS_META[s].label}</option>
        ))}
      </select>
    </div>
  );
}
