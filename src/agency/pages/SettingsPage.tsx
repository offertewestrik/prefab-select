import React, { useState } from 'react';
import {
  Building2, Users, Plug, KeyRound, Bell, Save, CheckCircle2, RotateCcw,
  ShieldCheck, Info, Copy, Check,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  Card, CardHeader, Badge, Button, Input, Select, Field, Tabs, Table, Th, Td,
  Avatar, PageHeader,
} from '../components/ui';
import { formatRelative } from '../lib/format';
import { ROLE_LABELS } from '../lib/rbac';
import { users } from '../data/mockData';
import type { BadgeTone } from '../components/ui';
import type { Role } from '../types';

const TABS = [
  { id: 'agency', label: 'Agency' },
  { id: 'gebruikers', label: 'Gebruikers & Rollen' },
  { id: 'integraties', label: 'Integraties' },
  { id: 'apikeys', label: 'API Keys' },
  { id: 'notificaties', label: 'Notificaties' },
];

const ROLE_TONES: Record<Role, BadgeTone> = {
  super_admin: 'purple',
  admin: 'blue',
  marketeer: 'cyan',
  sales: 'green',
  klant: 'slate',
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  super_admin: 'Volledige toegang tot alles, inclusief gebruikersbeheer.',
  admin: 'Volledige toegang tot alle modules en instellingen.',
  marketeer: 'Marketing, content, campagnes, projecten en leads.',
  sales: 'Sales, leads, offertes en omzet.',
  klant: 'Alleen-lezen toegang tot eigen dashboard en rapporten.',
};

const CATEGORY_LABELS: Record<string, string> = {
  analytics: 'Analytics',
  ads: 'Advertenties',
  dev: 'Development',
  ai: 'AI',
  email: 'E-mail',
};

interface AgencyForm {
  name: string;
  email: string;
  currency: string;
  timezone: string;
}

interface NotificationSettings {
  newLead: boolean;
  acceptedQuote: boolean;
  weeklyReport: boolean;
  agentAlerts: boolean;
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-blue-600' : 'bg-white/15'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { integrations, resetData } = useData();

  const [tab, setTab] = useState('agency');

  const [agency, setAgency] = useState<AgencyForm>({
    name: 'Agency Command Center',
    email: 'offerte@prefabselect.nl',
    currency: 'EUR',
    timezone: 'Europe/Amsterdam',
  });
  const [agencySaved, setAgencySaved] = useState(false);

  const [notifs, setNotifs] = useState<NotificationSettings>({
    newLead: true,
    acceptedQuote: true,
    weeklyReport: false,
    agentAlerts: true,
  });

  const [copied, setCopied] = useState<string | null>(null);

  const saveAgency = () => {
    setAgencySaved(true);
    window.setTimeout(() => setAgencySaved(false), 2000);
  };

  const handleReset = () => {
    resetData();
    window.location.reload();
  };

  const copyEnvVar = (envVar: string) => {
    try {
      navigator.clipboard?.writeText(envVar);
    } catch {
      /* ignore */
    }
    setCopied(envVar);
    window.setTimeout(() => setCopied((c) => (c === envVar ? null : c)), 1500);
  };

  const notifRows: { key: keyof NotificationSettings; label: string; hint: string }[] = [
    { key: 'newLead', label: 'E-mail bij nieuwe lead', hint: 'Ontvang direct een melding wanneer een lead binnenkomt.' },
    { key: 'acceptedQuote', label: 'Bij geaccepteerde offerte', hint: 'Word op de hoogte gebracht zodra een offerte wordt geaccepteerd.' },
    { key: 'weeklyReport', label: 'Wekelijks rapport', hint: 'Een samenvattend rapport elke maandagochtend.' },
    { key: 'agentAlerts', label: 'Agent-waarschuwingen', hint: 'Meldingen wanneer een AI-agent ingrijpt of faalt.' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Instellingen" subtitle="Beheer je agency, gebruikers en integraties" />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'agency' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-5">
            <CardHeader title="Agency-gegevens" icon={<Building2 size={16} />} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Agency naam">
                <Input value={agency.name} onChange={(e) => setAgency({ ...agency, name: e.target.value })} />
              </Field>
              <Field label="E-mailadres">
                <Input type="email" value={agency.email} onChange={(e) => setAgency({ ...agency, email: e.target.value })} />
              </Field>
              <Field label="Standaard valuta">
                <Select value={agency.currency} onChange={(e) => setAgency({ ...agency, currency: e.target.value })}>
                  <option value="EUR">EUR — Euro (€)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="GBP">GBP — Pound (£)</option>
                </Select>
              </Field>
              <Field label="Tijdzone">
                <Select value={agency.timezone} onChange={(e) => setAgency({ ...agency, timezone: e.target.value })}>
                  <option value="Europe/Amsterdam">Europe/Amsterdam</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Berlin">Europe/Berlin</option>
                  <option value="UTC">UTC</option>
                </Select>
              </Field>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <Button icon={<Save size={15} />} onClick={saveAgency}>Opslaan</Button>
              {agencySaved && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 size={14} /> Opgeslagen
                </span>
              )}
            </div>
          </Card>

          <Card className="p-5 border-red-400/20">
            <CardHeader title="Gevarenzone" icon={<RotateCcw size={16} />} />
            <p className="text-sm text-[var(--acc-muted)]">
              Zet alle demo-data terug naar de oorspronkelijke staat. Alle wijzigingen die je hebt
              gemaakt gaan verloren en de pagina wordt opnieuw geladen.
            </p>
            <div className="mt-4">
              <Button variant="danger" icon={<RotateCcw size={15} />} onClick={handleReset}>
                Reset demo data
              </Button>
            </div>
          </Card>
        </div>
      )}

      {tab === 'gebruikers' && (
        <div className="space-y-4">
          <Card className="p-5">
            <CardHeader
              title="Gebruikers"
              subtitle={`${users.length} teamleden`}
              icon={<Users size={16} />}
            />
            <Table>
              <thead>
                <tr>
                  <Th>Gebruiker</Th>
                  <Th>E-mail</Th>
                  <Th>Rol</Th>
                  <Th>Laatst actief</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} color={u.avatarColor} size={34} />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{u.name}</p>
                          {u.title && <p className="text-[11px] text-[var(--acc-muted)] truncate">{u.title}</p>}
                        </div>
                      </div>
                    </Td>
                    <Td><span className="text-[var(--acc-muted)]">{u.email}</span></Td>
                    <Td><Badge tone={ROLE_TONES[u.role]} dot>{ROLE_LABELS[u.role]}</Badge></Td>
                    <Td><span className="text-[var(--acc-muted)]">{formatRelative(u.lastActive)}</span></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card className="p-5">
            <CardHeader title="Rollen & rechten (RBAC)" icon={<ShieldCheck size={16} />} />
            <p className="text-sm text-[var(--acc-muted)] mb-4">
              Toegang wordt bepaald door rollen. Agency-rollen zien alle bedrijven; klanten zien
              alleen hun eigen data. Rechten worden ook server-side afgedwongen via Firestore rules.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
                <div key={role} className="acc-glass rounded-xl p-3 flex items-start gap-3">
                  <Badge tone={ROLE_TONES[role]} dot>{ROLE_LABELS[role]}</Badge>
                  <p className="text-xs text-[var(--acc-muted)]">{ROLE_DESCRIPTIONS[role]}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'integraties' && (
        <div className="grid sm:grid-cols-2 gap-3">
          {integrations.items.map((it) => (
            <Card key={it.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl acc-glass flex items-center justify-center text-blue-300 shrink-0">
                  <Plug size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold truncate">{it.name}</p>
                    <Badge tone="slate">{CATEGORY_LABELS[it.category] ?? it.category}</Badge>
                  </div>
                  <p className="text-[11px] text-[var(--acc-muted)] mt-0.5">{it.description}</p>
                  <code className="inline-block mt-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/8 text-[var(--acc-muted)]">
                    {it.envVar}
                  </code>
                </div>
                {it.connected
                  ? <Badge tone="green" dot>Verbonden</Badge>
                  : <Badge tone="slate">Niet verbonden</Badge>}
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  variant={it.connected ? 'secondary' : 'primary'}
                  onClick={() => integrations.update(it.id, { connected: !it.connected })}
                >
                  {it.connected ? 'Loskoppelen' : 'Verbinden'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'apikeys' && (
        <div className="space-y-4">
          <div className="acc-glass rounded-xl p-4 flex items-start gap-3 border border-amber-400/20">
            <Info size={16} className="text-amber-300 shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--acc-muted)]">
              Sla echte sleutels nooit op in code — gebruik <code className="font-mono text-amber-300">.env</code> (zie <code className="font-mono text-amber-300">.env.example</code>).
            </p>
          </div>
          <Card className="p-5">
            <CardHeader title="API Keys" subtitle="Environment-variabelen per integratie" icon={<KeyRound size={16} />} />
            <Table>
              <thead>
                <tr>
                  <Th>Integratie</Th>
                  <Th>Environment-variabele</Th>
                  <Th>Waarde</Th>
                  <Th className="text-right">Actie</Th>
                </tr>
              </thead>
              <tbody>
                {integrations.items.map((it) => (
                  <tr key={it.id}>
                    <Td><span className="font-medium">{it.name}</span></Td>
                    <Td><code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/8 text-[var(--acc-muted)]">{it.envVar}</code></Td>
                    <Td>
                      <span className="font-mono text-xs text-[var(--acc-muted)]">
                        {it.connected ? '••••••••••••' : 'Niet ingesteld'}
                      </span>
                    </Td>
                    <Td className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={copied === it.envVar ? <Check size={13} /> : <Copy size={13} />}
                        onClick={() => copyEnvVar(it.envVar)}
                      >
                        {copied === it.envVar ? 'Gekopieerd' : 'Kopieer naam'}
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      )}

      {tab === 'notificaties' && (
        <Card className="p-5">
          <CardHeader title="Notificaties" subtitle="Kies waarover je een melding wilt ontvangen" icon={<Bell size={16} />} />
          <div className="divide-y divide-[var(--acc-border)]">
            {notifRows.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-[11px] text-[var(--acc-muted)]">{row.hint}</p>
                </div>
                <Switch
                  checked={notifs[row.key]}
                  onChange={(v) => setNotifs((n) => ({ ...n, [row.key]: v }))}
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
