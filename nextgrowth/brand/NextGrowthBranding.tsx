import { useId } from "react";

/* ============================================================
   NextGrowth — Premium Brand System
   Black / Gold / White · geometric N+G monogram · gold glow
   Positioning order (always): NL · GB · AE · JO  (Arabic = RTL)
   ============================================================ */

const GOLD_STOPS = [
  ["0%", "#FFF3C4"],
  ["38%", "#D4AF37"],
  ["68%", "#B8860B"],
  ["100%", "#FFE9A3"],
];

const goldText = {
  backgroundImage: "linear-gradient(135deg,#FFF3C4 0%,#D4AF37 42%,#B8860B 70%,#FFE9A3 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const LANGS = [
  { flag: "🇳🇱", text: "Digitale Groeisystemen", rtl: false },
  { flag: "🇬🇧", text: "Digital Growth Systems", rtl: false },
  { flag: "🇦🇪", text: "أنظمة النمو الرقمية", rtl: true },
  { flag: "🇯🇴", text: "أنظمة النمو الرقمية", rtl: true },
];

const ARABIC = "'Tajawal','Cairo','Noto Sans Arabic',sans-serif";
const DISPLAY = "'Sora','Plus Jakarta Sans',system-ui,sans-serif";
const BODY = "'Inter',system-ui,sans-serif";

/* ---------- The logomark: geometric interlocking N + G ---------- */
function NGMark({ size = 96, tile = true, glow = true, nodes = true }) {
  const raw = useId().replace(/:/g, "");
  const gid = `g-${raw}`, glw = `w-${raw}`, tl = `t-${raw}`, br = `b-${raw}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      role="img"
      aria-label="NextGrowth monogram"
    >
      <defs>
        <linearGradient id={gid} x1="14" y1="14" x2="106" y2="106" gradientUnits="userSpaceOnUse">
          {GOLD_STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <linearGradient id={br} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7A5C12" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFE9A3" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={tl} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#16161C" />
          <stop offset="60%" stopColor="#0C0C11" />
          <stop offset="100%" stopColor="#070709" />
        </radialGradient>
        <filter id={glw} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {tile && (
        <>
          <rect width="120" height="120" rx="28" fill="#0B0B0F" />
          <rect width="120" height="120" rx="28" fill={`url(#${tl})`} />
          <rect x="1.25" y="1.25" width="117.5" height="117.5" rx="26.75"
            fill="none" stroke={`url(#${br})`} strokeWidth="1.5" />
        </>
      )}

      {/* strokes */}
      <g transform="translate(-6,-2)" stroke={`url(#${gid})`} fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        filter={glow ? `url(#${glw})` : undefined}>
        {/* N */}
        <path d="M34 84 L34 42 L66 84 L66 42" strokeWidth="8" />
        {/* G — three-quarter ring opening right, with inward tongue */}
        <path d="M104 50 A22 22 0 1 0 104 76 L104 63 L88 63" strokeWidth="7" />
      </g>

      {/* tech node accents */}
      {nodes && (
        <g transform="translate(-6,-2)" fill={`url(#${gid})`}>
          <circle cx="34" cy="42" r="3" />
          <circle cx="66" cy="42" r="3" />
          <circle cx="88" cy="63" r="2.6" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Wordmark ---------- */
function Wordmark({ size = 34, tracking = 0.2 }) {
  return (
    <span style={{
      fontFamily: DISPLAY, fontWeight: 800, fontSize: size,
      letterSpacing: `${tracking}em`, lineHeight: 1, whiteSpace: "nowrap",
    }}>
      <span style={{ color: "#F4F4F5" }}>NEXT</span>
      <span style={goldText}>GROWTH</span>
    </span>
  );
}

/* ---------- Positioning rows (NL · GB · AE · JO) ---------- */
function PositioningRows({ fontSize = 15, dividers = true, align = "stretch", compact = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 8 : 0 }}>
      {LANGS.map((l, i) => {
        const border = dividers && i < LANGS.length - 1
          ? "1px solid rgba(212,175,55,0.22)" : "none";
        const label = (
          <span style={{
            fontFamily: l.rtl ? ARABIC : BODY,
            fontSize, color: "#E7E5E4", fontWeight: l.rtl ? 500 : 600,
            letterSpacing: l.rtl ? "0.01em" : "0.14em",
            textTransform: l.rtl ? "none" : "uppercase",
          }}>{l.text}</span>
        );
        const flag = <span style={{ fontSize: fontSize * 1.5, lineHeight: 1 }}>{l.flag}</span>;
        return (
          <div key={i} dir={l.rtl ? "rtl" : "ltr"}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              justifyContent: l.rtl ? "flex-end" : "flex-start",
              padding: compact ? "0" : "12px 2px",
              borderBottom: compact ? "none" : border,
            }}>
            {l.rtl ? (<>{label}{flag}</>) : (<>{flag}{label}</>)}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Showcase scaffold bits ---------- */
function Panel({ label, children, pad = 36 }) {
  return (
    <section style={{ marginTop: 30 }}>
      <div style={{
        fontFamily: DISPLAY, fontSize: 11, letterSpacing: "0.42em",
        textTransform: "uppercase", color: "#9C7B2E", marginBottom: 14, paddingLeft: 2,
      }}>{label}</div>
      <div className="ng-card" style={{
        borderRadius: 24, background: "linear-gradient(180deg,#0C0C11,#08080B)",
        border: "1px solid rgba(212,175,55,0.16)", padding: pad, overflow: "hidden",
      }}>{children}</div>
    </section>
  );
}

/* ===================== VARIANTS ===================== */

/* 1 — Primary brand card */
function PrimaryCard() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
        <div className="ng-glow" style={{ borderRadius: 28 }}>
          <NGMark size={104} />
        </div>
        <div style={{ minWidth: 220 }}>
          <Wordmark size={38} tracking={0.22} />
          <div style={{
            marginTop: 14, height: 1.5, width: "100%",
            background: "linear-gradient(90deg,#D4AF37,#FFF3C4 30%,transparent)",
          }} />
          <p style={{
            margin: "14px 0 0", fontFamily: DISPLAY, fontSize: 13,
            letterSpacing: "0.34em", textTransform: "uppercase", color: "#A8A29E",
          }}>Digital Growth Systems</p>
        </div>
      </div>
      <div style={{ marginTop: 34 }}>
        <PositioningRows fontSize={16} />
      </div>
    </div>
  );
}

/* 2 — Header lockup (sits in a nav bar) */
function HeaderVariant() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 20, padding: "14px 20px", borderRadius: 16,
      background: "linear-gradient(180deg,#0A0A0E,#060608)",
      border: "1px solid rgba(212,175,55,0.14)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <NGMark size={42} glow={false} nodes={false} />
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Wordmark size={19} tracking={0.18} />
          <span style={{
            fontFamily: BODY, fontSize: 9.5, letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#8A8A8F",
          }}>Digital Growth Systems</span>
        </div>
      </div>
      <nav style={{ display: "flex", gap: 26 }}>
        {["Diensten", "Werk", "Branches", "Contact"].map((x) => (
          <span key={x} style={{
            fontFamily: DISPLAY, fontSize: 13, color: "#C7C2B6", letterSpacing: "0.04em",
          }}>{x}</span>
        ))}
      </nav>
    </div>
  );
}

/* 3 — Office wall branding */
function OfficeWallVariant() {
  return (
    <div style={{
      position: "relative", borderRadius: 18, overflow: "hidden",
      padding: "64px 24px", textAlign: "center",
      background: "radial-gradient(120% 120% at 50% 0%,#15130B 0%,#0A0A0D 45%,#060608 100%)",
    }}>
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "30%", width: 420, height: 420,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(212,175,55,0.20),transparent 62%)",
        filter: "blur(6px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
        <div className="ng-glow"><NGMark size={132} /></div>
        <div style={{ marginTop: 26 }}>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, letterSpacing: "0.3em",
          }}>
            <span style={{ color: "#F4F4F5" }}>NEXT</span><span style={goldText}>GROWTH</span>
          </span>
        </div>
        <div style={{
          marginTop: 20, height: 1.5, width: 260,
          background: "linear-gradient(90deg,transparent,#D4AF37,#FFF3C4,#D4AF37,transparent)",
        }} />
        <p style={{
          margin: "18px 0 30px", fontFamily: DISPLAY, fontSize: 14,
          letterSpacing: "0.5em", textTransform: "uppercase", color: "#BFB48F",
        }}>Digital Growth Systems</p>
        <div style={{ display: "inline-block", textAlign: "start" }}>
          <PositioningRows fontSize={15} dividers={false} compact />
        </div>
      </div>
    </div>
  );
}

/* 4 — Favicon / app icon */
function FaviconVariant() {
  const sizes = [64, 48, 32, 16];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 30, flexWrap: "wrap" }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <NGMark size={s} glow={s >= 32} nodes={s >= 32} />
          <span style={{ fontFamily: BODY, fontSize: 11, color: "#7A7A80" }}>{s}px</span>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginLeft: 6 }}>
        <div className="ng-glow" style={{ borderRadius: 18 }}>
          <NGMark size={72} />
        </div>
        <span style={{ fontFamily: BODY, fontSize: 11, color: "#7A7A80" }}>app icon</span>
      </div>
    </div>
  );
}

/* 5 — Footer strip */
function FooterVariant() {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      gap: 28, flexWrap: "wrap", padding: "6px 4px",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <NGMark size={40} glow={false} nodes={false} />
          <Wordmark size={20} tracking={0.18} />
        </div>
        <span style={{ fontFamily: BODY, fontSize: 12, color: "#6F6F75" }}>
          © {new Date().getFullYear()} NextGrowth — Nederland · Dubai · Jordanië
        </span>
      </div>
      <div style={{ minWidth: 230 }}>
        <PositioningRows fontSize={13} dividers={false} compact />
      </div>
    </div>
  );
}

/* 6 — Pure logomark */
function LogomarkVariant() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
      <div className="ng-glow"><NGMark size={150} /></div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        <NGMark size={150} tile={false} />
        <span style={{ fontFamily: BODY, fontSize: 12, color: "#7A7A80", maxWidth: 150 }}>
          Tile and transparent (knockout) versions of the mark.
        </span>
      </div>
    </div>
  );
}

/* ===================== ROOT ===================== */
export default function NextGrowthBranding() {
  return (
    <div style={{
      minHeight: "100%", background: "#060608", padding: "44px 20px",
      fontFamily: BODY, color: "#fff",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Tajawal:wght@400;500;700;800&display=swap');
        .ng-card{transition:transform .4s cubic-bezier(.22,.7,.3,1),border-color .4s,box-shadow .4s}
        .ng-card:hover{transform:translateY(-3px);border-color:rgba(212,175,55,.34);box-shadow:0 30px 70px -40px rgba(212,175,55,.30)}
        .ng-glow{animation:ngGlow 4.5s ease-in-out infinite;filter:drop-shadow(0 0 16px rgba(212,175,55,.32))}
        @keyframes ngGlow{0%,100%{filter:drop-shadow(0 0 12px rgba(212,175,55,.24))}50%{filter:drop-shadow(0 0 26px rgba(212,175,55,.46))}}
        @media (prefers-reduced-motion: reduce){.ng-glow{animation:none}.ng-card{transition:none}}
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* intro */}
        <div style={{ marginBottom: 18 }}>
          <span style={{
            fontFamily: DISPLAY, fontSize: 11, letterSpacing: "0.46em",
            textTransform: "uppercase", color: "#9C7B2E",
          }}>Brand System</span>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, margin: "12px 0 6px",
            letterSpacing: "0.04em",
          }}>
            <span style={{ color: "#F4F4F5" }}>NEXT</span><span style={goldText}>GROWTH</span>
          </h1>
          <p style={{ color: "#8A8A8F", fontSize: 14, maxWidth: 560, lineHeight: 1.6 }}>
            Digitale groeisystemen voor bedrijven in Nederland, Dubai en Jordanië.
            One geometric N·G mark, warm gold on black, across every surface.
          </p>
        </div>

        <Panel label="01 — Primary brand card"><PrimaryCard /></Panel>
        <Panel label="02 — Header lockup" pad={28}><HeaderVariant /></Panel>
        <Panel label="03 — Office wall branding" pad={0}><OfficeWallVariant /></Panel>
        <Panel label="04 — Favicon / app icon"><FaviconVariant /></Panel>
        <Panel label="05 — Footer strip"><FooterVariant /></Panel>
        <Panel label="06 — Pure logomark (SVG)"><LogomarkVariant /></Panel>

        <p style={{
          textAlign: "center", color: "#55555B", fontSize: 12, marginTop: 36, fontFamily: BODY,
        }}>
          Gold #D4AF37 · Highlight #FFF3C4 · Deep #B8860B · Canvas #060608 — positioning order locked: NL · GB · AE · JO
        </p>
      </div>
    </div>
  );
}
