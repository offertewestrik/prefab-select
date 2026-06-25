import React, { useMemo, useState } from 'react';
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, Card, Badge, Input, Table, Th, Td, EmptyState, Avatar } from '../components/ui';
import { formatCurrency, formatRelative } from '../lib/format';
import { requestStatusTone } from '../lib/status';
import type { Aanvraag } from '../types';

interface KlantRow {
  klantId: string;
  name: string;
  email: string;
  phone: string;
  plaats: string;
  aanvragen: Aanvraag[];
  totalValue: number;
  lastAt: string;
}

export default function KlantenPage() {
  const { aanvragen } = useData();
  const [q, setQ] = useState('');

  const klanten = useMemo<KlantRow[]>(() => {
    const map = new Map<string, KlantRow>();
    for (const a of aanvragen.items) {
      const existing = map.get(a.klantId);
      if (existing) {
        existing.aanvragen.push(a);
        existing.totalValue += a.value;
        if (a.createdAt > existing.lastAt) existing.lastAt = a.createdAt;
      } else {
        map.set(a.klantId, {
          klantId: a.klantId, name: a.klantName, email: a.email, phone: a.phone,
          plaats: a.plaats, aanvragen: [a], totalValue: a.value, lastAt: a.createdAt,
        });
      }
    }
    let list = [...map.values()].sort((x, y) => y.lastAt.localeCompare(x.lastAt));
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((k) => [k.name, k.email, k.plaats].some((v) => v.toLowerCase().includes(t)));
    }
    return list;
  }, [aanvragen.items, q]);

  return (
    <div>
      <PageHeader title="Klanten" subtitle="Particuliere opdrachtgevers en hun aanvragen." />

      <div className="flex justify-end mb-4">
        <div className="relative max-w-xs w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--abp-faint)]" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek klant…" className="pl-9" />
        </div>
      </div>

      <Card className="p-2 sm:p-3">
        {klanten.length === 0 ? (
          <EmptyState icon={<Users size={28} />} title="Geen klanten gevonden" />
        ) : (
          <Table>
            <thead>
              <tr><Th>Klant</Th><Th>Contact</Th><Th>Aanvragen</Th><Th>Totale waarde</Th><Th>Laatste</Th><Th>Status</Th></tr>
            </thead>
            <tbody>
              {klanten.map((k) => (
                <tr key={k.klantId} className="hover:bg-[var(--abp-surface-2)]">
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={k.name} size={34} color="#15426b" />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{k.name}</p>
                        <p className="text-[11px] text-[var(--abp-muted)] flex items-center gap-1"><MapPin size={11} /> {k.plaats}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <p className="text-xs flex items-center gap-1"><Mail size={11} className="text-[var(--abp-faint)]" /> {k.email}</p>
                    <p className="text-xs flex items-center gap-1 text-[var(--abp-muted)]"><Phone size={11} className="text-[var(--abp-faint)]" /> {k.phone}</p>
                  </Td>
                  <Td><span className="font-semibold">{k.aanvragen.length}</span></Td>
                  <Td className="font-semibold text-[var(--abp-navy)]">{formatCurrency(k.totalValue)}</Td>
                  <Td className="text-xs text-[var(--abp-muted)]">{formatRelative(k.lastAt)}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-1">
                      {k.aanvragen.slice(0, 2).map((a) => <Badge key={a.id} tone={requestStatusTone[a.status]}>{a.status}</Badge>)}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
