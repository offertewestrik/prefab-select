import Image from "next/image";
import { A_MERKEN, KEURMERKEN } from "@/features/trust/data";
import { Reveal } from "./reveal";

export function TrustSection() {
  const loop = [...A_MERKEN, ...A_MERKEN];
  return (
    <section className="border-y border-neutral-200/70 bg-white py-14">
      <div className="mx-auto max-w-(--container-max) px-6">
        <Reveal>
          <p className="text-center text-sm font-medium text-neutral-400">
            Onze vakmannen werken met A-merken en zijn aangesloten bij erkende keurmerken
          </p>
        </Reveal>
      </div>

      {/* Merken-marquee */}
      <div className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track gap-10 px-5">
          {loop.map((m, i) => (
            <div key={`${m.file}-${i}`} className="flex h-12 w-[120px] shrink-0 items-center justify-center">
              <Image
                src={`/merken/${m.file}`}
                alt={m.name}
                width={320}
                height={160}
                className="h-9 w-auto max-w-[110px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Keurmerken */}
      <div className="mx-auto mt-10 max-w-(--container-max) px-6">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {KEURMERKEN.slice(0, 7).map((k) => (
              <Image
                key={k.file}
                src={`/keurmerken/${k.file}`}
                alt={`${k.name} keurmerk`}
                width={320}
                height={180}
                className="h-9 w-auto max-w-[110px] object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
