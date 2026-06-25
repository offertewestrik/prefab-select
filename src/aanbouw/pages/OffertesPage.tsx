import React, { useMemo, useState } from 'react';
import { FileText, Plus, Send, Trash2, Check, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PageHeader, Card, Badge, Button, Table, Th, Td, Modal, Field, Input, Select,
  Textarea, EmptyState, Tabs, IconButton,
} from '../components/ui';
import { formatCurrency, formatDate, quoteTotals } from '../lib/format';
import { quoteStatusTone } from '../lib/status';
import type { Offerte, QuoteLine, QuoteStatus } from '../types';

export default function OffertesPage() {
  const { offertes, aanvragen, myCompany } = useData();
  const [tab, setTab] = useState<'alle' | QuoteStatus>('alle');
  const [editing, setEditing] = useState<Offerte | null>(null);
  const [creating, setCreating] = useState(false);

  const mine = offertes.visible;
  const filtered = tab === 'alle' ? mine : mine.filter((o) => o.status === tab);

  return (
    <div>
      <PageHeader title="Offertes" subtitle="Stel offertes op voor geaccepteerde leads en volg de status."
        actions={<Button onClick={() => setCreating(true)} icon={<Plus size={16} />}>Nieuwe offerte</Button>} />

      <Tabs active={tab} onChange={(id) => setTab(id as typeof tab)}
        tabs={[
          { id: 'alle', label: 'Alle', count: mine.length },
          { id: 'Concept', label: 'Concept', count: mine.filter((o) => o.status === 'Concept').length },
          { id: 'Verzonden', label: 'Verzonden', count: mine.filter((o) => o.status === 'Verzonden').length },
          { id: 'Geaccepteerd', label: 'Geaccepteerd', count: mine.filter((o) => o.status === 'Geaccepteerd').length },
          { id: 'Afgewezen', label: 'Afgewezen', count: mine.filter((o) => o.status === 'Afgewezen').length },
        ]} />

      <Card className="p-2 sm:p-3 mt-4">
        {filtered.length === 0 ? (
          <EmptyState icon={<FileText size={28} />} title="Geen offertes"
            action={<Button onClick={() => setCreating(true)} icon={<Plus size={16} />}>Nieuwe offerte</Button>} />
        ) : (
          <Table>
            <thead><tr><Th>Nummer</Th><Th>Klant</Th><Th>Totaal</Th><Th>Geldig tot</Th><Th>Status</Th><Th></Th></tr></thead>
            <tbody>
              {filtered.map((o) => {
                const totals = quoteTotals(o.lines, o.discountPct);
                return (
                  <tr key={o.id} className="hover:bg-[var(--abp-surface-2)] cursor-pointer" onClick={() => setEditing(o)}>
                    <Td className="font-semibold">{o.number}</Td>
                    <Td>{o.klantName}</Td>
                    <Td className="font-semibold text-[var(--abp-navy)]">{formatCurrency(totals.total)}</Td>
                    <Td className="text-xs text-[var(--abp-muted)]">{formatDate(o.validUntil)}</Td>
                    <Td><Badge tone={quoteStatusTone[o.status]}>{o.status}</Badge></Td>
                    <Td><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditing(o); }}>Open</Button></Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {(creating || editing) && (
        <OfferteEditor
          offerte={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          companyId={myCompany?.id ?? ''}
          aanvraagOptions={aanvragen.visible.filter((a) => a.leadStatus === 'Geaccepteerd')}
        />
      )}
    </div>
  );
}

function OfferteEditor({ offerte, onClose, companyId, aanvraagOptions }: {
  offerte: Offerte | null;
  onClose: () => void;
  companyId: string;
  aanvraagOptions: any[];
}) {
  const { offertes, aanvragen } = useData();
  const isNew = !offerte;
  const [aanvraagId, setAanvraagId] = useState(offerte?.aanvraagId ?? (aanvraagOptions[0]?.id ?? ''));
  const [klantName, setKlantName] = useState(offerte?.klantName ?? (aanvraagOptions[0]?.klantName ?? ''));
  const [introText, setIntroText] = useState(offerte?.introText ?? '');
  const [notes, setNotes] = useState(offerte?.notes ?? '');
  const [discountPct, setDiscountPct] = useState(offerte?.discountPct ?? 0);
  const [lines, setLines] = useState<QuoteLine[]>(offerte?.lines ?? [
    { id: `ol_${Date.now()}`, description: '', quantity: 1, unitPrice: 0, vatRate: 21 },
  ]);

  const totals = useMemo(() => quoteTotals(lines, discountPct), [lines, discountPct]);

  const updateLine = (id: string, patch: Partial<QuoteLine>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const addLine = () => setLines((prev) => [...prev, { id: `ol_${Date.now()}_${prev.length}`, description: '', quantity: 1, unitPrice: 0, vatRate: 21 }]);
  const removeLine = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));

  const onPickAanvraag = (id: string) => {
    setAanvraagId(id);
    const a = aanvraagOptions.find((x) => x.id === id);
    if (a) setKlantName(a.klantName);
  };

  const save = (status: QuoteStatus) => {
    if (isNew) {
      const count = offertes.items.length + 100;
      offertes.create({
        number: `OFF-2026-0${count}`, aanvraagId, companyId, klantName,
        status, lines, discountPct, notes, introText,
        createdAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
      } as Omit<Offerte, 'id'>);
    } else {
      offertes.update(offerte!.id, { aanvraagId, klantName, lines, discountPct, notes, introText, status });
    }
    // Reflect "Offerte verstuurd" on the linked aanvraag.
    if (status === 'Verzonden' && aanvraagId) {
      const a = aanvragen.items.find((x) => x.id === aanvraagId);
      if (a && a.status !== 'Gewonnen') {
        aanvragen.update(a.id, {
          status: 'Offerte verstuurd',
          timeline: [...a.timeline, { id: `tl_${Date.now()}`, type: 'status', message: 'Offerte verzonden naar klant', author: klantName, at: new Date().toISOString() }],
        });
      }
    }
    onClose();
  };

  const setStatus = (status: QuoteStatus) => { if (!isNew) offertes.update(offerte!.id, { status }); };

  return (
    <Modal open onClose={onClose} wide title={isNew ? 'Nieuwe offerte' : `Offerte ${offerte!.number}`}
      footer={<>
        <Button variant="ghost" onClick={onClose}>Annuleren</Button>
        <Button variant="secondary" onClick={() => save('Concept')}>Opslaan als concept</Button>
        <Button variant="primary" onClick={() => save('Verzonden')} icon={<Send size={15} />}>Verzenden</Button>
      </>}>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <Field label="Gekoppelde aanvraag">
          <Select value={aanvraagId} onChange={(e) => onPickAanvraag(e.target.value)}>
            <option value="">— Geen —</option>
            {aanvraagOptions.map((a) => <option key={a.id} value={a.id}>{a.number} · {a.buildType} — {a.klantName}</option>)}
          </Select>
        </Field>
        <Field label="Klantnaam"><Input value={klantName} onChange={(e) => setKlantName(e.target.value)} /></Field>
      </div>

      <Field label="Introtekst (optioneel)">
        <Textarea rows={2} value={introText} onChange={(e) => setIntroText(e.target.value)} placeholder="Beste familie…, hartelijk dank voor uw aanvraag." />
      </Field>

      <div className="mt-4">
        <p className="text-xs font-semibold text-[var(--abp-muted)] mb-2">Offerteregels</p>
        <div className="space-y-2">
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-12 gap-2 items-center">
              <Input className="col-span-6" placeholder="Omschrijving" value={l.description} onChange={(e) => updateLine(l.id, { description: e.target.value })} />
              <Input className="col-span-1" type="number" value={l.quantity} onChange={(e) => updateLine(l.id, { quantity: Number(e.target.value) })} />
              <Input className="col-span-2" type="number" placeholder="€" value={l.unitPrice} onChange={(e) => updateLine(l.id, { unitPrice: Number(e.target.value) })} />
              <Select className="col-span-2" value={l.vatRate} onChange={(e) => updateLine(l.id, { vatRate: Number(e.target.value) })}>
                <option value={21}>21%</option>
                <option value={9}>9%</option>
                <option value={0}>0%</option>
              </Select>
              <IconButton className="col-span-1" onClick={() => removeLine(l.id)}><Trash2 size={15} /></IconButton>
            </div>
          ))}
        </div>
        <Button size="sm" variant="ghost" className="mt-2" onClick={addLine} icon={<Plus size={14} />}>Regel toevoegen</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="space-y-3">
          <Field label="Korting (%)"><Input type="number" value={discountPct} onChange={(e) => setDiscountPct(Number(e.target.value))} /></Field>
          <Field label="Notities"><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
        </div>
        <div className="p-4 rounded-xl bg-[var(--abp-surface-2)] text-sm space-y-1.5 self-start">
          <Row label="Subtotaal" value={formatCurrency(totals.subtotal)} />
          {discountPct > 0 && <Row label={`Korting (${discountPct}%)`} value={`− ${formatCurrency(totals.discount)}`} />}
          <Row label="BTW" value={formatCurrency(totals.vat)} />
          <div className="border-t border-[var(--abp-border)] pt-1.5 mt-1.5">
            <Row label="Totaal incl. BTW" value={formatCurrency(totals.total)} bold />
          </div>
        </div>
      </div>

      {!isNew && (
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[var(--abp-border)]">
          <span className="text-xs text-[var(--abp-muted)]">Snel markeren:</span>
          <Button size="sm" variant="secondary" onClick={() => setStatus('Geaccepteerd')} icon={<Check size={14} />}>Geaccepteerd</Button>
          <Button size="sm" variant="ghost" onClick={() => setStatus('Afgewezen')} icon={<X size={14} />}>Afgewezen</Button>
        </div>
      )}
    </Modal>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? 'font-semibold text-[var(--abp-navy)]' : 'text-[var(--abp-muted)]'}>{label}</span>
      <span className={bold ? 'font-bold text-[var(--abp-navy)]' : 'font-medium'}>{value}</span>
    </div>
  );
}
