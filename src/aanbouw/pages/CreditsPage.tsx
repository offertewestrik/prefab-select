import React from 'react';
import { CreditCard, Plus, Hammer, Info } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, Card, CardHeader, Badge, Button, Table, Th, Td, EmptyState, ProgressBar } from '../components/ui';
import { StatCard } from '../components/StatCard';
import { formatCurrency, formatRelative } from '../lib/format';

const PACKAGES = [
  { credits: 10, price: 400, popular: false },
  { credits: 25, price: 875, popular: true },
  { credits: 50, price: 1500, popular: false },
];

export default function CreditsPage() {
  const { myCompany, bouwbedrijven, aanvragen } = useData();

  if (!myCompany) {
    return <EmptyState title="Geen bouwbedrijf gekoppeld" description="Dit account is niet aan een bouwbedrijf gekoppeld." />;
  }

  const acceptedLeads = aanvragen.visible.filter((a) => a.leadStatus === 'Geaccepteerd');
  const spent = acceptedLeads.length * myCompany.leadPrice;

  const buy = (credits: number) => bouwbedrijven.update(myCompany.id, { credits: myCompany.credits + credits });

  return (
    <div>
      <PageHeader title="Leadkosten & credits" subtitle="Beheer uw credits. Per geaccepteerde lead wordt één credit verrekend." />

      <div className="mb-4 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sm text-sky-800 flex items-start gap-2">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>Het volledige facturatie- en betaalmodel wordt later geactiveerd. Onderstaande pakketten en transacties zijn een voorbereiding op het definitieve leadkostenmodel.</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Huidige credits" value={myCompany.credits} icon={<CreditCard size={18} />} tone="navy" />
        <StatCard label="Prijs per lead" value={formatCurrency(myCompany.leadPrice)} icon={<Hammer size={18} />} tone="orange" />
        <StatCard label="Geaccepteerde leads" value={acceptedLeads.length} icon={<Hammer size={18} />} tone="green" />
        <StatCard label="Besteed (indicatie)" value={formatCurrency(spent)} icon={<CreditCard size={18} />} tone="blue" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {PACKAGES.map((p) => (
            <Card key={p.credits} className={p.popular ? 'p-5 border-[var(--abp-accent)] ring-2 ring-[var(--abp-accent)]/20 relative' : 'p-5'}>
              {p.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--abp-accent)] text-white">POPULAIR</span>}
              <p className="text-3xl font-bold text-[var(--abp-navy)]">{p.credits}</p>
              <p className="text-xs text-[var(--abp-muted)]">credits</p>
              <p className="text-lg font-semibold mt-3">{formatCurrency(p.price)}</p>
              <p className="text-[11px] text-[var(--abp-faint)] mb-3">{formatCurrency(Math.round(p.price / p.credits))} per credit</p>
              <Button variant={p.popular ? 'primary' : 'secondary'} className="w-full" onClick={() => buy(p.credits)} icon={<Plus size={15} />}>Bijkopen</Button>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <CardHeader title="Verbruik" icon={<CreditCard size={16} />} />
          <div className="flex items-end justify-between mb-1">
            <p className="text-2xl font-bold text-[var(--abp-navy)]">{myCompany.credits}</p>
            <span className="text-xs text-[var(--abp-muted)]">resterend</span>
          </div>
          <ProgressBar value={Math.min(100, myCompany.credits * 4)} />
          <p className="text-[11px] text-[var(--abp-muted)] mt-2">Bij een laag saldo ontvangt u automatisch een herinnering om bij te kopen.</p>
        </Card>
      </div>

      <Card className="p-2 sm:p-3 mt-5">
        <div className="px-2 py-2"><h3 className="text-sm font-semibold">Recente leadtransacties</h3></div>
        {acceptedLeads.length === 0 ? (
          <EmptyState title="Nog geen leadtransacties" />
        ) : (
          <Table>
            <thead><tr><Th>Lead</Th><Th>Locatie</Th><Th>Datum</Th><Th>Kosten</Th></tr></thead>
            <tbody>
              {acceptedLeads.map((a) => (
                <tr key={a.id}>
                  <Td className="font-medium">{a.buildType} — {a.klantName}</Td>
                  <Td className="text-[var(--abp-muted)]">{a.plaats}</Td>
                  <Td className="text-xs text-[var(--abp-muted)]">{formatRelative(a.updatedAt)}</Td>
                  <Td><Badge tone="orange">− {formatCurrency(myCompany.leadPrice)}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
