"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, Avatar } from "@/components/ui/Badge";
import {
  PRODUCT_LABEL,
  SOURCE_LABEL,
  STAGE_META,
  STAGE_ORDER,
} from "@/lib/constants";
import { euro, relatief } from "@/lib/format";
import type { PipelineStage } from "@/lib/types";

export default function LeadsPage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);
  const [zoek, setZoek] = useState("");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "alle">("alle");

  const gefilterd = useMemo(() => {
    return leads
      .filter((l) => (stageFilter === "alle" ? true : l.stage === stageFilter))
      .filter((l) =>
        zoek.trim()
          ? `${l.naam} ${l.email} ${l.plaats ?? ""} ${PRODUCT_LABEL[l.product]}`
              .toLowerCase()
              .includes(zoek.toLowerCase())
          : true,
      )
      .sort((a, b) => +new Date(b.laatsteActiviteit) - +new Date(a.laatsteActiviteit));
  }, [leads, zoek, stageFilter]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Leads" subtitel={`${leads.length} contacten in totaal`} />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={zoek}
          onChange={(e) => setZoek(e.target.value)}
          placeholder="Zoek op naam, plaats, product…"
          className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value as PipelineStage | "alle")}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="alle">Alle fases</option>
          {STAGE_ORDER.map((s) => (
            <option key={s} value={s}>{STAGE_META[s].label}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-slate-400">{gefilterd.length} resultaten</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Lead</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Product</th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">Bron</th>
              <th className="px-4 py-3 font-semibold">Fase</th>
              <th className="px-4 py-3 text-right font-semibold">Waarde</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Eigenaar</th>
              <th className="hidden px-4 py-3 font-semibold xl:table-cell">Activiteit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {gefilterd.map((l) => (
              <tr key={l.id} className="transition hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <Link href={`/leads/${l.id}`} className="font-semibold text-slate-800 hover:text-brand-600">
                    {l.naam}
                  </Link>
                  <p className="text-xs text-slate-400">{l.plaats ?? "—"}</p>
                </td>
                <td className="hidden px-4 py-3 text-slate-600 md:table-cell">{PRODUCT_LABEL[l.product]}</td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <Badge>{SOURCE_LABEL[l.source]}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge className={STAGE_META[l.stage].kleur}>{STAGE_META[l.stage].label}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">{euro(l.waarde)}</td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <div className="flex items-center gap-2">
                    <Avatar naam={l.toegewezenAan} />
                    <span className="text-slate-600">{l.toegewezenAan}</span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-xs text-slate-400 xl:table-cell">{relatief(l.laatsteActiviteit)}</td>
              </tr>
            ))}
            {gefilterd.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                  Geen leads gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
