import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus, Globe, Github, Bug, CheckSquare, ExternalLink, GitBranch, GitCommit,
  CircleAlert, Rocket, Sparkles, Database, Server, FunctionSquare, HardDrive,
  ShieldCheck, RefreshCw,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  Card, CardHeader, Button, Badge, EmptyState, PageHeader, Modal, Tabs,
  Input, Textarea, Select, Field, Spinner, cn,
} from '../components/ui';
import { formatRelative, formatDate } from '../lib/format';
import { deployTone } from './_shared';
import {
  githubService, type GitHubRepo, type GitHubBranch, type GitHubCommit,
  type GitHubIssue, type GitHubDeploy,
} from '../services/githubService';
import {
  firebaseAdminService, type FirebaseProjectStatus, type ServiceHealth,
} from '../services/firebaseAdminService';
import type { Project, ProjectType, DeployStatus } from '../types';
import type { BadgeTone } from '../components/ui';

const PROJECT_TYPES: ProjectType[] = ['website', 'firebase', 'github', 'configurator', 'landingpage'];
const PROJECT_STATUSES: Project['status'][] = ['actief', 'on hold', 'opgeleverd'];

function healthTone(s: ServiceHealth): BadgeTone {
  return s === 'operational' ? 'green' : s === 'degraded' ? 'amber' : 'red';
}
const HEALTH_LABELS: Record<ServiceHealth, string> = {
  operational: 'operationeel', degraded: 'verhoogd', down: 'storing',
};

type TabId = 'projects' | 'github' | 'firebase';

export default function ProjectsPage() {
  const { selectedCompany, projects } = useData();
  const [tab, setTab] = useState<TabId>('projects');
  const [createOpen, setCreateOpen] = useState(false);

  const cid = selectedCompany?.id;
  const cProjects = useMemo(
    () => (cid ? projects.items.filter((p) => p.companyId === cid) : []),
    [cid, projects.items],
  );

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projecten"
        subtitle={`${selectedCompany.name} · development & infrastructuur`}
        actions={tab === 'projects' && <Button icon={<Plus size={16} />} onClick={() => setCreateOpen(true)}>Project</Button>}
      />

      <Tabs
        tabs={[
          { id: 'projects', label: 'Projecten', count: cProjects.length },
          { id: 'github', label: 'GitHub' },
          { id: 'firebase', label: 'Firebase' },
        ]}
        active={tab}
        onChange={(id) => setTab(id as TabId)}
      />

      {tab === 'projects' && (
        cProjects.length === 0 ? (
          <Card className="p-5"><EmptyState title="Nog geen projecten" description="Voeg een project toe." action={<Button icon={<Plus size={15} />} onClick={() => setCreateOpen(true)}>Project</Button>} /></Card>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cProjects.map((p) => (
              <Card key={p.id} hover className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <Badge tone="slate">{p.type}</Badge>
                      <Badge tone={deployTone(p.deployStatus)} dot>{p.deployStatus}</Badge>
                      <span className="text-[11px] text-[var(--acc-muted)] capitalize">· {p.status}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[var(--acc-muted)] leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {p.openBugs > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-400/20">
                      <Bug size={11} /> {p.openBugs} bugs
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-[var(--acc-muted)] border border-white/10">
                    <CheckSquare size={11} /> {p.openTasks} taken
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 mt-auto border-t border-[var(--acc-border)]">
                  <span className="text-[11px] text-[var(--acc-muted)]">{formatRelative(p.lastUpdate)}</span>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                      Bekijk <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )
      )}

      {tab === 'github' && <GitHubTab repoFullName={selectedCompany.integrations.githubRepo} />}
      {tab === 'firebase' && <FirebaseTab projectId={selectedCompany.integrations.firebaseProjectId} />}

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(data) => {
          projects.create({
            companyId: selectedCompany.id,
            deployStatus: 'offline',
            lastUpdate: new Date().toISOString(),
            openBugs: 0,
            openTasks: 0,
            ...data,
          });
          setCreateOpen(false);
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// GitHub tab
// ---------------------------------------------------------------------------

function GitHubTab({ repoFullName }: { repoFullName?: string }) {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [deploys, setDeploys] = useState<GitHubDeploy[]>([]);

  const [aiBusy, setAiBusy] = useState<'analyse' | 'plan' | null>(null);
  const [aiText, setAiText] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    githubService.getRepos(repoFullName).then((r) => {
      if (!active) return;
      setRepos(r);
      setSelectedRepo((cur) => cur ?? r[0]?.fullName ?? null);
      setLoading(false);
    });
    return () => { active = false; };
  }, [repoFullName]);

  useEffect(() => {
    if (!selectedRepo) return;
    let active = true;
    Promise.all([
      githubService.getBranches(selectedRepo),
      githubService.getCommits(selectedRepo),
      githubService.getIssues(selectedRepo),
      githubService.getDeploys(selectedRepo),
    ]).then(([b, c, i, d]) => {
      if (!active) return;
      setBranches(b); setCommits(c); setIssues(i); setDeploys(d);
    });
    return () => { active = false; };
  }, [selectedRepo]);

  async function runAi(kind: 'analyse' | 'plan') {
    setAiBusy(kind);
    setAiText('');
    const repo = repos.find((r) => r.fullName === selectedRepo);
    await new Promise((r) => setTimeout(r, 1100));
    if (kind === 'analyse') {
      setAiText(
        `Repo-analyse — ${repo?.fullName ?? ''}\n\n`
        + `• Taal: ${repo?.language ?? 'onbekend'}, ${repo?.openIssues ?? issues.length} open issues, ${branches.length} actieve branches.\n`
        + `• Laatste commit: "${commits[0]?.message ?? '—'}" (${commits[0]?.author ?? ''}).\n`
        + `• Code-kwaliteit ogen goed; aandachtspunt: ${issues[0]?.title ?? 'geen openstaande bugs'}.\n\n`
        + `Conclusie: gezonde repo, focus op het oplossen van de open ${issues.filter((i) => i.state === 'open').length} issues.`,
      );
    } else {
      setAiText(
        `Verbeterplan — ${repo?.fullName ?? ''}\n\n`
        + `1. Los kritieke issue #${issues[0]?.number ?? '—'} op: ${issues[0]?.title ?? ''}.\n`
        + `2. Voeg input-validatie + error handling toe aan formulieren/functies.\n`
        + `3. Merge of sluit verouderde branches (${branches.filter((b) => !b.protected).length} feature-branches).\n`
        + `4. Activeer CI-checks en automatische preview-deploys.\n`
        + `5. Documenteer de release-flow.`,
      );
    }
    setAiBusy(null);
  }

  if (loading) {
    return <Card className="p-5"><div className="flex items-center gap-2 text-sm text-[var(--acc-muted)] py-6 justify-center"><Spinner /> GitHub data laden…</div></Card>;
  }

  const selected = repos.find((r) => r.fullName === selectedRepo);

  return (
    <div className="space-y-4">
      <p className="text-[11px] text-[var(--acc-muted)]">Mock data — klaar voor echte GitHub API (zie githubService.ts){repoFullName ? ` · gekoppeld: ${repoFullName}` : ''}</p>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <CardHeader title="Repositories" subtitle={`${repos.length} repos`} icon={<Github size={16} />} />
          <div className="space-y-2">
            {repos.map((r) => (
              <button
                key={r.fullName}
                onClick={() => setSelectedRepo(r.fullName)}
                className={cn(
                  'w-full text-left acc-glass rounded-xl p-3 transition-colors hover:border-white/30',
                  selectedRepo === r.fullName && 'ring-1 ring-blue-400/40',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{r.name}</span>
                  <Badge tone="slate">{r.language}</Badge>
                </div>
                <p className="text-[11px] text-[var(--acc-muted)] truncate mt-1">{r.description}</p>
                <p className="text-[10px] text-[var(--acc-muted)] mt-1.5">{r.openIssues} issues · {formatRelative(r.updatedAt)}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5 space-y-5">
          <CardHeader
            title={selected?.fullName ?? 'Selecteer een repo'}
            subtitle={selected?.description}
            icon={<GitBranch size={16} />}
            action={
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" icon={aiBusy === 'analyse' ? <Spinner size={13} /> : <Sparkles size={13} />} onClick={() => runAi('analyse')} disabled={aiBusy !== null}>Analyseer deze repo</Button>
                <Button size="sm" variant="secondary" icon={aiBusy === 'plan' ? <Spinner size={13} /> : <Sparkles size={13} />} onClick={() => runAi('plan')} disabled={aiBusy !== null}>Maak verbeterplan</Button>
              </div>
            }
          />

          {aiText && (
            <div className="acc-glass rounded-xl p-4 text-xs whitespace-pre-line leading-relaxed border border-violet-400/20">{aiText}</div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Branches</p>
              <div className="space-y-1.5">
                {branches.map((b) => (
                  <div key={b.name} className="flex items-center gap-2 text-xs">
                    <GitBranch size={12} className="text-[var(--acc-muted)] shrink-0" />
                    <span className="font-mono truncate">{b.name}</span>
                    {b.protected && <Badge tone="amber">protected</Badge>}
                    <span className="ml-auto text-[10px] text-[var(--acc-muted)] shrink-0">+{b.ahead} -{b.behind}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Deploys</p>
              <div className="space-y-1.5">
                {deploys.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Rocket size={12} className="text-[var(--acc-muted)] shrink-0" />
                    <span className="capitalize">{d.environment}</span>
                    <Badge tone={d.status === 'success' ? 'green' : d.status === 'in_progress' ? 'amber' : 'red'}>{d.status.replace('_', ' ')}</Badge>
                    <span className="ml-auto text-[10px] text-[var(--acc-muted)] font-mono shrink-0">{d.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Recente commits</p>
            <div className="space-y-2">
              {commits.map((c) => (
                <div key={c.sha} className="flex items-start gap-2.5 text-xs">
                  <GitCommit size={13} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
                  <span className="font-mono text-blue-300 shrink-0">{c.sha}</span>
                  <span className="flex-1 min-w-0 truncate" title={c.message}>{c.message}</span>
                  <span className="text-[var(--acc-muted)] shrink-0">{c.author} · {formatRelative(c.at)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--acc-muted)] mb-2">Issues</p>
            <div className="space-y-1.5">
              {issues.map((i) => (
                <div key={i.number} className="flex items-center gap-2 text-xs">
                  <CircleAlert size={12} className={cn('shrink-0', i.state === 'open' ? 'text-amber-300' : 'text-[var(--acc-muted)]')} />
                  <span className="text-[var(--acc-muted)] font-mono shrink-0">#{i.number}</span>
                  <span className="flex-1 min-w-0 truncate">{i.title}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {i.labels.map((l) => <Badge key={l} tone="purple">{l}</Badge>)}
                    <Badge tone={i.state === 'open' ? 'green' : 'slate'}>{i.state}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Firebase tab
// ---------------------------------------------------------------------------

function FirebaseTab({ projectId }: { projectId?: string }) {
  const [status, setStatus] = useState<FirebaseProjectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiText, setAiText] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    firebaseAdminService.getProjectStatus(projectId || 'demo').then((s) => {
      if (!active) return;
      setStatus(s);
      setLoading(false);
    });
    return () => { active = false; };
  }, [projectId]);

  async function runCheck() {
    if (!status) return;
    setAiBusy(true);
    setAiText('');
    await new Promise((r) => setTimeout(r, 1100));
    setAiText(
      `Projectcontrole — ${status.projectId}\n\n`
      + `• Database: ${HEALTH_LABELS[status.database.status]} (${status.database.docs.toLocaleString('nl-NL')} docs).\n`
      + `• Functions: ${HEALTH_LABELS[status.functions.status]} — foutmarge ${status.functions.errorRate}% op ${status.functions.invocations.toLocaleString('nl-NL')} invocaties.\n`
      + `• Hosting & Storage: operationeel.\n\n`
      + `Advies: ${status.errors.length} actieve meldingen. Voeg retry/backoff toe aan de e-mailfunctie om de Resend rate limit op te vangen.`,
    );
    setAiBusy(false);
  }

  if (loading || !status) {
    return <Card className="p-5"><div className="flex items-center gap-2 text-sm text-[var(--acc-muted)] py-6 justify-center"><Spinner /> Firebase status laden…</div></Card>;
  }

  const services: { key: string; label: string; icon: React.ReactNode; health: ServiceHealth; metrics: { label: string; value: string }[] }[] = [
    { key: 'database', label: 'Database', icon: <Database size={15} />, health: status.database.status, metrics: [
      { label: 'Reads', value: status.database.reads.toLocaleString('nl-NL') },
      { label: 'Writes', value: status.database.writes.toLocaleString('nl-NL') },
      { label: 'Docs', value: status.database.docs.toLocaleString('nl-NL') },
    ] },
    { key: 'hosting', label: 'Hosting', icon: <Server size={15} />, health: status.hosting.status, metrics: [
      { label: 'Domein', value: status.hosting.domain },
      { label: 'Laatste deploy', value: formatRelative(status.hosting.lastDeploy) },
    ] },
    { key: 'functions', label: 'Functions', icon: <FunctionSquare size={15} />, health: status.functions.status, metrics: [
      { label: 'Invocaties', value: status.functions.invocations.toLocaleString('nl-NL') },
      { label: 'Foutmarge', value: `${status.functions.errorRate}%` },
    ] },
    { key: 'storage', label: 'Storage', icon: <HardDrive size={15} />, health: status.storage.status, metrics: [
      { label: 'Gebruikt', value: `${status.storage.usedGb} GB` },
      { label: 'Bestanden', value: status.storage.files.toLocaleString('nl-NL') },
    ] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[11px] text-[var(--acc-muted)]">Mock data via Firebase Admin SDK (server-side) — project <span className="font-mono">{status.projectId}</span></p>
        <Button size="sm" variant="secondary" icon={aiBusy ? <Spinner size={13} /> : <Sparkles size={13} />} onClick={runCheck} disabled={aiBusy}>Controleer project</Button>
      </div>

      {aiText && (
        <div className="acc-glass rounded-xl p-4 text-xs whitespace-pre-line leading-relaxed border border-violet-400/20">{aiText}</div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {services.map((s) => (
          <Card key={s.key} className="p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-300">{s.icon}</span>
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
              <Badge tone={healthTone(s.health)} dot>{HEALTH_LABELS[s.health]}</Badge>
            </div>
            <div className="space-y-2">
              {s.metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between text-xs">
                  <span className="text-[var(--acc-muted)]">{m.label}</span>
                  <span className="font-semibold tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <CardHeader title="Errors" subtitle={`${status.errors.length} actief`} icon={<CircleAlert size={16} />} />
          <div className="space-y-2">
            {status.errors.map((e) => (
              <div key={e.id} className="acc-glass rounded-xl p-3 flex items-start gap-2.5">
                <span className={cn('mt-1 w-2 h-2 rounded-full shrink-0', e.level === 'error' ? 'bg-red-400' : 'bg-amber-400')} />
                <div className="min-w-0">
                  <p className="text-xs leading-snug">{e.message}</p>
                  <p className="text-[10px] text-[var(--acc-muted)] mt-1">{formatRelative(e.at)}</p>
                </div>
              </div>
            ))}
            {status.errors.length === 0 && <p className="text-sm text-[var(--acc-muted)] py-3 text-center">Geen errors 🎉</p>}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Logs" subtitle="Recente function executions" icon={<ShieldCheck size={16} />} />
          <div className="space-y-1.5">
            {status.logs.map((l, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <RefreshCw size={12} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
                <span className="flex-1 min-w-0">{l.message}</span>
                <span className="text-[var(--acc-muted)] shrink-0">{formatRelative(l.at)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Create modal
// ---------------------------------------------------------------------------

interface ProjectFormData {
  name: string; type: ProjectType; url?: string; repo?: string;
  description: string; status: Project['status'];
}

function CreateProjectModal({ open, onClose, onCreate }: {
  open: boolean; onClose: () => void; onCreate: (data: ProjectFormData) => void;
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState<ProjectType>('website');
  const [url, setUrl] = useState('');
  const [repo, setRepo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Project['status']>('actief');

  function reset() {
    setName(''); setType('website'); setUrl(''); setRepo(''); setDescription(''); setStatus('actief');
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nieuw project"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Annuleren</Button>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              onCreate({ name: name.trim(), type, url: url || undefined, repo: repo || undefined, description, status });
              reset();
            }}
          >
            Aanmaken
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Naam">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bijv. Nieuwe campagne landingspagina" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Type">
            <Select value={type} onChange={(e) => setType(e.target.value as ProjectType)}>
              {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onChange={(e) => setStatus(e.target.value as Project['status'])}>
              {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="URL" hint="Optioneel">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
        </Field>
        <Field label="Repository" hint="Optioneel, bijv. org/repo">
          <Input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="org/repo" />
        </Field>
        <Field label="Omschrijving">
          <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
      </div>
    </Modal>
  );
}
