import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Inbox, Trophy, Euro, Building2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, Card, CardHeader, Badge } from '../components/ui';
import { StatCard } from '../components/StatCard';
import { formatCurrency, formatNumber } from '../lib/format';
import { BUILD_TYPES } from '../lib/services';
import type { BuildType, RequestStatus } from '../types';

const PIPELINE: RequestStatus[] = ['Nieuw', 'Toegewezen', 'Geaccepteerd', 'Offerte verstuurd', 'In onderhandeling', 'Gewonnen', 'Verloren'];

export default function StatistiekenPage() {
  const { aanvragen, bouwbedrijven, offertes } = useData();
  const all = aanvragen.items;

  const stats = useMemo(() => {
    const won = all.filter((a) => a.status === 'Gewonnen');
    const lost = all.filter((a) => a.status === 'Verloren');
    const closed = won.length + lost.length;
    const conversion = closed ? Math.round((won.length / closed) * 100) : 0;
    const wonValue = won.reduce((s, a) => s + a.value, 0);
    const openValue = all.filter((a) => !['Gewonnen', 'Verloren'].includes(a.status)).reduce((s, a) => s + a.value, 0);
    const acceptedLeads = all.filter((a) => a.leadStatus === 'Geaccepteerd');
    const leadRevenue = acceptedLeads.reduce((s, a) => {
      const company = bouwbedrijven.items.find((b) => b.id === a.assignedCompanyId);
      return s + (company?.leadPrice ?? 0);
    }, 0);

    const byType = BUILD_TYPES.map((t: BuildType) => ({
      type: t,
      count: all.filter((a) => a.buildType === t).length,
      value: all.filter((a) => a.buildType === t).reduce((s, a) => s + a.value, 0),
    })).filter((r) => r.count > 0).sort((a, b) => b.count - a.count);

    const byStatus = PIPELINE.map((s) => ({ status: s, count: all.filter((a) => a.status === s).length }));

    const topCompanies = bouwbedrijven.items
      .map((b) => ({ company: b, leads: all.filter((a) => a.assignedCompanyId === b.id).length, won: all.filter((a) => a.assignedCompanyId === b.id && a.status === 'Gewonnen').length }))
      .sort((a, b) => b.leads - a.leads).slice(0, 5);

    return { won, conversion, wonValue, openValue, leadRevenue, byType, byStatus, topCompanies, acceptedLeads: acceptedLeads.length };
  }, [all, bouwbedrijven.items]);

  const maxType = Math.max(1, ...stats.byType.map((r) => r.count));
  const maxStatus = Math.max(1, ...stats.byStatus.map((r) => r.count));

  return (
    <div>
      <PageHeader title="Statistieken" subtitle="Platformprestaties, conversie en leadwaarde — voorbereiding op het omzetmodel." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Totaal aanvragen" value={all.length} icon={<Inbox size={18} />} tone="navy" />
        <StatCard label="Conversie (gewonnen)" value={`${stats.conversion}%`} icon={<Trophy size={18} />} tone="green" hint={`${stats.won.length} gewonnen`} />
        <StatCard label="Open pijplijnwaarde" value={formatCurrency(stats.openValue)} icon={<TrendingUp size={18} />} tone="orange" />
        <StatCard label="Leadomzet (indicatie)" value={formatCurrency(stats.leadRevenue)} icon={<Euro size={18} />} tone="blue" hint={`${stats.acceptedLeads} geaccepteerde leads`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Card className="p-5">
          <CardHeader title="Aanvragen per type" subtitle="Verdeling over bouwtypes" icon={<BarChart3 size={16} />} />
          <div className="space-y-4">
            {stats.byType.map((r) => (
              <div key={r.type}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{r.type}</span>
                  <span className="text-[var(--abp-muted)]">{r.count} · {formatCurrency(r.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--abp-accent)]" style={{ width: `${(r.count / maxType) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Pijplijn" subtitle="Aanvragen per status" icon={<TrendingUp size={16} />} />
          <div className="space-y-4">
            {stats.byStatus.map((r) => (
              <div key={r.status}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{r.status}</span>
                  <span className="text-[var(--abp-muted)]">{r.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--abp-navy)]" style={{ width: `${(r.count / maxStatus) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardHeader title="Top bouwbedrijven" subtitle="Op basis van toegewezen leads" icon={<Building2 size={16} />} />
        <div className="space-y-2">
          {stats.topCompanies.map(({ company, leads, won }, i) => (
            <div key={company.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--abp-surface-2)]">
              <span className="w-6 h-6 rounded-lg bg-[var(--abp-navy)] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{company.name}</p>
                <p className="text-[11px] text-[var(--abp-muted)]">{company.city} · {company.region}</p>
              </div>
              <Badge tone="slate">{leads} leads</Badge>
              <Badge tone="green">{won} gewonnen</Badge>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[var(--abp-faint)] mt-4">
          Leadomzet is een indicatie op basis van de ingestelde leadprijs per bouwbedrijf. Het volledige omzet- en facturatiemodel wordt later geactiveerd.
        </p>
      </Card>
    </div>
  );
}
