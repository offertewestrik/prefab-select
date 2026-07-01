import React, { useMemo, useState } from 'react';
import { Building2, Search, ShieldCheck, ShieldAlert, Star, MapPin, Phone, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PageHeader, Card, Badge, Button, Input, Tabs, Modal, EmptyState, Avatar, Field, Select,
} from '../components/ui';
import { formatDate } from '../lib/format';
import { companyStatusTone } from '../lib/status';
import { serviceLabel } from '../lib/services';
import type { Bouwbedrijf, CompanyStatus } from '../types';

export default function BouwbedrijvenPage() {
  const { bouwbedrijven, aanvragen } = useData();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'alle' | 'geverifieerd' | 'te-verifieren'>('alle');
  const [selected, setSelected] = useState<Bouwbedrijf | null>(null);

  const filtered = useMemo(() => {
    let list = bouwbedrijven.items;
    if (tab === 'geverifieerd') list = list.filter((b) => b.verified);
    if (tab === 'te-verifieren') list = list.filter((b) => !b.verified);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((b) => [b.name, b.city, b.region, b.contactPerson].some((v) => v.toLowerCase().includes(t)));
    }
    return list;
  }, [bouwbedrijven.items, q, tab]);

  return (
    <div>
      <PageHeader title="Bouwbedrijven" subtitle="Beheer en verifieer aangesloten aannemers." />

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        <Tabs active={tab} onChange={(id) => setTab(id as typeof tab)}
          tabs={[
            { id: 'alle', label: 'Alle', count: bouwbedrijven.items.length },
            { id: 'geverifieerd', label: 'Geverifieerd', count: bouwbedrijven.items.filter((b) => b.verified).length },
            { id: 'te-verifieren', label: 'Te verifiëren', count: bouwbedrijven.items.filter((b) => !b.verified).length },
          ]} />
        <div className="relative max-w-xs w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--abp-faint)]" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek bouwbedrijf…" className="pl-9" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-2"><EmptyState icon={<Building2 size={28} />} title="Geen bouwbedrijven" /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const leads = aanvragen.items.filter((a) => a.assignedCompanyId === b.id).length;
            return (
              <Card key={b.id} hover className="p-5 cursor-pointer" onClick={() => setSelected(b)}>
                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={b.name} color={b.accentColor} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold truncate">{b.name}</p>
                      {b.verified
                        ? <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
                        : <ShieldAlert size={15} className="text-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-[var(--abp-muted)] truncate">{b.city} · {b.region}</p>
                  </div>
                  <Badge tone={companyStatusTone[b.status]} dot>{b.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {b.services.slice(0, 3).map((s) => <Badge key={s} tone="slate">{serviceLabel(s)}</Badge>)}
                  {b.services.length > 3 && <Badge tone="slate">+{b.services.length - 3}</Badge>}
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--abp-muted)] pt-3 border-t border-[var(--abp-border)]">
                  <span className="flex items-center gap-1"><Star size={13} className="text-amber-500" /> {b.rating || '—'} ({b.reviewCount})</span>
                  <span>{leads} leads</span>
                  <span>{b.completedProjects} projecten</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selected && (
        <CompanyDetail
          company={bouwbedrijven.items.find((b) => b.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CompanyDetail({ company, onClose }: { company: Bouwbedrijf; onClose: () => void }) {
  const { bouwbedrijven } = useData();
  const toggleVerify = () => bouwbedrijven.update(company.id, { verified: !company.verified });
  const setStatus = (status: CompanyStatus) => bouwbedrijven.update(company.id, { status });

  return (
    <Modal open onClose={onClose} wide title={company.name}
      footer={<>
        <Button variant="ghost" onClick={onClose}>Sluiten</Button>
        <Button variant={company.verified ? 'secondary' : 'primary'} onClick={toggleVerify} icon={<ShieldCheck size={15} />}>
          {company.verified ? 'Verificatie intrekken' : 'Verifieer bouwbedrijf'}
        </Button>
      </>}>
      <div className="flex items-start gap-3 mb-5">
        <Avatar name={company.name} color={company.accentColor} size={52} />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{company.name}</h3>
            {company.verified
              ? <Badge tone="green" dot>Geverifieerd</Badge>
              : <Badge tone="amber" dot>Niet geverifieerd</Badge>}
          </div>
          <p className="text-sm text-[var(--abp-muted)]">{company.description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2 text-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)]">Gegevens</h4>
          <p className="flex items-center gap-2"><MapPin size={14} className="text-[var(--abp-accent)]" /> {company.address}, {company.postcode} {company.city}</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-[var(--abp-accent)]" /> {company.phone}</p>
          <p className="flex items-center gap-2"><Mail size={14} className="text-[var(--abp-accent)]" /> {company.email}</p>
          <p className="text-[var(--abp-muted)]">KvK {company.kvk} · contact {company.contactPerson}</p>
          <p className="text-[var(--abp-muted)]">Aangesloten sinds {formatDate(company.createdAt)}</p>

          <div className="pt-2">
            <Field label="Status">
              <Select value={company.status} onChange={(e) => setStatus(e.target.value as CompanyStatus)}>
                <option value="actief">Actief</option>
                <option value="pauze">Pauze</option>
                <option value="prospect">Prospect</option>
              </Select>
            </Field>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)] mb-2">Diensten</h4>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {company.services.map((s) => <Badge key={s} tone="navy">{serviceLabel(s)}</Badge>)}
          </div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)] mb-2">Werkgebied</h4>
          <p className="text-sm text-[var(--abp-muted)]">{company.workArea.cities.join(', ')}</p>
          <p className="text-sm text-[var(--abp-muted)]">Regio's: {company.workArea.regions.join(', ')} · straal {company.workArea.radiusKm} km</p>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)]">{company.rating || '—'}</p><p className="text-[10px] text-[var(--abp-muted)]">rating</p></div>
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)]">{company.completedProjects}</p><p className="text-[10px] text-[var(--abp-muted)]">projecten</p></div>
            <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)]">{company.credits}</p><p className="text-[10px] text-[var(--abp-muted)]">credits</p></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
