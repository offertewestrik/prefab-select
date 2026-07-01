import Link from "next/link";
import { brand } from "@repo/core";

// ── Design tokens uit de handoff (Nederlands Loodgieterplatform Design System) ──
const HEAD = "var(--font-sora), 'Sora', sans-serif";
const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";
const C = {
  ink: "#0E1B33",
  nav: "#475069",
  blue: "#2563EB",
  topbarBg: "#0B1730",
  topbarText: "#C2D0E8",
  green: "#16D183",
  star: "#FFB400",
  line: "#EAEFF6",
  outline: "#D7DEEA",
};

// Echte routes (geen .dc.html), getrimd tot 6 items voor de nav-breedte van het ontwerp.
const nav = [
  { label: "Diensten", href: "/diensten", chevron: true },
  { label: "Vakmannen", href: "/vakmannen" },
  { label: "Hoe het werkt", href: "/hoe-het-werkt" },
  { label: "Reviews", href: "/reviews" },
  { label: "Keurmerken", href: "/keurmerken" },
  { label: "Voor vakmannen", href: "/voor-vakmannen" },
];

// Responsive hide-regels (gescoped onder .lph), in de stijl van de dienst-pagina.
const css = `
  @media (max-width:1024px){
    .lph [data-nav]{display:none !important}
    .lph [data-topbar]{display:none !important}
  }
  @keyframes lph-blink{0%,100%{opacity:1}50%{opacity:.35}}
  .lph [data-dot]{animation:lph-blink 1.4s ease-in-out infinite}
`;

export function SiteHeader() {
  return (
    <div className="lph" style={{ fontFamily: BODY }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Topbar */}
      <div data-topbar style={{ background: C.topbarBg, color: C.topbarText }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 28px",
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M16 18a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#5B8DEF" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              4.200+ aangesloten vakmannen
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6l7-3Z" stroke="#5B8DEF" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#5B8DEF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Gecertificeerde vakmensen
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 13l4 4L19 7" stroke={C.green} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              100% gratis &amp; vrijblijvend
            </span>
          </div>
          <a
            href={brand.phoneHref}
            style={{ display: "flex", alignItems: "center", gap: 7, color: "#fff", textDecoration: "none", fontWeight: 700 }}
          >
            <span data-dot style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
            Spoed? 24/7 — {brand.phone}
          </a>
        </div>
      </div>

      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,.88)",
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 28px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(150deg,#3B82F6,#1E4FD6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 14px rgba(37,99,235,.32)",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2.5C12 2.5 5 9.4 5 14.4a7 7 0 0 0 14 0C19 9.4 12 2.5 12 2.5Z" fill="#fff" />
                <path d="M9.4 14.2a2.6 2.6 0 0 0 2.6 2.6" stroke="#1E4FD6" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 19, letterSpacing: "-.02em", color: C.ink }}>
              Loodgieter<span style={{ color: C.blue }}>platform.nl</span>
            </span>
          </Link>

          {/* Nav */}
          <nav data-nav style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 15, fontWeight: 600, color: C.nav }}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ display: "flex", alignItems: "center", gap: 5, color: "inherit", textDecoration: "none" }}
              >
                {item.label}
                {item.chevron && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA's */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/login"
              style={{
                padding: "10px 18px",
                border: `1.5px solid ${C.outline}`,
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                color: C.ink,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Inloggen
            </Link>
            <Link
              href="/aanvraag"
              style={{
                padding: "11px 18px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                color: "#fff",
                textDecoration: "none",
                background: C.blue,
                boxShadow: "0 8px 18px rgba(37,99,235,.30)",
                whiteSpace: "nowrap",
              }}
            >
              Gratis aanvraag
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
