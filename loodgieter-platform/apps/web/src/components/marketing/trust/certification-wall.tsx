import Image from "next/image";
import { KEURMERKEN } from "@/features/trust/data";

/** Wand met keurmerken en erkenningen, met korte uitleg per keurmerk. */
export function CertificationWall({
  title = "Gecertificeerde vakmannen",
  subtitle = "Onze loodgieters voldoen aan de hoogste kwaliteitseisen en zijn aangesloten bij erkende keurmerken.",
  withDescriptions = true,
}: {
  title?: string;
  subtitle?: string;
  withDescriptions?: boolean;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-max) px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
          <p className="mt-2 text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {KEURMERKEN.map((k) => (
            <div
              key={k.file}
              className="flex flex-col items-center rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 text-center"
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={`/keurmerken/${k.file}`}
                  alt={`${k.name} keurmerk`}
                  width={320}
                  height={180}
                  className="h-14 w-auto max-w-[140px] object-contain"
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
