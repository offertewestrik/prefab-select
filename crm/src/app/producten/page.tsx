"use client";

import { useMemo, useState } from "react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { EENHEDEN, DEFAULT_BTW } from "@/lib/constants";
import { euroCent } from "@/lib/format";
import type { Product } from "@/lib/types";
import { DownloadCloud, Package, Plus, Search, Trash2 } from "lucide-react";

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";

export default function ProductenPage() {
  const mounted = useMounted();
  const products = useCrm((s) => s.products);
  const addProduct = useCrm((s) => s.addProduct);
  const updateProduct = useCrm((s) => s.updateProduct);
  const deleteProduct = useCrm((s) => s.deleteProduct);
  const importCatalogus = useCrm((s) => s.importCatalogus);

  const [zoek, setZoek] = useState("");
  const [nieuwOpen, setNieuwOpen] = useState(false);
  const [importMelding, setImportMelding] = useState<string | null>(null);

  const gefilterd = useMemo(() => {
    const norm = zoek.toLowerCase().trim();
    return norm
      ? products.filter(
          (p) =>
            p.naam.toLowerCase().includes(norm) ||
            p.categorie.toLowerCase().includes(norm) ||
            (p.beschrijving ?? "").toLowerCase().includes(norm),
        )
      : products;
  }, [products, zoek]);

  const perCategorie = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of gefilterd) {
      const lijst = map.get(p.categorie) ?? [];
      lijst.push(p);
      map.set(p.categorie, lijst);
    }
    for (const lijst of map.values()) lijst.sort((a, b) => a.naam.localeCompare(b.naam));
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [gefilterd]);

  function doeImport() {
    const n = importCatalogus();
    setImportMelding(
      n > 0
        ? `${n} configurator-producten toegevoegd. Vul nu de prijzen in.`
        : "Alle configurator-producten staan al in de catalogus.",
    );
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Producten"
        subtitel="Eigen productcatalogus — dezelfde opties als de configurator, aanklikbaar in offertes"
        actie={
          <div className="flex items-center gap-2">
            <button
              onClick={doeImport}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
            >
              <DownloadCloud className="h-4 w-4" /> Configurator-producten importeren
            </button>
            <button
              onClick={() => setNieuwOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              <Plus className="h-4 w-4" /> Product
            </button>
          </div>
        }
      />

      {importMelding && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {importMelding}
        </div>
      )}

      {nieuwOpen && (
        <NieuwProductForm
          onOpslaan={(p) => {
            addProduct(p);
            setNieuwOpen(false);
          }}
          onAnnuleren={() => setNieuwOpen(false)}
        />
      )}

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className={`${inputCls} pl-9`}
          placeholder="Zoek product of categorie…"
          value={zoek}
          onChange={(e) => setZoek(e.target.value)}
        />
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <Package className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <h3 className="font-bold text-slate-900">Nog geen producten</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Importeer in één klik alle opties uit de configurator (gevels, daken, kozijnen,
            installaties…) en vul daarna je eigen prijzen in. Of voeg handmatig een product toe.
          </p>
          <button
            onClick={doeImport}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <DownloadCloud className="h-4 w-4" /> Configurator-producten importeren
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {perCategorie.map(([categorie, lijst]) => (
            <div key={categorie} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <h3 className="mb-3 font-bold text-slate-900">
                {categorie} <span className="ml-1 text-sm font-medium text-slate-400">({lijst.length})</span>
              </h3>
              <div className="space-y-2">
                <div className="hidden grid-cols-12 gap-2 px-1 text-xs font-semibold uppercase text-slate-400 sm:grid">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Eenheid</div>
                  <div className="col-span-2 text-right">Prijs (excl. btw)</div>
                  <div className="col-span-1 text-right">Btw%</div>
                  <div className="col-span-1 text-center">Actief</div>
                  <div className="col-span-1" />
                </div>
                {lijst.map((p) => (
                  <ProductRij key={p.id} product={p} onUpdate={updateProduct} onDelete={deleteProduct} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductRij({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate: (id: string, patch: Partial<Product>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={`grid grid-cols-12 items-center gap-2 ${product.actief ? "" : "opacity-50"}`}>
      <div className="col-span-12 sm:col-span-5">
        <input
          className={inputCls}
          value={product.naam}
          onChange={(e) => onUpdate(product.id, { naam: e.target.value })}
        />
        {product.beschrijving && (
          <p className="mt-0.5 truncate px-1 text-xs text-slate-400" title={product.beschrijving}>
            {product.beschrijving}
          </p>
        )}
      </div>
      <select
        className="col-span-3 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-2"
        value={product.eenheid}
        onChange={(e) => onUpdate(product.id, { eenheid: e.target.value })}
      >
        {EENHEDEN.map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>
      <input
        type="number"
        className={`col-span-4 rounded-lg border px-2 py-2 text-right text-sm outline-none focus:border-brand-500 sm:col-span-2 ${
          product.prijsPerStuk === 0 ? "border-amber-300 bg-amber-50" : "border-slate-200"
        }`}
        title={product.prijsPerStuk === 0 ? "Prijs nog invullen" : euroCent(product.prijsPerStuk)}
        value={product.prijsPerStuk}
        onChange={(e) => onUpdate(product.id, { prijsPerStuk: Number(e.target.value) || 0 })}
      />
      <input
        type="number"
        className="col-span-2 rounded-lg border border-slate-200 px-2 py-2 text-right text-sm outline-none focus:border-brand-500 sm:col-span-1"
        value={product.btwPercentage}
        onChange={(e) => onUpdate(product.id, { btwPercentage: Number(e.target.value) || 0 })}
      />
      <div className="col-span-2 flex justify-center sm:col-span-1">
        <input
          type="checkbox"
          className="h-4 w-4 accent-brand-600"
          checked={product.actief}
          onChange={(e) => onUpdate(product.id, { actief: e.target.checked })}
        />
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => {
            if (confirm(`"${product.naam}" verwijderen uit de catalogus?`)) onDelete(product.id);
          }}
          className="text-slate-300 hover:text-rose-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function NieuwProductForm({
  onOpslaan,
  onAnnuleren,
}: {
  onOpslaan: (p: Omit<Product, "id" | "aangemaaktOp">) => void;
  onAnnuleren: () => void;
}) {
  const [naam, setNaam] = useState("");
  const [categorie, setCategorie] = useState("Overig");
  const [beschrijving, setBeschrijving] = useState("");
  const [eenheid, setEenheid] = useState("stuks");
  const [prijs, setPrijs] = useState(0);
  const [btw, setBtw] = useState(DEFAULT_BTW);

  return (
    <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
      <h3 className="mb-4 font-bold text-slate-900">Nieuw product</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Naam *</label>
          <input className={inputCls} value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Bijv. Velux dakraam" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Categorie</label>
          <input className={inputCls} value={categorie} onChange={(e) => setCategorie(e.target.value)} placeholder="Bijv. Dakbedekking" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-500">Beschrijving (komt op de offerte)</label>
          <input className={inputCls} value={beschrijving} onChange={(e) => setBeschrijving(e.target.value)} placeholder="Korte omschrijving voor de klant…" />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:col-span-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Eenheid</label>
            <select className={inputCls} value={eenheid} onChange={(e) => setEenheid(e.target.value)}>
              {EENHEDEN.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Prijs (excl. btw)</label>
            <input type="number" className={inputCls} value={prijs} onChange={(e) => setPrijs(Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Btw%</label>
            <input type="number" className={inputCls} value={btw} onChange={(e) => setBtw(Number(e.target.value) || 0)} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onAnnuleren} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          Annuleren
        </button>
        <button
          disabled={!naam.trim()}
          onClick={() =>
            onOpslaan({
              naam: naam.trim(),
              beschrijving: beschrijving.trim() || undefined,
              categorie: categorie.trim() || "Overig",
              eenheid,
              prijsPerStuk: prijs,
              btwPercentage: btw,
              actief: true,
            })
          }
          className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
        >
          Product opslaan
        </button>
      </div>
    </div>
  );
}
