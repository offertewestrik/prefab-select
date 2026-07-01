import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessagesSquare, Send, FileText, Check, X, PlusCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, Button, Input, EmptyState, cn } from '../components/ui';
import { formatCurrency, formatRelative, formatDate, quoteTotals } from '../lib/format';
import { quoteStatusTone, requestStatusTone } from '../lib/status';
import type { Aanvraag } from '../types';

export default function BerichtenPage() {
  const { aanvragen, offertes, berichten, bouwbedrijven } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const mine = aanvragen.visible;
  const [activeId, setActiveId] = useState<string | null>(mine[0]?.id ?? null);
  const active = mine.find((a) => a.id === activeId) ?? null;
  const [draft, setDraft] = useState('');

  const thread = useMemo(
    () => berichten.items.filter((m) => m.aanvraagId === activeId).sort((a, b) => a.at.localeCompare(b.at)),
    [berichten.items, activeId],
  );
  const threadOffertes = useMemo(
    () => offertes.items.filter((o) => o.aanvraagId === activeId && o.status !== 'Concept'),
    [offertes.items, activeId],
  );
  const company = active ? bouwbedrijven.items.find((b) => b.id === active.assignedCompanyId) : null;

  const send = () => {
    if (!draft.trim() || !active) return;
    berichten.create({
      aanvraagId: active.id, companyId: active.assignedCompanyId, fromRole: 'klant',
      author: user?.name ?? 'Klant', body: draft.trim(), at: new Date().toISOString(), read: true,
    } as any);
    setDraft('');
  };

  const respondOfferte = (offerteId: string, accept: boolean) => {
    if (!active) return;
    offertes.update(offerteId, { status: accept ? 'Geaccepteerd' : 'Afgewezen' });
    aanvragen.update(active.id, {
      status: accept ? 'Gewonnen' : 'Verloren',
      timeline: [...active.timeline, { id: `tl_${Date.now()}`, type: 'status', message: accept ? 'Offerte geaccepteerd door klant' : 'Offerte afgewezen door klant', author: user?.name ?? 'Klant', at: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
    });
  };

  if (mine.length === 0) {
    return (
      <div>
        <PageTitle />
        <Card className="p-2"><EmptyState icon={<MessagesSquare size={28} />} title="Nog geen berichten"
          description="Zodra u een aanvraag plaatst, verschijnen hier de berichten en offertes van bouwbedrijven."
          action={<Button onClick={() => navigate('/aanbouw/nieuwe-aanvraag')} icon={<PlusCircle size={16} />}>Nieuwe aanvraag</Button>} /></Card>
      </div>
    );
  }

  return (
    <div>
      <PageTitle />
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Aanvraag list */}
        <Card className="p-2 lg:col-span-1 h-fit">
          {mine.map((a) => (
            <button key={a.id} onClick={() => setActiveId(a.id)}
              className={cn('w-full text-left p-3 rounded-xl transition-colors mb-1', activeId === a.id ? 'bg-[var(--abp-navy)] text-white' : 'hover:bg-[var(--abp-surface-2)]')}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold truncate">{a.buildType}</span>
                <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>
              </div>
              <p className={cn('text-[11px] truncate mt-0.5', activeId === a.id ? 'text-white/70' : 'text-[var(--abp-muted)]')}>{a.plaats} · {a.number}</p>
            </button>
          ))}
        </Card>

        {/* Conversation + offertes */}
        <div className="lg:col-span-2 space-y-5">
          {active && (
            <>
              {threadOffertes.length > 0 && (
                <Card className="p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><FileText size={16} className="text-[var(--abp-accent)]" /> Ontvangen offertes</h3>
                  <div className="space-y-3">
                    {threadOffertes.map((o) => {
                      const totals = quoteTotals(o.lines, o.discountPct);
                      return (
                        <div key={o.id} className="border border-[var(--abp-border)] rounded-xl p-4">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div>
                              <p className="font-semibold">{o.number}</p>
                              <p className="text-[11px] text-[var(--abp-muted)]">van {company?.name ?? 'bouwbedrijf'} · geldig tot {formatDate(o.validUntil)}</p>
                            </div>
                            <Badge tone={quoteStatusTone[o.status]}>{o.status}</Badge>
                          </div>
                          {o.introText && <p className="text-sm text-[var(--abp-muted)] mb-2">{o.introText}</p>}
                          <div className="space-y-1 mb-2">
                            {o.lines.map((l) => (
                              <div key={l.id} className="flex items-center justify-between text-sm">
                                <span className="text-[var(--abp-text)] truncate pr-2">{l.description}</span>
                                <span className="text-[var(--abp-muted)] shrink-0">{formatCurrency(l.quantity * l.unitPrice)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-[var(--abp-border)]">
                            <span className="text-sm font-bold text-[var(--abp-navy)]">Totaal incl. BTW</span>
                            <span className="text-lg font-bold text-[var(--abp-navy)]">{formatCurrency(totals.total)}</span>
                          </div>
                          {o.status === 'Verzonden' && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="secondary" className="flex-1" onClick={() => respondOfferte(o.id, false)} icon={<X size={14} />}>Afwijzen</Button>
                              <Button size="sm" variant="primary" className="flex-1" onClick={() => respondOfferte(o.id, true)} icon={<Check size={14} />}>Accepteren</Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              <Card className="p-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><MessagesSquare size={16} className="text-[var(--abp-accent)]" /> Berichten {company && `met ${company.name}`}</h3>
                <div className="space-y-3 mb-4 max-h-[340px] overflow-y-auto abp-scroll">
                  {thread.length === 0 && <p className="text-sm text-[var(--abp-muted)] text-center py-6">Nog geen berichten. Stuur de eerste!</p>}
                  {thread.map((m) => {
                    const own = m.fromRole === 'klant';
                    return (
                      <div key={m.id} className={cn('flex', own ? 'justify-end' : 'justify-start')}>
                        <div className={cn('max-w-[78%] rounded-2xl px-3.5 py-2', own ? 'bg-[var(--abp-accent)] text-white' : 'bg-[var(--abp-surface-2)] text-[var(--abp-text)]')}>
                          <p className="text-sm">{m.body}</p>
                          <p className={cn('text-[10px] mt-0.5', own ? 'text-white/70' : 'text-[var(--abp-faint)]')}>{m.author} · {formatRelative(m.at)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Typ een bericht…" />
                  <Button variant="primary" onClick={send} icon={<Send size={15} />}>Versturen</Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PageTitle() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">Berichten & offertes</h1>
      <p className="text-sm text-[var(--abp-muted)] mt-1">Communiceer met bouwbedrijven en bekijk hun offertes per aanvraag.</p>
    </div>
  );
}
