import Link from "next/link";
import {
  Flame, Bath, Sun, House, Thermometer, Droplets, MapPin, ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

type Project = {
  title: string;
  city: string;
  description: string;
  category: string;
  priceFrom: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for the cover panel. */
  cover: string;
  /** Larger bento tile on lg+. */
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "CV-ketel vervangen",
    city: "Amsterdam",
    description: "Intergas HR-combiketel geïnstalleerd, oude ketel vakkundig afgevoerd en cv-systeem opnieuw afgesteld.",
    category: "Verwarming",
    priceFrom: "vanaf € 1.950",
    icon: Flame,
    cover: "from-primary-600 via-primary-500 to-accent-500",
    featured: true,
  },
  {
    title: "Complete badkamerrenovatie",
    city: "Utrecht",
    description: "Inloopdouche, zwevend wandcloset en vloerverwarming — van sloop tot oplevering.",
    category: "Sanitair",
    priceFrom: "vanaf € 8.500",
    icon: Bath,
    cover: "from-navy-800 via-navy-700 to-primary-600",
  },
  {
    title: "Zonnepanelen + omvormer",
    city: "Eindhoven",
    description: "12 panelen incl. SolarEdge-omvormer en realtime monitoring via app.",
    category: "Duurzaam",
    priceFrom: "vanaf € 4.200",
    icon: Sun,
    cover: "from-accent-500 via-primary-500 to-success-500",
  },
  {
    title: "Dakrenovatie pannendak",
    city: "Rotterdam",
    description: "Nieuwe dakpannen, tengels en isolatie — wind- en waterdicht opgeleverd.",
    category: "Dak & zink",
    priceFrom: "vanaf € 6.800",
    icon: House,
    cover: "from-navy-900 via-navy-800 to-primary-700",
  },
  {
    title: "Hybride warmtepomp",
    city: "Den Haag",
    description: "Lucht/water-warmtepomp gekoppeld aan de bestaande cv-ketel voor lagere stookkosten.",
    category: "Verwarming",
    priceFrom: "vanaf € 5.400",
    icon: Thermometer,
    cover: "from-primary-600 via-primary-500 to-success-500",
  },
  {
    title: "Spoed: lekkage verholpen",
    city: "Groningen",
    description: "Binnen het uur ter plaatse, gesprongen leiding gelokaliseerd en vervangen.",
    category: "Loodgieterswerk",
    priceFrom: "vanaf € 120",
    icon: Droplets,
    cover: "from-primary-700 via-navy-700 to-navy-900",
    featured: true,
  },
];

export function Projects() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24">
      <div className="mx-auto max-w-(--container-max) px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Recent uitgevoerd</span>
          <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">Klussen die via ons geregeld zijn</h2>
          <p className="mt-4 text-lg text-neutral-500">
            Een greep uit het soort werk dat aangesloten vakmannen uitvoeren. Voorbeeldprojecten ter illustratie — jouw klus vergelijk je vrijblijvend.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.title}
                delay={i * 70}
                as="div"
                className={p.featured ? "lg:col-span-2" : ""}
              >
                <Link
                  href="/vakmannen"
                  aria-label={`${p.title} in ${p.city} — bekijk vakmannen`}
                  className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-white ring-hairline transition-shadow hover:shadow-float"
                >
                  {/* Gradient cover — decoratief, geen foto */}
                  <div className="relative aspect-[16/9] overflow-hidden" aria-hidden>
                    <div
                      className={`absolute inset-0 scale-105 bg-gradient-to-br ${p.cover} transition-transform duration-700 ease-out group-hover:scale-110`}
                    />
                    {/* zachte ruis / glans */}
                    <div className="grain absolute inset-0 opacity-30" />
                    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.35),transparent_55%)]" />
                    <div className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                    {/* groot icoon */}
                    <Icon
                      className="absolute right-5 top-1/2 h-24 w-24 -translate-y-1/2 text-white/85 drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-700 group-hover:scale-105"
                      strokeWidth={1.25}
                    />

                    {/* categorie-chip */}
                    <span className="glass-dark absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                      {p.category}
                    </span>
                  </div>

                  {/* tekst */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-500">
                      <MapPin className="h-4 w-4 text-primary-500" aria-hidden />
                      {p.city}
                    </div>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-500">{p.description}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                      <span className="text-sm font-semibold text-primary-700">{p.priceFrom}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-primary-600">
                        Bekijk vakmannen
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-all group-hover:bg-primary-600 group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center" delay={120}>
          <p className="text-sm text-neutral-400">
            Dit zijn voorbeeldprojecten. Beschrijf je eigen klus en ontvang vrijblijvend offertes van vakmannen uit jouw regio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
