import React, { useMemo, useState } from 'react';
import {
  FileText, Sparkles, Calendar, CheckCircle2, TrendingUp, TrendingDown,
  FileBarChart, Download, Eye,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import {
  Card, CardHeader, Badge, Button, EmptyState, PageHeader, Modal, Spinner,
} from '../components/ui';
import { formatCurrency, formatNumber, formatDate } from '../lib/format';
import type { Report } from '../types';

// NOTE: Reports are generated locally here to simulate the AI reporting agent.
// In production `aiService.runAgent` (kind: 'reporting') produces the summary +
// recommendations server-side; this component would persist the returned Report.

const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

function deltaClass(delta?: number): string {
  if (typeof delta !== 'number') return 'text-[var(--acc-muted)]';
  return delta >= 0 ? 'text-emerald-400' : 'text-red-400';
}

export default function ReportsPage() {
  const { selectedCompany, reports, leads, campaigns, deals } = useData();
  const [generating, setGenerating] = useState(false);
  const [activeReport, setActiveReport] = useState<Report | null>(null);

  const cid = selectedCompany?.id;

  const companyReports = useMemo<Report[]>(
    () => (cid ? reports.items.filter((r) => r.companyId === cid) : []),
    [cid, reports.items],
  );

  const sortedReports = useMemo(
    () => [...companyReports].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [companyReports],
  );

  if (!selectedCompany || !cid) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const company = selectedCompany;

  function generateReport() {
    if (generating) return;
    setGenerating(true);

    // Simulate the AI reporting agent assembling the report (~1s).
    window.setTimeout(() => {
      const now = new Date();
      const month = MONTHS_NL[now.getMonth()];
      const period = `${month.charAt(0).toUpperCase() + month.slice(1)} ${now.getFullYear()}`;

      const cLeads = leads.items.filter((l) => l.companyId === cid);
      const newLeads = cLeads.filter((l) => l.status === 'Nieuw').length;
      const wonLeads = cLeads.filter((l) => l.status === 'Gewonnen').length;
      const cCampaigns = campaigns.items.filter((c) => c.companyId === cid);
      const spend = cCampaigns.reduce((s, c) => s + c.spend, 0);
      const adLeads = cCampaigns.reduce((s, c) => s + c.leads, 0);
      const roas = cCampaigns.length
        ? +(cCampaigns.reduce((s, c) => s + c.roas, 0) / cCampaigns.length).toFixed(1)
        : 0;
      const costPerLead = adLeads ? Math.round(spend / adLeads) : 0;
      const cDeals = deals.items.filter((d) => d.companyId === cid);
      const wonValue = cDeals.filter((d) => d.stage === 'won').reduce((s, d) => s + d.value, 0);
      const pipelineValue = cDeals.filter((d) => d.stage === 'open').reduce((s, d) => s + d.value, 0);

      const newReport = reports.create({
        companyId: cid,
        title: `Maandrapport — ${month.charAt(0).toUpperCase() + month.slice(1)}`,
        period,
        createdAt: now.toISOString(),
        metrics: [
          { label: 'Nieuwe leads', value: formatNumber(newLeads), delta: 12 },
          { label: 'Gewonnen leads', value: formatNumber(wonLeads), delta: 8 },
          { label: 'Omzet deze maand', value: formatCurrency(company.monthlyRevenue), delta: 9 },
          { label: 'Gewonnen dealwaarde', value: formatCurrency(wonValue), delta: 14 },
          { label: 'Ad spend', value: formatCurrency(spend), delta: 4 },
          { label: 'Kosten per lead', value: formatCurrency(costPerLead), delta: -6 },
          { label: 'Gem. ROAS', value: `${roas}x`, delta: 5 },
          { label: 'Pipelinewaarde', value: formatCurrency(pipelineValue), delta: 11 },
        ],
        summary:
          `In ${period} liet ${company.name} een gezonde groei zien. Er kwamen ${newLeads} nieuwe leads binnen `
          + `en ${wonLeads} deals werden gewonnen, samen goed voor ${formatCurrency(wonValue)} aan getekende omzet. `
          + `De advertentie-uitgaven van ${formatCurrency(spend)} leverden een gemiddelde ROAS van ${roas}x op, `
          + `met een kostprijs per lead van ${formatCurrency(costPerLead)}. De openstaande pipeline `
          + `(${formatCurrency(pipelineValue)}) biedt ruimte voor verdere groei komende maand.`,
        recommendations: [
          `Schaal de best presterende Meta Ads-campagne met +20% budget bij gelijkblijvende ROAS.`,
          `Volg de ${newLeads} nieuwe leads binnen 24 uur op — snelle opvolging verdrievoudigt de conversiekans.`,
          `Ververs advertentie-creatives die langer dan 14 dagen draaien om ad fatigue te voorkomen.`,
          `Activeer een SEO-content traject om de afhankelijkheid van betaald verkeer te verlagen.`,
        ],
      });

      setGenerating(false);
      setActiveReport(newReport);
    }, 1000);
  }

  const lastReportDate = sortedReports[0]?.createdAt;

  const generateButton = (
    <Button icon={generating ? <Spinner size={14} /> : <Sparkles size={16} />} onClick={generateReport} disabled={generating}>
      {generating ? 'Genereren…' : '✨ Genereer rapport'}
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rapportages"
        subtitle={`AI-gegenereerde maandrapporten — ${company.name}`}
        actions={generateButton}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Aantal rapporten" value={companyReports.length} icon={<FileText size={18} />} />
        <StatCard label="Laatste rapport" value={lastReportDate ? formatDate(lastReportDate) : '—'} icon={<Calendar size={18} />} sparkColor="#a78bfa" />
      </div>

      {sortedReports.length === 0 ? (
        <Card className="p-5">
          <EmptyState
            icon={<FileBarChart size={28} />}
            title="Nog geen rapporten"
            description="Genereer het eerste maandrapport voor deze klant. De AI-reportagent stelt metrics, een samenvatting en adviespunten samen."
            action={generateButton}
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedReports.map((report) => (
            <Card key={report.id} className="p-5">
              <CardHeader
                title={report.title}
                subtitle={`${report.period} · opgesteld ${formatDate(report.createdAt)}`}
                icon={<FileBarChart size={16} />}
                action={
                  <Button variant="secondary" size="sm" icon={<Eye size={14} />} onClick={() => setActiveReport(report)}>
                    Bekijk / Exporteer
                  </Button>
                }
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                {report.metrics.map((m, i) => (
                  <div key={i} className="acc-glass rounded-xl p-3">
                    <p className="text-[11px] text-[var(--acc-muted)] truncate">{m.label}</p>
                    <p className="text-base font-bold mt-0.5 tabular-nums truncate">{m.value}</p>
                    {typeof m.delta === 'number' && (
                      <span className={`inline-flex items-center gap-0.5 mt-1 text-[11px] font-semibold ${deltaClass(m.delta)}`}>
                        {m.delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {m.delta >= 0 ? '+' : ''}{m.delta}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="acc-glass rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-[var(--acc-muted)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-blue-400" /> AI-samenvatting
                </p>
                <p className="text-sm leading-relaxed text-[var(--acc-text)]">{report.summary}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--acc-muted)] uppercase tracking-wider mb-2">Aanbevelingen</p>
                <ul className="space-y-1.5">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!activeReport}
        onClose={() => setActiveReport(null)}
        wide
        title={activeReport ? activeReport.title : ''}
        footer={
          <>
            <Button variant="ghost" onClick={() => setActiveReport(null)}>Sluiten</Button>
            <Button variant="secondary" icon={<Download size={16} />} disabled title="Voorbereid voor koppeling (zie README)">
              PDF export — Voorbereid voor koppeling (zie README)
            </Button>
          </>
        }
      >
        {activeReport && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--acc-border)]">
              <div>
                <p className="text-lg font-bold">{company.name}</p>
                <p className="text-sm text-[var(--acc-muted)]">{activeReport.period} · {company.sector}</p>
              </div>
              <Badge tone="blue" dot>{formatDate(activeReport.createdAt)}</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {activeReport.metrics.map((m, i) => (
                <div key={i} className="acc-glass rounded-xl p-3">
                  <p className="text-[11px] text-[var(--acc-muted)] truncate">{m.label}</p>
                  <p className="text-lg font-bold mt-0.5 tabular-nums truncate">{m.value}</p>
                  {typeof m.delta === 'number' && (
                    <span className={`inline-flex items-center gap-0.5 mt-1 text-[11px] font-semibold ${deltaClass(m.delta)}`}>
                      {m.delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {m.delta >= 0 ? '+' : ''}{m.delta}%
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-400" /> Samenvatting
              </p>
              <p className="text-sm leading-relaxed text-[var(--acc-text)]">{activeReport.summary}</p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Aanbevelingen</p>
              <ul className="space-y-2">
                {activeReport.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="leading-snug">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-[var(--acc-muted)] pt-2 border-t border-[var(--acc-border)]">
              Dit rapport is automatisch samengesteld door de AI-reportagent op basis van live data uit het dashboard.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
