import Image from "next/image";
import { A_MERKEN, brandsForCategory, type TrustLogo } from "@/features/trust/data";

/**
 * Logowand met erkende A-merken.
 * - Geef `category` mee om alleen merken van die dienstcategorie te tonen.
 * - `variant="compact"` voor een strakkere variant op dienstpagina's.
 * Rendert niets als er geen passende merken zijn.
 */
export function BrandWall({
  title = "Wij werken met de beste A-merken",
  subtitle = "Voor iedere installatie gebruiken onze vakmannen uitsluitend onderdelen van gerenommeerde fabrikanten.",
  category,
  variant = "full",
}: {
  title?: string;
  subtitle?: string;
  category?: string;
  variant?: "full" | "compact";
}) {
  const merken: TrustLogo[] = category ? brandsForCategory(category) : A_MERKEN;
  if (merken.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {merken.map((m) => (
            <div
              key={m.file}
              className="flex h-24 items-center justify-center rounded-[var(--radius-md)] border border-neutral-200 bg-white px-4"
            >
              <Image
                src={`/merken/${m.file}`}
                alt={`${m.name} logo`}
                width={320}
                height={160}
                className="h-16 w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-(--container-max) px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
          <p className="mt-2 text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {merken.map((m) => (
            <div
              key={m.file}
              className="flex h-28 items-center justify-center rounded-[var(--radius-lg)] border border-neutral-200 bg-white px-5 transition-shadow hover:shadow-sm"
            >
              <Image
                src={`/merken/${m.file}`}
                alt={`${m.name} logo`}
                width={320}
                height={160}
                className="h-20 w-auto max-w-[180px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
