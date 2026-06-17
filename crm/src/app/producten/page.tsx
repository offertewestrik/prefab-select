"use client";

import { useMemo, useState } from "react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { EENHEDEN, DEFAULT_BTW } from "@/lib/constants";
import { euroCent } from "@/lib/format";
import { PRODUCT_LIJNEN, categorieVolgorde } from "@/lib/product-catalogus";
import type { Product } from "@/lib/types";
import { AlertTriangle, DownloadCloud, Package, Plus, Search, Trash2, X } from "lucide-react";

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";

export default function ProductenPage() {
  const mounted = useMounted();
  const products = useCrm((s) => s.products);
  const addProduct = useCrm((s) => s.addProduct);
  const updateProduct = useCrm((s) => s.updateProduct);
  const deleteProduct = useCrm((s) => s.deleteProduct);
  const importCatalogus = useCrm((s) => s.importCatalogus);
  const syncError = useCrm((s) => s.syncError);
  const setSyncError = useCrm((s) => s.setSyncError);

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
            (p.lijn ?? "").toLowerCase().includes(norm) ||
            (p.beschrijving ?? "").toLowerCase().includes(norm),
        )
      : products;
  }, [products, zoek]);

  // Groeperen per productlijn (prijslijst) en daarbinnen per categorie, in de
  // volgorde van de prijslijst. Producten zonder lijn vallen onder "Eigen producten".
  const perLijn = useMemo(() => {
    const lijnen = new Map<string, Map<string, Product[]>>();
    for (const p of gefilterd) {
      const lijn = p.lijn ?? "Eigen producten";
      const cats = lijnen.get(lijn) ?? new Map<string, Product[]>();
      const lijst = cats.get(p.categorie) ?? [];
      lijst.push(p);
      cats.set(p.categorie, lijst);
      lijnen.set(lijn, cats);
    }
    const lijnRang = (l: string) => {
      const i = PRODUCT_LIJNEN.indexOf(l);
      return i === -1 ? 999 : i;
    };
    return [...lijnen.entries()]
      .sort(([a], [b]) => lijnRang(a) - lijnRang(b) || a.localeCompare(b))
      .map(([lijn, cats]) => {
        const categorieen = [...cats.entries()].sort(
          ([a], [b]) =>
            categorieVolgorde(lijn, a) - categorieVolgorde(lijn, b) || a.localeCompare(b),
        );
        for (const [, lijst] of categorieen) lijst.sort((a, b) => a.naam.localeCompare(b.naam));
        return [lijn, categorieen] as const;
      });
  }, [gefilterd]);

  function doeImport() {
    const { toegevoegd, bijgewerkt } = importCatalogus();
    setImportMelding(
      toegevoegd > 0 || bijgewerkt > 0
        ? `Prijslijst geïmporteerd: ${toegevoegd} producten toegevoegd${bijgewerkt > 0 ? `, ${bijgewerkt} prijzen ingevuld` : ""}.`
        : "De volledige prijslijst staat al in de catalogus.",
    );
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Producten"
        subtitel="Prijslijsten per productlijn — uitbouw & aanbouw, poolhouses, mantelzorg- & vakantiewoningen — aanklikbaar in offertes"
        actie={
          <div className="flex items-center gap-2">
            <button
              onClick={doeImport}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
            >
              <DownloadCloud className="h-4 w-4" /> Prijslijsten importeren
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

      {syncError && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="font-semibold">Opslaan in de database is mislukt</p>
            <p className="mt-0.5">{syncError}</p>
            <p className="mt-1 text-xs text-rose-700">
              Je wijziging staat nu alleen lokaal. Meestal betekent dit dat de{" "}
              <code className="rounded bg-rose-100 px-1">products</code>-tabel nog niet bestaat in
              Supabase — voer migratie <strong>0011_producten.sql</strong> uit, of controleer de
              Supabase-secrets. Daarna worden producten en btw-tarieven wél bewaard.
            </p>
          </div>
          <button
            onClick={() => setSyncError(null)}
            className="rounded-lg p-1 text-rose-400 hover:bg-rose-100 hover:text-rose-600"
            title="Melding sluiten"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
            Importeer in één klik de complete prijslijsten (uitbouw &amp; aanbouw, poolhouses,
            mantelzorg- &amp; vakantiewoningen) inclusief prijzen. Of voeg handmatig een product toe.
          </p>
          <button
            onClick={doeImport}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <DownloadCloud className="h-4 w-4" /> Prijslijsten importeren
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {perLijn.map(([lijn, categorieen]) => (
            <section key={lijn}>
              <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900">{lijn}</h2>
              <div className="space-y-6">
                {categorieen.map(([categorie, lijst]) => (
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
            </section>
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
          product.prijsPerStuk === 0 && !product.lijn ? "border-amber-300 bg-amber-50" : "border-slate-200"
        }`}
        title={
          product.prijsPerStuk === 0
            ? product.lijn
              ? "Standaard / inbegrepen"
              : "Prijs nog invullen"
            : euroCent(product.prijsPerStuk)
        }
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
