import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, FileText, Handshake, Euro, Globe, Target, MousePointerClick,
  Megaphone, TrendingUp, Bot, ArrowUpRight, CheckSquare, Activity,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, Badge, EmptyState, PageHeader, Avatar, ProgressBar } from '../components/ui';
import { AreaChart, DonutChart } from '../components/charts';
import { formatCurrency, formatNumber, formatRelative } from '../lib/format';
import { leadStatusTone } from './_shared';

export default function DashboardPage() {
  const { selectedCompany, leads, quotes, deals, tasks, campaigns, agents, analytics } = useData();

  const cid = selectedCompany?.id;
  const data = useMemo(() => {
    if (!cid) return null;
    const cLeads = leads.items.filter((l) => l.companyId === cid);
    const cQuotes = quotes.items.filter((q) => q.companyId === cid);
    const cDeals = deals.items.filter((d) => d.companyId === cid);
    const cTasks = tasks.items.filter((t) => t.companyId === cid);
    const cCampaigns = campaigns.items.filter((c) => c.companyId === cid);
    const cAgents = agents.items.filter((a) => a.companyId === cid);
    const snapshot = analytics.find((a) => a.companyId === cid);
    const spend = cCampaigns.reduce((s, c) => s + c.spend, 0);
    const adLeads = cCampaigns.reduce((s, c) => s + c.leads, 0);
    const roas = cCampaigns.length ? +(cCampaigns.reduce((s, c) => s + c.roas, 0) / cCampaigns.length).toFixed(1) : 0;
    return {
      cLeads, cQuotes, cDeals, cTasks, cCampaigns, cAgents, snapshot, spend, adLeads, roas,
      newLeads: cLeads.filter((l) => l.status === 'Nieuw').length,
      openQuotes: cQuotes.filter((q) => q.status === 'Verzonden' || q.status === 'Concept').length,
      openDeals: cDeals.filter((d) => d.stage === 'open').length,
      costPerLead: adLeads ? Math.round(spend / adLeads) : 0,
    };
  }, [cid, leads.items, quotes.items, deals.items, tasks.items, campaigns.items, agents.items, analytics]);

  if (!selectedCompany || !data) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven om het dashboard te vullen." />;
  }

  const todayTasks = data.cTasks.filter((t) => t.status !== 'klaar').slice(0, 5);
  const recentLeads = [...data.cLeads].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 5);
  const activeAgents = data.cAgents.filter((a) => a.status === 'running' || a.status === 'completed');

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Dashboard — ${selectedCompany.name}`}
        subtitle={`${selectedCompany.sector} · ${selectedCompany.address}`}
        actions={<Badge tone={selectedCompany.status === 'actief' ? 'green' : selectedCompany.status === 'pauze' ? 'amber' : 'slate'} dot>{selectedCompany.status}</Badge>}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Nieuwe leads" value={data.newLeads} delta={12} icon={<Users size={18} />} spark={[3, 5, 4, 7, 6, 9, 8, data.newLeads || 1]} />
        <StatCard label="Openstaande offertes" value={data.openQuotes} delta={4} icon={<FileText size={18} />} sparkColor="#a78bfa" spark={[1, 2, 2, 3, 2, 3, 4, data.openQuotes || 1]} />
        <StatCard label="Lopende deals" value={data.openDeals} delta={-3} icon={<Handshake size={18} />} sparkColor="#34d399" spark={[5, 4, 6, 5, 7, 6, 5, data.openDeals || 1]} />
        <StatCard label="Omzet deze maand" value={formatCurrency(selectedCompany.monthlyRevenue)} delta={8} icon={<Euro size={18} />} sparkColor="#fbbf24" spark={[90, 100, 95, 110, 120, 115, 130, 142]} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Website bezoekers" value={formatNumber(data.snapshot?.visitors ?? 0)} delta={15} icon={<Globe size={18} />} />
        <StatCard label="Conversies" value={formatNumber(data.snapshot?.conversions ?? 0)} delta={6} icon={<Target size={18} />} sparkColor="#34d399" />
        <StatCard label="Kosten per lead" value={formatCurrency(data.costPerLead)} delta={-9} icon={<MousePointerClick size={18} />} sparkColor="#fbbf24" />
        <StatCard label="ROAS" value={data.roas} suffix="x" delta={0.4} icon={<TrendingUp size={18} />} sparkColor="#a78bfa" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Visitors trend */}
        <Card className="lg:col-span-2 p-5">
          <CardHeader title="Website bezoekers" subtitle="Laatste 8 weken (Google Analytics)" icon={<Activity size={16} />} action={<Link to="/agency/analytics" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">Analytics <ArrowUpRight size={13} /></Link>} />
          <AreaChart data={data.snapshot?.visitorsTrend ?? []} height={200} />
        </Card>

        {/* Ad spend / ROAS */}
        <Card className="p-5">
          <CardHeader title="Meta Ads" subtitle="Deze maand" icon={<Megaphone size={16} />} />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span className="text-[var(--acc-muted)]">Ad spend</span><span className="font-semibold">{formatCurrency(data.spend)}</span></div>
              <ProgressBar value={(data.spend / (selectedCompany.monthlyMarketingBudget || 1)) * 100} tone="#3B82F6" />
              <p className="text-[11px] text-[var(--acc-muted)] mt-1">van {formatCurrency(selectedCompany.monthlyMarketingBudget)} budget</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="acc-glass rounded-xl p-3"><p className="text-[11px] text-[var(--acc-muted)]">Ad leads</p><p className="text-lg font-bold">{data.adLeads}</p></div>
              <div className="acc-glass rounded-xl p-3"><p className="text-[11px] text-[var(--acc-muted)]">ROAS</p><p className="text-lg font-bold">{data.roas}x</p></div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent leads */}
        <Card className="lg:col-span-2 p-5">
          <CardHeader title="Recente leads" subtitle={`${data.cLeads.length} totaal`} icon={<Users size={16} />} action={<Link to="/agency/leads" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">Alle leads <ArrowUpRight size={13} /></Link>} />
          <div className="space-y-1.5">
            {recentLeads.map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <Avatar name={l.name} size={34} color={selectedCompany.accentColor} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{l.name}</p>
                  <p className="text-[11px] text-[var(--acc-muted)] truncate">{l.product} · {l.source}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{formatCurrency(l.value)}</p>
                  <Badge tone={leadStatusTone(l.status)}>{l.status}</Badge>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-sm text-[var(--acc-muted)] py-4 text-center">Nog geen leads.</p>}
          </div>
        </Card>

        {/* Tasks today */}
        <Card className="p-5">
          <CardHeader title="Taken vandaag" subtitle={`${todayTasks.length} open`} icon={<CheckSquare size={16} />} action={<Link to="/agency/tasks" className="text-xs text-blue-400 hover:text-blue-300">Alle</Link>} />
          <div className="space-y-2">
            {todayTasks.map((t) => (
              <div key={t.id} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${t.priority === 'urgent' ? 'bg-red-400' : t.priority === 'hoog' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                <div className="min-w-0">
                  <p className="text-sm leading-snug">{t.title}</p>
                  <p className="text-[11px] text-[var(--acc-muted)] capitalize">{t.status} · {t.priority}</p>
                </div>
              </div>
            ))}
            {todayTasks.length === 0 && <p className="text-sm text-[var(--acc-muted)] py-4 text-center">Geen open taken 🎉</p>}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Traffic sources */}
        <Card className="p-5">
          <CardHeader title="Verkeersbronnen" subtitle="Sessies per kanaal" />
          <DonutChart segments={(data.snapshot?.sources ?? []).slice(0, 5).map((s, i) => ({ label: s.name, value: s.sessions, color: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#06B6D4'][i] }))} />
        </Card>

        {/* AI agent activity */}
        <Card className="lg:col-span-2 p-5">
          <CardHeader title="AI agent activiteit" subtitle={`${activeAgents.length} agents actief`} icon={<Bot size={16} />} action={<Link to="/agency/agents" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">AI Agents <ArrowUpRight size={13} /></Link>} />
          <div className="grid sm:grid-cols-2 gap-2">
            {data.cAgents.slice(0, 6).map((a) => (
              <div key={a.id} className="acc-glass rounded-xl p-3 flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${a.status === 'running' ? 'bg-blue-400 acc-pulse' : a.status === 'completed' ? 'bg-emerald-400' : a.status === 'failed' ? 'bg-red-400' : 'bg-white/30'}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{a.name}</p>
                  <p className="text-[10px] text-[var(--acc-muted)] truncate">{a.lastAction}</p>
                </div>
                <span className="text-[10px] text-[var(--acc-muted)] capitalize shrink-0">{a.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
