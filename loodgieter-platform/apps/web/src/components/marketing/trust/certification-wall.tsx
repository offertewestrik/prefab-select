import Image from "next/image";
import { KEURMERKEN, keurmerkenForCategory, type Keurmerk } from "@/features/trust/data";

/**
 * Wand met keurmerken en erkenningen, met korte uitleg per keurmerk.
 * - Zonder `category`: algemene keurmerken (home / Trust Center).
 * - Met `category`: categorie-specifieke keurmerken (bv. dakwerk). Rendert
 *   niets als die categorie geen aparte set heeft.
 * - `variant="compact"` voor een strakkere variant op dienstpagina's.
 */
export function CertificationWall({
  title = "Gecertificeerde vakmannen",
  subtitle = "Onze loodgieters voldoen aan de hoogste kwaliteitseisen en zijn aangesloten bij erkende keurmerken.",
  category,
  variant = "full",
  withDescriptions = true,
}: {
  title?: string;
  subtitle?: string;
  category?: string;
  variant?: "full" | "compact";
  withDescriptions?: boolean;
}) {
  const keurmerken: Keurmerk[] = category ? keurmerkenForCategory(category) : KEURMERKEN;
  if (keurmerken.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {keurmerken.map((k) => (
            <div
              key={k.file}
              className="flex h-24 items-center justify-center rounded-[var(--radius-md)] border border-neutral-200 bg-white px-4"
            >
              <Image
                src={`/keurmerken/${k.file}`}
                alt={`${k.name} keurmerk`}
                width={420}
                height={180}
                className="h-16 w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-max) px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
          <p className="mt-2 text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {keurmerken.map((k) => (
            <div
              key={k.file}
              className="flex flex-col items-center rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 text-center"
            >
              <div className="flex h-24 items-center justify-center">
                <Image
                  src={`/keurmerken/${k.file}`}
                  alt={`${k.name} keurmerk`}
                  width={420}
                  height={180}
                  className="h-20 w-auto max-w-[180px] object-contain"
                />
              </div>
              {withDescriptions && (
                <p className="mt-3 text-xs leading-snug text-neutral-500">{k.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
