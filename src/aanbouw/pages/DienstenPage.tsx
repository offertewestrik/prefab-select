import React from 'react';
import { Wrench, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, Card, EmptyState, cn } from '../components/ui';
import { SERVICES } from '../lib/services';

export default function DienstenPage() {
  const { myCompany, bouwbedrijven } = useData();

  if (!myCompany) {
    return <EmptyState title="Geen bouwbedrijf gekoppeld" description="Dit account is niet aan een bouwbedrijf gekoppeld." />;
  }

  const toggle = (key: string) => {
    const has = myCompany.services.includes(key as any);
    const next = has
      ? myCompany.services.filter((s) => s !== key)
      : [...myCompany.services, key as any];
    bouwbedrijven.update(myCompany.id, { services: next });
  };

  return (
    <div>
      <PageHeader title="Diensten" subtitle="Selecteer welke werkzaamheden uw bouwbedrijf aanbiedt. Aanvragen worden hierop gematcht." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s) => {
          const active = myCompany.services.includes(s.key);
          return (
            <button key={s.key} onClick={() => toggle(s.key)} className="text-left">
              <Card className={cn('p-5 h-full transition-all', active ? 'border-[var(--abp-accent)] ring-2 ring-[var(--abp-accent)]/20' : 'hover:border-[var(--abp-border-strong)]')}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', active ? 'bg-[var(--abp-accent)] text-white' : 'bg-[var(--abp-surface-2)] text-[var(--abp-muted)]')}>
                    <Wrench size={18} />
                  </span>
                  <span className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center', active ? 'bg-[var(--abp-accent)] border-[var(--abp-accent)] text-white' : 'border-[var(--abp-border-strong)]')}>
                    {active && <Check size={13} />}
                  </span>
                </div>
                <p className="font-semibold">{s.label}</p>
                <p className="text-sm text-[var(--abp-muted)] mt-0.5">{s.description}</p>
              </Card>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[var(--abp-muted)] mt-5">
        {myCompany.services.length} van de {SERVICES.length} diensten geselecteerd.
      </p>
    </div>
  );
}
