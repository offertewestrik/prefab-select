"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import nl from "@svg-maps/netherlands";

// Koppelt de provincie-id's uit @svg-maps/netherlands aan de slugs in de DB.
const ID_TO_SLUG: Record<string, string> = {
  dr: "drenthe",
  fl: "flevoland",
  fr: "friesland",
  ge: "gelderland",
  gr: "groningen",
  li: "limburg",
  nb: "noord-brabant",
  nh: "noord-holland",
  ov: "overijssel",
  ut: "utrecht",
  ze: "zeeland",
  zh: "zuid-holland",
};

type ProvinceCount = { slug: string; name: string; count: number };

const HEAD = "var(--font-sora), 'Sora', sans-serif";
const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";

// Blauwtinten: lichter = minder vakmannen, donkerder = meer.
const SHADES = ["#DCE7FF", "#BBD0FF", "#8FB2FF", "#5B8DEF", "#2563EB", "#1E4FD6"];

function shadeFor(count: number, max: number): string {
  if (max <= 0 || count <= 0) return "#E8EEF7";
  const ratio = count / max;
  const idx = Math.min(SHADES.length - 1, Math.floor(ratio * SHADES.length));
  return SHADES[idx] ?? SHADES[0]!;
}

export function CoverageMap({ data }: { data: ProvinceCount[] }) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  const bySlug = useMemo(() => new Map(data.map((d) => [d.slug, d])), [data]);
  const max = useMemo(() => data.reduce((m, d) => Math.max(m, d.count), 0), [data]);
  const total = useMemo(() => data.reduce((s, d) => s + d.count, 0), [data]);

  const activeData = active ? bySlug.get(active) : null;
  const top = useMemo(() => [...data].sort((a, b) => b.count - a.count).slice(0, 6), [data]);

  return (
    <section
      id="dekking"
      style={{
        position: "relative",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "112px 28px",
        fontFamily: BODY,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#2563EB" }}>
          Heel Nederland
        </span>
        <h2 style={{ fontFamily: HEAD, fontSize: 32, fontWeight: 800, letterSpacing: "-.02em", color: "#0E1B33", marginTop: 8 }}>
          Vakmannen in elke provincie
        </h2>
        <p style={{ fontSize: 15.5, color: "#56627C", marginTop: 10, maxWidth: 560, marginInline: "auto" }}>
          {total > 0
            ? `${total.toLocaleString("nl-NL")} aangesloten vakmannen, actief in alle 12 provincies. Beweeg over de kaart of kies je provincie.`
            : "Aangesloten vakmannen, actief in alle 12 provincies. Beweeg over de kaart of kies je provincie."}
        </p>
      </div>

      <div data-2col style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 40, alignItems: "center" }}>
        {/* Kaart */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <svg
            viewBox={nl.viewBox}
            role="img"
            aria-label="Kaart van Nederland met aangesloten vakmannen per provincie"
            style={{ width: "100%", maxWidth: 460, height: "auto", filter: "drop-shadow(0 24px 50px rgba(15,27,51,.14))" }}
          >
            {nl.locations.map((loc) => {
              const slug = ID_TO_SLUG[loc.id] ?? loc.id;
              const pc = bySlug.get(slug);
              const isActive = active === slug;
              return (
                <path
                  key={loc.id}
                  d={loc.path}
                  fill={isActive ? "#F26A1B" : shadeFor(pc?.count ?? 0, max)}
                  stroke="#fff"
                  strokeWidth={1.4}
                  style={{ cursor: "pointer", transition: "fill .2s ease", outline: "none" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pc?.name ?? loc.name}${pc ? ` — ${pc.count} vakmannen` : ""}`}
                  onMouseEnter={() => setActive(slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(slug)}
                  onBlur={() => setActive(null)}
                  onClick={() => router.push(`/vakmannen?provincie=${slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/vakmannen?provincie=${slug}`);
                    }
                  }}
                />
              );
            })}
          </svg>

          {/* Tooltip-kaartje */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              minWidth: 168,
              background: "rgba(255,255,255,.96)",
              backdropFilter: "blur(8px)",
              border: "1px solid #EAEFF6",
              borderRadius: 14,
              boxShadow: "0 16px 34px rgba(8,18,40,.18)",
              padding: "12px 15px",
              opacity: activeData ? 1 : 0,
              transform: activeData ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity .2s ease, transform .2s ease",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15, color: "#0E1B33" }}>
              {activeData?.name ?? ""}
            </div>
            <div style={{ fontSize: 13, color: "#56627C", marginTop: 2 }}>
              <span style={{ fontFamily: HEAD, fontWeight: 800, color: "#2563EB" }}>
                {activeData?.count ?? 0}
              </span>{" "}
              {activeData?.count === 1 ? "vakman" : "vakmannen"}
            </div>
          </div>
        </div>

        {/* Provincielijst */}
        <div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: "#0E1B33", marginBottom: 14 }}>
            Drukste regio&apos;s
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {top.map((p) => (
              <a
                key={p.slug}
                href={`/vakmannen?provincie=${p.slug}`}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: active === p.slug ? "#F4F8FF" : "#fff",
                  border: `1px solid ${active === p.slug ? "#BBD0FF" : "#EAEFF6"}`,
                  borderRadius: 12,
                  padding: "12px 15px",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(15,27,51,.04)",
                  transition: "background .18s ease, border-color .18s ease",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: shadeFor(p.count, max) }} />
                  <span style={{ fontWeight: 700, fontSize: 14.5, color: "#0E1B33" }}>{p.name}</span>
                </span>
                <span style={{ fontSize: 13, color: "#6B7896", fontWeight: 600 }}>
                  {p.count > 0 ? `${p.count} vakmannen` : "Beschikbaar"}
                </span>
              </a>
            ))}
          </div>
          <a
            href="/vakmannen"
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#2563EB",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "12px 20px",
              borderRadius: 11,
              textDecoration: "none",
              boxShadow: "0 12px 24px rgba(37,99,235,.26)",
            }}
          >
            Bekijk alle vakmannen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
