/** Locale-aware formatters (nl-NL) shared across the AanbouwPlatform dashboard. */

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

export function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso; // allow human labels like "Binnen 3 maanden"
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

/** Net + VAT total for a set of quote lines minus a discount percentage. */
export function quoteTotals(
  lines: { quantity: number; unitPrice: number; vatRate: number }[],
  discountPct = 0,
) {
  const subtotal = lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
  const discount = subtotal * (discountPct / 100);
  const net = subtotal - discount;
  const vat = lines.reduce((s, l) => {
    const lineNet = l.quantity * l.unitPrice * (1 - discountPct / 100);
    return s + lineNet * (l.vatRate / 100);
  }, 0);
  return { subtotal, discount, net, vat, total: net + vat };
}
