"use client";

import { useState } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { relatief } from "@/lib/format";
import { AI_AGENT_TEMPLATES } from "@/lib/ai-agents";
import type { AiAgent, AiAgentCategorie, AiAgentStatus } from "@/lib/types";
import {
  Bot,
  Users,
  FileText,
  Mail,
  CalendarDays,
  Receipt,
  Megaphone,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Pause,
  Play,
  Plus,
  Plug,
  Unplug,
  Trash2,
  X,
  Check,
} from "lucide-react";

const CAT_ICON: Record<AiAgentCategorie, any> = {
  leads: Users,
  offertes: FileText,
  email: Mail,
  planning: CalendarDays,
  facturen: Receipt,
  marketing: Megaphone,
  rapportage: BarChart3,
};

/** Naar welk CRM-onderdeel de agent werkt — voor de "Bekijk"-link. */
const CAT_LINK: Record<AiAgentCategorie, string> = {
  leads: "/leads",
  offertes: "/offertes",
  email: "/integraties",
  planning: "/agenda",
  facturen: "/facturen",
  marketing: "/social",
  rapportage: "/rapportage",
};

const STATUS_META: Record<
  AiAgentStatus,
  { label: string; dot: string; badge: string; puls: boolean }
> = {
  bezig: { label: "Aan het werk", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", puls: true },
  actief: { label: "Actief", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", puls: false },
  rust: { label: "In rust", dot: "bg-slate-300", badge: "bg-slate-100 text-slate-500", puls: false },
  gepauzeerd: { label: "Gepauzeerd", dot: "bg-slate-300", badge: "bg-slate-100 text-slate-500", puls: false },
  fout: { label: "Aandacht nodig", dot: "bg-rose-500", badge: "bg-rose-100 text-rose-700", puls: false },
};

function StatusDot({ status }: { status: AiAgentStatus }) {
  const m = STATUS_META[status];
  return (
    <span className="relative flex h-2.5 w-2.5">
      {m.puls && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${m.dot} opacity-60`} />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${m.dot}`} />
    </span>
  );
}

function uurMin(minuten: number): string {
  if (minuten < 60) return `${minuten} min`;
  const u = Math.floor(minuten / 60);
  const m = minuten % 60;
  return m ? `${u} u ${m} min` : `${u} u`;
}

export default function AiAgentsPage() {
  const mounted = useMounted();
  const agents = useCrm((s) => s.aiAgents);
  const toggleAiAgent = useCrm((s) => s.toggleAiAgent);
  const koppelAiAgent = useCrm((s) => s.koppelAiAgent);
  const deleteAiAgent = useCrm((s) => s.deleteAiAgent);
  const addAiAgent = useCrm((s) => s.addAiAgent);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const aantalGekoppeld = agents.filter((a) => a.gekoppeld).length;
  const aantalBezig = agents.filter((a) => a.status === "bezig").length;
  const takenVandaag = agents.reduce((n, a) => n + a.takenVandaag, 0);
  const tijdBespaard = agents.reduce((n, a) => n + a.tijdBespaardMin, 0);
  const aandacht = agents.filter((a) => a.status === "fout").length;

  // Gecombineerde live-feed: alle activiteiten, nieuwste eerst.
  const feed = agents
    .flatMap((a) => a.activiteiten.map((act) => ({ ...act, agent: a })))
    .sort((x, y) => new Date(y.tijd).getTime() - new Date(x.tijd).getTime())
    .slice(0, 12);

  return (
    <div>
      <PageHeader
        titel="AI-agents"
        subtitel="Zie welke AI-assistenten nu voor je aan het werk zijn"
        actie={
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Agent toevoegen
          </button>
        }
      />

      {/* Samenvatting */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Bot} label="Gekoppelde agents" waarde={`${aantalGekoppeld} / ${agents.length}`} sub={`${aantalBezig} nu aan het werk`} />
        <KpiCard icon={CheckCircle2} label="Taken vandaag" waarde={String(takenVandaag)} sub="automatisch afgehandeld" />
        <KpiCard icon={Clock} label="Tijd bespaard" waarde={uurMin(tijdBespaard)} sub="geschat, vandaag" />
        <KpiCard
          icon={aandacht ? AlertTriangle : Activity}
          label="Aandacht nodig"
          waarde={String(aandacht)}
          sub={aandacht ? "los een koppeling op" : "alles draait"}
          alert={aandacht > 0}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Agent-kaarten */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:col-span-2">
          {agents.map((a) => (
            <AgentCard
              key={a.id}
              agent={a}
              onToggle={() => toggleAiAgent(a.id)}
              onKoppel={() => koppelAiAgent(a.id)}
              onDelete={() => {
                if (confirm(`"${a.naam}" verwijderen uit je dashboard?`)) deleteAiAgent(a.id);
              }}
            />
          ))}
        </div>

        {/* Live-feed */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-brand-600" />
            <h3 className="font-bold text-slate-900">Live activiteit</h3>
          </div>
          <ol className="mt-4 space-y-4">
            {feed.map((f) => {
              const Icon = CAT_ICON[f.agent.categorie];
              return (
                <li key={f.id} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">{f.omschrijving}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {f.agent.naam} · {relatief(f.tijd)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Prototype-melding, consistent met de Integraties-pagina */}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">ℹ️ Prototype-modus</h3>
        <p className="mt-1 text-sm text-amber-800">
          Je kunt hier agents toevoegen, koppelen en pauzeren. De koppeling is nu nog een
          demo — zodra we de <strong>Claude-API-sleutel</strong> instellen, gaan gekoppelde
          agents echt aan de slag met je Supabase-data (lead-opvolging, offerte-concepten,
          e-mailvoorstellen).
        </p>
      </div>

      {dialogOpen && (
        <AddAgentDialog
          agents={agents}
          onClose={() => setDialogOpen(false)}
          onAdd={(key) => addAiAgent(key)}
        />
      )}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  waarde,
  sub,
  alert,
}: {
  icon: any;
  label: string;
  waarde: string;
  sub: string;
  alert?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${alert ? "bg-rose-50 text-rose-600" : "bg-brand-50 text-brand-600"}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-black text-slate-900">{waarde}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function AgentCard({
  agent,
  onToggle,
  onKoppel,
  onDelete,
}: {
  agent: AiAgent;
  onToggle: () => void;
  onKoppel: () => void;
  onDelete: () => void;
}) {
  const Icon = CAT_ICON[agent.categorie];
  const m = STATUS_META[agent.status];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${agent.gekoppeld ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-400"}`}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">{agent.naam}</h3>
              {agent.aanbevolen && (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600">
                  Aanbevolen
                </span>
              )}
            </div>
            {agent.gekoppeld ? (
              <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${m.badge}`}>
                <StatusDot status={agent.status} />
                {m.label}
              </span>
            ) : (
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                Niet gekoppeld
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onDelete}
          title="Agent verwijderen"
          className="rounded-lg p-1.5 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-500">{agent.rol}</p>

      {agent.gekoppeld && agent.status === "bezig" && agent.huidigeTaak && (
        <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Nu bezig met</p>
          <p className="mt-0.5 text-sm text-emerald-900">{agent.huidigeTaak}</p>
        </div>
      )}

      {agent.gekoppeld && agent.status === "fout" && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <p className="text-sm text-rose-800">{agent.activiteiten[0]?.omschrijving ?? "Er ging iets mis."}</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat waarde={String(agent.takenVandaag)} label="vandaag" />
        <Stat waarde={String(agent.takenTotaal)} label="totaal" />
        <Stat waarde={uurMin(agent.tijdBespaardMin)} label="bespaard" />
      </div>

      <p className="mt-3 text-xs text-slate-400">Laatste actie {relatief(agent.laatsteActiviteit)}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        {agent.gekoppeld ? (
          <>
            <button
              onClick={onToggle}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                agent.actief
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              {agent.actief ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {agent.actief ? "Pauzeren" : "Activeren"}
            </button>
            <button
              onClick={onKoppel}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Unplug className="h-4 w-4" /> Ontkoppelen
            </button>
          </>
        ) : (
          <button
            onClick={onKoppel}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plug className="h-4 w-4" /> Koppelen
          </button>
        )}
        <Link
          href={CAT_LINK[agent.categorie]}
          className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Bekijk werk
        </Link>
      </div>
    </div>
  );
}

function Stat({ waarde, label }: { waarde: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 py-2">
      <p className="text-sm font-black text-slate-900">{waarde}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}

function AddAgentDialog({
  agents,
  onClose,
  onAdd,
}: {
  agents: AiAgent[];
  onClose: () => void;
  onAdd: (key: string) => void;
}) {
  const aanwezig = new Set(agents.map((a) => a.templateKey).filter(Boolean));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Agent toevoegen</h2>
            <p className="text-sm text-slate-500">Kies een AI-agent voor je dashboard. Koppelen doe je daarna.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
          {AI_AGENT_TEMPLATES.map((t) => {
            const Icon = CAT_ICON[t.categorie];
            const alToegevoegd = aanwezig.has(t.key);
            return (
              <div
                key={t.key}
                className="flex flex-col rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  {t.aanbevolen && (
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600">
                      Aanbevolen
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-bold text-slate-900">{t.naam}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-500">{t.rol}</p>
                <button
                  disabled={alToegevoegd}
                  onClick={() => onAdd(t.key)}
                  className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    alToegevoegd
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-brand-600 text-white hover:bg-brand-700"
                  }`}
                >
                  {alToegevoegd ? (
                    <>
                      <Check className="h-4 w-4" /> Toegevoegd
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Toevoegen
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
