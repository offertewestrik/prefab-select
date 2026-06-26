import React from 'react';
import type { Agent } from '../../types';
import { AGENT_VISUALS, AGENT_LINKS } from '../../lib/agentVisuals';

/**
 * "The Team" — a connected node graph of the AI agents rendered as glossy glow
 * orbs. A central hub links to every agent; a few hand-off links suggest how
 * they collaborate. Running agents pulse. Clicking a node selects an agent.
 */

const W = 1000;
const H = 540;
const HUB = { x: W / 2, y: H / 2 };

export function AgentGraph({
  agents, selectedId, onSelect,
}: {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const byKind = new Map(agents.map((a) => [a.kind, a] as const));
  const pos = (a: Agent) => ({ x: AGENT_VISUALS[a.kind].node.x * W, y: AGENT_VISUALS[a.kind].node.y * H });

  return (
    <div className="relative w-full overflow-hidden rounded-2xl acc-card" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="block">
        <defs>
          {/* depth shading shared by all orbs */}
          <radialGradient id="orb-shade" cx="33%" cy="27%" r="75%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="70%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient id="orb-hub" cx="33%" cy="27%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
          {agents.map((a) => {
            const c = AGENT_VISUALS[a.kind].color;
            return (
              <radialGradient key={a.kind} id={`orb-${a.kind}`} cx="33%" cy="27%" r="75%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="44%" stopColor={c} />
                <stop offset="100%" stopColor={c} />
              </radialGradient>
            );
          })}
          <filter id="orb-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* edges: hub → each agent */}
        {agents.map((a) => {
          const p = pos(a);
          const running = a.status === 'running';
          return (
            <line
              key={`hub-${a.id}`}
              x1={HUB.x} y1={HUB.y} x2={p.x} y2={p.y}
              stroke={running ? AGENT_VISUALS[a.kind].color : '#ffffff'}
              strokeOpacity={running ? 0.5 : 0.1}
              strokeWidth={running ? 1.8 : 1}
              className={running ? 'acc-edge-flow' : undefined}
            />
          );
        })}

        {/* hand-off edges between agents */}
        {AGENT_LINKS.map(([from, to], i) => {
          const a = byKind.get(from);
          const b = byKind.get(to);
          if (!a || !b) return null;
          const pa = pos(a); const pb = pos(b);
          const hot = a.status === 'running' || b.status === 'running';
          return (
            <line
              key={`lnk-${i}`}
              x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={hot ? AGENT_VISUALS[from].color : '#ffffff'}
              strokeOpacity={hot ? 0.45 : 0.07}
              strokeWidth={hot ? 1.6 : 1}
              strokeDasharray="4 6"
              className={hot ? 'acc-edge-flow' : undefined}
            />
          );
        })}

        {/* hub node */}
        <g>
          <circle cx={HUB.x} cy={HUB.y} r={30} fill="url(#orb-hub)" filter="url(#orb-glow)" />
          <circle cx={HUB.x} cy={HUB.y} r={30} fill="url(#orb-shade)" />
          <text x={HUB.x} y={HUB.y + 52} textAnchor="middle" fontSize="13" fontWeight="700" fill="#E8ECF6">Command Core</text>
        </g>

        {/* agent nodes */}
        {agents.map((a) => {
          const p = pos(a);
          const c = AGENT_VISUALS[a.kind].color;
          const running = a.status === 'running';
          const selected = a.id === selectedId;
          const r = selected ? 26 : 22;
          return (
            <g key={a.id} onClick={() => onSelect(a.id)} style={{ cursor: 'pointer' }}>
              {running && <circle cx={p.x} cy={p.y} r={r + 8} fill={c} opacity={0.22} className="acc-graph-pulse" />}
              {selected && <circle cx={p.x} cy={p.y} r={r + 6} fill="none" stroke={c} strokeWidth={2} strokeOpacity={0.8} />}
              <circle cx={p.x} cy={p.y} r={r} fill={`url(#orb-${a.kind})`} filter="url(#orb-glow)" />
              <circle cx={p.x} cy={p.y} r={r} fill="url(#orb-shade)" />
              <ellipse cx={p.x - r * 0.28} cy={p.y - r * 0.32} rx={r * 0.32} ry={r * 0.22} fill="#ffffff" opacity={0.85} />
              <text x={p.x} y={p.y + r + 16} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#E8ECF6">
                {AGENT_VISUALS[a.kind].role}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
