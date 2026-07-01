import React, { useMemo, useState } from 'react';
import {
  Inbox, Search, MapPin, Ruler, Euro, CalendarClock, UserCheck, Hammer,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PageHeader, Card, Badge, Button, Table, Th, Td, Input, Select, Modal,
  Field, Tabs, EmptyState, cn,
} from '../components/ui';
import { formatCurrency, formatDate, formatRelative } from '../lib/format';
import { requestStatusTone } from '../lib/status';
import { matchScore } from '../lib/match';
import type { Aanvraag, RequestStatus } from '../types';

const STATUSES: RequestStatus[] = ['Nieuw', 'Toegewezen', 'Geaccepteerd', 'Offerte verstuurd', 'In onderhandeling', 'Gewonnen', 'Verloren'];

export default function AanvragenPage() {
  const { aanvragen, bouwbedrijven } = useData();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'alle' | 'open' | 'toe-te-wijzen'>('alle');
  const [selected, setSelected] = useState<Aanvraag | null>(null);

  const filtered = useMemo(() => {
    let list = aanvragen.items;
    if (tab === 'open') list = list.filter((a) => !['Gewonnen', 'Verloren'].includes(a.status));
    if (tab === 'toe-te-wijzen') list = list.filter((a) => !a.assignedCompanyId);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((a) => [a.klantName, a.plaats, a.buildType, a.number, a.postcode].some((v) => v.toLowerCase().includes(t)));
    }
    return list;
  }, [aanvragen.items, q, tab]);

  const counts = {
    alle: aanvragen.items.length,
    open: aanvragen.items.filter((a) => !['Gewonnen', 'Verloren'].includes(a.status)).length,
    'toe-te-wijzen': aanvragen.items.filter((a) => !a.assignedCompanyId).length,
  };

  return (
    <div>
      <PageHeader title="Alle aanvragen" subtitle="Beheer aanbouw aanvragen en wijs leads toe aan bouwbedrijven." />

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        <Tabs
          active={tab}
          onChange={(id) => setTab(id as typeof tab)}
          tabs={[
            { id: 'alle', label: 'Alle', count: counts.alle },
            { id: 'open', label: 'Open', count: counts.open },
            { id: 'toe-te-wijzen', label: 'Toe te wijzen', count: counts['toe-te-wijzen'] },
          ]}
        />
        <div className="relative max-w-xs w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--abp-faint)]" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek op naam, plaats, type…" className="pl-9" />
        </div>
      </div>

      <Card className="p-2 sm:p-3">
        {filtered.length === 0 ? (
          <EmptyState icon={<Inbox size={28} />} title="Geen aanvragen gevonden" description="Pas je filter of zoekopdracht aan." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Aanvraag</Th><Th>Locatie</Th><Th>Waarde</Th><Th>Bouwbedrijf</Th><Th>Status</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const company = bouwbedrijven.items.find((b) => b.id === a.assignedCompanyId);
                return (
                  <tr key={a.id} className="hover:bg-[var(--abp-surface-2)] cursor-pointer" onClick={() => setSelected(a)}>
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[var(--abp-navy)]/8 text-[var(--abp-navy)] flex items-center justify-center shrink-0"><Hammer size={15} /></span>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{a.buildType} — {a.klantName}</p>
                          <p className="text-[11px] text-[var(--abp-muted)]">{a.number} · {formatRelative(a.createdAt)}</p>
                        </div>
                      </div>
                    </Td>
                    <Td><span className="text-sm">{a.plaats}</span><br /><span className="text-[11px] text-[var(--abp-faint)]">{a.postcode}</span></Td>
                    <Td className="font-semibold text-[var(--abp-navy)]">{formatCurrency(a.value)}</Td>
                    <Td>{company ? <span className="text-sm">{company.name}</span> : <Badge tone="amber">Niet toegewezen</Badge>}</Td>
                    <Td><Badge tone={requestStatusTone[a.status]}>{a.status}</Badge></Td>
                    <Td><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(a); }}>Open</Button></Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {selected && (
        <AanvraagDetail
          aanvraag={aanvragen.items.find((a) => a.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function AanvraagDetail({ aanvraag, onClose }: { aanvraag: Aanvraag; onClose: () => void }) {
  const { aanvragen, bouwbedrijven } = useData();
  const [assignId, setAssignId] = useState(aanvraag.assignedCompanyId ?? '');
  const [status, setStatus] = useState<RequestStatus>(aanvraag.status);

  const ranked = useMemo(
    () => [...bouwbedrijven.items]
      .filter((b) => b.status !== 'prospect')
      .map((b) => ({ b, score: matchScore(b, aanvraag) }))
      .sort((x, y) => y.score - x.score),
    [bouwbedrijven.items, aanvraag],
  );

  const assign = () => {
    const company = bouwbedrijven.items.find((b) => b.id === assignId);
    const entry = {
      id: `tl_${Date.now()}`,
      type: 'assign' as const,
      message: company ? `Lead toegewezen aan ${company.name}` : 'Toewijzing verwijderd',
      author: 'Platform Beheer',
      at: new Date().toISOString(),
    };
    aanvragen.update(aanvraag.id, {
      assignedCompanyId: assignId || undefined,
      status: assignId && aanvraag.status === 'Nieuw' ? 'Toegewezen' : status,
      leadStatus: assignId ? 'Nieuw' : aanvraag.leadStatus,
      timeline: [...aanvraag.timeline, entry],
      updatedAt: new Date().toISOString(),
    });
    onClose();
  };

  const saveStatus = (s: RequestStatus) => {
    setStatus(s);
    aanvragen.update(aanvraag.id, {
      status: s,
      timeline: [...aanvraag.timeline, { id: `tl_${Date.now()}`, type: 'status', message: `Status gewijzigd naar ${s}`, author: 'Platform Beheer', at: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
    });
  };

  const specs: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Ruler size={14} />, label: 'Afmetingen', value: aanvraag.oppervlakte ? `${aanvraag.breedte} × ${aanvraag.diepte} m · ${aanvraag.oppervlakte} m²` : 'In overleg' },
    { icon: <Hammer size={14} />, label: 'Afwerking', value: aanvraag.afwerking },
    { icon: <Euro size={14} />, label: 'Budget', value: formatCurrency(aanvraag.budgetIndicatie) },
    { icon: <CalendarClock size={14} />, label: 'Startdatum', value: aanvraag.startdatum },
    { icon: <MapPin size={14} />, label: 'Fundering nodig', value: aanvraag.funderingNodig },
    { icon: <MapPin size={14} />, label: 'Vergunning nodig', value: aanvraag.vergunningNodig },
  ];

  return (
    <Modal open onClose={onClose} wide title={`${aanvraag.buildType} — ${aanvraag.klantName}`}
      footer={<>
        <Button variant="ghost" onClick={onClose}>Sluiten</Button>
        <Button variant="navy" onClick={assign} icon={<UserCheck size={15} />}>Toewijzing opslaan</Button>
      </>}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)] mb-2">Projectgegevens</h4>
          <div className="space-y-2">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-sm">
                <span className="text-[var(--abp-accent)]">{s.icon}</span>
                <span className="text-[var(--abp-muted)] w-32 shrink-0">{s.label}</span>
                <span className="font-medium capitalize">{s.value}</span>
              </div>
            ))}
          </div>
          {aanvraag.toelichting && (
            <div className="mt-4 p-3 rounded-xl bg-[var(--abp-surface-2)] text-sm text-[var(--abp-text)]">
              <p className="text-[11px] font-semibold text-[var(--abp-faint)] mb-1">Toelichting klant</p>
              {aanvraag.toelichting}
            </div>
          )}
          <div className="mt-4 text-sm">
            <p className="text-[11px] font-semibold text-[var(--abp-faint)] mb-1">Contact</p>
            <p>{aanvraag.klantName}</p>
            <p className="text-[var(--abp-muted)]">{aanvraag.phone} · {aanvraag.email}</p>
            <p className="text-[var(--abp-muted)]">{aanvraag.postcode} {aanvraag.plaats}</p>
          </div>
        </div>

        <div>
          <Field label="Status">
            <Select value={status} onChange={(e) => saveStatus(e.target.value as RequestStatus)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>

          <div className="mt-4">
            <Field label="Lead toewijzen aan bouwbedrijf" hint="Bedrijven gerangschikt op match met dienst & werkgebied.">
              <Select value={assignId} onChange={(e) => setAssignId(e.target.value)}>
                <option value="">— Niet toegewezen —</option>
                {ranked.map(({ b, score }) => (
                  <option key={b.id} value={b.id}>{b.name} · {b.city} ({score}% match)</option>
                ))}
              </Select>
            </Field>
            <div className="mt-2 space-y-1.5">
              {ranked.slice(0, 3).map(({ b, score }) => (
                <button
                  key={b.id}
                  onClick={() => setAssignId(b.id)}
                  className={cn('w-full text-left p-2.5 rounded-xl border transition-colors', assignId === b.id ? 'border-[var(--abp-accent)] bg-[var(--abp-accent-soft)]' : 'border-[var(--abp-border)] hover:border-[var(--abp-border-strong)]')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{b.name}</span>
                    <Badge tone={score >= 66 ? 'green' : score >= 33 ? 'amber' : 'slate'}>{score}% match</Badge>
                  </div>
                  <p className="text-[11px] text-[var(--abp-muted)]">{b.city} · {b.verified ? 'Geverifieerd' : 'Niet geverifieerd'} · ⭐ {b.rating || '—'}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)] mb-2">Tijdlijn</h4>
            <div className="space-y-2">
              {[...aanvraag.timeline].reverse().map((t) => (
                <div key={t.id} className="flex gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--abp-accent)] mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13px]">{t.message}</p>
                    <p className="text-[10px] text-[var(--abp-faint)]">{t.author} · {formatDate(t.at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
