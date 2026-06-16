import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  Badge, EmptyState, PageHeader, Avatar, Input, Textarea, Select, Field, Modal, Button,
} from '../components/ui';
import { KanbanBoard, type KanbanColumn } from '../components/kanban/KanbanBoard';
import { formatCurrency } from '../lib/format';
import { LEAD_STATUSES, leadStatusTone } from './_shared';
import { users } from '../data/mockData';
import type { Lead, LeadSource, LeadStatus, LeadTimelineEntry } from '../types';

const LEAD_SOURCES: LeadSource[] = ['Website', 'Meta Ads', 'Google Ads', 'WhatsApp', 'Handmatig', 'Telefoon'];

const STAGE_ACCENT: Record<LeadStatus, string> = {
  'Nieuw': '#3B82F6',
  'Gebeld': '#06B6D4',
  'Geen gehoor': '#64748B',
  'Afspraak ingepland': '#8B5CF6',
  'Offerte verstuurd': '#F59E0B',
  'Onderhandeling': '#FBBF24',
  'Gewonnen': '#10B981',
  'Verloren': '#EF4444',
};

const COLUMNS: KanbanColumn<LeadStatus>[] = LEAD_STATUSES.map((s) => ({
  id: s, title: s, accent: STAGE_ACCENT[s],
}));

function userName(id: string): string {
  return users.find((u) => u.id === id)?.name ?? 'Onbekend';
}
function userColor(id: string): string {
  return users.find((u) => u.id === id)?.avatarColor ?? '#3B82F6';
}
function scoreTone(score: number): string {
  return score > 75 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';
}
function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

interface NewLeadForm {
  name: string; phone: string; email: string; product: string;
  source: LeadSource; value: string; status: LeadStatus; message: string;
}
const emptyForm: NewLeadForm = {
  name: '', phone: '', email: '', product: '', source: 'Website', value: '', status: 'Nieuw', message: '',
};

export default function CrmPage() {
  const { selectedCompany, leads } = useData();
  const { user } = useAuth();
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<NewLeadForm>(emptyForm);

  const cid = selectedCompany?.id;
  const companyLeads = useMemo(
    () => (cid ? leads.items.filter((l) => l.companyId === cid) : []),
    [cid, leads.items],
  );

  const summary = useMemo(() => {
    const active = companyLeads.filter((l) => l.status !== 'Verloren');
    const totalValue = active.reduce((s, l) => s + l.value, 0);
    // Weighted by lead score as a simple probability proxy.
    const weighted = active.reduce((s, l) => s + l.value * (l.score / 100), 0);
    const perStage = LEAD_STATUSES.map((status) => ({
      status,
      count: companyLeads.filter((l) => l.status === status).length,
    }));
    return { totalValue, weighted, perStage, count: companyLeads.length };
  }, [companyLeads]);

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const onMove = (id: string, toStatus: LeadStatus) => {
    const lead = companyLeads.find((l) => l.id === id);
    if (!lead || lead.status === toStatus) return;
    const entry: LeadTimelineEntry = {
      id: newId('tl'), type: 'status',
      message: `Verplaatst van ${lead.status} naar ${toStatus}`,
      author: user?.name || 'Systeem', at: new Date().toISOString(),
    };
    leads.update(id, { status: toStatus, timeline: [...lead.timeline, entry], updatedAt: new Date().toISOString() });
  };

  const submitNew = () => {
    if (!form.name.trim()) return;
    const now = new Date().toISOString();
    const author = user?.name || 'Systeem';
    leads.create({
      companyId: selectedCompany.id,
      ownerId: 'u_sales',
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      product: form.product.trim(),
      source: form.source,
      status: form.status,
      score: 50,
      value: Number(form.value) || 0,
      reminderActive: true,
      notes: '',
      message: form.message.trim(),
      followUpDate: undefined,
      timeline: [{ id: newId('tl'), type: 'system', message: 'Lead aangemaakt', author, at: now }],
      createdAt: now,
      updatedAt: now,
    });
    setForm(emptyForm);
    setAddOpen(false);
  };

  const renderCard = (l: Lead) => (
    <div className="space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug">{l.name}</p>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums shrink-0"
          style={{ color: scoreTone(l.score), background: `${scoreTone(l.score)}1f` }}
        >
          {l.score}
        </span>
      </div>
      <p className="text-[11px] text-[var(--acc-muted)] truncate">{l.product || '—'}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold tabular-nums">{formatCurrency(l.value)}</span>
        <Badge tone={leadStatusTone(l.status)}>{l.source}</Badge>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-[var(--acc-border)]">
        <Avatar name={userName(l.ownerId)} size={22} color={userColor(l.ownerId)} />
        <span className="text-[11px] text-[var(--acc-muted)] truncate">{userName(l.ownerId)}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM Pipeline"
        subtitle={`${summary.count} leads · ${formatCurrency(summary.totalValue)} open pipeline · ${formatCurrency(Math.round(summary.weighted))} gewogen`}
        actions={<Button icon={<Plus size={16} />} onClick={() => setAddOpen(true)}>Lead</Button>}
      />

      {/* Stage summary chips */}
      <div className="flex flex-wrap gap-2">
        {summary.perStage.map((s) => (
          <div key={s.status} className="acc-glass rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: STAGE_ACCENT[s.status] }} />
            <span className="text-xs font-medium">{s.status}</span>
            <span className="text-xs font-bold tabular-nums text-[var(--acc-muted)]">{s.count}</span>
          </div>
        ))}
        <div className="acc-glass-strong rounded-xl px-3 py-2 flex items-center gap-2 ml-auto">
          <span className="text-xs text-[var(--acc-muted)]">Gewogen waarde</span>
          <span className="text-xs font-bold tabular-nums">{formatCurrency(Math.round(summary.weighted))}</span>
        </div>
      </div>

      {companyLeads.length === 0 ? (
        <EmptyState title="Nog geen leads" description="Voeg een lead toe om je pipeline te vullen." action={<Button icon={<Plus size={16} />} onClick={() => setAddOpen(true)}>Lead toevoegen</Button>} />
      ) : (
        <KanbanBoard
          columns={COLUMNS}
          items={companyLeads}
          getStatus={(l) => l.status}
          onMove={onMove}
          renderCard={renderCard}
        />
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Nieuwe lead"
        footer={<>
          <Button variant="ghost" onClick={() => setAddOpen(false)}>Annuleren</Button>
          <Button onClick={submitNew} disabled={!form.name.trim()}>Lead opslaan</Button>
        </>}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Naam"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jan Jansen" /></Field>
          <Field label="Telefoon"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+31 6 …" /></Field>
          <Field label="E-mail"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jan@voorbeeld.nl" /></Field>
          <Field label="Product / interesse"><Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="Prefab uitbouw" /></Field>
          <Field label="Bron">
            <Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as LeadSource })}>
              {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="Waarde (€)"><Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="0" /></Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}>
              {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Bericht"><Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Wat is de aanvraag?" /></Field>
          </div>
        </div>
      </Modal>
    </div>
  );
}
