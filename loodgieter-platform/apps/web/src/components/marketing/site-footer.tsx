import Link from "next/link";
import { brand } from "@repo/core";
import { urls } from "@repo/seo";
import { getServicesByCategory } from "@/features/catalog/server/queries";

// ── Design tokens uit de handoff (Nederlands Loodgieterplatform Design System) ──
const HEAD = "var(--font-sora), 'Sora', sans-serif";
const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";
const C = {
  bg: "#0B1730",
  body: "#9FB0CE",
  muted: "#7E8DA8",
  white: "#fff",
  accent: "#5B8DEF",
  star: "#FFB400",
  line: "rgba(255,255,255,.08)",
};

const linkStyle: React.CSSProperties = {
  color: C.body,
  textDecoration: "none",
  fontSize: 13.5,
};

export async function SiteFooter() {
  // Best-effort: toon echte dienstcategorieën in de footer (interne links).
  let categories: { id: string; name: string; services: { slug: string; name: string }[] }[] = [];
  try {
    categories = await getServicesByCategory();
  } catch {
    categories = [];
  }

  // Diensten-kolom: echte services uit de eerste categorie (max 5).
  const diensten = (categories[0]?.services ?? []).slice(0, 5);

  const year = new Date().getFullYear();

  const css = `
    .lpf a { transition: color .16s ease; }
    .lpf a:hover { color: #fff; }
    @media (max-width: 760px) {
      .lpf [data-foot] { grid-template-columns: 1fr 1fr !important; }
    }
  `;

  return (
    <footer
      className="lpf"
      style={{ background: C.bg, color: C.body, fontFamily: BODY }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 28px 30px" }}>
        <div
          data-foot
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
            gap: 30,
          }}
        >
          {/* Col 1 — merk + omschrijving + rating */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "linear-gradient(150deg,#3B82F6,#1E4FD6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2.5C12 2.5 5 9.4 5 14.4a7 7 0 0 0 14 0C19 9.4 12 2.5 12 2.5Z" fill="#fff" />
                </svg>
              </span>
              <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 17, color: C.white }}>
                Loodgieter<span style={{ color: C.accent }}>platform.nl</span>
              </span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 260, color: C.muted }}>
              Het grootste loodgieter- en installatieplatform van Nederland. Vergelijk gratis
              offertes van gecertificeerde vakmannen.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 18,
                background: "rgba(255,255,255,.05)",
                borderRadius: 10,
                padding: "10px 14px",
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.white }}>
                Gecertificeerde vakmensen · gratis &amp; vrijblijvend
              </span>
            </div>
          </div>

          {/* Col 2 — Diensten (echte services) */}
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, color: C.white, fontSize: 14, marginBottom: 14 }}>
              Diensten
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {diensten.length > 0 ? (
                diensten.map((s) => (
                  <Link key={s.slug} href={urls.service(s.slug)} style={linkStyle}>
                    {s.name}
                  </Link>
                ))
              ) : (
                <Link href="/diensten" style={linkStyle}>
                  Alle diensten
                </Link>
              )}
            </div>
          </div>

          {/* Col 3 — Steden */}
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, color: C.white, fontSize: 14, marginBottom: 14 }}>
              Steden
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <Link href="/steden" style={linkStyle}>Amsterdam</Link>
              <Link href="/steden" style={linkStyle}>Rotterdam</Link>
              <Link href="/steden" style={linkStyle}>Den Haag</Link>
              <Link href="/steden" style={linkStyle}>Utrecht</Link>
              <Link href="/steden" style={linkStyle}>Alle steden</Link>
            </div>
          </div>

          {/* Col 4 — Bedrijf */}
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, color: C.white, fontSize: 14, marginBottom: 14 }}>
              Bedrijf
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <Link href="/over-ons" style={linkStyle}>Over ons</Link>
              <Link href="/hoe-het-werkt" style={linkStyle}>Hoe het werkt</Link>
              <Link href="/reviews" style={linkStyle}>Reviews</Link>
              <Link href="/kennisbank" style={linkStyle}>Kennisbank</Link>
              <Link href="/energie-install" style={linkStyle}>Verduurzamen</Link>
              <a href="https://www.prefabselect.nl" style={linkStyle}>Verbouwen? Prefab Select</a>
            </div>
          </div>

          {/* Col 5 — Voor vakmannen */}
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, color: C.white, fontSize: 14, marginBottom: 14 }}>
              Voor vakmannen
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <Link href="/voor-vakmannen" style={linkStyle}>Word partner</Link>
              <Link href="/aanmelden-vakman" style={linkStyle}>Aanmelden</Link>
              <Link href="/login" style={linkStyle}>Inloggen</Link>
            </div>
          </div>
        </div>

        {/* Onderbalk */}
        <div
          style={{
            borderTop: `1px solid ${C.line}`,
            marginTop: 36,
            paddingTop: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 13,
            color: C.muted,
          }}
        >
          <div>
            © {year} {brand.name} — KvK 87654321
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            <Link href="/contact" style={{ ...linkStyle, color: C.muted, fontSize: 13 }}>Privacy</Link>
            <Link href="/contact" style={{ ...linkStyle, color: C.muted, fontSize: 13 }}>Voorwaarden</Link>
            <Link href="/contact" style={{ ...linkStyle, color: C.muted, fontSize: 13 }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
