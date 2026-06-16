import React, { useMemo, useState } from 'react';
import {
  Users, Plus, Search, Phone, Mail, Package, Calendar, Bell, MessageSquare,
  PhoneCall, Cog, StickyNote, ArrowRightLeft, Euro,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import {
  Card, Badge, EmptyState, PageHeader, Avatar, ProgressBar, Input, Textarea,
  Select, Field, Modal, Button, Table, Th, Td,
} from '../components/ui';
import { formatCurrency, formatDate, formatRelative } from '../lib/format';
import { LEAD_STATUSES, leadStatusTone } from './_shared';
import { users } from '../data/mockData';
import type { Lead, LeadSource, LeadStatus, LeadTimelineEntry } from '../types';

const LEAD_SOURCES: LeadSource[] = ['Website', 'Meta Ads', 'Google Ads', 'WhatsApp', 'Handmatig', 'Telefoon'];

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
const timelineIcon: Record<LeadTimelineEntry['type'], React.ReactNode> = {
  note: <StickyNote size={13} />,
  status: <ArrowRightLeft size={13} />,
  call: <PhoneCall size={13} />,
  email: <Mail size={13} />,
  system: <Cog size={13} />,
};

interface NewLeadForm {
  name: string; phone: string; email: string; product: string;
  source: LeadSource; value: string; message: string; status: LeadStatus; score: string;
}
const emptyForm: NewLeadForm = {
  name: '', phone: '', email: '', product: '', source: 'Website',
  value: '', message: '', status: 'Nieuw', score: '50',
};

export default function LeadsPage() {
  const { selectedCompany, leads } = useData();
  const { user } = useAuth();

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<NewLeadForm>(emptyForm);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const cid = selectedCompany?.id;

  const companyLeads = useMemo(
    () => (cid ? leads.items.filter((l) => l.companyId === cid) : []),
    [cid, leads.items],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companyLeads.filter((l) => {
      if (q && !(`${l.name} ${l.product}`.toLowerCase().includes(q))) return false;
      if (sourceFilter !== 'all' && l.source !== sourceFilter) return false;
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      return true;
    });
  }, [companyLeads, search, sourceFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: companyLeads.length,
    nieuw: companyLeads.filter((l) => l.status === 'Nieuw').length,
    gewonnen: companyLeads.filter((l) => l.status === 'Gewonnen').length,
    pipeline: companyLeads.filter((l) => l.status !== 'Verloren').reduce((s, l) => s + l.value, 0),
  }), [companyLeads]);

  const detail = detailId ? companyLeads.find((l) => l.id === detailId) ?? null : null;

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

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
      score: Number(form.score) || 0,
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

  const changeStatus = (lead: Lead, status: LeadStatus) => {
    if (status === lead.status) return;
    const entry: LeadTimelineEntry = {
      id: newId('tl'), type: 'status',
      message: `Status gewijzigd van ${lead.status} naar ${status}`,
      author: user?.name || 'Systeem', at: new Date().toISOString(),
    };
    leads.update(lead.id, { status, timeline: [...lead.timeline, entry], updatedAt: new Date().toISOString() });
  };

  const saveNotes = (lead: Lead, notes: string) => {
    leads.update(lead.id, { notes, updatedAt: new Date().toISOString() });
  };

  const addNote = (lead: Lead) => {
    const msg = noteDraft.trim();
    if (!msg) return;
    const entry: LeadTimelineEntry = {
      id: newId('tl'), type: 'note', message: msg,
      author: user?.name || 'Systeem', at: new Date().toISOString(),
    };
    leads.update(lead.id, { timeline: [...lead.timeline, entry], updatedAt: new Date().toISOString() });
    setNoteDraft('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle={`${companyLeads.length} leads · ${selectedCompany.name}`}
        actions={<Button icon={<Plus size={16} />} onClick={() => setAddOpen(true)}>Lead toevoegen</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Totaal leads" value={stats.total} icon={<Users size={18} />} />
        <StatCard label="Nieuw" value={stats.nieuw} icon={<Bell size={18} />} sparkColor="#3B82F6" />
        <StatCard label="Gewonnen" value={stats.gewonnen} icon={<Package size={18} />} sparkColor="#34d399" />
        <StatCard label="Pipelinewaarde" value={formatCurrency(stats.pipeline)} icon={<Euro size={18} />} sparkColor="#fbbf24" />
      </div>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--acc-muted)]" />
            <Input className="pl-9" placeholder="Zoek op naam of product…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select className="sm:w-44" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="all">Alle bronnen</option>
            {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Select className="sm:w-48" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Alle statussen</option>
            {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>

        <Table>
          <thead>
            <tr>
              <Th>Lead</Th>
              <Th>Bron</Th>
              <Th>Product</Th>
              <Th>Waarde</Th>
              <Th>Score</Th>
              <Th>Status</Th>
              <Th>Owner</Th>
              <Th>Follow-up</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="cursor-pointer hover:bg-white/5 transition-colors" onClick={() => { setDetailId(l.id); setNoteDraft(''); }}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={l.name} size={34} color={selectedCompany.accentColor} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{l.name}</p>
                      <p className="text-[11px] text-[var(--acc-muted)] truncate">{l.email || '—'}</p>
                    </div>
                  </div>
                </Td>
                <Td><Badge>{l.source}</Badge></Td>
                <Td><span className="text-sm">{l.product || '—'}</span></Td>
                <Td><span className="font-semibold tabular-nums">{formatCurrency(l.value)}</span></Td>
                <Td>
                  <div className="flex items-center gap-2 w-28">
                    <ProgressBar value={l.score} tone={scoreTone(l.score)} className="flex-1" />
                    <span className="text-xs font-semibold tabular-nums" style={{ color: scoreTone(l.score) }}>{l.score}</span>
                  </div>
                </Td>
                <Td><Badge tone={leadStatusTone(l.status)}>{l.status}</Badge></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={userName(l.ownerId)} size={26} color={userColor(l.ownerId)} />
                    <span className="text-xs text-[var(--acc-muted)] truncate max-w-[90px]">{userName(l.ownerId)}</span>
                  </div>
                </Td>
                <Td><span className="text-xs text-[var(--acc-muted)] whitespace-nowrap">{formatDate(l.followUpDate)}</span></Td>
              </tr>
            ))}
          </tbody>
        </Table>
        {filtered.length === 0 && (
          <EmptyState icon={<Users size={28} />} title="Geen leads gevonden" description="Pas je filters aan of voeg een nieuwe lead toe." />
        )}
      </Card>

      {/* Add modal */}
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
          <Field label="Score (0-100)"><Input type="number" min={0} max={100} value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Bericht"><Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Wat is de aanvraag?" /></Field>
          </div>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal
        open={!!detail}
        onClose={() => setDetailId(null)}
        wide
        title={detail ? detail.name : ''}
      >
        {detail && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm"><Phone size={15} className="text-[var(--acc-muted)]" /><span>{detail.phone || '—'}</span></div>
                <div className="flex items-center gap-2.5 text-sm"><Mail size={15} className="text-[var(--acc-muted)]" /><span className="truncate">{detail.email || '—'}</span></div>
                <div className="flex items-center gap-2.5 text-sm"><Package size={15} className="text-[var(--acc-muted)]" /><span>{detail.product || '—'}</span></div>
                <div className="flex items-center gap-2.5 text-sm"><Calendar size={15} className="text-[var(--acc-muted)]" /><span>Follow-up: {formatDate(detail.followUpDate)}</span></div>
                <div className="flex items-center gap-2.5 text-sm"><Euro size={15} className="text-[var(--acc-muted)]" /><span className="font-semibold">{formatCurrency(detail.value)}</span></div>
                <div className="flex items-center gap-2.5 text-sm"><Badge>{detail.source}</Badge></div>
              </div>
              <div className="space-y-4">
                <Field label="Status wijzigen">
                  <Select value={detail.status} onChange={(e) => changeStatus(detail, e.target.value as LeadStatus)}>
                    {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[var(--acc-muted)]">Lead score</span>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: scoreTone(detail.score) }}>{detail.score}/100</span>
                  </div>
                  <ProgressBar value={detail.score} tone={scoreTone(detail.score)} />
                </div>
                <div className="acc-glass rounded-xl p-3 flex items-center gap-3">
                  <Avatar name={userName(detail.ownerId)} size={32} color={userColor(detail.ownerId)} />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[var(--acc-muted)]">Eigenaar</p>
                    <p className="text-sm font-medium truncate">{userName(detail.ownerId)}</p>
                  </div>
                </div>
              </div>
            </div>

            {detail.message && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2 text-[var(--acc-muted)]"><MessageSquare size={14} /><span className="text-xs font-semibold uppercase tracking-wider">Bericht</span></div>
                <p className="text-sm leading-relaxed">{detail.message}</p>
              </Card>
            )}

            <Field label="Interne notities">
              <Textarea
                rows={3}
                defaultValue={detail.notes}
                key={detail.id}
                onBlur={(e) => saveNotes(detail, e.target.value)}
                placeholder="Voeg interne notities toe (opslaan bij verlaten veld)…"
              />
            </Field>

            <div>
              <h4 className="text-sm font-semibold mb-3">Timeline</h4>
              <div className="flex gap-2 mb-4">
                <Input value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Notitie toevoegen…" onKeyDown={(e) => { if (e.key === 'Enter') addNote(detail); }} />
                <Button variant="secondary" onClick={() => addNote(detail)} disabled={!noteDraft.trim()}>Toevoegen</Button>
              </div>
              <div className="space-y-3">
                {[...detail.timeline].sort((a, b) => +new Date(b.at) - +new Date(a.at)).map((t) => (
                  <div key={t.id} className="flex gap-3">
                    <div className="mt-0.5 w-7 h-7 rounded-lg acc-glass flex items-center justify-center text-blue-300 shrink-0">{timelineIcon[t.type]}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">{t.message}</p>
                      <p className="text-[11px] text-[var(--acc-muted)] mt-0.5">{t.author} · {formatRelative(t.at)}</p>
                    </div>
                  </div>
                ))}
                {detail.timeline.length === 0 && <p className="text-sm text-[var(--acc-muted)]">Nog geen activiteit.</p>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
