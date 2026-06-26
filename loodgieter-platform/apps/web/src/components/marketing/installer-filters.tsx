import { urls } from "@repo/seo";
import type { DirectoryFilter } from "@/features/installers/server/directory";

interface Options {
  services: { slug: string; name: string }[];
  provinces: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
  certs: string[];
}

const selectCls = "h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-white px-2 text-sm";
const labelCls = "mb-1 block text-xs font-medium text-neutral-700";

/**
 * GET-formulier (geen client-JS nodig). Filters posten altijd naar /vakmannen,
 * zodat ze vrij te combineren zijn; de SEO-landingspagina's prefillen de waarden.
 */
export function InstallerFilters({ options, current }: { options: Options; current: DirectoryFilter }) {
  return (
    <form method="get" action={urls.installers()} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2 lg:col-span-1">
          <span className={labelCls}>Zoek op bedrijfsnaam</span>
          <input
            name="q"
            defaultValue={current.q ?? ""}
            placeholder="Bedrijfsnaam…"
            className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
          />
        </label>

        <label>
          <span className={labelCls}>Dienst</span>
          <select name="dienst" defaultValue={current.service ?? ""} className={selectCls}>
            <option value="">Alle diensten</option>
            {options.services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelCls}>Provincie</span>
          <select name="provincie" defaultValue={current.province ?? ""} className={selectCls}>
            <option value="">Alle provincies</option>
            {options.provinces.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelCls}>Plaats</span>
          <select name="plaats" defaultValue={current.city ?? ""} className={selectCls}>
            <option value="">Alle plaatsen</option>
            {options.cities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelCls}>Minimale beoordeling</span>
          <select name="score" defaultValue={current.minRating ? String(current.minRating) : ""} className={selectCls}>
            <option value="">Alle beoordelingen</option>
            <option value="4.5">4,5+ sterren</option>
            <option value="4">4+ sterren</option>
            <option value="3">3+ sterren</option>
          </select>
        </label>

        <label>
          <span className={labelCls}>Keurmerk</span>
          <select name="keurmerk" defaultValue={current.cert ?? ""} className={selectCls}>
            <option value="">Alle keurmerken</option>
            {options.certs.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelCls}>Bij jou (plaats of postcode)</span>
          <input
            name="bij"
            defaultValue={current.near ?? ""}
            placeholder="bijv. Eindhoven of 5611"
            className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
          />
        </label>

        <label>
          <span className={labelCls}>Binnen straal</span>
          <select name="straal" defaultValue={current.radiusKm ? String(current.radiusKm) : ""} className={selectCls}>
            <option value="">Geen maximum</option>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
          </select>
        </label>

        <label>
          <span className={labelCls}>Sorteren</span>
          <select name="sort" defaultValue={current.sort ?? "rating"} className={selectCls}>
            <option value="distance">Dichtstbij (vul ‘bij jou’ in)</option>
            <option value="rating">Beste beoordeling</option>
            <option value="reviews">Meeste reviews</option>
            <option value="region">Regio (A–Z)</option>
            <option value="city">Plaats (A–Z)</option>
            <option value="recent">Nieuw toegevoegd</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="spoed"
            value="1"
            defaultChecked={!!current.emergency}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Alleen 24/7 spoedservice
        </label>
        <div className="flex gap-2">
          <a href={urls.installers()} className="inline-flex h-10 items-center rounded-[var(--radius-md)] px-3 text-sm text-neutral-500 hover:text-neutral-900">
            Wis filters
          </a>
          <button className="h-10 rounded-[var(--radius-md)] bg-primary-500 px-5 text-sm font-medium text-white hover:bg-primary-600">
            Filter vakmannen
          </button>
        </div>
      </div>
    </form>
  );
}
