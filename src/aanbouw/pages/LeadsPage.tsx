import React, { useMemo, useState } from 'react';
import { Hammer, Ruler, Euro, CalendarClock, MapPin, Check, X, Phone, Mail, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  PageHeader, Card, Badge, Button, Tabs, Modal, EmptyState,
} from '../components/ui';
import { formatCurrency, formatDate, formatRelative } from '../lib/format';
import { requestStatusTone, leadStatusTone } from '../lib/status';
import type { Aanvraag } from '../types';

export default function LeadsPage() {
  const { aanvragen, bouwbedrijven, myCompany } = useData();
  const { user } = useAuth();
  const [tab, setTab] = useState<'nieuw' | 'geaccepteerd' | 'afgewezen'>('nieuw');
  const [selected, setSelected] = useState<Aanvraag | null>(null);

  const mine = aanvragen.visible;
  const groups = {
    nieuw: mine.filter((a) => a.leadStatus === 'Nieuw'),
    geaccepteerd: mine.filter((a) => a.leadStatus === 'Geaccepteerd'),
    afgewezen: mine.filter((a) => a.leadStatus === 'Afgewezen'),
  };
  const list = groups[tab];

  const respond = (a: Aanvraag, accept: boolean) => {
    const now = new Date().toISOString();
    const entry = {
      id: `tl_${Date.now()}`, type: 'status' as const,
      message: accept ? `Lead geaccepteerd door ${myCompany?.name ?? 'bouwbedrijf'}` : 'Lead afgewezen',
      author: myCompany?.name ?? user?.name ?? 'Aannemer', at: now,
    };
    aanvragen.update(a.id, {
      leadStatus: accept ? 'Geaccepteerd' : 'Afgewezen',
      status: accept ? 'Geaccepteerd' : a.status,
      timeline: [...a.timeline, entry],
      updatedAt: now,
    });
    if (accept && myCompany) {
      bouwbedrijven.update(myCompany.id, { credits: Math.max(0, myCompany.credits - 1) });
    }
    setSelected(null);
  };

  return (
    <div>
      <PageHeader title="Aanvragen & leads" subtitle="Toegewezen aanbouw aanvragen in uw werkgebied. Accepteer een lead om contact op te nemen." />

      <Tabs active={tab} onChange={(id) => setTab(id as typeof tab)}
        tabs={[
          { id: 'nieuw', label: 'Nieuwe aanvragen', count: groups.nieuw.length },
          { id: 'geaccepteerd', label: 'Geaccepteerd', count: groups.geaccepteerd.length },
          { id: 'afgewezen', label: 'Afgewezen', count: groups.afgewezen.length },
        ]} />

      <div className="mt-4">
        {list.length === 0 ? (
          <Card className="p-2"><EmptyState icon={<Hammer size={28} />} title="Geen aanvragen in deze categorie"
            description={tab === 'nieuw' ? 'Zodra de beheerder een lead toewijst, verschijnt deze hier.' : undefined} /></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {list.map((a) => (
              <Card key={a.id} hover className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-[var(--abp-accent)]/12 text-[var(--abp-accent-strong)] flex items-center justify-center shrink-0"><Hammer size={18} /></span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{a.buildType} — {a.plaats}</p>
                      <p className="text-[11px] text-[var(--abp-muted)]">{a.number} · {formatRelative(a.createdAt)}</p>
                    </div>
                  </div>
                  <Badge tone={leadStatusTone[a.leadStatus]} dot>{a.leadStatus}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <Spec icon={<Ruler size={13} />} value={a.oppervlakte ? `${a.oppervlakte} m²` : 'In overleg'} />
                  <Spec icon={<Euro size={13} />} value={formatCurrency(a.budgetIndicatie)} />
                  <Spec icon={<CalendarClock size={13} />} value={a.startdatum} />
                  <Spec icon={<MapPin size={13} />} value={`Vergunning: ${a.vergunningNodig}`} />
                </div>

                <p className="text-sm text-[var(--abp-muted)] line-clamp-2 mb-4">{a.toelichting}</p>

                <div className="flex items-center justify-between gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>Details</Button>
                  {a.leadStatus === 'Nieuw' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => respond(a, false)} icon={<X size={14} />}>Afwijzen</Button>
                      <Button size="sm" variant="primary" onClick={() => respond(a, true)} icon={<Check size={14} />}>Accepteren</Button>
                    </div>
                  )}
                  {a.leadStatus === 'Geaccepteerd' && <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selected && <LeadDetail aanvraag={selected} onClose={() => setSelected(null)} onRespond={respond} />}
    </div>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[var(--abp-text)] capitalize">
      <span className="text-[var(--abp-accent)]">{icon}</span> {value}
    </span>
  );
}

function LeadDetail({ aanvraag, onClose, onRespond }: { aanvraag: Aanvraag; onClose: () => void; onRespond: (a: Aanvraag, accept: boolean) => void }) {
  const navigate = useNavigate();
  const accepted = aanvraag.leadStatus === 'Geaccepteerd';
  return (
    <Modal open onClose={onClose} title={`${aanvraag.buildType} — ${aanvraag.plaats}`}
      footer={aanvraag.leadStatus === 'Nieuw'
        ? <>
            <Button variant="secondary" onClick={() => onRespond(aanvraag, false)} icon={<X size={15} />}>Afwijzen</Button>
            <Button variant="primary" onClick={() => onRespond(aanvraag, true)} icon={<Check size={15} />}>Lead accepteren</Button>
          </>
        : <>
            <Button variant="ghost" onClick={onClose}>Sluiten</Button>
            {accepted && <Button variant="navy" onClick={() => navigate('/aanbouw/offertes')} icon={<FileText size={15} />}>Offerte maken</Button>}
          </>}>
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <Info label="Bouwtype" value={aanvraag.buildType} />
          <Info label="Afwerking" value={aanvraag.afwerking} />
          <Info label="Afmetingen" value={aanvraag.oppervlakte ? `${aanvraag.breedte} × ${aanvraag.diepte} m (${aanvraag.oppervlakte} m²)` : 'In overleg'} />
          <Info label="Budgetindicatie" value={formatCurrency(aanvraag.budgetIndicatie)} />
          <Info label="Bestaande woning" value={aanvraag.bestaandeWoning ? 'Ja' : 'Nee'} />
          <Info label="Fundering nodig" value={aanvraag.funderingNodig} />
          <Info label="Vergunning nodig" value={aanvraag.vergunningNodig} />
          <Info label="Gewenste start" value={aanvraag.startdatum} />
        </div>
        <div className="p-3 rounded-xl bg-[var(--abp-surface-2)]">
          <p className="text-[11px] font-semibold text-[var(--abp-faint)] mb-1">Toelichting</p>
          {aanvraag.toelichting || '—'}
        </div>
        {accepted ? (
          <div className="p-3 rounded-xl border border-[var(--abp-border)]">
            <p className="text-[11px] font-semibold text-[var(--abp-faint)] mb-1">Contactgegevens</p>
            <p className="font-medium">{aanvraag.klantName}</p>
            <p className="flex items-center gap-1.5 text-[var(--abp-muted)]"><Phone size={13} /> {aanvraag.phone}</p>
            <p className="flex items-center gap-1.5 text-[var(--abp-muted)]"><Mail size={13} /> {aanvraag.email}</p>
            <p className="flex items-center gap-1.5 text-[var(--abp-muted)]"><MapPin size={13} /> {aanvraag.postcode} {aanvraag.plaats}</p>
          </div>
        ) : (
          <p className="text-[11px] text-[var(--abp-faint)]">Contactgegevens worden zichtbaar zodra u de lead accepteert. Indiendatum: {formatDate(aanvraag.createdAt)}.</p>
        )}
      </div>
    </Modal>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[var(--abp-faint)]">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  );
}
