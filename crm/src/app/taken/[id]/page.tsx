"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2, User as UserIcon, FileText, Bell, Send } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { TaskDialog } from "@/components/TaskDialog";
import { TASK_STATUS_META, TASK_STATUS_ORDER } from "@/lib/constants";
import { datumTijd, relatief, initialen } from "@/lib/format";
import type { TaskStatus } from "@/lib/types";

const PRIO_LABEL: Record<string, string> = { hoog: "Hoog", normaal: "Normaal", laag: "Laag" };

export default function TaakDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const router = useRouter();
  const taakId = params.id as string;

  const taak = useCrm((s) => s.tasks.find((t) => t.id === taakId));
  const users = useCrm((s) => s.users);
  const lead = useCrm((s) => s.leads.find((l) => l.id === taak?.leadId));
  const quote = useCrm((s) => s.quotes.find((q) => q.id === taak?.quoteId));
  const comments = useCrm((s) => s.taskComments.filter((c) => c.taskId === taakId));
  const setTaskStatus = useCrm((s) => s.setTaskStatus);
  const deleteTask = useCrm((s) => s.deleteTask);
  const addTaskComment = useCrm((s) => s.addTaskComment);

  const [edit, setEdit] = useState(false);
  const [reactie, setReactie] = useState("");

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  if (!taak) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
        <p className="text-slate-500">Taak niet gevonden.</p>
        <Link href="/taken" className="mt-4 inline-block text-sm font-semibold text-brand-600">← Terug naar taken</Link>
      </div>
    );
  }

  const user = users.find((u) => u.id === taak.medewerkerId);
  const teLaat = taak.status !== "gereed" && new Date(taak.deadline) < new Date();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/taken" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Taken
      </Link>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-slate-900">{taak.titel}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className={TASK_STATUS_META[taak.status].kleur}>{TASK_STATUS_META[taak.status].label}</Badge>
              <Badge className="bg-slate-100 text-slate-600">Prioriteit: {PRIO_LABEL[taak.prioriteit]}</Badge>
            </div>
          </div>
          <button onClick={() => setEdit(true)} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
            <Pencil className="h-4 w-4" /> Bewerken
          </button>
        </div>

        {taak.omschrijving && <p className="mt-4 text-sm text-slate-600">{taak.omschrijving}</p>}

        <dl className="mt-5 space-y-3 border-t border-slate-50 pt-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-24 text-slate-400">Deadline</span>
            <span className={teLaat ? "font-semibold text-rose-500" : ""}>{datumTijd(taak.deadline)} · {relatief(taak.deadline)}</span>
          </div>
          {user && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-24 text-slate-400">Medewerker</span>
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: user.kleur }}>{initialen(user.naam)}</span>
                {user.naam}
              </span>
            </div>
          )}
          {taak.reminderMinuten !== null && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-24 text-slate-400">Reminder</span>
              <span className="flex items-center gap-1"><Bell className="h-3.5 w-3.5" /> {taak.reminderMinuten} min vooraf</span>
            </div>
          )}
          {lead && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-24 text-slate-400">Lead</span>
              <Link href={`/leads/${lead.id}`} className="font-medium text-brand-600 hover:text-brand-700"><UserIcon className="mr-1 inline h-3.5 w-3.5" />{lead.naam}</Link>
            </div>
          )}
          {quote && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-24 text-slate-400">Offerte</span>
              <Link href={`/offertes/${quote.id}`} className="font-medium text-brand-600 hover:text-brand-700"><FileText className="mr-1 inline h-3.5 w-3.5" />{quote.nummer}</Link>
            </div>
          )}
        </dl>

        {/* Snelle status */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-50 pt-4">
          <span className="self-center text-xs font-semibold text-slate-400">Status:</span>
          {TASK_STATUS_ORDER.map((s: TaskStatus) => (
            <button key={s} onClick={() => setTaskStatus(taak.id, s)} className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${taak.status === s ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {TASK_STATUS_META[s].label}
            </button>
          ))}
          <button
            onClick={() => { if (confirm("Taak verwijderen?")) { deleteTask(taak.id); router.push("/taken"); } }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Verwijderen
          </button>
        </div>
      </div>

      {/* Reacties */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Reacties ({comments.length})</h3>
        <div className="mb-4 flex gap-2">
          <input
            value={reactie}
            onChange={(e) => setReactie(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && reactie.trim()) { addTaskComment(taak.id, reactie.trim()); setReactie(""); } }}
            placeholder="Voeg een reactie toe…"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <button
            onClick={() => { if (reactie.trim()) { addTaskComment(taak.id, reactie.trim()); setReactie(""); } }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <ul className="space-y-3">
          {comments.map((c) => {
            const auteur = users.find((u) => u.id === c.auteurId);
            return (
              <li key={c.id} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: auteur?.kleur ?? "#94a3b8" }}>
                  {initialen(auteur?.naam ?? "?")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-700"><span className="font-semibold">{auteur?.naam ?? "?"}</span></p>
                  <p className="text-sm text-slate-600">{c.tekst}</p>
                  <p className="text-[11px] text-slate-400">{relatief(c.aangemaaktOp)}</p>
                </div>
              </li>
            );
          })}
          {comments.length === 0 && <p className="text-sm text-slate-400">Nog geen reacties.</p>}
        </ul>
      </div>

      <TaskDialog open={edit} onClose={() => setEdit(false)} bestaand={taak} />
    </div>
  );
}
