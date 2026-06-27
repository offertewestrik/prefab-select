import { ShieldCheck, Star, MapPin, Euro, Clock3 } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Erkende vakmannen" },
  { icon: Star, label: "4,9/5 beoordeling" },
  { icon: MapPin, label: "Landelijke dekking" },
  { icon: Euro, label: "Gratis offertes" },
  { icon: Clock3, label: "24/7 spoedservice" },
];

/** Slanke vertrouwensbalk direct onder de hero. */
export function TrustBar() {
  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-(--container-max) flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 sm:justify-between">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <it.icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}
