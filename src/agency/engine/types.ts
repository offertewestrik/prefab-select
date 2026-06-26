/**
 * Automation engine — shared types.
 *
 * The engine is the "always-on machine" that runs the AI agents server-side
 * (Cloud Scheduler/cron → runOnce), independent of the dashboard UI. It is
 * deliberately framework-agnostic: agents take a CompanyContext + deps and
 * return findings + proposed actions. Persistence and the real platform pushes
 * are done by adapters (Store + Connectors) the deployer wires up.
 */

import type { AgentKind } from '../types';

export type Severity = 'ok' | 'info' | 'warn' | 'error';

/** How autonomous the machine is allowed to be for outward actions. */
export type AutonomyMode = 'approval' | 'mixed' | 'auto';

/** Risk class of a proposed action — drives the guardrail policy. */
export type ActionRisk =
  | 'read'      // read-only (monitoring, analysis) — always safe to auto-run
  | 'internal'  // writes only inside our own systems (notes, tasks, drafts)
  | 'publish'   // posts/sends to the outside world (social, email)
  | 'spend';    // costs money (ad budgets, campaign launches)

export interface CompanyContext {
  id: string;
  name: string;
  sector: string;
  websiteUrl?: string;
  firebaseProjectId?: string;
  metaAdsAccountId?: string;
  googleAnalyticsPropertyId?: string;
  goals: string[];
  /** Brand voice / do's & don'ts the agents must respect. */
  brandNotes?: string;
  /** Hard cap an agent may propose to spend per run, per platform (EUR). */
  maxAdSpendPerRun?: number;
}

export interface Finding {
  severity: Severity;
  title: string;
  detail: string;
  metric?: { label: string; value: string };
}

export interface ProposedAction {
  id: string;
  agentKind: AgentKind;
  companyId: string;
  risk: ActionRisk;
  title: string;
  summary: string;
  /** Connector-specific payload (e.g. campaign spec, post body, keyword list). */
  payload: Record<string, unknown>;
  /** Resolved by the policy: does a human need to approve before executing? */
  requiresApproval: boolean;
  status: 'proposed' | 'approved' | 'rejected' | 'executed' | 'failed';
  createdAt: string;
}

export interface AgentRunResult {
  agentKind: AgentKind;
  companyId: string;
  startedAt: string;
  finishedAt: string;
  ok: boolean;
  summary: string;
  findings: Finding[];
  actions: ProposedAction[];
  logLines: string[];
}
