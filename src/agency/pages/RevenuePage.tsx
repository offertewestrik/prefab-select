import React, { useMemo } from 'react';
import {
  Euro, Trophy, XCircle, Percent, TrendingUp, Calendar, Target, Handshake,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, Badge, EmptyState, PageHeader, ProgressBar, Table, Th, Td } from '../components/ui';
import { BarChart, DonutChart } from '../components/charts';
import { formatCurrency, formatNumber, formatPercent, formatDate } from '../lib/format';
import type { Deal } from '../types';

const MONTHS = ['nov', 'dec', 'jan', 'feb', 'mrt', 'apr', 'mei', 'jun'];
// Relative pattern for an 8-month revenue series, scaled to monthlyRevenue.
const PATTERN = [0.62, 0.7, 0.66, 0.78, 0.85, 0.82, 0.93, 1];

const dealStageTone = (s: Deal['stage']) => (s === 'won' ? 'green' : s === 'open' ? 'blue' : 'red');
const dealStageLabel = (s: Deal['stage']) => (s === 'won' ? 'Gewonnen' : s === 'open' ? 'Open' : 'Verloren');

export default function RevenuePage() {
  const { selectedCompany, deals } = useData();

  const cid = selectedCompany?.id;
  const data = useMemo(() => {
    if (!cid || !selectedCompany) return null;
    const cDeals = deals.items.filter((d) => d.companyId === cid);
    const won = cDeals.filter((d) => d.stage === 'won');
    const lost = cDeals.filter((d) => d.stage === 'lost');
    const open = cDeals.filter((d) => d.stage === 'open');
    const wonValue = won.reduce((s, d) => s + d.value, 0);
    const lostValue = lost.reduce((s, d) => s + d.value, 0);
    const decided = won.length + lost.length;
    const conversion = decided ? (won.length / decided) * 100 : 0;
    const weightedForecast = open.reduce((s, d) => s + (d.value * d.probability) / 100, 0);

    const rev = selectedCompany.monthlyRevenue;
    const series = PATTERN.map((p, i) => ({ label: MONTHS[i], value: Math.round(rev * p) }));
    const prev = series[series.length - 2]?.value ?? rev;
    const growth = prev ? ((rev - prev) / prev) * 100 : 0;

    return {
      cDeals, won, lost, open, wonValue, lostValue, conversion, weightedForecast, series, growth,
    };
  }, [cid, selectedCompany, deals.items]);

  if (!selectedCompany || !data) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const sortedDeals = [...data.cDeals].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Omzet & Groei"
        subtitle={`Financiële prestaties — ${selectedCompany.name}`}
        actions={<Badge tone={data.growth >= 0 ? 'green' : 'red'} dot>{data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}% MoM</Badge>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Omzet deze maand" value={formatCurrency(selectedCompany.monthlyRevenue)} delta={+data.growth.toFixed(1)} icon={<Euro size={18} />} sparkColor="#fbbf24" spark={data.series.map((s) => s.value)} />
        <StatCard label="Gewonnen deals" value={data.won.length} suffix={`· ${formatCurrency(data.wonValue)}`} delta={14} icon={<Trophy size={18} />} sparkColor="#34d399" />
        <StatCard label="Verloren deals" value={data.lost.length} suffix={`· ${formatCurrency(data.lostValue)}`} delta={-5} icon={<XCircle size={18} />} sparkColor="#f87171" />
        <StatCard label="Conversiepercentage" value={formatPercent(data.conversion)} delta={3} icon={<Percent size={18} />} sparkColor="#a78bfa" />
      </div>

      <Card className="p-5">
        <CardHeader title="Omzet per maand" subtitle="Laatste 8 maanden" icon={<TrendingUp size={16} />} />
        <BarChart data={data.series} height={220} color="#fbbf24" />
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <CardHeader
            title="Pipeline & forecast"
            subtitle={`${data.open.length} open deals · gewogen ${formatCurrency(data.weightedForecast)}`}
            icon={<Target size={16} />}
          />
          <div className="space-y-2.5">
            {data.open.map((d) => (
              <div key={d.id} className="acc-glass rounded-xl p-3.5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm font-medium truncate">{d.title}</p>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold tabular-nums">{formatCurrency(d.value)}</p>
                    <p className="text-[11px] text-[var(--acc-muted)]">gewogen {formatCurrency(Math.round((d.value * d.probability) / 100))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar value={d.probability} className="flex-1" tone="#3B82F6" />
                  <span className="text-[11px] font-semibold text-[var(--acc-muted)] tabular-nums w-10 text-right">{d.probability}%</span>
                </div>
              </div>
            ))}
            {data.open.length === 0 && <p className="text-sm text-[var(--acc-muted)] py-4 text-center">Geen open deals in de pipeline.</p>}
          </div>
          {data.open.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--acc-border)]">
              <span className="text-sm text-[var(--acc-muted)]">Totale gewogen forecast</span>
              <span className="text-lg font-bold tabular-nums text-blue-300">{formatCurrency(data.weightedForecast)}</span>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <CardHeader title="Gewonnen vs. verloren" subtitle="Aantal deals" icon={<Handshake size={16} />} />
          <DonutChart
            segments={[
              { label: 'Gewonnen', value: data.won.length, color: '#10B981' },
              { label: 'Verloren', value: data.lost.length, color: '#EF4444' },
              { label: 'Open', value: data.open.length, color: '#3B82F6' },
            ]}
          />
          <div className="mt-5 acc-glass rounded-xl p-4 text-center">
            <p className="text-[11px] text-[var(--acc-muted)] uppercase tracking-wider">Maand-op-maand groei</p>
            <p className={`text-3xl font-bold mt-1 tabular-nums ${data.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
            </p>
            <p className="text-[11px] text-[var(--acc-muted)] mt-1">op basis van de omzettrend</p>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardHeader title="Deals" subtitle={`${data.cDeals.length} totaal`} icon={<Euro size={16} />} />
        {data.cDeals.length === 0 ? (
          <p className="text-sm text-[var(--acc-muted)] py-6 text-center">Nog geen deals voor deze klant.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Deal</Th><Th className="text-right">Waarde</Th><Th>Fase</Th>
                <Th className="text-right">Kans</Th><Th><span className="inline-flex items-center gap-1"><Calendar size={12} /> Datum</span></Th>
              </tr>
            </thead>
            <tbody>
              {sortedDeals.map((d) => (
                <tr key={d.id} className="hover:bg-white/5 transition-colors">
                  <Td className="font-medium">{d.title}</Td>
                  <Td className="text-right tabular-nums font-semibold">{formatCurrency(d.value)}</Td>
                  <Td><Badge tone={dealStageTone(d.stage)}>{dealStageLabel(d.stage)}</Badge></Td>
                  <Td className="text-right tabular-nums">{formatNumber(d.probability)}%</Td>
                  <Td className="text-[var(--acc-muted)]">{formatDate(d.closedAt ?? d.createdAt)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
