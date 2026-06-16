/** Locale-aware formatters (nl-NL) shared across the dashboard. */

const eur = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const eurCents = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const num = new Intl.NumberFormat('nl-NL');

export const formatCurrency = (v: number) => eur.format(v || 0);
export const formatCurrencyCents = (v: number) => eurCents.format(v || 0);
export const formatNumber = (v: number) => num.format(v || 0);

export const formatCompact = (v: number) =>
  new Intl.NumberFormat('nl-NL', { notation: 'compact', maximumFractionDigits: 1 }).format(v || 0);

export const formatPercent = (v: number, digits = 1) =>
  `${v >= 0 ? '' : ''}${(v).toFixed(digits)}%`;

export function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatRelative(iso?: string): string {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (Math.abs(mins) < 60) return mins <= 0 ? 'zojuist' : `${mins}m geleden`;
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return `${hours}u geleden`;
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return `${days}d geleden`;
  return formatDate(iso);
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
