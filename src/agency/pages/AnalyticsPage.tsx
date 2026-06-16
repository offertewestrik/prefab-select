import React, { useMemo, useState } from 'react';
import {
  Globe, Target, MousePointerClick, Activity, Megaphone, Users,
  Euro, TrendingUp, Eye, BarChart3, FileBarChart,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, Badge, EmptyState, PageHeader, ProgressBar, Tabs, Table, Th, Td } from '../components/ui';
import { AreaChart, BarChart, DonutChart } from '../components/charts';
import { formatCurrency, formatNumber, formatCompact, formatPercent } from '../lib/format';
import type { Campaign } from '../types';

// NOTE: Data is read live from `useData()` for reactivity. The same shapes are
// served by `googleAnalyticsService.getSnapshot(companyId)` and
// `metaAdsService.getCampaigns(companyId)` / `.getAccountSummary(companyId)` —
// swap the `useData` reads for those promises to hit the real GA4 / Meta APIs.

const CHART_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#06B6D4', '#EC4899'];

const campaignStatusTone = (s: Campaign['status']) =>
  s === 'actief' ? 'green' : s === 'gepauzeerd' ? 'amber' : 'slate';

export default function AnalyticsPage() {
  const { selectedCompany, campaigns, analytics } = useData();
  const [tab, setTab] = useState<'ga4' | 'meta'>('ga4');

  const cid = selectedCompany?.id;
  const snapshot = useMemo(() => analytics.find((a) => a.companyId === cid), [analytics, cid]);

  const data = useMemo(() => {
    if (!cid) return null;
    const all = campaigns.items.filter((c) => c.companyId === cid);
    const meta = all.filter((c) => c.platform === 'Meta Ads');
    const google = all.filter((c) => c.platform === 'Google Ads');
    const sum = (list: Campaign[]) => ({
      spend: list.reduce((s, c) => s + c.spend, 0),
      reach: list.reduce((s, c) => s + c.reach, 0),
      clicks: list.reduce((s, c) => s + c.clicks, 0),
      leads: list.reduce((s, c) => s + c.leads, 0),
      roas: list.length ? +(list.reduce((s, c) => s + c.roas, 0) / list.length).toFixed(1) : 0,
    });
    return { meta, google, metaTotals: sum(meta) };
  }, [cid, campaigns.items]);

  if (!selectedCompany || !data) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const maxPageViews = Math.max(1, ...(snapshot?.topPages ?? []).map((p) => p.views));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Analytics"
        subtitle="Google Analytics & Meta Ads"
        actions={<Badge tone="purple" dot>Mock-data · klaar voor echte API-koppeling</Badge>}
      />

      <Tabs
        tabs={[
          { id: 'ga4', label: 'Website (GA4)' },
          { id: 'meta', label: 'Advertenties (Meta Ads)', count: data.meta.length },
        ]}
        active={tab}
        onChange={(id) => setTab(id as 'ga4' | 'meta')}
      />

      {tab === 'ga4' && (
        <div className="space-y-6">
          {!snapshot ? (
            <Card className="p-5">
              <EmptyState
                icon={<Activity size={28} />}
                title="Nog geen analytics"
                description="Voor deze klant is nog geen GA4-snapshot beschikbaar."
              />
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard label="Bezoekers" value={formatNumber(snapshot.visitors)} delta={15} icon={<Globe size={18} />} />
                <StatCard label="Sessies" value={formatNumber(snapshot.sessions)} delta={11} icon={<Users size={18} />} sparkColor="#a78bfa" />
                <StatCard label="Conversies" value={formatNumber(snapshot.conversions)} delta={6} icon={<Target size={18} />} sparkColor="#34d399" />
                <StatCard label="Conversieratio" value={formatPercent(snapshot.conversionRate)} delta={2} icon={<TrendingUp size={18} />} sparkColor="#fbbf24" />
              </div>

              <Card className="p-5">
                <CardHeader title="Bezoekers" subtitle="Verloop afgelopen periode (Google Analytics 4)" icon={<Activity size={16} />} />
                <AreaChart data={snapshot.visitorsTrend} height={220} />
              </Card>

              <div className="grid lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 p-5">
                  <CardHeader title="Top pagina's" subtitle="Meest bekeken pagina's" icon={<Eye size={16} />} />
                  <Table>
                    <thead>
                      <tr><Th>Pagina</Th><Th className="w-1/2">Weergaven</Th><Th className="text-right">Aantal</Th></tr>
                    </thead>
                    <tbody>
                      {snapshot.topPages.map((p) => (
                        <tr key={p.path}>
                          <Td className="font-medium">{p.path}</Td>
                          <Td><ProgressBar value={(p.views / maxPageViews) * 100} /></Td>
                          <Td className="text-right tabular-nums font-semibold">{formatNumber(p.views)}</Td>
                        </tr>
                      ))}
                      {snapshot.topPages.length === 0 && (
                        <tr><Td className="text-[var(--acc-muted)]">Geen paginadata.</Td><Td /><Td /></tr>
                      )}
                    </tbody>
                  </Table>
                </Card>

                <Card className="p-5">
                  <CardHeader title="Verkeersbronnen" subtitle="Sessies per kanaal" icon={<BarChart3 size={16} />} />
                  <DonutChart
                    segments={snapshot.sources.slice(0, 6).map((s, i) => ({
                      label: s.name, value: s.sessions, color: CHART_COLORS[i % CHART_COLORS.length],
                    }))}
                  />
                </Card>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'meta' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard label="Totale spend" value={formatCurrency(data.metaTotals.spend)} delta={9} icon={<Euro size={18} />} sparkColor="#fbbf24" />
            <StatCard label="Bereik" value={formatCompact(data.metaTotals.reach)} delta={18} icon={<Megaphone size={18} />} />
            <StatCard label="Klikken" value={formatNumber(data.metaTotals.clicks)} delta={7} icon={<MousePointerClick size={18} />} sparkColor="#a78bfa" />
            <StatCard label="Gem. ROAS" value={data.metaTotals.roas} suffix="x" delta={0.4} icon={<TrendingUp size={18} />} sparkColor="#34d399" />
          </div>

          <Card className="p-5">
            <CardHeader title="Meta Ads campagnes" subtitle={`${data.meta.length} campagnes`} icon={<Megaphone size={16} />} />
            {data.meta.length === 0 ? (
              <p className="text-sm text-[var(--acc-muted)] py-6 text-center">Geen Meta Ads campagnes voor deze klant.</p>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Campagne</Th><Th>Status</Th><Th className="text-right">Budget</Th>
                    <Th className="text-right">Spend</Th><Th className="text-right">Bereik</Th>
                    <Th className="text-right">Klikken</Th><Th className="text-right">Leads</Th>
                    <Th className="text-right">CPL</Th><Th className="text-right">ROAS</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.meta.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors">
                      <Td className="font-medium">{c.name}</Td>
                      <Td><Badge tone={campaignStatusTone(c.status)}>{c.status}</Badge></Td>
                      <Td className="text-right tabular-nums">{formatCurrency(c.budget)}</Td>
                      <Td className="text-right tabular-nums">{formatCurrency(c.spend)}</Td>
                      <Td className="text-right tabular-nums">{formatCompact(c.reach)}</Td>
                      <Td className="text-right tabular-nums">{formatNumber(c.clicks)}</Td>
                      <Td className="text-right tabular-nums">{c.leads}</Td>
                      <Td className="text-right tabular-nums">{formatCurrency(c.costPerLead)}</Td>
                      <Td className="text-right tabular-nums font-semibold text-emerald-300">{c.roas}x</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>

          {data.meta.length > 0 && (
            <Card className="p-5">
              <CardHeader title="ROAS per campagne" subtitle="Vergelijking rendement op advertentiebudget" icon={<BarChart3 size={16} />} />
              <BarChart data={data.meta.map((c) => ({ label: c.name, value: c.roas }))} height={200} color="#34d399" />
            </Card>
          )}

          {data.google.length > 0 && (
            <Card className="p-5">
              <CardHeader title="Google Ads" subtitle={`${data.google.length} campagnes`} icon={<FileBarChart size={16} />} />
              <Table>
                <thead>
                  <tr>
                    <Th>Campagne</Th><Th>Status</Th><Th className="text-right">Spend</Th>
                    <Th className="text-right">Klikken</Th><Th className="text-right">Leads</Th>
                    <Th className="text-right">CPL</Th><Th className="text-right">ROAS</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.google.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors">
                      <Td className="font-medium">{c.name}</Td>
                      <Td><Badge tone={campaignStatusTone(c.status)}>{c.status}</Badge></Td>
                      <Td className="text-right tabular-nums">{formatCurrency(c.spend)}</Td>
                      <Td className="text-right tabular-nums">{formatNumber(c.clicks)}</Td>
                      <Td className="text-right tabular-nums">{c.leads}</Td>
                      <Td className="text-right tabular-nums">{formatCurrency(c.costPerLead)}</Td>
                      <Td className="text-right tabular-nums font-semibold text-emerald-300">{c.roas}x</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
