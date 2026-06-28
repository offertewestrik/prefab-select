import Link from "next/link";
import { urls } from "@repo/seo";
import { C, HEAD } from "@/components/marketing/ds";
import { InstallerCard } from "./installer-card";
import { InstallerFilters } from "./installer-filters";
import { LeadCta } from "./lead-cta";
import type { DirectoryFilter, InstallerCardData } from "@/features/installers/server/directory";

interface Options {
  services: { slug: string; name: string }[];
  provinces: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
  certs: string[];
}

interface InternalLinks {
  services: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
}

/** Volledig overzichtsblok: filters + resultaten + CTA. Herbruikt door alle vakmannen-pagina's. */
export function InstallerDirectory({
  title,
  intro,
  items,
  total,
  truncated,
  options,
  current,
  ctaServiceSlug,
  ctaCitySlug,
  originLabel,
  internalLinks,
}: {
  title: string;
  intro: string;
  items: InstallerCardData[];
  total: number;
  truncated: boolean;
  options: Options;
  current: DirectoryFilter;
  ctaServiceSlug?: string;
  ctaCitySlug?: string;
  originLabel?: string | null;
  internalLinks?: InternalLinks;
}) {
  return (
    <div className="lph-dir" style={{ display: "flex", flexDirection: "column", gap: 28, color: C.body }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lph-dir [data-results]{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
            @media (max-width:980px){.lph-dir [data-results]{grid-template-columns:repeat(2,1fr)}}
            @media (max-width:640px){.lph-dir [data-results]{grid-template-columns:1fr}}
            .lph-dir [data-pill]:hover{text-decoration:underline}
          `,
        }}
      />

      <header>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: C.blue,
            marginBottom: 10,
          }}
        >
          Vakmannen
        </div>
        <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 32, lineHeight: 1.12, letterSpacing: "-.025em", color: C.ink }}>
          {title}
        </h1>
        <p style={{ marginTop: 12, maxWidth: 680, fontSize: 16, lineHeight: 1.6, color: C.muted }}>{intro}</p>
      </header>

      <InstallerFilters options={options} current={current} />

      <p style={{ fontSize: 14, fontWeight: 600, color: C.muted2 }}>
        {total === 0 ? "Geen vakmannen gevonden" : `${total} ${total === 1 ? "vakman" : "vakmannen"} gevonden`}
        {originLabel && ` in de buurt van ${originLabel}`}
        {truncated && ` — eerste ${items.length} getoond`}
      </p>

      {items.length === 0 ? (
        <div
          style={{
            background: "#F6F9FE",
            border: `1px dashed ${C.line3}`,
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
          }}
        >
          <p style={{ color: C.body, fontWeight: 600 }}>Geen vakmannen gevonden met deze filters.</p>
          <p style={{ marginTop: 6, fontSize: 14, color: C.muted3 }}>
            Probeer een ander filter of vraag direct een offerte aan.
          </p>
        </div>
      ) : (
        <div data-results>
          {items.map((c) => (
            <InstallerCard key={c.id} c={c} />
          ))}
        </div>
      )}

      <LeadCta serviceSlug={ctaServiceSlug} citySlug={ctaCitySlug} title="Liever direct offertes vergelijken?" />

      {internalLinks && (internalLinks.services.length > 0 || internalLinks.cities.length > 0) && (
        <nav
          aria-label="Interne links"
          style={{
            display: "grid",
            gap: 30,
            borderTop: `1px solid ${C.line}`,
            paddingTop: 28,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {internalLinks.services.length > 0 && (
            <div>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 12 }}>
                Populaire diensten
              </h2>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {internalLinks.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={urls.service(s.slug)}
                      data-pill
                      style={{
                        display: "inline-block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#475069",
                        background: "#F4F7FB",
                        border: "1px solid #E6ECF5",
                        borderRadius: 8,
                        padding: "8px 12px",
                        textDecoration: "none",
                      }}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {internalLinks.cities.length > 0 && (
            <div>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 12 }}>
                Vakmannen per plaats
              </h2>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {internalLinks.cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={urls.installersByFacet(c.slug)}
                      data-pill
                      style={{
                        display: "inline-block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.blue,
                        background: "#EFF4FF",
                        border: "1px solid #DCE7FF",
                        borderRadius: 8,
                        padding: "8px 12px",
                        textDecoration: "none",
                      }}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
