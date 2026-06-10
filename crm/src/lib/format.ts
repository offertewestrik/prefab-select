// Kleine formatteer-helpers in NL-locale.

export function euro(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bedrag);
}

export function euroCent(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(bedrag);
}

export function datum(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function datumTijd(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function tijd(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** "3 dagen geleden" / "over 2 dagen" — relatieve tijd. */
export function relatief(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const dagen = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const rtf = new Intl.RelativeTimeFormat("nl-NL", { numeric: "auto" });
  if (Math.abs(dagen) >= 1) return rtf.format(dagen, "day");
  const uren = Math.round(diffMs / (1000 * 60 * 60));
  if (Math.abs(uren) >= 1) return rtf.format(uren, "hour");
  const min = Math.round(diffMs / (1000 * 60));
  return rtf.format(min, "minute");
}

export function initialen(naam: string): string {
  return naam
    .split(" ")
    .map((d) => d[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
