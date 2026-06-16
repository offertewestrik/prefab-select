import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Building2, ArrowLeft, Globe, Pencil, LayoutDashboard, Target, Mail, Phone,
  MapPin, User, Euro, Users, FileText, Flame, Github, Server, Megaphone,
  BarChart3, CheckCircle2, XCircle, Save,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import {
  Card, CardHeader, Badge, Button, Input, Textarea, Select, Field, Modal,
  Tabs, Table, Th, Td, EmptyState, PageHeader, Avatar,
} from '../components/ui';
import { AreaChart } from '../components/charts';
import { formatCurrency, formatRelative } from '../lib/format';
import { companyStatusTone, deployTone, leadStatusTone } from './_shared';
import type { CompanyStatus } from '../types';

const TABS = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'contact', label: 'Contact' },
  { id: 'projecten', label: 'Projecten' },
  { id: 'integraties', label: 'Integraties' },
  { id: 'notities', label: 'Notities' },
];

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { companies, leads, quotes, projects, setSelectedCompanyId } = useData();
  const { can } = useAuth();

  const company = useMemo(() => companies.items.find((c) => c.id === id) ?? null, [companies.items, id]);

  const [tab, setTab] = useState('overzicht');
  const [editOpen, setEditOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<CompanyStatus>('actief');
  const [editBudget, setEditBudget] = useState(0);
  const [editGoals, setEditGoals] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState(false);

  const cLeads = useMemo(() => (company ? leads.items.filter((l) => l.companyId === company.id) : []), [leads.items, company]);
  const cQuotes = useMemo(() => (company ? quotes.items.filter((q) => q.companyId === company.id) : []), [quotes.items, company]);
  const cProjects = useMemo(() => (company ? projects.items.filter((p) => p.companyId === company.id) : []), [projects.items, company]);

  if (!company) {
    return (
      <Card className="p-2">
        <EmptyState
          icon={<Building2 size={40} />}
          title="Bedrijf niet gevonden"
          description="Dit bedrijf bestaat niet (meer) of je hebt er geen toegang toe."
          action={<Link to="/agency/companies"><Button variant="secondary" icon={<ArrowLeft size={15} />}>Terug naar bedrijven</Button></Link>}
        />
      </Card>
    );
  }

  const openEdit = () => {
    setEditStatus(company.status);
    setEditBudget(company.monthlyMarketingBudget);
    setEditGoals(company.goals.join('\n'));
    setEditNotes(company.notes);
    setEditOpen(true);
  };

  const saveEdit = () => {
    companies.update(company.id, {
      status: editStatus,
      monthlyMarketingBudget: Number(editBudget) || 0,
      goals: editGoals.split('\n').map((g) => g.trim()).filter(Boolean),
      notes: editNotes,
    });
    setEditOpen(false);
  };

  const openDashboard = () => {
    setSelectedCompanyId(company.id);
    navigate('/agency/dashboard');
  };

  const saveNotes = () => {
    companies.update(company.id, { notes });
    setSavedNotes(true);
    window.setTimeout(() => setSavedNotes(false), 2000);
  };

  const openQuotes = cQuotes.filter((q) => q.status === 'Verzonden' || q.status === 'Concept').length;

  // Synthetic but stable revenue trend for the overview chart.
  const revenueTrend = useMemo(() => {
    const base = company.monthlyRevenue || 10000;
    return Array.from({ length: 8 }, (_, i) => ({
      label: `W${i + 1}`,
      value: Math.round((base / 8) * (0.7 + 0.08 * i + (i % 2 ? 0.05 : 0))),
    }));
  }, [company.monthlyRevenue]);

  const recentLeads = useMemo(
    () => [...cLeads].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 5),
    [cLeads],
  );

  const integrationRows = [
    { icon: <Server size={16} />, label: 'Firebase project', value: company.integrations.firebaseProjectId },
    { icon: <Github size={16} />, label: 'GitHub repo', value: company.integrations.githubRepo },
    { icon: <Globe size={16} />, label: 'Website URL', value: company.integrations.websiteUrl },
    { icon: <Megaphone size={16} />, label: 'Meta Ads account', value: company.integrations.metaAdsAccountId },
    { icon: <BarChart3 size={16} />, label: 'Google Analytics property', value: company.integrations.googleAnalyticsPropertyId },
  ];

  return (
    <div className="space-y-6">
      <Link to="/agency/companies" className="inline-flex items-center gap-1.5 text-xs text-[var(--acc-muted)] hover:text-white transition-colors">
        <ArrowLeft size={14} /> Alle bedrijven
      </Link>

      <PageHeader
        title={company.name}
        subtitle={company.sector}
        actions={(
          <>
            <Badge tone={companyStatusTone(company.status)} dot>{company.status}</Badge>
            <Button variant="secondary" icon={<LayoutDashboard size={15} />} onClick={openDashboard}>Open dashboard</Button>
            {can('manage:companies') && <Button icon={<Pencil size={15} />} onClick={openEdit}>Bewerk</Button>}
          </>
        )}
      />

      <Card className="p-5">
        <div className="flex items-center gap-4">
          <Avatar name={company.name} color={company.accentColor} size={56} />
          <div className="min-w-0">
            <h2 className="text-lg font-bold truncate">{company.name}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--acc-muted)] flex-wrap">
              <span>{company.sector}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300">
                  <Globe size={12} /> {company.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Maandbudget" value={formatCurrency(company.monthlyMarketingBudget)} icon={<Euro size={18} />} />
        <StatCard label="Maandomzet" value={formatCurrency(company.monthlyRevenue)} icon={<Euro size={18} />} sparkColor="#34d399" />
        <StatCard label="Leads" value={cLeads.length} icon={<Users size={18} />} sparkColor="#a78bfa" />
        <StatCard label="Open offertes" value={openQuotes} icon={<FileText size={18} />} sparkColor="#fbbf24" />
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overzicht' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="p-5">
            <CardHeader title="Doelstellingen" icon={<Target size={16} />} />
            {company.goals.length === 0 ? (
              <p className="text-sm text-[var(--acc-muted)]">Nog geen doelen vastgelegd.</p>
            ) : (
              <ul className="space-y-2">
                {company.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="lg:col-span-2 p-5">
            <CardHeader title="Omzettrend" subtitle="Laatste 8 weken (indicatief)" icon={<BarChart3 size={16} />} />
            <AreaChart data={revenueTrend} height={190} color={company.accentColor} />
          </Card>

          <Card className="lg:col-span-3 p-5">
            <CardHeader title="Recente leads" subtitle={`${cLeads.length} totaal`} icon={<Users size={16} />} />
            <div className="space-y-1.5">
              {recentLeads.map((l) => (
                <div key={l.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <Avatar name={l.name} size={34} color={company.accentColor} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{l.name}</p>
                    <p className="text-[11px] text-[var(--acc-muted)] truncate">{l.product} · {l.source}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{formatCurrency(l.value)}</p>
                    <Badge tone={leadStatusTone(l.status)}>{l.status}</Badge>
                  </div>
                </div>
              ))}
              {recentLeads.length === 0 && <p className="text-sm text-[var(--acc-muted)] py-4 text-center">Nog geen leads.</p>}
            </div>
          </Card>
        </div>
      )}

      {tab === 'contact' && (
        <Card className="p-5">
          <CardHeader title="Contactgegevens" icon={<User size={16} />} />
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start gap-3">
              <User size={16} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold">Contactpersoon</dt>
                <dd className="text-sm mt-0.5">{company.contactPerson || '—'}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold">Telefoon</dt>
                <dd className="text-sm mt-0.5">{company.phone ? <a href={`tel:${company.phone}`} className="text-blue-400 hover:text-blue-300">{company.phone}</a> : '—'}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
              <div className="min-w-0">
                <dt className="text-[11px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold">E-mail</dt>
                <dd className="text-sm mt-0.5 truncate">{company.email ? <a href={`mailto:${company.email}`} className="text-blue-400 hover:text-blue-300">{company.email}</a> : '—'}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--acc-muted)] mt-0.5 shrink-0" />
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold">Adres</dt>
                <dd className="text-sm mt-0.5">{company.address || '—'}</dd>
              </div>
            </div>
          </dl>
        </Card>
      )}

      {tab === 'projecten' && (
        <Card className="p-5">
          <CardHeader title="Projecten" subtitle={`${cProjects.length} project(en)`} icon={<Server size={16} />} />
          {cProjects.length === 0 ? (
            <EmptyState icon={<Server size={32} />} title="Geen projecten" description="Er zijn nog geen projecten gekoppeld aan dit bedrijf." />
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Naam</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Deploy</Th>
                </tr>
              </thead>
              <tbody>
                {cProjects.map((p) => (
                  <tr key={p.id}>
                    <Td>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-[11px] text-[var(--acc-muted)] truncate max-w-xs">{p.description}</p>
                    </Td>
                    <Td><span className="capitalize">{p.type}</span></Td>
                    <Td><span className="capitalize">{p.status}</span></Td>
                    <Td><Badge tone={deployTone(p.deployStatus)} dot>{p.deployStatus}</Badge></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === 'integraties' && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--acc-muted)]">
            Deze koppelingen bereiden echte API-verbindingen voor (Firebase, GitHub, Meta Ads, Google Analytics).
            Vul de waarden in via de bedrijfsinstellingen zodra de integraties live gaan.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {integrationRows.map((row) => {
              const connected = Boolean(row.value);
              return (
                <Card key={row.label} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl acc-glass flex items-center justify-center text-blue-300 shrink-0">{row.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{row.label}</p>
                    <p className="text-[11px] text-[var(--acc-muted)] truncate">{row.value || 'Niet gekoppeld'}</p>
                  </div>
                  {connected
                    ? <Badge tone="green" dot>Verbonden</Badge>
                    : <Badge tone="slate">Niet gekoppeld</Badge>}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'notities' && (
        <Card className="p-5">
          <CardHeader title="Notities" icon={<FileText size={16} />} />
          <Textarea
            rows={8}
            value={notes || company.notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Interne notities over dit bedrijf…"
          />
          <div className="flex items-center gap-3 mt-3">
            <Button icon={<Save size={15} />} onClick={saveNotes}>Opslaan</Button>
            {savedNotes && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 size={14} /> Opgeslagen
              </span>
            )}
          </div>
        </Card>
      )}

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={`Bewerk — ${company.name}`}
        footer={(
          <>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Annuleren</Button>
            <Button onClick={saveEdit}>Opslaan</Button>
          </>
        )}
      >
        <div className="space-y-4">
          <Field label="Status">
            <Select value={editStatus} onChange={(e) => setEditStatus(e.target.value as CompanyStatus)}>
              <option value="actief">Actief</option>
              <option value="pauze">Pauze</option>
              <option value="prospect">Prospect</option>
            </Select>
          </Field>
          <Field label="Maandelijks marketingbudget (€)">
            <Input type="number" min={0} value={editBudget} onChange={(e) => setEditBudget(Number(e.target.value))} />
          </Field>
          <Field label="Doelstellingen" hint="Eén doel per regel.">
            <Textarea rows={4} value={editGoals} onChange={(e) => setEditGoals(e.target.value)} />
          </Field>
          <Field label="Notities">
            <Textarea rows={3} value={editNotes} onChange={(e) => setEditNotes(e.target.value)} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
