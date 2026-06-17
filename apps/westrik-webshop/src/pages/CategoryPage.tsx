import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { categoryBySlug } from '../data/categories';
import { productsByCategory } from '../data/products';
import type { Product } from '../data/types';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui';

type SortKey = 'populair' | 'prijs-op' | 'prijs-af' | 'vermogen';

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categoryBySlug(slug ?? '');
  const all = useMemo(() => productsByCategory(slug ?? ''), [slug]);

  const [brands, setBrands] = useState<string[]>([]);
  const [cwKlassen, setCwKlassen] = useState<number[]>([]);
  const [types, setTypes] = useState<string[]>([]); // elektrisch/gas
  const [montages, setMontages] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>('populair');
  const [mobileOpen, setMobileOpen] = useState(false);

  const availableBrands: string[] = uniq(all.map((p) => p.brand as string));
  const availableCw = uniq(all.map((p) => p.cwKlasse).filter(Boolean) as number[]).sort();
  const availableTypes = uniq(all.map((p) => p.elektrischOfGas).filter(Boolean) as string[]);
  const availableMontage = uniq(all.map((p) => p.montage).filter(Boolean) as string[]);
  const priceCeiling = Math.max(...all.map((p) => p.price), 0);

  const isCv = slug === 'cv-ketels';
  const isBoiler = slug === 'boilers';

  const toggle = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, val: T) =>
    setter((cur) => (cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]));

  const filtered = useMemo(() => {
    let res = all.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (cwKlassen.length && !(p.cwKlasse && cwKlassen.includes(p.cwKlasse))) return false;
      if (types.length && !(p.elektrischOfGas && types.includes(p.elektrischOfGas))) return false;
      if (montages.length && !(p.montage && montages.includes(p.montage))) return false;
      if (maxPrice && p.price > maxPrice) return false;
      return true;
    });
    res = [...res].sort((a, b) => {
      if (sort === 'prijs-op') return a.price - b.price;
      if (sort === 'prijs-af') return b.price - a.price;
      if (sort === 'vermogen') return (b.vermogenKw ?? 0) - (a.vermogenKw ?? 0);
      return b.rating - a.rating;
    });
    return res;
  }, [all, brands, cwKlassen, types, montages, maxPrice, sort]);

  const activeCount = brands.length + cwKlassen.length + types.length + montages.length + (maxPrice ? 1 : 0);
  const reset = () => {
    setBrands([]); setCwKlassen([]); setTypes([]); setMontages([]); setMaxPrice(0);
  };

  if (!category) {
    return (
      <div className="container-wide py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Categorie niet gevonden</h1>
        <Button to="/" className="mt-6">Terug naar home</Button>
      </div>
    );
  }

  const Filters = (
    <div className="space-y-7">
      {availableBrands.length > 1 && (
        <FilterGroup title="Merk">
          {availableBrands.map((b) => (
            <CheckRow key={b} checked={brands.includes(b)} onChange={() => toggle(setBrands, b)} label={b} />
          ))}
        </FilterGroup>
      )}

      {isCv && availableCw.length > 0 && (
        <FilterGroup title="CW-klasse">
          {availableCw.map((c) => (
            <CheckRow key={c} checked={cwKlassen.includes(c)} onChange={() => toggle(setCwKlassen, c)} label={`CW${c}`} />
          ))}
        </FilterGroup>
      )}

      {isBoiler && availableTypes.length > 0 && (
        <FilterGroup title="Elektrisch / Gas">
          {availableTypes.map((t) => (
            <CheckRow key={t} checked={types.includes(t)} onChange={() => toggle(setTypes, t)} label={t} />
          ))}
        </FilterGroup>
      )}

      {isBoiler && availableMontage.length > 0 && (
        <FilterGroup title="Montage">
          {availableMontage.map((m) => (
            <CheckRow key={m} checked={montages.includes(m)} onChange={() => toggle(setMontages, m)} label={m} />
          ))}
        </FilterGroup>
      )}

      {priceCeiling > 0 && (
        <FilterGroup title="Maximale prijs">
          <input
            type="range"
            min={0}
            max={priceCeiling}
            step={50}
            value={maxPrice || priceCeiling}
            onChange={(e) => setMaxPrice(Number(e.target.value) === priceCeiling ? 0 : Number(e.target.value))}
            className="w-full accent-navy-600"
          />
          <p className="mt-1 text-sm text-silver-500">
            {maxPrice ? `tot € ${maxPrice.toLocaleString('nl-NL')}` : 'Alle prijzen'}
          </p>
        </FilterGroup>
      )}

      {activeCount > 0 && (
        <button onClick={reset} className="text-sm font-semibold text-navy-600 hover:underline">
          Filters wissen ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient text-white">
        <div className="absolute inset-0" />
        <div className="container-wide py-14">
          <nav className="flex items-center gap-1.5 text-sm text-navy-200">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">{category.title}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{category.title}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{category.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {category.highlights.map((h) => (
              <span key={h} className="glass rounded-full px-3 py-1 text-xs font-semibold text-sky-light">{h}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-silver-100 bg-white p-6 shadow-soft">
                <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-navy-900">
                  <SlidersHorizontal size={18} /> Filters
                </h2>
                {Filters}
              </div>
            </aside>

            {/* Content */}
            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-sm text-silver-500">
                  <span className="font-semibold text-navy-900">{filtered.length}</span> producten
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-silver-200 px-4 py-2.5 text-sm font-semibold text-navy-800 lg:hidden"
                  >
                    <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
                  </button>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="rounded-xl border border-silver-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 outline-none focus:border-navy-400"
                  >
                    <option value="populair">Meest populair</option>
                    <option value="prijs-op">Prijs oplopend</option>
                    <option value="prijs-af">Prijs aflopend</option>
                    {isCv && <option value="vermogen">Vermogen</option>}
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-silver-100 bg-white p-12 text-center">
                  <p className="text-silver-500">Geen producten gevonden met deze filters.</p>
                  <button onClick={reset} className="mt-4 font-semibold text-navy-600 hover:underline">Filters wissen</button>
                </div>
              ) : (
                <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p: Product) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="text-navy-700"><X size={22} /></button>
            </div>
            {Filters}
            <Button onClick={() => setMobileOpen(false)} className="mt-8 w-full">
              Toon {filtered.length} producten
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-silver-500">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-navy-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-silver-300 accent-navy-600"
      />
      {label}
    </label>
  );
}
