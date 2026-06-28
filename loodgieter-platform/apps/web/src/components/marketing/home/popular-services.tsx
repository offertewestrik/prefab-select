import Link from "next/link";
import {
  Flame, Thermometer, Wind, Droplets, House, Wrench, Bath, Zap,
  ShowerHead, Waves, Gauge, ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { priceRange } from "@/lib/format";
import { Reveal } from "./reveal";

type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  priceFrom: number | null;
  priceTo: number | null;
  priceUnit: string | null;
};

function iconFor(slug: string): LucideIcon {
  const s = slug.toLowerCase();
  if (s.includes("cv") || s.includes("ketel") || s.includes("verwarm") || s.includes("geiser")) return Flame;
  if (s.includes("warmtepomp")) return Thermometer;
  if (s.includes("airco") || s.includes("koeling")) return Wind;
  if (s.includes("lek") || s.includes("water") || s.includes("spoed") || s.includes("loodgieter")) return Droplets;
  if (s.includes("dak") || s.includes("zink") || s.includes("pannen") || s.includes("bitumen") || s.includes("lood")) return House;
  if (s.includes("radiator")) return Gauge;
  if (s.includes("vloer")) return Waves;
  if (s.includes("badkamer") || s.includes("toilet") || s.includes("sanitair")) return Bath;
  if (s.includes("boiler")) return ShowerHead;
  if (s.includes("zonne") || s.includes("laadpaal") || s.includes("elektra") || s.includes("meterkast") || s.includes("batterij")) return Zap;
  return Wrench;
}

export function PopularServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section className="mx-auto max-w-(--container-max) px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Populaire diensten</span>
            <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">Waar kunnen we mee helpen?</h2>
            <p className="mt-4 text-lg text-neutral-500">Van een lekkende kraan tot een complete warmtepomp — vergelijk vrijblijvend de beste vakmannen.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/diensten" className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
            Alle 50 diensten
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = iconFor(s.slug);
          return (
            <Reveal key={s.slug} delay={i * 60} as="div">
              <Link
                href={`/diensten/${s.slug}`}
                className="lift group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-white p-6 ring-hairline hover:shadow-float"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-neutral-900">{s.name}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-500">{s.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary-700">{priceRange(s.priceFrom, s.priceTo, s.priceUnit)}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-all group-hover:bg-primary-600 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
