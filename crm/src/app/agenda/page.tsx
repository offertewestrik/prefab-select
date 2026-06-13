"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import nlLocale from "@fullcalendar/core/locales/nl";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { APPOINTMENT_TYPE_META } from "@/lib/constants";
import { haalGoogleEvents } from "@/lib/integrations/google-calendar";

export default function AgendaPage() {
  const mounted = useMounted();
  const router = useRouter();
  const appointments = useCrm((s) => s.appointments);
  const users = useCrm((s) => s.users);

  const [medewerkerFilter, setMedewerkerFilter] = useState<string>("alle");
  const [toonGoogle, setToonGoogle] = useState(false);
  const [dialog, setDialog] = useState<{ open: boolean; start?: string }>({ open: false });

  const googleQuery = useQuery({
    queryKey: ["google-events"],
    queryFn: haalGoogleEvents,
    enabled: toonGoogle,
  });

  const events = useMemo(() => {
    const crmEvents = appointments
      .filter((a) => medewerkerFilter === "alle" || a.medewerkerId === medewerkerFilter)
      .map((a) => ({
        id: a.id,
        title: a.titel,
        start: a.start,
        end: a.eind,
        backgroundColor: APPOINTMENT_TYPE_META[a.type].hex,
        borderColor: APPOINTMENT_TYPE_META[a.type].hex,
      }));
    const googleEvents =
      toonGoogle && googleQuery.data
        ? googleQuery.data.map((g) => ({
            id: `google-${g.id}`,
            title: g.titel,
            start: g.start,
            end: g.eind,
            backgroundColor: "#cbd5e1",
            borderColor: "#94a3b8",
            editable: false,
          }))
        : [];
    return [...crmEvents, ...googleEvents];
  }, [appointments, medewerkerFilter, toonGoogle, googleQuery.data]);

  if (!mounted) return <div className="h-[600px] animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Agenda"
        subtitel="Plan en beheer alle afspraken — dag, week en maand"
        actie={
          <button onClick={() => setDialog({ open: true })} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Nieuwe afspraak
          </button>
        }
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={medewerkerFilter}
          onChange={(e) => setMedewerkerFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="alle">Alle medewerkers</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.naam}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <input type="checkbox" checked={toonGoogle} onChange={(e) => setToonGoogle(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Toon Google Calendar {toonGoogle && googleQuery.isFetching ? "(laden…)" : ""}
        </label>

        {/* Legenda */}
        <div className="ml-auto hidden flex-wrap items-center gap-3 lg:flex">
          {Object.entries(APPOINTMENT_TYPE_META).filter(([k]) => k !== "overig").map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: v.hex }} />
              {v.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="timeGridWeek"
          locale={nlLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          buttonText={{ today: "Vandaag", month: "Maand", week: "Week", day: "Dag", list: "Lijst" }}
          events={events}
          height={680}
          nowIndicator
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          weekends
          dateClick={(info) => setDialog({ open: true, start: info.dateStr })}
          eventClick={(info) => {
            if (!info.event.id.startsWith("google-")) router.push(`/agenda/${info.event.id}`);
          }}
        />
      </div>

      <AppointmentDialog
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        preset={{ start: dialog.start }}
      />
    </div>
  );
}
