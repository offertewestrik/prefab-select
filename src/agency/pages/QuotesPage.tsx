import React, { useMemo, useState } from 'react';
import {
  FileText, Plus, Send, CheckCircle2, Euro, Sparkles, Trash2, FileDown, Mail,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import {
  Card, Badge, EmptyState, PageHeader, Input, Textarea, Select, Field, Modal, Button,
  IconButton, Table, Th, Td, Tabs, Spinner,
} from '../components/ui';
import { formatCurrency, formatDate } from '../lib/format';
import { quoteStatusTone } from './_shared';
import { aiService } from '../services/aiService';
import type { Quote, QuoteLine, QuoteStatus } from '../types';

const QUOTE_STATUSES: QuoteStatus[] = ['Concept', 'Verzonden', 'Geaccepteerd', 'Afgewezen'];

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Total incl. BTW minus discount. */
function quoteTotal(q: Pick<Quote, 'lines' | 'discountPct'>): number {
  const subtotal = q.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
  const vat = q.lines.reduce((s, l) => s + l.quantity * l.unitPrice * (l.vatRate / 100), 0);
  const gross = subtotal + vat;
  return gross * (1 - (q.discountPct || 0) / 100);
}

function lineSubtotal(lines: QuoteLine[]): number {
  return lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
}
function lineVat(lines: QuoteLine[]): number {
  return lines.reduce((s, l) => s + l.quantity * l.unitPrice * (l.vatRate / 100), 0);
}

function emptyLine(): QuoteLine {
  return { id: newId('ql'), description: '', quantity: 1, unitPrice: 0, vatRate: 21 };
}

export default function QuotesPage() {
  const { selectedCompany, leads, quotes } = useData();

  const [addOpen, setAddOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [statusTab, setStatusTab] = useState<string>('all');

  // New-quote form state
  const [clientName, setClientName] = useState('');
  const [leadId, setLeadId] = useState<string>('');
  const [lines, setLines] = useState<QuoteLine[]>([emptyLine()]);
  const [discountPct, setDiscountPct] = useState('0');
  const [notes, setNotes] = useState('');
  const [introText, setIntroText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const cid = selectedCompany?.id;

  const companyLeads = useMemo(
    () => (cid ? leads.items.filter((l) => l.companyId === cid) : []),
    [cid, leads.items],
  );
  const companyQuotes = useMemo(
    () => (cid ? quotes.items.filter((q) => q.companyId === cid) : []),
    [cid, quotes.items],
  );

  const stats = useMemo(() => ({
    total: companyQuotes.length,
    verzonden: companyQuotes.filter((q) => q.status === 'Verzonden').length,
    geaccepteerd: companyQuotes.filter((q) => q.status === 'Geaccepteerd').length,
    acceptedValue: companyQuotes.filter((q) => q.status === 'Geaccepteerd').reduce((s, q) => s + quoteTotal(q), 0),
  }), [companyQuotes]);

  const filtered = useMemo(
    () => (statusTab === 'all' ? companyQuotes : companyQuotes.filter((q) => q.status === statusTab)),
    [companyQuotes, statusTab],
  );

  const detail = detailId ? companyQuotes.find((q) => q.id === detailId) ?? null : null;

  if (!selectedCompany) {
    return <EmptyState title="Geen klant geselecteerd" description="Kies een klant rechtsboven." />;
  }

  const resetForm = () => {
    setClientName(''); setLeadId(''); setLines([emptyLine()]);
    setDiscountPct('0'); setNotes(''); setIntroText('');
  };

  const openAdd = () => { resetForm(); setAddOpen(true); };

  const updateLine = (id: string, patch: Partial<QuoteLine>) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };
  const addLine = () => setLines((prev) => [...prev, emptyLine()]);
  const removeLine = (id: string) => setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));

  const formSubtotal = lineSubtotal(lines);
  const formVat = lineVat(lines);
  const formDiscountAmt = (formSubtotal + formVat) * ((Number(discountPct) || 0) / 100);
  const formTotal = formSubtotal + formVat - formDiscountAmt;

  const runAi = async () => {
    setAiLoading(true);
    try {
      const intro = await aiService.generateQuoteIntro(
        clientName.trim() || selectedCompany.name,
        lines[0]?.description?.trim() || 'uw aanvraag',
      );
      setIntroText(intro);
    } finally {
      setAiLoading(false);
    }
  };

  const submitNew = () => {
    if (!clientName.trim()) return;
    const now = new Date().toISOString();
    const validUntil = new Date(Date.now() + 30 * 86400000).toISOString();
    quotes.create({
      number: `OFF-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      companyId: selectedCompany.id,
      leadId: leadId || undefined,
      clientName: clientName.trim(),
      status: 'Concept',
      lines: lines.map((l) => ({ ...l, quantity: Number(l.quantity) || 0, unitPrice: Number(l.unitPrice) || 0, vatRate: Number(l.vatRate) || 0 })),
      discountPct: Number(discountPct) || 0,
      notes: notes.trim(),
      introText: introText.trim() || undefined,
      createdAt: now,
      validUntil,
    });
    setAddOpen(false);
    resetForm();
  };

  const changeStatus = (q: Quote, status: QuoteStatus) => {
    if (status !== q.status) quotes.update(q.id, { status });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offertes"
        subtitle={`${companyQuotes.length} offertes · ${selectedCompany.name}`}
        actions={<Button icon={<Plus size={16} />} onClick={openAdd}>Nieuwe offerte</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Totaal offertes" value={stats.total} icon={<FileText size={18} />} />
        <StatCard label="Verzonden" value={stats.verzonden} icon={<Send size={18} />} sparkColor="#fbbf24" />
        <StatCard label="Geaccepteerd" value={stats.geaccepteerd} icon={<CheckCircle2 size={18} />} sparkColor="#34d399" />
        <StatCard label="Geaccepteerde waarde" value={formatCurrency(stats.acceptedValue)} icon={<Euro size={18} />} sparkColor="#34d399" />
      </div>

      <Card className="p-4 sm:p-5 space-y-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'Alle', count: companyQuotes.length },
            ...QUOTE_STATUSES.map((s) => ({ id: s, label: s, count: companyQuotes.filter((q) => q.status === s).length })),
          ]}
          active={statusTab}
          onChange={setStatusTab}
        />

        {filtered.length === 0 ? (
          <EmptyState icon={<FileText size={28} />} title="Geen offertes" description="Maak een nieuwe offerte aan om te beginnen." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Nummer</Th>
                <Th>Klant</Th>
                <Th>Regels</Th>
                <Th className="text-right">Totaal</Th>
                <Th>Status</Th>
                <Th>Datum</Th>
                <Th>Geldig tot</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setDetailId(q.id)}>
                  <Td><span className="font-semibold text-sm">{q.number}</span></Td>
                  <Td><span className="text-sm">{q.clientName}</span></Td>
                  <Td><span className="text-sm text-[var(--acc-muted)] tabular-nums">{q.lines.length}</span></Td>
                  <Td><span className="font-semibold tabular-nums text-right block">{formatCurrency(quoteTotal(q))}</span></Td>
                  <Td><Badge tone={quoteStatusTone(q.status)}>{q.status}</Badge></Td>
                  <Td><span className="text-xs text-[var(--acc-muted)] whitespace-nowrap">{formatDate(q.createdAt)}</span></Td>
                  <Td><span className="text-xs text-[var(--acc-muted)] whitespace-nowrap">{formatDate(q.validUntil)}</span></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Create modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        wide
        title="Nieuwe offerte"
        footer={<>
          <Button variant="ghost" onClick={() => setAddOpen(false)}>Annuleren</Button>
          <Button onClick={submitNew} disabled={!clientName.trim()}>Offerte opslaan</Button>
        </>}
      >
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Klantnaam"><Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Bedrijf of persoon" /></Field>
            <Field label="Koppel aan lead (optioneel)">
              <Select value={leadId} onChange={(e) => {
                setLeadId(e.target.value);
                const l = companyLeads.find((x) => x.id === e.target.value);
                if (l && !clientName.trim()) setClientName(l.name);
              }}>
                <option value="">— Geen —</option>
                {companyLeads.map((l) => <option key={l.id} value={l.id}>{l.name} · {l.product}</option>)}
              </Select>
            </Field>
          </div>

          {/* Lines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--acc-muted)]">Productregels</span>
              <Button size="sm" variant="secondary" icon={<Plus size={14} />} onClick={addLine}>Regel</Button>
            </div>
            <div className="space-y-2">
              {lines.map((l) => (
                <div key={l.id} className="grid grid-cols-[1fr_70px_90px_70px_auto] gap-2 items-center">
                  <Input value={l.description} onChange={(e) => updateLine(l.id, { description: e.target.value })} placeholder="Omschrijving" />
                  <Input type="number" value={l.quantity} onChange={(e) => updateLine(l.id, { quantity: Number(e.target.value) })} placeholder="Aantal" />
                  <Input type="number" value={l.unitPrice} onChange={(e) => updateLine(l.id, { unitPrice: Number(e.target.value) })} placeholder="Prijs" />
                  <Input type="number" value={l.vatRate} onChange={(e) => updateLine(l.id, { vatRate: Number(e.target.value) })} placeholder="BTW%" />
                  <IconButton onClick={() => removeLine(l.id)} aria-label="Verwijderen"><Trash2 size={15} /></IconButton>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Korting (%)"><Input type="number" value={discountPct} onChange={(e) => setDiscountPct(e.target.value)} /></Field>
          </div>

          {/* Totals */}
          <div className="acc-glass rounded-xl p-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-[var(--acc-muted)]">Subtotaal</span><span className="tabular-nums">{formatCurrency(formSubtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--acc-muted)]">BTW</span><span className="tabular-nums">{formatCurrency(formVat)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--acc-muted)]">Korting</span><span className="tabular-nums">- {formatCurrency(formDiscountAmt)}</span></div>
            <div className="flex justify-between font-bold pt-1.5 border-t border-[var(--acc-border)]"><span>Totaal</span><span className="tabular-nums">{formatCurrency(formTotal)}</span></div>
          </div>

          {/* AI intro */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--acc-muted)]">Introtekst</span>
              <Button size="sm" variant="secondary" icon={aiLoading ? <Spinner size={14} /> : <Sparkles size={14} />} onClick={runAi} disabled={aiLoading}>
                {aiLoading ? 'Genereren…' : '✨ AI offertetekst'}
              </Button>
            </div>
            <Textarea rows={4} value={introText} onChange={(e) => setIntroText(e.target.value)} placeholder="Persoonlijke introtekst voor deze offerte…" />
          </div>

          <Field label="Interne notities"><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notities (niet zichtbaar voor klant)…" /></Field>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal
        open={!!detail}
        onClose={() => setDetailId(null)}
        wide
        title={detail ? `Offerte ${detail.number}` : ''}
      >
        {detail && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-bold">{detail.clientName}</p>
                <p className="text-xs text-[var(--acc-muted)]">Aangemaakt {formatDate(detail.createdAt)} · geldig tot {formatDate(detail.validUntil)}</p>
              </div>
              <div className="w-48">
                <Field label="Status">
                  <Select value={detail.status} onChange={(e) => changeStatus(detail, e.target.value as QuoteStatus)}>
                    {QUOTE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
              </div>
            </div>

            {detail.introText && (
              <Card className="p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{detail.introText}</p>
              </Card>
            )}

            <Table>
              <thead>
                <tr>
                  <Th>Omschrijving</Th>
                  <Th className="text-right">Aantal</Th>
                  <Th className="text-right">Prijs</Th>
                  <Th className="text-right">BTW</Th>
                  <Th className="text-right">Regeltotaal</Th>
                </tr>
              </thead>
              <tbody>
                {detail.lines.map((l) => (
                  <tr key={l.id}>
                    <Td>{l.description || '—'}</Td>
                    <Td className="text-right tabular-nums">{l.quantity}</Td>
                    <Td className="text-right tabular-nums">{formatCurrency(l.unitPrice)}</Td>
                    <Td className="text-right tabular-nums">{l.vatRate}%</Td>
                    <Td className="text-right tabular-nums font-semibold">{formatCurrency(l.quantity * l.unitPrice)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="flex justify-end">
              <div className="w-full sm:w-72 acc-glass rounded-xl p-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-[var(--acc-muted)]">Subtotaal</span><span className="tabular-nums">{formatCurrency(lineSubtotal(detail.lines))}</span></div>
                <div className="flex justify-between"><span className="text-[var(--acc-muted)]">BTW</span><span className="tabular-nums">{formatCurrency(lineVat(detail.lines))}</span></div>
                <div className="flex justify-between"><span className="text-[var(--acc-muted)]">Korting ({detail.discountPct}%)</span><span className="tabular-nums">- {formatCurrency((lineSubtotal(detail.lines) + lineVat(detail.lines)) * (detail.discountPct / 100))}</span></div>
                <div className="flex justify-between font-bold pt-1.5 border-t border-[var(--acc-border)]"><span>Totaal</span><span className="tabular-nums">{formatCurrency(quoteTotal(detail))}</span></div>
              </div>
            </div>

            {detail.notes && (
              <div className="acc-glass rounded-xl p-3">
                <p className="text-[11px] font-semibold text-[var(--acc-muted)] mb-1 uppercase tracking-wider">Interne notities</p>
                <p className="text-sm">{detail.notes}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--acc-border)]">
              <Button variant="secondary" icon={<FileDown size={15} />} disabled title="Voorbereid voor koppeling (zie README)">PDF genereren</Button>
              <Button variant="secondary" icon={<Mail size={15} />} disabled title="Voorbereid voor koppeling (zie README)">Verzenden via e-mail</Button>
              <span className="text-[11px] text-[var(--acc-muted)]">Voorbereid voor koppeling (zie README)</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
