import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, PlusCircle, Ruler, Euro, CalendarClock, MapPin, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, Card, Badge, Button, Modal, EmptyState } from '../components/ui';
import { formatCurrency, formatDate } from '../lib/format';
import { requestStatusTone } from '../lib/status';
import type { Aanvraag } from '../types';

export default function MijnAanvragenPage() {
  const { aanvragen, bouwbedrijven, offertes } = useData();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Aanvraag | null>(null);
  const mine = aanvragen.visible;

  return (
    <div>
      <PageHeader title="Mijn aanvragen" subtitle="Volg de status van uw aanbouwprojecten."
        actions={<Button onClick={() => navigate('/aanbouw/nieuwe-aanvraag')} icon={<PlusCircle size={16} />}>Nieuwe aanvraag</Button>} />

      {mine.length === 0 ? (
        <Card className="p-2"><EmptyState icon={<Hammer size={28} />} title="Nog geen aanvragen"
          description="Plaats uw eerste aanvraag om offertes te ontvangen."
          action={<Button onClick={() => navigate('/aanbouw/nieuwe-aanvraag')} icon={<PlusCircle size={16} />}>Nieuwe aanvraag</Button>} /></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {mine.map((a) => {
            const company = bouwbedrijven.items.find((b) => b.id === a.assignedCompanyId);
            const offerteCount = offertes.visible.filter((o) => o.aanvraagId === a.id && o.status !== 'Concept').length;
            return (
              <Card key={a.id} hover className="p-5 cursor-pointer" onClick={() => setSelected(a)}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-[var(--abp-accent)]/12 text-[var(--abp-accent-strong)] flex items-center justify-center shrink-0"><Hammer size={18} /></span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{a.buildType} — {a.plaats}</p>
                      <p className="text-[11px] text-[var(--abp-muted)]">{a.number} · {formatDate(a.createdAt)}</p>
                    </div>
                  </div>
                  <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-[var(--abp-text)] mb-3">
                  <span className="flex items-center gap-1.5"><Ruler size={13} className="text-[var(--abp-accent)]" /> {a.oppervlakte ? `${a.oppervlakte} m²` : 'In overleg'}</span>
                  <span className="flex items-center gap-1.5"><Euro size={13} className="text-[var(--abp-accent)]" /> {formatCurrency(a.budgetIndicatie)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--abp-border)] text-sm">
                  <span className="text-[var(--abp-muted)] truncate">{company ? company.name : 'Bouwbedrijven bekijken uw aanvraag'}</span>
                  {offerteCount > 0 && <Badge tone="orange">{offerteCount} offerte{offerteCount > 1 ? 's' : ''}</Badge>}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selected && (
        <AanvraagDetail
          aanvraag={aanvragen.visible.find((a) => a.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function AanvraagDetail({ aanvraag, onClose }: { aanvraag: Aanvraag; onClose: () => void }) {
  const { bouwbedrijven } = useData();
  const navigate = useNavigate();
  const company = bouwbedrijven.items.find((b) => b.id === aanvraag.assignedCompanyId);

  const specs = [
    { icon: <Ruler size={14} />, label: 'Afmetingen', value: aanvraag.oppervlakte ? `${aanvraag.breedte} × ${aanvraag.diepte} m · ${aanvraag.oppervlakte} m²` : 'In overleg' },
    { icon: <Hammer size={14} />, label: 'Afwerking', value: aanvraag.afwerking },
    { icon: <Euro size={14} />, label: 'Budget', value: formatCurrency(aanvraag.budgetIndicatie) },
    { icon: <CalendarClock size={14} />, label: 'Startdatum', value: aanvraag.startdatum },
    { icon: <MapPin size={14} />, label: 'Vergunning nodig', value: aanvraag.vergunningNodig },
  ];

  return (
    <Modal open onClose={onClose} title={`${aanvraag.buildType} — ${aanvraag.plaats}`}
      footer={<>
        <Button variant="ghost" onClick={onClose}>Sluiten</Button>
        <Button variant="navy" onClick={() => navigate('/aanbouw/berichten')}>Berichten & offertes</Button>
      </>}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge tone={requestStatusTone[aanvraag.status]} dot>{aanvraag.status}</Badge>
          <span className="text-xs text-[var(--abp-muted)]">{aanvraag.number}</span>
        </div>

        {company && (
          <div className="p-3 rounded-xl bg-[var(--abp-surface-2)] flex items-center gap-2 text-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Toegewezen aan <span className="font-semibold">{company.name}</span> {company.verified && '(geverifieerd)'}</span>
          </div>
        )}

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
          <div className="p-3 rounded-xl bg-[var(--abp-surface-2)] text-sm">
            <p className="text-[11px] font-semibold text-[var(--abp-faint)] mb-1">Uw toelichting</p>
            {aanvraag.toelichting}
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--abp-faint)] mb-2">Tijdlijn</h4>
          <div className="space-y-2">
            {[...aanvraag.timeline].reverse().map((t) => (
              <div key={t.id} className="flex gap-2.5 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--abp-accent)] mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px]">{t.message}</p>
                  <p className="text-[10px] text-[var(--abp-faint)]">{t.author} · {formatDate(t.at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
