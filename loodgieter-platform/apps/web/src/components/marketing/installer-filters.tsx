import { urls } from "@repo/seo";
import { C, IcArrow } from "@/components/marketing/ds";
import type { DirectoryFilter } from "@/features/installers/server/directory";

interface Options {
  services: { slug: string; name: string }[];
  provinces: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
  certs: string[];
}

const fieldStyle: React.CSSProperties = {
  height: 42,
  width: "100%",
  borderRadius: 10,
  border: `1.5px solid ${C.line3}`,
  background: "#fff",
  padding: "0 12px",
  fontFamily: "inherit",
  fontSize: 14,
  color: C.ink,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: 12,
  fontWeight: 700,
  color: C.muted2,
};

/**
 * GET-formulier (geen client-JS nodig). Filters posten altijd naar /vakmannen,
 * zodat ze vrij te combineren zijn; de SEO-landingspagina's prefillen de waarden.
 */
export function InstallerFilters({ options, current }: { options: Options; current: DirectoryFilter }) {
  return (
    <form
      method="get"
      action={urls.installers()}
      className="lph-filters"
      style={{
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 6px 18px rgba(15,27,51,.05)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lph-filters input,.lph-filters select{transition:border-color .18s ease, box-shadow .18s ease}
            .lph-filters input:focus,.lph-filters select:focus{border-color:${C.blue} !important;box-shadow:0 0 0 4px rgba(37,99,235,.13)}
            .lph-filters [data-grid]{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
            @media (max-width:880px){.lph-filters [data-grid]{grid-template-columns:repeat(2,1fr)}}
            @media (max-width:560px){.lph-filters [data-grid]{grid-template-columns:1fr}.lph-filters [data-bar]{flex-direction:column !important;align-items:stretch !important}}
          `,
        }}
      />

      <div data-grid>
        <label style={{ gridColumn: "1 / -1" }} className="lph-q">
          <span style={labelStyle}>Zoek op bedrijfsnaam</span>
          <input name="q" defaultValue={current.q ?? ""} placeholder="Bedrijfsnaam…" style={fieldStyle} />
        </label>

        <label>
          <span style={labelStyle}>Dienst</span>
          <select name="dienst" defaultValue={current.service ?? ""} style={fieldStyle}>
            <option value="">Alle diensten</option>
            {options.services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span style={labelStyle}>Provincie</span>
          <select name="provincie" defaultValue={current.province ?? ""} style={fieldStyle}>
            <option value="">Alle provincies</option>
            {options.provinces.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span style={labelStyle}>Plaats</span>
          <select name="plaats" defaultValue={current.city ?? ""} style={fieldStyle}>
            <option value="">Alle plaatsen</option>
            {options.cities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span style={labelStyle}>Minimale beoordeling</span>
          <select name="score" defaultValue={current.minRating ? String(current.minRating) : ""} style={fieldStyle}>
            <option value="">Alle beoordelingen</option>
            <option value="4.5">4,5+ sterren</option>
            <option value="4">4+ sterren</option>
            <option value="3">3+ sterren</option>
          </select>
        </label>

        <label>
          <span style={labelStyle}>Keurmerk</span>
          <select name="keurmerk" defaultValue={current.cert ?? ""} style={fieldStyle}>
            <option value="">Alle keurmerken</option>
            {options.certs.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          <span style={labelStyle}>Bij jou (plaats of postcode)</span>
          <input name="bij" defaultValue={current.near ?? ""} placeholder="bijv. Eindhoven of 5611" style={fieldStyle} />
        </label>

        <label>
          <span style={labelStyle}>Binnen straal</span>
          <select name="straal" defaultValue={current.radiusKm ? String(current.radiusKm) : ""} style={fieldStyle}>
            <option value="">Geen maximum</option>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
          </select>
        </label>

        <label>
          <span style={labelStyle}>Sorteren</span>
          <select name="sort" defaultValue={current.sort ?? "rating"} style={fieldStyle}>
            <option value="distance">Dichtstbij (vul ‘bij jou’ in)</option>
            <option value="rating">Beste beoordeling</option>
            <option value="reviews">Meeste reviews</option>
            <option value="region">Regio (A–Z)</option>
            <option value="city">Plaats (A–Z)</option>
            <option value="recent">Nieuw toegevoegd</option>
          </select>
        </label>
      </div>

      <div
        data-bar
        style={{
          marginTop: 16,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1F2A45", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="spoed"
            value="1"
            defaultChecked={!!current.emergency}
            style={{ width: 16, height: 16, accentColor: C.blue }}
          />
          Alleen 24/7 spoedservice
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={urls.installers()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 16px",
              borderRadius: 10,
              border: "1px solid #D7DEEA",
              fontSize: 14,
              fontWeight: 600,
              color: C.muted,
              textDecoration: "none",
            }}
          >
            Wis filters
          </a>
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 44,
              padding: "0 22px",
              borderRadius: 10,
              border: 0,
              cursor: "pointer",
              background: C.blue,
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              boxShadow: "0 12px 24px rgba(37,99,235,.28)",
            }}
          >
            Filter vakmannen <IcArrow s={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
