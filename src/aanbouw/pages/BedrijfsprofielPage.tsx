import React, { useState } from 'react';
import { Building2, Save, ShieldCheck, ShieldAlert, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PageHeader, Card, CardHeader, Button, Input, Textarea, Field, Badge, EmptyState, Avatar,
} from '../components/ui';
import { serviceLabel } from '../lib/services';
import type { Bouwbedrijf } from '../types';

export default function BedrijfsprofielPage() {
  const { myCompany, bouwbedrijven } = useData();
  const [form, setForm] = useState<Partial<Bouwbedrijf>>(myCompany ?? {});
  const [dirty, setDirty] = useState(false);

  if (!myCompany) {
    return <EmptyState title="Geen bouwbedrijf gekoppeld" description="Dit account is niet aan een bouwbedrijf gekoppeld." />;
  }

  const set = (patch: Partial<Bouwbedrijf>) => { setForm((f) => ({ ...f, ...patch })); setDirty(true); };
  const save = () => { bouwbedrijven.update(myCompany.id, form); setDirty(false); };

  return (
    <div>
      <PageHeader title="Bedrijfsprofiel" subtitle="Uw zichtbare profiel op AanbouwPlatform.nl."
        actions={<Button onClick={save} disabled={!dirty} icon={<Save size={16} />}>Opslaan</Button>} />

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Bedrijfsgegevens" icon={<Building2 size={16} />} />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Bedrijfsnaam"><Input value={form.name ?? ''} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="KvK-nummer"><Input value={form.kvk ?? ''} onChange={(e) => set({ kvk: e.target.value })} /></Field>
            <Field label="Contactpersoon"><Input value={form.contactPerson ?? ''} onChange={(e) => set({ contactPerson: e.target.value })} /></Field>
            <Field label="Telefoon"><Input value={form.phone ?? ''} onChange={(e) => set({ phone: e.target.value })} /></Field>
            <Field label="E-mail"><Input value={form.email ?? ''} onChange={(e) => set({ email: e.target.value })} /></Field>
            <Field label="Website"><Input value={form.website ?? ''} onChange={(e) => set({ website: e.target.value })} /></Field>
            <Field label="Adres"><Input value={form.address ?? ''} onChange={(e) => set({ address: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Postcode"><Input value={form.postcode ?? ''} onChange={(e) => set({ postcode: e.target.value })} /></Field>
              <Field label="Plaats"><Input value={form.city ?? ''} onChange={(e) => set({ city: e.target.value })} /></Field>
            </div>
            <Field label="Regio"><Input value={form.region ?? ''} onChange={(e) => set({ region: e.target.value })} /></Field>
          </div>
          <div className="mt-3">
            <Field label="Bedrijfsomschrijving" hint="Vertel kort waar u in uitblinkt — dit zien klanten.">
              <Textarea rows={4} value={form.description ?? ''} onChange={(e) => set({ description: e.target.value })} />
            </Field>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={myCompany.name} color={myCompany.accentColor} size={48} />
              <div className="min-w-0">
                <p className="font-semibold truncate">{form.name}</p>
                <p className="text-[11px] text-[var(--abp-muted)]">{form.city} · {form.region}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--abp-surface-2)] flex items-center gap-2 text-sm">
              {myCompany.verified ? (
                <><ShieldCheck size={18} className="text-emerald-500" /> <span className="font-medium text-emerald-700">Geverifieerd bouwbedrijf</span></>
              ) : (
                <><ShieldAlert size={18} className="text-amber-500" /> <span className="font-medium text-amber-700">Verificatie in behandeling</span></>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)] flex items-center justify-center gap-1"><Star size={14} className="text-amber-500" />{myCompany.rating || '—'}</p><p className="text-[10px] text-[var(--abp-muted)]">{myCompany.reviewCount} reviews</p></div>
              <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)]">{myCompany.completedProjects}</p><p className="text-[10px] text-[var(--abp-muted)]">projecten</p></div>
              <div className="p-2 rounded-xl bg-[var(--abp-surface-2)]"><p className="text-lg font-bold text-[var(--abp-navy)]">{myCompany.workArea.radiusKm}</p><p className="text-[10px] text-[var(--abp-muted)]">km straal</p></div>
            </div>
          </Card>

          <Card className="p-5">
            <CardHeader title="Diensten" />
            <div className="flex flex-wrap gap-1.5">
              {myCompany.services.map((s) => <Badge key={s} tone="navy">{serviceLabel(s)}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
