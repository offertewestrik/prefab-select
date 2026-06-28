// ─────────────────────────────────────────────────────────────────────────
//  Design-system tokens & iconen — Nederlands Loodgieterplatform Design System.
//  Eén bron voor kleuren, fonts en inline-SVG-iconen zodat alle pagina's
//  exact dezelfde stijl delen. Pure module (geen "use client"), bruikbaar in
//  zowel server- als client-componenten.
// ─────────────────────────────────────────────────────────────────────────

export const HEAD = "var(--font-sora), 'Sora', sans-serif";
export const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";

export const C = {
  ink: "#0E1B33",
  body: "#3A4A66",
  muted: "#56627C",
  muted2: "#6B7896",
  muted3: "#8A94A8",
  muted4: "#9AA6BC",
  blue: "#2563EB",
  blueDark: "#1E4FD6",
  orange: "#F26A1B",
  green: "#16A34A",
  green2: "#16D183",
  star: "#FFB400",
  line: "#EAEFF6",
  line2: "#EEF2F8",
  line3: "#E5EAF1",
  navy: "#0B1730",
} as const;

export const PAGE_BG =
  "radial-gradient(900px 520px at 86% 4%, rgba(37,99,235,.05), transparent 60%), radial-gradient(760px 460px at 2% 26%, rgba(22,209,131,.045), transparent 55%), linear-gradient(180deg,#F5F7FB 0%,#F1F4F9 100%)";

export const CONTAINER = 1280;

/** Monogram (max 2 letters) uit een naam. */
export function monogram(name: string): string {
  const w = name.trim().split(/\s+/).filter(Boolean);
  const letters = w.map((x) => x[0] ?? "").join("");
  return (letters || "?").slice(0, 2).toUpperCase();
}

export const euro = (n: number) => "€" + n.toLocaleString("nl-NL");

// ── Inline-iconen (matchen de SVG's uit de handoff) ──
export function IcStar({ s = 13, fill = C.star }: { s?: number; fill?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
    </svg>
  );
}
export function IcCheck({ s = 15, w = 3, stroke = C.green }: { s?: number; w?: number; stroke?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M5 13l4 4L19 7" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IcCheckRing({ stroke = C.green, s = 18 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.7" />
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IcArrow({ stroke = "#fff", s = 18 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IcShield({ stroke = "#fff", s = 13 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IcLock({ stroke = C.blue, s = 13 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={stroke} strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
export function IcPin({ stroke = C.blue, s = 18 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke={stroke} strokeWidth="1.7" />
    </svg>
  );
}
export function IcCategory({ stroke = C.blue, s = 22 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 4v8a3 3 0 0 0 3 3h9M18 11l3 4-3 4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
