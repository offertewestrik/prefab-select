import React, { useMemo, useState } from 'react';
import {
  Bot, Play, Square, Send, Sparkles, CheckCircle2, XCircle, Activity,
  Users, FileText, Globe, Search, Megaphone, PenLine, BarChart3,
  Headphones, Github, Flame,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import {
  Card, CardHeader, Button, Badge, EmptyState, PageHeader, Modal, Input, Spinner, cn,
} from '../components/ui';
import { aiService } from '../services/aiService';
import { formatRelative } from '../lib/format';
import { agentStatusTone } from './_shared';
import type { Agent, AgentKind, AgentLog } from '../types';

const KIND_ICONS: Record<AgentKind, React.ReactNode> = {
  'lead-follow-up': <Users size={18} />,
  quote: <FileText size={18} />,
  'website-analysis': <Globe size={18} />,
  seo: <Search size={18} />,
  'meta-ads-analysis': <Megaphone size={18} />,
  content: <PenLine size={18} />,
  reporting: <BarChart3 size={18} />,
  'customer-service': <Headphones size={18} />,
  'github-review': <Github size={18} />,
  'firebase-monitor': <Flame size={18} />,
};

const LOG_DOT: Record<AgentLog['level'], string> = {
  info: 'bg-blue-400', success: 'bg-emerald-400', warn: 'bg-amber-400', error: 'bg-red-400',
};

const EXAMPLE_PROMPTS = [
  'Analyseer leads deze week',
  'Maak rapportage',
  'Meta Ads verbeteradvies',
  'Controleer Firebase errors',
];

export default function AgentsPage() {
  const { selectedCompany, agents, agentLogs, leads, campaigns } = useData();
  const cid = selectedCompany?.id;

  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [openAgentId, setOpenAgentId] = useState<string | null>(null);

  const cAgents = useMemo(
    () => (cid ? agents.items.filter((a) => a.companyId === cid) : []),
    [cid, agents.items],
  );
  const scopedLeads = useMemo(() => (cid ? leads.items.filter((l) => l.companyId === cid) : []), [cid, leads.items]);
  const scopedCampaigns = useMemo(() => (cid ? campaigns.items.filter((c) => c.companyId === cid) : []), [cid, campaigns.items]);

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const running = cAgents.filter((a) => a.status === 'running').length;
  const completed = cAgents.filter((a) => a.status === 'completed').length;
  const failed = cAgents.filter((a) => a.status === 'failed').length;

  async function start(agent: Agent) {
    const now = () => new Date().toISOString();
    agents.update(agent.id, { status: 'running', lastAction: 'Bezig...' });
    setBusy((b) => ({ ...b, [agent.id]: true }));
    try {
      const result = await aiService.runAgent(agent, { company: selectedCompany!, leads: scopedLeads, campaigns: scopedCampaigns });
      agents.update(agent.id, {
        status: 'completed',
        output: result.output,
        lastAction: result.output.slice(0, 60),
        updatedAt: now(),
      });
      for (const line of result.logLines) {
        agentLogs.create({ agentId: agent.id, companyId: agent.companyId, level: 'info', message: line, at: now() });
      }
    } catch {
      agents.update(agent.id, { status: 'failed', lastAction: 'Mislukt', updatedAt: now() });
    } finally {
      setBusy((b) => ({ ...b, [agent.id]: false }));
    }
  }

  function stop(agent: Agent) {
    agents.update(agent.id, { status: 'idle', lastAction: 'Gestopt' });
    setBusy((b) => ({ ...b, [agent.id]: false }));
  }

  const openAgent = cAgents.find((a) => a.id === openAgentId) ?? null;
  const openAgentLogs = openAgent ? agentLogs.items.filter((l) => l.agentId === openAgent.id) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Agents"
        subtitle="Autonome agents per klant"
        actions={<Badge tone="purple" dot>{aiService.provider()}</Badge>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Agents totaal" value={cAgents.length} icon={<Bot size={18} />} />
        <StatCard label="Running" value={running} icon={<Activity size={18} />} sparkColor="#60a5fa" />
        <StatCard label="Completed" value={completed} icon={<CheckCircle2 size={18} />} sparkColor="#34d399" />
        <StatCard label="Failed" value={failed} icon={<XCircle size={18} />} sparkColor="#f87171" />
      </div>

      {cAgents.length === 0 ? (
        <Card className="p-5"><EmptyState icon={<Bot size={28} />} title="Geen agents" description="Er zijn nog geen agents voor deze klant." /></Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cAgents.map((a) => {
            const isRunning = a.status === 'running';
            const isBusy = busy[a.id];
            return (
              <Card key={a.id} hover className="p-5 flex flex-col gap-3 cursor-pointer" onClick={() => setOpenAgentId(a.id)}>
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl acc-glass flex items-center justify-center text-blue-300 shrink-0">
                    {KIND_ICONS[a.kind]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">{a.name}</h3>
                      <Badge tone={agentStatusTone(a.status)}>
                        <span className={cn('w-1.5 h-1.5 rounded-full bg-current', isRunning && 'acc-pulse')} />
                        {a.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--acc-muted)] leading-relaxed mt-1 line-clamp-2">{a.goal}</p>
                  </div>
                </div>

                <div className="acc-glass rounded-xl p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold mb-0.5">Laatste actie</p>
                  <p className="text-xs leading-snug line-clamp-2">{a.lastAction}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-[var(--acc-muted)]">{formatRelative(a.updatedAt)}</span>
                  {isRunning ? (
                    <Button size="sm" variant="danger" icon={<Square size={13} />} onClick={() => stop(a)}>Stop</Button>
                  ) : (
                    <Button size="sm" icon={isBusy ? <Spinner size={13} /> : <Play size={13} />} onClick={() => start(a)} disabled={isBusy}>Start</Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <CommandCenter
        company={selectedCompany}
        scopedLeads={scopedLeads}
        scopedCampaigns={scopedCampaigns}
      />

      <Modal
        open={!!openAgent}
        onClose={() => setOpenAgentId(null)}
        title={openAgent?.name ?? ''}
        wide
      >
        {openAgent && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Badge tone={agentStatusTone(openAgent.status)} dot>{openAgent.status}</Badge>
              <span className="text-xs text-[var(--acc-muted)]">{formatRelative(openAgent.updatedAt)}</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--acc-muted)] mb-1.5">Doel</p>
              <p className="text-sm leading-relaxed">{openAgent.goal}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Taken</p>
              <div className="space-y-1.5">
                {openAgent.tasks.map((t, i) => {
                  const done = openAgent.status === 'completed';
                  return (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className={cn('shrink-0', done ? 'text-emerald-400' : 'text-[var(--acc-muted)]')} />
                      <span className={cn(done && 'text-[var(--acc-muted)]')}>{t}</span>
                    </div>
                  );
                })}
                {openAgent.tasks.length === 0 && <p className="text-sm text-[var(--acc-muted)]">Geen taken gedefinieerd.</p>}
              </div>
            </div>

            {openAgent.output && (
              <div>
                <p className="text-xs font-semibold text-[var(--acc-muted)] mb-1.5">Output</p>
                <div className="acc-glass rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line">{openAgent.output}</div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Logboek</p>
              <div className="space-y-1.5 max-h-60 overflow-y-auto acc-scroll">
                {openAgentLogs.length === 0 && <p className="text-sm text-[var(--acc-muted)]">Nog geen logregels.</p>}
                {openAgentLogs.map((l) => (
                  <div key={l.id} className="flex items-start gap-2.5 text-xs">
                    <span className={cn('mt-1 w-2 h-2 rounded-full shrink-0', LOG_DOT[l.level])} />
                    <span className="flex-1 min-w-0">{l.message}</span>
                    <span className="text-[var(--acc-muted)] shrink-0">{formatRelative(l.at)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AI Command Center (inline mini)
// ---------------------------------------------------------------------------

function renderBold(text: string): React.ReactNode {
  return text.split('\n').map((line, li) => (
    <p key={li} className={cn('leading-relaxed', line.trim() === '' && 'h-2')}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={pi} className="font-semibold text-white">{part.slice(2, -2)}</strong>
          : <span key={pi}>{part}</span>,
      )}
    </p>
  ));
}

function CommandCenter({ company, scopedLeads, scopedCampaigns }: {
  company: import('../types').Company;
  scopedLeads: import('../types').Lead[];
  scopedCampaigns: import('../types').Campaign[];
}) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  async function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setLoading(true);
    setAnswer(null);
    try {
      const result = await aiService.sendCommand(q, {
        companies: [company],
        leads: scopedLeads,
        campaigns: scopedCampaigns,
        activeCompanyId: company.id,
      });
      setAnswer(result.text);
      setSuggestions(result.suggestions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-5">
      <CardHeader title="AI Command Center" subtitle="Stel een vraag of geef een opdracht" icon={<Sparkles size={16} />} />

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => { e.preventDefault(); send(prompt); }}
      >
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Bijv. Analyseer leads deze week…"
        />
        <Button type="submit" icon={loading ? <Spinner size={14} /> : <Send size={15} />} disabled={loading || !prompt.trim()}>Stuur</Button>
      </form>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => { setPrompt(p); send(p); }}
            className="text-[11px] px-2.5 py-1 rounded-full acc-glass hover:border-white/30 text-[var(--acc-muted)] hover:text-white transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--acc-muted)] mt-4"><Spinner /> Aan het nadenken…</div>
      )}

      {answer && !loading && (
        <div className="mt-4 space-y-3">
          <div className="acc-glass rounded-xl p-4 text-sm text-[var(--acc-text)] space-y-0.5">
            {renderBold(answer)}
          </div>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setPrompt(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/20 hover:bg-blue-500/25 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
