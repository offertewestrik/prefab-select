"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CalendarDays, CheckSquare, BellRing, MapPin } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { APPOINTMENT_TYPE_META, TASK_STATUS_META, ROLE_META, REMINDER_DAGEN } from "@/lib/constants";
import { tijd, datumTijd, relatief } from "@/lib/format";

export default function MijnDagPage() {
  const mounted = useMounted();
  const currentUserId = useCrm((s) => s.currentUserId);
  const users = useCrm((s) => s.users);
  const appointments = useCrm((s) => s.appointments);
  const tasks = useCrm((s) => s.tasks);
  const leads = useCrm((s) => s.leads);
  const quotes = useCrm((s) => s.quotes);
  const reminderRules = useCrm((s) => s.reminderRules);
  const toggleReminderRule = useCrm((s) => s.toggleReminderRule);
  const updateReminderRule = useCrm((s) => s.updateReminderRule);

  const user = users.find((u) => u.id === currentUserId);

  const startVandaag = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
  const eindVandaag = useMemo(() => new Date(new Date().setHours(23, 59, 59, 999)), []);

  const mijnAfspraken = useMemo(
    () =>
      appointments
        .filter((a) => a.medewerkerId === currentUserId && new Date(a.start) >= startVandaag && new Date(a.start) <= eindVandaag)
        .sort((a, b) => +new Date(a.start) - +new Date(b.start)),
    [appointments, currentUserId, startVandaag, eindVandaag],
  );

  const mijnTaken = useMemo(
    () =>
      tasks
        .filter((t) => t.medewerkerId === currentUserId && t.status !== "gereed" && new Date(t.deadline) <= eindVandaag)
        .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline)),
    [tasks, currentUserId, eindVandaag],
  );

  // Opvolg-reminders afgeleid van de actieve reminder-regels
  const reminders = useMemo(() => {
    const items: { id: string; tekst: string; link: string; sub: string }[] = [];
    const nu = Date.now();
    const leadRule = reminderRules.find((r) => r.trigger === "nieuwe_lead" && r.actief);
    if (leadRule?.offsetDagen != null) {
      leads
        .filter((l) => l.stage === "nieuwe_lead")
        .filter((l) => nu - +new Date(l.aangemaaktOp) >= leadRule.offsetDagen! * 86400000)
        .forEach((l) => items.push({ id: `lead-${l.id}`, tekst: `Nieuwe lead opvolgen: ${l.naam}`, link: `/leads/${l.id}`, sub: `aangemaakt ${relatief(l.aangemaaktOp)}` }));
    }
    const offRule = reminderRules.find((r) => r.trigger === "offerte_verstuurd" && r.actief);
    if (offRule?.offsetDagen != null) {
      quotes
        .filter((q) => ["verstuurd", "bekeken"].includes(q.status) && q.verstuurdOp)
        .filter((q) => nu - +new Date(q.verstuurdOp!) >= offRule.offsetDagen! * 86400000)
        .forEach((q) => {
          const lead = leads.find((l) => l.id === q.leadId);
          items.push({ id: `quote-${q.id}`, tekst: `Offerte ${q.nummer} opvolgen${lead ? ` (${lead.naam})` : ""}`, link: `/offertes/${q.id}`, sub: `verstuurd ${relatief(q.verstuurdOp!)}` });
        });
    }
    const aRule = reminderRules.find((r) => r.trigger === "afspraak_gepland" && r.actief);
    if (aRule?.offsetUrenVooraf != null) {
      appointments
        .filter((a) => { const d = +new Date(a.start) - nu; return d > 0 && d <= aRule.offsetUrenVooraf! * 3600000; })
        .forEach((a) => items.push({ id: `afspr-${a.id}`, tekst: `Afspraak nadert: ${a.titel}`, link: `/agenda/${a.id}`, sub: datumTijd(a.start) }));
    }
    return items;
  }, [reminderRules, leads, quotes, appointments]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel={`Mijn dag${user ? ` — ${user.naam}` : ""}`}
        subtitel={user ? `${ROLE_META[user.rol].label} · ${new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}` : ""}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Afspraken vandaag */}
        <Paneel titel="Mijn afspraken vandaag" icon={CalendarDays} leeg={mijnAfspraken.length === 0} legeTekst="Geen afspraken vandaag.">
          {mijnAfspraken.map((a) => (
            <Link key={a.id} href={`/agenda/${a.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50/60">
              <div className="w-14 shrink-0 text-center">
                <p className="text-sm font-black text-slate-900">{tijd(a.start)}</p>
                <p className="text-[10px] text-slate-400">{tijd(a.eind)}</p>
              </div>
              <span className="h-9 w-1 shrink-0 rounded-full" style={{ backgroundColor: APPOINTMENT_TYPE_META[a.type].hex }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{a.titel}</p>
                <p className="truncate text-xs text-slate-400">
                  {APPOINTMENT_TYPE_META[a.type].label}{a.locatie ? ` · ${a.locatie}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </Paneel>

        {/* Taken vandaag */}
        <Paneel titel="Mijn taken vandaag" icon={CheckSquare} leeg={mijnTaken.length === 0} legeTekst="Geen openstaande taken. 🎉">
          {mijnTaken.map((t) => {
            const teLaat = new Date(t.deadline) < new Date();
            return (
              <Link key={t.id} href={`/taken/${t.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50/60">
                <Badge className={TASK_STATUS_META[t.status].kleur}>{TASK_STATUS_META[t.status].label}</Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{t.titel}</p>
                  <p className={`text-xs ${teLaat ? "font-semibold text-rose-500" : "text-slate-400"}`}>{datumTijd(t.deadline)}</p>
                </div>
              </Link>
            );
          })}
        </Paneel>

        {/* Opvolg-reminders */}
        <Paneel titel="Opvolgen (reminders)" icon={BellRing} leeg={reminders.length === 0} legeTekst="Niets om op te volgen.">
          {reminders.map((r) => (
            <Link key={r.id} href={r.link} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/40 p-3 transition hover:bg-amber-50">
              <BellRing className="h-4 w-4 shrink-0 text-amber-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700">{r.tekst}</p>
                <p className="text-xs text-slate-400">{r.sub}</p>
              </div>
            </Link>
          ))}
        </Paneel>

        {/* Reminder-instellingen */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="mb-1 flex items-center gap-2 font-bold text-slate-900">
            <BellRing className="h-4 w-4 text-brand-600" /> Opvolg-instellingen
          </h2>
          <p className="mb-4 text-xs text-slate-400">Bepaal wanneer automatische herinneringen verschijnen.</p>
          <ul className="space-y-3">
            {reminderRules.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 p-3">
                <label className="flex flex-1 items-center gap-2">
                  <input type="checkbox" checked={r.actief} onChange={() => toggleReminderRule(r.id)} className="h-4 w-4 rounded border-slate-300" />
                  <span className="text-sm font-medium text-slate-700">{r.label}</span>
                </label>
                {r.trigger === "afspraak_gepland" ? (
                  <span className="text-xs text-slate-500">{r.offsetUrenVooraf} uur vooraf</span>
                ) : (
                  <select
                    value={r.offsetDagen}
                    onChange={(e) => updateReminderRule(r.id, { offsetDagen: Number(e.target.value) })}
                    disabled={!r.actief}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-brand-500 disabled:opacity-50"
                  >
                    {REMINDER_DAGEN.map((d) => (
                      <option key={d} value={d}>na {d} {d === 1 ? "dag" : "dagen"}</option>
                    ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Paneel({
  titel,
  icon: Icon,
  leeg,
  legeTekst,
  children,
}: {
  titel: string;
  icon: any;
  leeg: boolean;
  legeTekst: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
        <Icon className="h-4 w-4 text-brand-600" /> {titel}
      </h2>
      {leeg ? <p className="text-sm text-slate-400">{legeTekst}</p> : <div className="space-y-2">{children}</div>}
    </div>
  );
}
