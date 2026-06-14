"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import nlLocale from "@fullcalendar/core/locales/nl";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ROLE_META } from "@/lib/constants";
import { initialen } from "@/lib/format";

export default function TeamPlanningPage() {
  const mounted = useMounted();
  const router = useRouter();
  const users = useCrm((s) => s.users);
  const appointments = useCrm((s) => s.appointments);
  const toggleUserGoogle = useCrm((s) => s.toggleUserGoogle);

  const [actief, setActief] = useState<Record<string, boolean>>({});
  const isActief = (id: string) => actief[id] ?? true;

  const startWeek = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
  const eindWeek = useMemo(() => {
    const d = new Date(startWeek);
    d.setDate(d.getDate() + 7);
    return d;
  }, [startWeek]);

  const events = useMemo(
    () =>
      appointments
        .filter((a) => isActief(a.medewerkerId))
        .map((a) => {
          const u = users.find((x) => x.id === a.medewerkerId);
          return {
            id: a.id,
            title: `${a.titel}${u ? ` · ${u.naam}` : ""}`,
            start: a.start,
            end: a.eind,
            backgroundColor: u?.kleur ?? "#64748b",
            borderColor: u?.kleur ?? "#64748b",
          };
        }),
    [appointments, users, actief],
  );

  if (!mounted) return <div className="h-[600px] animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Team planning" subtitel="Agenda en bezetting van het hele team" />

      {/* Medewerkers */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((u) => {
          const aantalWeek = appointments.filter(
            (a) => a.medewerkerId === u.id && new Date(a.start) >= startWeek && new Date(a.start) <= eindWeek,
          ).length;
          return (
            <div key={u.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: u.kleur }}>
                  {initialen(u.naam)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{u.naam}</p>
                  <Badge className={ROLE_META[u.rol].kleur}>{ROLE_META[u.rol].label}</Badge>
                </div>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-500">
                  <input type="checkbox" checked={isActief(u.id)} onChange={() => setActief((s) => ({ ...s, [u.id]: !isActief(u.id) }))} className="h-3.5 w-3.5 rounded border-slate-300" />
                  toon
                </label>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
                <span className="text-slate-500">{aantalWeek} afspraken deze week</span>
                <button
                  onClick={() => toggleUserGoogle(u.id)}
                  className={`rounded-full px-2.5 py-1 font-semibold ${u.googleConnected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  {u.googleConnected ? "✓ Google" : "Koppel Google"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          locale={nlLocale}
          headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}
          buttonText={{ today: "Vandaag", month: "Maand", week: "Week", day: "Dag" }}
          events={events}
          height={640}
          nowIndicator
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          eventClick={(info) => router.push(`/agenda/${info.event.id}`)}
        />
      </div>
    </div>
  );
}
