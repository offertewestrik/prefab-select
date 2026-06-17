import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, GitCompareArrows, Check, Minus } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/types';
import { euro } from '../lib/format';
import { Button, ProductImage, Stars } from '../components/ui';
import { useCompare, MAX_COMPARE } from '../lib/compare';

type RowDef = { label: string; get: (p: Product) => string | number | undefined };

const rows: RowDef[] = [
  { label: 'Prijs', get: (p) => euro(p.price) },
  { label: 'CW-klasse', get: (p) => (p.cwKlasse ? `CW${p.cwKlasse}` : undefined) },
  { label: 'Vermogen', get: (p) => (p.vermogenKw ? `${p.vermogenKw} kW` : undefined) },
  { label: 'Warmwater', get: (p) => (p.warmwaterLpm ? `${p.warmwaterLpm} l/min` : undefined) },
  { label: 'Inhoud', get: (p) => (p.inhoudLiter ? `${p.inhoudLiter} liter` : undefined) },
  { label: 'Energielabel', get: (p) => p.energielabel },
  { label: 'Hybrid Ready', get: (p) => (p.hybridReady === undefined ? undefined : p.hybridReady ? 'Ja' : 'Nee') },
  { label: 'Garantie', get: (p) => `${p.garantieJaar} jaar` },
  { label: 'Afmetingen', get: (p) => p.afmetingen },
  { label: 'Gewicht', get: (p) => (p.gewichtKg ? `${p.gewichtKg} kg` : undefined) },
  { label: 'Beoordeling', get: (p) => `${p.rating} (${p.reviewCount})` },
];

export default function ComparePage() {
  const { ids, remove, clear } = useCompare();
  const chosen = useMemo(() => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[], [ids]);

  return (
    <>
      <section className="bg-hero-gradient text-white">
        <div className="container-wide py-14">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-sky-light">
            <GitCompareArrows size={14} /> Vergelijker
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Vergelijk producten</h1>
          <p className="mt-3 max-w-xl text-navy-100">
            Zet 2 tot {MAX_COMPARE} producten naast elkaar en vergelijk de specificaties in één oogopslag.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide">
          {chosen.length === 0 ? (
            <div className="rounded-3xl border border-silver-100 bg-white p-12 text-center shadow-soft">
              <GitCompareArrows size={40} className="mx-auto text-silver-300" />
              <h2 className="mt-4 font-display text-xl font-bold text-navy-900">Nog niets om te vergelijken</h2>
              <p className="mt-2 text-silver-500">Voeg producten toe via de vergelijk-knop op een productkaart.</p>
              <Button to="/cv-ketels" className="mt-6">Bekijk CV-ketels</Button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-silver-500">
                  <span className="font-semibold text-navy-900">{chosen.length}</span> van {MAX_COMPARE} producten
                </p>
                <button onClick={clear} className="text-sm font-semibold text-navy-600 hover:underline">Alles wissen</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-40 bg-white" />
                      {chosen.map((p) => (
                        <th key={p.id} className="p-3 align-top">
                          <div className="relative rounded-3xl border border-silver-100 bg-white p-4 shadow-soft">
                            <button
                              onClick={() => remove(p.id)}
                              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-silver-100 text-navy-600 hover:bg-silver-200"
                              aria-label="Verwijderen"
                            >
                              <X size={14} />
                            </button>
                            <ProductImage product={p} className="aspect-[4/3]" />
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-navy-500">{p.brand}</p>
                            <Link to={`/product/${p.slug}`} className="block font-display text-base font-bold text-navy-900 hover:text-navy-600">
                              {p.model}
                            </Link>
                            <div className="mt-1.5"><Stars rating={p.rating} size={12} /></div>
                            <Button to={`/product/${p.slug}`} size="sm" className="mt-3 w-full">Bekijk</Button>
                          </div>
                        </th>
                      ))}
                      {chosen.length < MAX_COMPARE && (
                        <th className="p-3 align-top">
                          <Link
                            to="/cv-ketels"
                            className="flex h-full min-h-[220px] w-44 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-silver-200 text-silver-400 hover:border-navy-300 hover:text-navy-600"
                          >
                            <Plus size={24} />
                            <span className="text-sm font-semibold">Product toevoegen</span>
                          </Link>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => {
                      const values = chosen.map((p) => row.get(p));
                      if (values.every((v) => v === undefined)) return null;
                      return (
                        <tr key={row.label} className={ri % 2 ? 'bg-silver-50' : ''}>
                          <td className="sticky left-0 z-10 bg-inherit px-3 py-4 text-sm font-semibold text-navy-700">
                            {row.label}
                          </td>
                          {chosen.map((p, ci) => (
                            <td key={p.id} className="px-3 py-4 text-center text-sm text-navy-900">
                              {values[ci] === undefined ? (
                                <Minus size={15} className="mx-auto text-silver-300" />
                              ) : values[ci] === 'Ja' ? (
                                <Check size={16} className="mx-auto text-emerald-500" />
                              ) : (
                                <span className="font-medium">{values[ci]}</span>
                              )}
                            </td>
                          ))}
                          {chosen.length < MAX_COMPARE && <td />}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
