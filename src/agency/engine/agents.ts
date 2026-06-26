/**
 * Agent implementations that run inside the engine.
 *
 * - monitor: REAL — performs an actual HTTP check of the company website.
 * - keyword / content / google-ads / meta-ads: draft & PROPOSE — they use the
 *   brain to produce a concrete plan, then emit a ProposedAction. The actual
 *   push to Google/Meta/social is performed by a Connector (wired with the
 *   client's API credentials) once an action is approved. This keeps real
 *   spend/publishing behind the guardrail policy.
 */

import type { AgentKind } from '../types';
import type { Brain } from './brain';
import type { AgentRunResult, CompanyContext, Finding, ProposedAction, ActionRisk } from './types';

export interface AgentDeps {
  brain: Brain;
  now: () => string;
  id: (p: string) => string;
  /** Real network fetch (injectable for tests). Defaults to global fetch. */
  fetchImpl?: typeof fetch;
}

// --- real website check ----------------------------------------------------
export interface WebsiteCheck {
  url: string;
  ok: boolean;
  status: number;
  ms: number;
  error?: string;
}

export async function checkWebsite(url: string, fetchImpl: typeof fetch = fetch, timeoutMs = 10000): Promise<WebsiteCheck> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const t0 = Date.now();
  try {
    const res = await fetchImpl(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    return { url, ok: res.ok, status: res.status, ms: Date.now() - t0 };
  } catch (e: any) {
    return { url, ok: false, status: 0, ms: Date.now() - t0, error: e?.message ?? 'fetch failed' };
  } finally {
    clearTimeout(timer);
  }
}

function action(
  deps: AgentDeps, c: CompanyContext, agentKind: AgentKind, risk: ActionRisk,
  title: string, summary: string, payload: Record<string, unknown>, requiresApproval: boolean,
): ProposedAction {
  return {
    id: deps.id('act'), agentKind, companyId: c.id, risk, title, summary, payload,
    requiresApproval, status: 'proposed', createdAt: deps.now(),
  };
}

// --- monitor agent (read-only, autonomous) ---------------------------------
export async function runMonitorAgent(c: CompanyContext, deps: AgentDeps): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const log: string[] = [];
  const findings: Finding[] = [];
  const fetchImpl = deps.fetchImpl ?? fetch;

  if (c.websiteUrl) {
    log.push(`Website check: ${c.websiteUrl}`);
    const r = await checkWebsite(c.websiteUrl, fetchImpl);
    if (!r.ok) {
      findings.push({ severity: 'error', title: 'Website onbereikbaar of fout', detail: `${c.websiteUrl} → status ${r.status}${r.error ? ` (${r.error})` : ''}`, metric: { label: 'status', value: String(r.status) } });
    } else if (r.ms > 2500) {
      findings.push({ severity: 'warn', title: 'Trage website', detail: `${c.websiteUrl} reageert in ${r.ms}ms (>2.5s).`, metric: { label: 'latency', value: `${r.ms}ms` } });
    } else {
      findings.push({ severity: 'ok', title: 'Website gezond', detail: `${c.websiteUrl} → ${r.status} in ${r.ms}ms.`, metric: { label: 'latency', value: `${r.ms}ms` } });
    }
    log.push(`→ status ${r.status}, ${r.ms}ms`);
  } else {
    findings.push({ severity: 'info', title: 'Geen website-URL', detail: 'Koppel een website-URL om monitoring te activeren.' });
  }

  // Firebase health would be checked here via the Admin SDK (server-side).
  if (c.firebaseProjectId) log.push(`Firebase project bekend: ${c.firebaseProjectId} (Admin SDK-check toevoegen)`);

  const worst = findings.some((f) => f.severity === 'error') ? 'error'
    : findings.some((f) => f.severity === 'warn') ? 'warn' : 'ok';
  const summary = worst === 'error' ? `⚠️ Probleem gedetecteerd voor ${c.name}.`
    : worst === 'warn' ? `Let op: aandachtspunt voor ${c.name}.`
    : `Alles operationeel voor ${c.name}.`;

  return { agentKind: 'firebase-monitor', companyId: c.id, startedAt, finishedAt: deps.now(), ok: true, summary, findings, actions: [], logLines: log };
}

// --- keyword research agent (proposes a keyword set) ------------------------
export async function runKeywordAgent(c: CompanyContext, deps: AgentDeps): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const text = await deps.brain.generate(
    'Je bent een SEO/SEA-specialist. Geef 15 commerciële zoekwoorden (NL) met intentie, één per regel.',
    `Bedrijf: ${c.name}. Sector: ${c.sector}. Doelen: ${c.goals.join(', ')}.`,
  );
  const keywords = text.split('\n').map((s) => s.replace(/^[-•\d.\s]+/, '').trim()).filter(Boolean).slice(0, 15);
  const act = action(deps, c, 'seo', 'internal', `Zoekwoorden-set voor ${c.name}`,
    `${keywords.length} zoekwoorden voorgesteld op basis van sector en doelen.`, { keywords }, false);
  return {
    agentKind: 'seo', companyId: c.id, startedAt, finishedAt: deps.now(), ok: true,
    summary: `Zoekwoordonderzoek klaar: ${keywords.length} kandidaten.`,
    findings: [{ severity: 'info', title: 'Zoekwoorden gevonden', detail: keywords.slice(0, 5).join(', ') + '…' }],
    actions: [act], logLines: [`Brain: ${deps.brain.name}`, `${keywords.length} zoekwoorden`],
  };
}

// --- content agent (drafts posts, needs approval to publish) ---------------
export async function runContentAgent(c: CompanyContext, deps: AgentDeps): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const draft = await deps.brain.generate(
    `Je bent social media manager. Schrijf 1 post (caption + 5 hashtags) in de huisstijl. ${c.brandNotes ?? ''}`,
    `Bedrijf: ${c.name}. Sector: ${c.sector}.`,
  );
  const act = action(deps, c, 'content', 'publish', `Social post voor ${c.name}`,
    'Concept-post klaar. Vereist goedkeuring voordat geplaatst wordt.', { draft, platform: 'instagram' }, true);
  return {
    agentKind: 'content', companyId: c.id, startedAt, finishedAt: deps.now(), ok: true,
    summary: 'Concept-post gegenereerd (wacht op goedkeuring).',
    findings: [{ severity: 'info', title: 'Post-concept', detail: draft.slice(0, 120) + '…' }],
    actions: [act], logLines: [`Brain: ${deps.brain.name}`],
  };
}

// --- ads agent (drafts a campaign, needs approval because it spends) --------
export async function runAdsAgent(c: CompanyContext, deps: AgentDeps, platform: 'google-ads' | 'meta-ads'): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const cap = c.maxAdSpendPerRun ?? 0;
  const plan = await deps.brain.generate(
    `Je bent een ${platform === 'google-ads' ? 'Google Ads' : 'Meta Ads'}-specialist. Geef een campagneopzet: doel, doelgroep, 3 advertentieteksten, dagbudget (max €${cap || 25}).`,
    `Bedrijf: ${c.name}. Sector: ${c.sector}. Doelen: ${c.goals.join(', ')}.`,
  );
  const kind: AgentKind = 'meta-ads-analysis';
  const act = action(deps, c, kind, 'spend', `${platform === 'google-ads' ? 'Google' : 'Meta'} Ads-campagne voor ${c.name}`,
    `Campagneopzet klaar. Kost geld → vereist goedkeuring (max €${cap || 25}/dag).`, { platform, plan, dailyBudget: cap || 25 }, true);
  return {
    agentKind: kind, companyId: c.id, startedAt, finishedAt: deps.now(), ok: true,
    summary: `${platform} campagneopzet klaar (wacht op goedkeuring).`,
    findings: [{ severity: 'info', title: 'Campagne-concept', detail: plan.slice(0, 120) + '…' }],
    actions: [act], logLines: [`Brain: ${deps.brain.name}`, `platform: ${platform}`],
  };
}

export type EngineAgentId = 'monitor' | 'keywords' | 'content' | 'google-ads' | 'meta-ads';

export const ENGINE_AGENTS: Record<EngineAgentId, (c: CompanyContext, deps: AgentDeps) => Promise<AgentRunResult>> = {
  monitor: runMonitorAgent,
  keywords: runKeywordAgent,
  content: runContentAgent,
  'google-ads': (c, d) => runAdsAgent(c, d, 'google-ads'),
  'meta-ads': (c, d) => runAdsAgent(c, d, 'meta-ads'),
};
