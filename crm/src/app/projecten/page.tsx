"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { euro } from "@/lib/format";
import { isProject, omzetVanLead, gefactureerdVanLead, inkoopVanLead, margePercentage } from "@/lib/finance";
import { TrendingUp, Euro, ShoppingCart, Wallet } from "lucide-react";

export default function ProjectenPage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);
  const quotes = useCrm((s) => s.quotes);
  const invoices = useCrm((s) => s.invoices);
  const purchases = useCrm((s) => s.purchases);

  const projecten = useMemo(() => {
    return leads
      .filter((l) => isProject(quotes, l.id))
      .map((l) => {
        const omzet = omzetVanLead(quotes, l.id);
        const gefactureerd = gefactureerdVanLead(invoices, l.id);
        const inkoop = inkoopVanLead(purchases, l.id);
        const winst = omzet - inkoop;
        return { lead: l, omzet, gefactureerd, inkoop, winst, marge: margePercentage(omzet, winst) };
      })
      .sort((a, b) => b.omzet - a.omzet);
  }, [leads, quotes, invoices, purchases]);

  const tot = useMemo(() => {
    return projecten.reduce(
      (acc, p) => ({ omzet: acc.omzet + p.omzet, inkoop: acc.inkoop + p.inkoop, winst: acc.winst + p.winst }),
      { omzet: 0, inkoop: 0, winst: 0 },
    );
  }, [projecten]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Projecten" subtitel="Geaccepteerde offertes — omzet, inkoop en winst per project" />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <StatCard label="Omzet (orderwaarde)" waarde={euro(tot.omzet)} icon={Euro} accent="emerald" />
        <StatCard label="Inkoop" waarde={euro(tot.inkoop)} icon={ShoppingCart} accent="amber" />
        <StatCard label="Winst" waarde={euro(tot.winst)} icon={TrendingUp} accent="brand" />
        <StatCard label="Gem. marge" waarde={`${margePercentage(tot.omzet, tot.winst)}%`} icon={Wallet} accent="brand" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Project / klant</th>
              <th className="px-4 py-3 text-right font-semibold">Omzet</th>
              <th className="hidden px-4 py-3 text-right font-semibold sm:table-cell">Gefactureerd</th>
              <th className="px-4 py-3 text-right font-semibold">Inkoop</th>
              <th className="px-4 py-3 text-right font-semibold">Winst</th>
              <th className="px-4 py-3 text-right font-semibold">Marge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {projecten.map((p) => (
              <tr key={p.lead.id} className="transition hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <Link href={`/leads/${p.lead.id}`} className="font-semibold text-brand-600 hover:text-brand-700">{p.lead.naam}</Link>
                  <p className="text-xs text-slate-400">{p.lead.plaats ?? "—"}</p>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">{euro(p.omzet)}</td>
                <td className="hidden px-4 py-3 text-right text-slate-600 sm:table-cell">{euro(p.gefactureerd)}</td>
                <td className="px-4 py-3 text-right text-amber-600">{euro(p.inkoop)}</td>
                <td className={`px-4 py-3 text-right font-bold ${p.winst >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{euro(p.winst)}</td>
                <td className="px-4 py-3 text-right text-slate-600">
                  <Link href={`/leads/${p.lead.id}`} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{p.marge}%</Link>
                </td>
              </tr>
            ))}
            {projecten.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Nog geen projecten. Zodra een offerte wordt geaccepteerd, verschijnt het project hier.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Tip: registreer inkoopkosten per project via de lead → tab <strong>Inkoop</strong>. De winst wordt automatisch berekend (omzet − inkoop).
      </p>
    </div>
  );
}
