// Canonieke design tokens (zie docs/08-design-tokens.md).
// Bron van waarheid voor kleuren/typografie/vormgeving. De CSS-laag
// (theme.css, Tailwind v4 @theme) spiegelt deze waarden.

export const colors = {
  primary: {
    50: "#EAF1F8",
    100: "#C9DAEC",
    500: "#15426B",
    600: "#0E2A47",
    700: "#0A1F38",
  },
  navy: {
    700: "#15426B",
    800: "#0E2A47",
    900: "#0A1F38",
  },
  accent: { 500: "#F97316", 600: "#EA580C" },
  success: { 500: "#16A34A" },
  trustGreen: "#00B67A",
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    500: "#64748B",
    900: "#0F172A",
  },
  status: { info: "#0EA5E9", warning: "#F59E0B", danger: "#DC2626" },
} as const;

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(15,23,42,.06)",
  md: "0 4px 12px rgba(15,23,42,.08)",
  lg: "0 12px 32px rgba(15,23,42,.10)",
} as const;

export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, sans-serif',
} as const;

export const container = { max: "1280px" } as const;

export const tokens = { colors, radius, shadow, fontFamily, container };
export type Tokens = typeof tokens;
