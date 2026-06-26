import type { Agent, AgentKind } from '../types';

/**
 * Visual identity + derived "live" metrics for each AI agent, used by the
 * "The Team" view (node graph + agent cards). Colours and graph positions are
 * fixed per kind; metrics are derived deterministically from the agent so the
 * demo looks alive and stable across reloads.
 */

export interface AgentVisual {
  color: string;
  role: string;
  /** Normalised position (0..1) inside the team graph. */
  node: { x: number; y: number };
}

export const AGENT_VISUALS: Record<AgentKind, AgentVisual> = {
  'lead-follow-up':    { color: '#8B5CF6', role: 'Lead opvolging',     node: { x: 0.17, y: 0.28 } },
  quote:               { color: '#F59E0B', role: 'Offertes',           node: { x: 0.33, y: 0.63 } },
  'website-analysis':  { color: '#06B6D4', role: 'Website',            node: { x: 0.45, y: 0.20 } },
  seo:                 { color: '#10B981', role: 'SEO',                node: { x: 0.63, y: 0.34 } },
  'meta-ads-analysis': { color: '#EC4899', role: 'Advertenties',       node: { x: 0.80, y: 0.23 } },
  content:             { color: '#3B82F6', role: 'Content',            node: { x: 0.87, y: 0.55 } },
  reporting:           { color: '#6366F1', role: 'Rapportage',         node: { x: 0.71, y: 0.76 } },
  'customer-service':  { color: '#14B8A6', role: 'Klantenservice',     node: { x: 0.50, y: 0.82 } },
  'github-review':     { color: '#D946EF', role: 'Code review',        node: { x: 0.27, y: 0.83 } },
  'firebase-monitor':  { color: '#F97316', role: 'Infra / Firebase',   node: { x: 0.12, y: 0.57 } },
};

/** Hub-and-spoke + a few hand-off links between agents (kind → kind). */
export const AGENT_LINKS: Array<[AgentKind, AgentKind]> = [
  ['lead-follow-up', 'quote'],
  ['quote', 'reporting'],
  ['website-analysis', 'seo'],
  ['seo', 'content'],
  ['content', 'meta-ads-analysis'],
  ['meta-ads-analysis', 'reporting'],
  ['github-review', 'firebase-monitor'],
  ['customer-service', 'lead-follow-up'],
];

export interface AgentMetrics {
  tasks: number;
  impact: number; // percentage
  avgTime: string;
  cost: string;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function agentMetrics(agent: Agent): AgentMetrics {
  const h = hash(agent.kind + agent.id);
  const tasks = 5 + (h % 38);
  const impact = 68 + (h % 30);
  const avgSec = ((h >>> 4) % 1400) / 100 + 1.2;
  const cost = ((h >>> 8) % 2200) / 100 + 1.5;
  return {
    tasks,
    impact,
    avgTime: avgSec >= 60 ? `${(avgSec / 60).toFixed(1)}m` : `${avgSec.toFixed(1)}s`,
    cost: `$${cost.toFixed(2)}`,
  };
}

/** Short, flavourful status label per state (à la BRIEFING / GENERATING). */
export function agentStatusLabel(status: Agent['status']): string {
  switch (status) {
    case 'running': return 'ACTIEF';
    case 'completed': return 'KLAAR';
    case 'failed': return 'MISLUKT';
    default: return 'STAND-BY';
  }
}
