"use client";

import Link from "next/link";
import { useState } from "react";
import { C, HEAD, BODY } from "@/components/marketing/ds";

// ─────────────────────────────────────────────────────────────────────────
//  Interactieve "Ontdek wat wij in jouw woning doen"-sectie.
//  Self-contained client component: chips + hotspots sturen één actieve index.
//  Geen backend calls; offerte-links gaan naar /aanvraag?dienst=<slug>.
// ─────────────────────────────────────────────────────────────────────────

type Service = {
  slug: string;
  name: string;
  desc: string;
  iconPath: string;
  img: string;
  pos: { top: string; left: string };
};

const SERVICES: readonly Service[] = [
  {
    slug: "cv-ketel-vervangen",
    name: "CV-ketel",
    desc: "Vervangen of onderhoud van je CV-ketel, vaak binnen 48 uur.",
    iconPath:
      "M12 3c1.5 2.5 3.5 3.5 3.5 6.5a3.5 3.5 0 1 1-7 0c0-1.2.5-2 1.3-2.8.2 1 .9 1.6 1.7 1.8.1-2-.5-3.6-.5-5.5Z",
    img: "/images/services/cv-ketel-onderhoud.webp",
    pos: { top: "20%", left: "30%" },
  },
  {
    slug: "warmtepomp-installeren",
    name: "Warmtepomp",
    desc: "Duurzaam verwarmen met een energiezuinige warmtepomp.",
    iconPath: "M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9",
    img: "/images/services/hybride-warmtepomp.webp",
    pos: { top: "16%", left: "64%" },
  },
  {
    slug: "vloerverwarming-aanleggen",
    name: "Vloerverwarming",
    desc: "Comfortabele, gelijkmatige warmte door het hele huis.",
    iconPath:
      "M3 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2M3 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2",
    img: "/images/services/vloerverwarming-leggen.webp",
    pos: { top: "70%", left: "40%" },
  },
  {
    slug: "radiatoren-plaatsen",
    name: "Radiatoren",
    desc: "Plaatsen of vervangen van radiatoren in elke ruimte.",
    iconPath: "M5 5v14M9.5 5v14M14 5v14M18.5 5v14M4 8.5h15M4 15.5h15",
    img: "/images/services/design-radiator.webp",
    pos: { top: "44%", left: "22%" },
  },
  {
    slug: "badkamer-renovatie",
    name: "Badkamer",
    desc: "Complete renovatie van je badkamer, van ontwerp tot oplevering.",
    iconPath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM7 12V6.5a2 2 0 0 1 4 0",
    img: "/images/services/badkamer-renovatie.webp",
    pos: { top: "52%", left: "70%" },
  },
  {
    slug: "lekkage-verhelpen",
    name: "Lekkage",
    desc: "Snel opsporen en verhelpen van lekkages.",
    iconPath: "M12 3s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10Z",
    img: "/foto/lekkages/lekkages-01.jpg",
    pos: { top: "34%", left: "50%" },
  },
  {
    slug: "ontstopping",
    name: "Ontstopping",
    desc: "Verstopte afvoer of riool? Snel weer vrij.",
    iconPath:
      "M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.3-2.3 2.5-2.5Z",
    img: "/foto/leidingwerk/leidingwerk-01.jpg",
    pos: { top: "82%", left: "64%" },
  },
  {
    slug: "leidingwerk",
    name: "Leidingwerk",
    desc: "Aanleg en aanpassing van waterleidingen.",
    iconPath: "M6 4v8a3 3 0 0 0 3 3h9M18 11l3 4-3 4",
    img: "/images/services/waterleiding-aanleggen-repareren.webp",
    pos: { top: "60%", left: "50%" },
  },
] as const;

function ServiceIcon({ d, stroke = C.blue, s = 22 }: { d: string; stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={d} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HouseExplorer() {
  const [active, setActive] = useState(0);

  // Guard array access — strict-TS clean (geen non-null assertion nodig).
  const current = SERVICES[active] ?? SERVICES[0]!;

  return (
    <section
      className="lph-house"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "112px 28px",
        fontFamily: BODY,
      }}
    >
      <style>{`
        @keyframes lph-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,.5); }
          70% { box-shadow: 0 0 0 13px rgba(37,99,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        .lph-house .lph-chip { transition: background .15s ease, color .15s ease, border-color .15s ease; }
        .lph-house .lph-chip:hover { background: #DCE7FF; border-color: #C7D8FF; }
        .lph-house .lph-chip[data-on="1"]:hover { background: ${C.blueDark}; }
        .lph-house .lph-hotspot { transition: transform .15s ease; }
        .lph-house .lph-hotspot:hover { transform: scale(1.12); }
        @media (max-width: 980px) {
          .lph-house [data-2col] { grid-template-columns: 1fr !important; }
          .lph-house [data-panel] { min-height: 360px !important; }
        }
      `}</style>

      <div
        data-2col
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* ── LINKER kolom ── */}
        <div>
          <div
            style={{
              fontFamily: HEAD,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".12em",
              color: C.blue,
              marginBottom: 14,
            }}
          >
            INTERACTIEF
          </div>

          <h2
            style={{
              fontFamily: HEAD,
              fontSize: 38,
              lineHeight: 1.12,
              fontWeight: 700,
              color: C.ink,
              margin: "0 0 16px",
              letterSpacing: "-.01em",
            }}
          >
            Ontdek wat wij in jouw woning doen
          </h2>

          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.65,
              color: C.muted,
              maxWidth: 520,
              margin: "0 0 26px",
            }}
          >
            Van CV-ketel en warmtepomp tot vloerverwarming, lekkage en ontstopping — klik op een
            onderdeel en vraag direct een offerte aan voor die klus.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 30,
            }}
          >
            {SERVICES.map((svc, i) => {
              const on = i === active;
              return (
                <button
                  key={svc.slug}
                  type="button"
                  className="lph-chip"
                  data-on={on ? "1" : "0"}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  style={{
                    cursor: "pointer",
                    fontFamily: BODY,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "9px 16px",
                    borderRadius: 999,
                    border: on ? "1px solid transparent" : "1px solid #DCE7FF",
                    background: on ? C.blue : "#EFF4FF",
                    color: on ? "#fff" : C.blue,
                  }}
                >
                  {svc.name}
                </button>
              );
            })}
          </div>

          <Link
            href="/aanvraag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.blue,
              color: "#fff",
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: 15.5,
              textDecoration: "none",
              padding: "14px 26px",
              borderRadius: 12,
              boxShadow: "0 10px 24px -10px rgba(37,99,235,.6)",
            }}
          >
            Start je aanvraag
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* ── RECHTER kolom: gestileerd "huis" ── */}
        <div
          data-panel
          style={{
            position: "relative",
            minHeight: 452,
            borderRadius: 22,
            background: "linear-gradient(150deg,#1E4FD6,#2563EB 45%,#0E1F45)",
            overflow: "hidden",
            boxShadow: "0 30px 60px -30px rgba(14,31,69,.6)",
          }}
        >
          {/* foto van de actieve dienst als achtergrond */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.img}
            alt={current.name}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* donkere overlay zodat hotspots en kaart leesbaar blijven */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 22,
              background:
                "linear-gradient(150deg, rgba(14,31,69,.55), rgba(30,79,214,.32) 45%, rgba(14,31,69,.72))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.14), inset 0 -60px 120px rgba(14,31,69,.45)",
              pointerEvents: "none",
            }}
          />

          {/* hotspots */}
          {SERVICES.map((svc, i) => {
            const on = i === active;
            return (
              <button
                key={svc.slug}
                type="button"
                className="lph-hotspot"
                onClick={() => setActive(i)}
                aria-label={svc.name}
                aria-pressed={on}
                style={{
                  position: "absolute",
                  top: svc.pos.top,
                  left: svc.pos.left,
                  transform: "translate(-50%, -50%)",
                  width: on ? 38 : 32,
                  height: on ? 38 : 32,
                  borderRadius: "50%",
                  border: on ? "2px solid #fff" : "2px solid rgba(255,255,255,.7)",
                  background: C.blue,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  boxShadow: "0 6px 16px -4px rgba(14,31,69,.7)",
                  animation: on ? "lph-pulse 1.8s infinite" : undefined,
                  zIndex: on ? 3 : 2,
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            );
          })}

          {/* drijvende detail-kaart */}
          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 22,
              borderRadius: 15,
              background: "rgba(255,255,255,.94)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 20px 44px -18px rgba(14,31,69,.55)",
              padding: 18,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              zIndex: 4,
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#EFF4FF",
                border: "1px solid #DCE7FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ServiceIcon d={current.iconPath} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontFamily: HEAD,
                  fontWeight: 700,
                  fontSize: 17,
                  color: C.ink,
                  marginBottom: 3,
                }}
              >
                {current.name}
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: C.muted,
                  margin: "0 0 10px",
                }}
              >
                {current.desc}
              </p>
              <Link
                href={`/aanvraag?dienst=${current.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: HEAD,
                  fontWeight: 700,
                  fontSize: 14,
                  color: C.blue,
                  textDecoration: "none",
                }}
              >
                Offerte aanvragen
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
