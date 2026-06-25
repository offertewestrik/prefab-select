import React, { useState } from 'react';
import { Briefcase, Trophy, Ruler, Euro, MapPin, CalendarClock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  PageHeader, Card, Badge, Button, Tabs, EmptyState, Select,
} from '../components/ui';
import { StatCard } from '../components/StatCard';
import { formatCurrency, formatDate } from '../lib/format';
import { requestStatusTone } from '../lib/status';
import type { RequestStatus } from '../types';

const PROJECT_STATUSES: RequestStatus[] = ['Geaccepteerd', 'Offerte verstuurd', 'In onderhandeling', 'Gewonnen', 'Verloren'];

export default function ProjectenPage() {
  const { aanvragen, myCompany } = useData();
  const { user } = useAuth();
  const [tab, setTab] = useState<'gewonnen' | 'lopend' | 'alle'>('gewonnen');

  const accepted = aanvragen.visible.filter((a) => a.leadStatus === 'Geaccepteerd');
  const groups = {
    gewonnen: accepted.filter((a) => a.status === 'Gewonnen'),
    lopend: accepted.filter((a) => !['Gewonnen', 'Verloren'].includes(a.status)),
    alle: accepted,
  };
  const list = groups[tab];
  const wonValue = groups.gewonnen.reduce((s, a) => s + a.value, 0);

  const setStatus = (id: string, status: RequestStatus) => {
    const a = aanvragen.items.find((x) => x.id === id);
    if (!a) return;
    aanvragen.update(id, {
      status,
      timeline: [...a.timeline, { id: `tl_${Date.now()}`, type: 'status', message: `Status: ${status}`, author: myCompany?.name ?? user?.name ?? 'Aannemer', at: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <PageHeader title="Gewonnen projecten" subtitle="Uw geaccepteerde leads, van offerte tot oplevering." />

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard label="Gewonnen" value={groups.gewonnen.length} icon={<Trophy size={18} />} tone="green" hint={formatCurrency(wonValue)} />
        <StatCard label="Lopend" value={groups.lopend.length} icon={<Briefcase size={18} />} tone="orange" />
        <StatCard label="Totale projectwaarde" value={formatCurrency(accepted.reduce((s, a) => s + a.value, 0))} icon={<Euro size={18} />} tone="navy" />
      </div>

      <Tabs active={tab} onChange={(id) => setTab(id as typeof tab)}
        tabs={[
          { id: 'gewonnen', label: 'Gewonnen', count: groups.gewonnen.length },
          { id: 'lopend', label: 'Lopend', count: groups.lopend.length },
          { id: 'alle', label: 'Alle', count: groups.alle.length },
        ]} />

      <div className="mt-4">
        {list.length === 0 ? (
          <Card className="p-2"><EmptyState icon={<Briefcase size={28} />} title="Nog geen projecten in deze categorie" /></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {list.map((a) => (
              <Card key={a.id} className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-[var(--abp-navy)]/8 text-[var(--abp-navy)] flex items-center justify-center shrink-0"><Briefcase size={18} /></span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{a.buildType} — {a.klantName}</p>
                      <p className="text-[11px] text-[var(--abp-muted)]">{a.number}</p>
                    </div>
                  </div>
                  <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3 text-[var(--abp-text)]">
                  <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[var(--abp-accent)]" /> {a.plaats}</span>
                  <span className="flex items-center gap-1.5"><Ruler size={13} className="text-[var(--abp-accent)]" /> {a.oppervlakte ? `${a.oppervlakte} m²` : 'In overleg'}</span>
                  <span className="flex items-center gap-1.5"><Euro size={13} className="text-[var(--abp-accent)]" /> {formatCurrency(a.value)}</span>
                  <span className="flex items-center gap-1.5"><CalendarClock size={13} className="text-[var(--abp-accent)]" /> {a.startdatum}</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--abp-border)]">
                  <span className="text-xs text-[var(--abp-muted)] shrink-0">Status bijwerken:</span>
                  <Select value={a.status} onChange={(e) => setStatus(a.id, e.target.value as RequestStatus)} className="py-1.5 text-xs">
                    {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
