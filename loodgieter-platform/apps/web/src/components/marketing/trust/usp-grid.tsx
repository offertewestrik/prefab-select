import {
  ShieldCheck, Star, CalendarCheck, Wrench, MapPin, Euro,
  House, Clock3, Phone, BadgeCheck, Lock, MessageCircle,
} from "lucide-react";

const usps = [
  { icon: ShieldCheck, label: "Erkende vakmannen" },
  { icon: Star, label: "Zorgvuldig geselecteerde vakmensen" },
  { icon: CalendarCheck, label: "Binnen 24 uur contact" },
  { icon: Wrench, label: "Meer dan 500 aangesloten loodgieters" },
  { icon: MapPin, label: "Landelijke dekking" },
  { icon: Euro, label: "Gratis offertes" },
  { icon: House, label: "Voor iedere woning" },
  { icon: Clock3, label: "24/7 spoedservice" },
  { icon: Phone, label: "Direct persoonlijk contact" },
  { icon: BadgeCheck, label: "Garantie op werkzaamheden" },
  { icon: Lock, label: "Veilig en betrouwbaar" },
  { icon: MessageCircle, label: "Transparante communicatie" },
];

/** Raster met USP-iconen — waarom kiezen voor het platform. */
export function UspGrid({
  title = "Waarom Loodgieterplatform.nl",
  subtitle = "Alles geregeld voor een zorgeloze klus, van eerste offerte tot oplevering.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-max) px-6 py-16">
        <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
        <p className="mt-2 max-w-2xl text-neutral-500">{subtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map((u) => (
            <div
              key={u.label}
              className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600">
                <u.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-neutral-800">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
