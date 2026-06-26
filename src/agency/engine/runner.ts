/**
 * The engine runner + guardrail policy + persistence interface.
 *
 * `runOnce` is what Cloud Scheduler / cron calls (e.g. every 15 min). It loads
 * the companies + their enabled agents, runs them, applies the autonomy policy
 * to every proposed action, and persists runs/logs/approvals/notifications via
 * the injected Store. Read-only agents (monitor) act autonomously; outward
 * actions (publish/spend) are routed to the approval queue unless the policy
 * explicitly allows auto-execution within the configured caps.
 */

import type { AgentKind } from '../types';
import type { AgentRunResult, AutonomyMode, CompanyContext, ProposedAction } from './types';
import { ENGINE_AGENTS, type AgentDeps, type EngineAgentId } from './agents';
import { createBrain, type Brain } from './brain';

/** What the engine needs from its datastore (implement against Firestore). */
export interface EngineStore {
  listCompanies(): Promise<CompanyContext[]>;
  /** Which engine agents are enabled for a company (defaults to ['monitor']). */
  enabledAgents(companyId: string): Promise<EngineAgentId[]>;
  saveRun(run: AgentRunResult): Promise<void>;
  appendLog(companyId: string, agentKind: AgentKind, level: 'info' | 'success' | 'warn' | 'error', message: string, at: string): Promise<void>;
  enqueueApproval(action: ProposedAction): Promise<void>;
  /** Called for actions the policy auto-approves — the deployer wires real connectors here. */
  executeAction?(action: ProposedAction): Promise<void>;
  notify(companyId: string, level: 'info' | 'success' | 'warn' | 'error', title: string, body: string, at: string): Promise<void>;
}

export interface RunOptions {
  mode?: AutonomyMode;        // default 'mixed'
  brain?: Brain;              // default: createBrain() (Gemini or fallback)
  now?: () => string;
  fetchImpl?: typeof fetch;
}

/** Guardrail: decide whether an action may auto-execute or needs approval. */
export function requiresApproval(action: ProposedAction, mode: AutonomyMode): boolean {
  if (action.risk === 'read' || action.risk === 'internal') return false; // safe → auto
  if (mode === 'auto') return false;        // user opted into full autonomy
  if (mode === 'approval') return true;     // everything outward needs a human
  // 'mixed': publish/spend always need approval
  return true;
}

let counter = 0;
function defaultId(prefix: string) {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter}`;
}

/** Run every enabled agent for every company exactly once. Returns a summary. */
export async function runOnce(store: EngineStore, opts: RunOptions = {}) {
  const mode = opts.mode ?? 'mixed';
  const now = opts.now ?? (() => new Date().toISOString());
  const deps: AgentDeps = { brain: opts.brain ?? createBrain(), now, id: defaultId, fetchImpl: opts.fetchImpl };

  const companies = await store.listCompanies();
  let runs = 0; let approvalsQueued = 0; let autoExecuted = 0; let problems = 0;

  for (const company of companies) {
    const enabled = await store.enabledAgents(company.id);
    for (const agentId of enabled) {
      const fn = ENGINE_AGENTS[agentId];
      if (!fn) continue;
      let result: AgentRunResult;
      try {
        result = await fn(company, deps);
      } catch (e: any) {
        await store.appendLog(company.id, 'firebase-monitor', 'error', `Agent ${agentId} faalde: ${e?.message ?? e}`, now());
        continue;
      }
      runs += 1;
      await store.saveRun(result);
      for (const line of result.logLines) await store.appendLog(company.id, result.agentKind, 'info', line, now());

      const hasError = result.findings.some((f) => f.severity === 'error');
      const hasWarn = result.findings.some((f) => f.severity === 'warn');
      if (hasError || hasWarn) {
        problems += 1;
        await store.notify(company.id, hasError ? 'error' : 'warn', `${company.name}: ${result.summary}`, result.findings.map((f) => f.title).join(' · '), now());
      }

      for (const raw of result.actions) {
        const action = { ...raw, requiresApproval: requiresApproval(raw, mode) };
        if (action.requiresApproval) {
          action.status = 'proposed';
          await store.enqueueApproval(action);
          approvalsQueued += 1;
        } else if (store.executeAction) {
          await store.executeAction(action);
          autoExecuted += 1;
        } else {
          await store.enqueueApproval(action); // no connector wired yet → queue it
          approvalsQueued += 1;
        }
      }
    }
  }

  return { companies: companies.length, runs, approvalsQueued, autoExecuted, problems, mode, brain: deps.brain.name, at: now() };
}

/** Convenience alias for a scheduler tick. */
export const tick = runOnce;
