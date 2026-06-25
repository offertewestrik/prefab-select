import React, { useState } from 'react';
import { MapPin, Plus, X, Save } from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  PageHeader, Card, CardHeader, Badge, Button, Input, Field, EmptyState,
} from '../components/ui';
import type { WorkArea } from '../types';

const EMPTY_AREA: WorkArea = { postcodes: [], cities: [], regions: [], radiusKm: 30 };

export default function WerkgebiedPage() {
  const { myCompany, bouwbedrijven } = useData();
  const [area, setArea] = useState<WorkArea>(myCompany?.workArea ?? EMPTY_AREA);
  const [dirty, setDirty] = useState(false);
  const [pc, setPc] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  if (!myCompany) {
    return <EmptyState title="Geen bouwbedrijf gekoppeld" description="Dit account is niet aan een bouwbedrijf gekoppeld." />;
  }

  const change = (patch: Partial<WorkArea>) => { setArea((a) => ({ ...a, ...patch })); setDirty(true); };
  const save = () => { bouwbedrijven.update(myCompany.id, { workArea: area }); setDirty(false); };

  const addTo = (key: 'postcodes' | 'cities' | 'regions', value: string, reset: () => void) => {
    const v = value.trim();
    if (!v || area[key].includes(v)) return;
    change({ [key]: [...area[key], v] } as Partial<WorkArea>);
    reset();
  };
  const removeFrom = (key: 'postcodes' | 'cities' | 'regions', value: string) =>
    change({ [key]: area[key].filter((x) => x !== value) } as Partial<WorkArea>);

  return (
    <div>
      <PageHeader title="Werkgebied" subtitle="Bepaal in welke postcodes, steden en regio's u aanvragen wilt ontvangen."
        actions={<Button onClick={save} disabled={!dirty} icon={<Save size={16} />}>Opslaan</Button>} />

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardHeader title="Postcodegebieden" subtitle="2-cijferige postcodes (bijv. 50, 46)" icon={<MapPin size={16} />} />
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
            {area.postcodes.length === 0 && <span className="text-sm text-[var(--abp-faint)]">Nog geen postcodes</span>}
            {area.postcodes.map((p) => (
              <Badge key={p} tone="navy" className="pr-1">{p}xxx
                <button onClick={() => removeFrom('postcodes', p)} className="ml-1 hover:text-red-600"><X size={11} /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={pc} onChange={(e) => setPc(e.target.value.replace(/\D/g, '').slice(0, 2))} placeholder="bijv. 50" maxLength={2} />
            <Button variant="secondary" onClick={() => addTo('postcodes', pc, () => setPc(''))} icon={<Plus size={15} />}>Toevoegen</Button>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Steden" subtitle="Specifieke plaatsen" icon={<MapPin size={16} />} />
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
            {area.cities.length === 0 && <span className="text-sm text-[var(--abp-faint)]">Nog geen steden</span>}
            {area.cities.map((c) => (
              <Badge key={c} tone="slate" className="pr-1">{c}
                <button onClick={() => removeFrom('cities', c)} className="ml-1 hover:text-red-600"><X size={11} /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="bijv. Tilburg" />
            <Button variant="secondary" onClick={() => addTo('cities', city, () => setCity(''))} icon={<Plus size={15} />}>Toevoegen</Button>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Regio's / provincies" icon={<MapPin size={16} />} />
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
            {area.regions.length === 0 && <span className="text-sm text-[var(--abp-faint)]">Nog geen regio's</span>}
            {area.regions.map((r) => (
              <Badge key={r} tone="orange" className="pr-1">{r}
                <button onClick={() => removeFrom('regions', r)} className="ml-1 hover:text-red-600"><X size={11} /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="bijv. Noord-Brabant" />
            <Button variant="secondary" onClick={() => addTo('regions', region, () => setRegion(''))} icon={<Plus size={15} />}>Toevoegen</Button>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Maximale reisafstand" subtitle="Vanaf uw vestiging" icon={<MapPin size={16} />} />
          <Field label={`Straal: ${area.radiusKm} km`}>
            <input type="range" min={5} max={150} step={5} value={area.radiusKm}
              onChange={(e) => change({ radiusKm: Number(e.target.value) })}
              className="w-full accent-[var(--abp-accent)]" />
          </Field>
          <p className="text-sm text-[var(--abp-muted)] mt-2">U ontvangt aanvragen binnen {area.radiusKm} km van {myCompany.city}.</p>
        </Card>
      </div>
    </div>
  );
}
