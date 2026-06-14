"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  User as UserIcon,
  FileText,
  CalendarDays,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { APPOINTMENT_TYPE_META } from "@/lib/constants";
import { datum, tijd } from "@/lib/format";

export default function AfspraakDetailPage() {
  const mounted = useMounted();
  const params = useParams();
  const router = useRouter();
  const afspraakId = params.id as string;

  const afspraak = useCrm((s) => s.appointments.find((a) => a.id === afspraakId));
  const lead = useCrm((s) => s.leads.find((l) => l.id === afspraak?.leadId));
  const quote = useCrm((s) => s.quotes.find((q) => q.id === afspraak?.quoteId));
  const user = useCrm((s) => s.users.find((u) => u.id === afspraak?.medewerkerId));
  const toggleGoogleSync = useCrm((s) => s.toggleGoogleSync);
  const deleteAppointment = useCrm((s) => s.deleteAppointment);
  const [edit, setEdit] = useState(false);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  if (!afspraak) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
        <p className="text-slate-500">Afspraak niet gevonden.</p>
        <Link href="/agenda" className="mt-4 inline-block text-sm font-semibold text-brand-600">← Terug naar agenda</Link>
      </div>
    );
  }

  const meta = APPOINTMENT_TYPE_META[afspraak.type];

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/agenda" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Agenda
      </Link>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className={meta.kleur}>{meta.label}</Badge>
            <h1 className="mt-2 text-2xl font-black text-slate-900">{afspraak.titel}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />
              {datum(afspraak.start)} · {tijd(afspraak.start)} – {tijd(afspraak.eind)}
            </p>
          </div>
          <span className="h-12 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: meta.hex }} />
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          {user && (
            <div className="flex items-center gap-2 text-slate-600">
              <UserIcon className="h-4 w-4 text-slate-400" />
              <span className="font-medium" style={{ color: user.kleur }}>{user.naam}</span>
            </div>
          )}
          {afspraak.locatie && (
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" /> {afspraak.locatie}
            </div>
          )}
          {lead && (
            <div className="flex items-center gap-2 text-slate-600">
              <UserIcon className="h-4 w-4 text-slate-400" />
              <Link href={`/leads/${lead.id}`} className="font-medium text-brand-600 hover:text-brand-700">{lead.naam}</Link>
            </div>
          )}
          {quote && (
            <div className="flex items-center gap-2 text-slate-600">
              <FileText className="h-4 w-4 text-slate-400" />
              <Link href={`/offertes/${quote.id}`} className="font-medium text-brand-600 hover:text-brand-700">{quote.nummer}</Link>
            </div>
          )}
        </dl>

        {afspraak.omschrijving && (
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">{afspraak.omschrijving}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button onClick={() => setEdit(true)} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Pencil className="h-4 w-4" /> Bewerken
          </button>
          <button
            onClick={() => toggleGoogleSync(afspraak.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${afspraak.googleSynced ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            <RefreshCw className="h-4 w-4" /> {afspraak.googleSynced ? "Gesynct met Google" : "Sync met Google"}
          </button>
          <button
            onClick={() => {
              if (confirm("Afspraak verwijderen?")) {
                deleteAppointment(afspraak.id);
                router.push("/agenda");
              }
            }}
            className="ml-auto inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" /> Verwijderen
          </button>
        </div>
      </div>

      <AppointmentDialog open={edit} onClose={() => setEdit(false)} bestaand={afspraak} />
    </div>
  );
}
