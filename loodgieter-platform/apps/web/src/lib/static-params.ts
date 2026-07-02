/**
 * Bouw-robuuste helper voor `generateStaticParams`.
 *
 * Tijdens `next build` mogen ontbrekende of onbereikbare databaseverbindingen
 * de build niet breken. Dat gebeurde eerder wél: als `DIRECT_URL` op Vercel
 * verkeerd stond of de Supabase-pooler een hiccup had, faalde de
 * DB-query in `generateStaticParams` en brak de hele build
 * (PrismaClientInitializationError → "Failed to collect page data").
 *
 * Elke marketingroute heeft `dynamicParams = true`, dus als we hier niets
 * prerenderen komen de pagina's alsnog on-demand via ISR met de werkende
 * runtime-verbinding (DATABASE_URL). We vangen de fout daarom af en vallen
 * terug op een lege lijst (of een meegegeven fallback).
 */
export async function staticParamsOrEmpty<T>(
  fn: () => Promise<T[]>,
  fallback: T[] = [],
): Promise<T[]> {
  try {
    return await fn();
  } catch (err) {
    console.warn(
      "[generateStaticParams] Database niet bereikbaar tijdens build; " +
        "val terug op on-demand ISR.",
      err,
    );
    return fallback;
  }
}
