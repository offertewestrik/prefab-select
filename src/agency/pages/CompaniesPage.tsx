import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Plus, Search, Globe, User, Euro, TrendingUp, Users,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import {
  Card, Badge, Button, Input, Select, Field, Modal, Tabs, EmptyState, PageHeader, Avatar,
} from '../components/ui';
import { formatCurrency } from '../lib/format';
import { companyStatusTone } from './_shared';
import type { Company, CompanyStatus } from '../types';

type Draft = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: string;
  address: string;
  status: CompanyStatus;
  monthlyMarketingBudget: number;
  monthlyRevenue: number;
  website: string;
};

const EMPTY_DRAFT: Draft = {
  name: '', contactPerson: '', email: '', phone: '', sector: '', address: '',
  status: 'prospect', monthlyMarketingBudget: 0, monthlyRevenue: 0, website: '',
};

export default function CompaniesPage() {
  const { companies, leads, setSelectedCompanyId } = useData();
  const { can } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'alle' | CompanyStatus>('alle');
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);

  const list = companies.visible;

  const stats = useMemo(() => ({
    total: list.length,
    actief: list.filter((c) => c.status === 'actief').length,
    prospects: list.filter((c) => c.status === 'prospect').length,
    revenue: list.reduce((s, c) => s + c.monthlyRevenue, 0),
  }), [list]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((c) => {
      if (filter !== 'alle' && c.status !== filter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q)
        || c.sector.toLowerCase().includes(q)
        || c.contactPerson.toLowerCase().includes(q)
      );
    });
  }, [list, query, filter]);

  const leadCount = (cid: string) => leads.items.filter((l) => l.companyId === cid).length;

  const open = (c: Company) => {
    setSelectedCompanyId(c.id);
    navigate(`/agency/companies/${c.id}`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    companies.create({
      name: draft.name.trim(),
      contactPerson: draft.contactPerson.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      sector: draft.sector.trim() || 'Algemeen',
      address: draft.address.trim(),
      status: draft.status,
      monthlyMarketingBudget: Number(draft.monthlyMarketingBudget) || 0,
      monthlyRevenue: Number(draft.monthlyRevenue) || 0,
      website: draft.website.trim() || undefined,
      goals: [],
      notes: '',
      integrations: {},
      accentColor: '#3B82F6',
      createdAt: new Date().toISOString(),
      logo: undefined,
    });
    setDraft(EMPTY_DRAFT);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bedrijven"
        subtitle={`${list.length} klanten en prospects in beheer`}
        actions={can('manage:companies') && (
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>Nieuw bedrijf</Button>
        )}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Totaal bedrijven" value={stats.total} icon={<Building2 size={18} />} />
        <StatCard label="Actief" value={stats.actief} icon={<TrendingUp size={18} />} sparkColor="#34d399" />
        <StatCard label="Prospects" value={stats.prospects} icon={<User size={18} />} sparkColor="#fbbf24" />
        <StatCard label="Totale maandomzet" value={formatCurrency(stats.revenue)} icon={<Euro size={18} />} sparkColor="#a78bfa" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative max-w-xs w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--acc-muted)] pointer-events-none" />
          <Input
            placeholder="Zoek op naam, sector of contact…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs
          tabs={[
            { id: 'alle', label: 'Alle', count: list.length },
            { id: 'actief', label: 'Actief', count: stats.actief },
            { id: 'pauze', label: 'Pauze', count: list.filter((c) => c.status === 'pauze').length },
            { id: 'prospect', label: 'Prospect', count: stats.prospects },
          ]}
          active={filter}
          onChange={(id) => setFilter(id as 'alle' | CompanyStatus)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-2">
          <EmptyState
            icon={<Building2 size={40} />}
            title="Geen bedrijven gevonden"
            description="Pas je zoekopdracht of filter aan, of voeg een nieuw bedrijf toe."
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card
              key={c.id}
              hover
              role="button"
              tabIndex={0}
              onClick={() => open(c)}
              onKeyDown={(e) => { if (e.key === 'Enter') open(c); }}
              className="p-5 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar name={c.name} color={c.accentColor} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold truncate">{c.name}</h3>
                    <Badge tone={companyStatusTone(c.status)} dot>{c.status}</Badge>
                  </div>
                  <p className="text-xs text-[var(--acc-muted)] mt-0.5 truncate">{c.sector}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-[var(--acc-muted)]">
                {c.website && (
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={13} className="shrink-0" />
                    <span className="truncate">{c.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 truncate">
                  <User size={13} className="shrink-0" />
                  <span className="truncate">{c.contactPerson || '—'}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="acc-glass rounded-xl p-2.5">
                  <p className="text-[10px] text-[var(--acc-muted)]">Maandbudget</p>
                  <p className="text-sm font-bold tabular-nums">{formatCurrency(c.monthlyMarketingBudget)}</p>
                </div>
                <div className="acc-glass rounded-xl p-2.5">
                  <p className="text-[10px] text-[var(--acc-muted)]">Maandomzet</p>
                  <p className="text-sm font-bold tabular-nums">{formatCurrency(c.monthlyRevenue)}</p>
                </div>
                <div className="acc-glass rounded-xl p-2.5">
                  <p className="text-[10px] text-[var(--acc-muted)] flex items-center gap-1"><Users size={11} /> Leads</p>
                  <p className="text-sm font-bold tabular-nums">{leadCount(c.id)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nieuw bedrijf"
        wide
        footer={(
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Annuleren</Button>
            <Button onClick={submit} disabled={!draft.name.trim()}>Bedrijf aanmaken</Button>
          </>
        )}
      >
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <Field label="Bedrijfsnaam">
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Acme B.V." autoFocus />
          </Field>
          <Field label="Sector">
            <Input value={draft.sector} onChange={(e) => setDraft({ ...draft, sector: e.target.value })} placeholder="Bouw & Prefab" />
          </Field>
          <Field label="Contactpersoon">
            <Input value={draft.contactPerson} onChange={(e) => setDraft({ ...draft, contactPerson: e.target.value })} />
          </Field>
          <Field label="E-mail">
            <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          </Field>
          <Field label="Telefoon">
            <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
          </Field>
          <Field label="Website">
            <Input value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} placeholder="https://" />
          </Field>
          <Field label="Adres">
            <Input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
          </Field>
          <Field label="Status">
            <Select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as CompanyStatus })}>
              <option value="actief">Actief</option>
              <option value="pauze">Pauze</option>
              <option value="prospect">Prospect</option>
            </Select>
          </Field>
          <Field label="Maandelijks marketingbudget (€)">
            <Input type="number" min={0} value={draft.monthlyMarketingBudget} onChange={(e) => setDraft({ ...draft, monthlyMarketingBudget: Number(e.target.value) })} />
          </Field>
          <Field label="Maandomzet (€)">
            <Input type="number" min={0} value={draft.monthlyRevenue} onChange={(e) => setDraft({ ...draft, monthlyRevenue: Number(e.target.value) })} />
          </Field>
        </form>
      </Modal>
    </div>
  );
}
