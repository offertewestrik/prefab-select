/* eslint-disable @next/next/no-img-element */
import { MapPin } from "lucide-react";
import { staticMapUrl, centroid, type MapMarker, type LatLng } from "@repo/maps";

/**
 * Toont het werkgebied op een statische Mapbox-kaart (markers per gemeente +
 * optionele radius-cirkel). Zonder publieke Mapbox-token valt de component
 * netjes terug op een tekstpaneel — er lekt nooit een geheime sleutel naar de client.
 */
export function CoverageMap({
  municipalities,
  homeBase,
  radiusKm,
  height = 320,
  className = "",
}: {
  municipalities: { name: string; lat: number; lng: number }[];
  /** Vestigingsplaats (krijgt een grote pin); optioneel. */
  homeBase?: { name: string; lat: number; lng: number } | null;
  radiusKm?: number | null;
  height?: number;
  className?: string;
}) {
  const markers: MapMarker[] = municipalities.map((m) => ({ lat: m.lat, lng: m.lng, label: m.name }));
  if (homeBase) markers.unshift({ lat: homeBase.lat, lng: homeBase.lng, label: homeBase.name, primary: true });

  const center: LatLng | null =
    (homeBase ? { lat: homeBase.lat, lng: homeBase.lng } : null) ?? centroid(markers);
  const src = staticMapUrl({ markers, center, radiusKm, height });

  if (!src) {
    // Fallback zonder token: tekstuele weergave van het werkgebied.
    return (
      <div className={`rounded-[var(--radius-xl)] border border-neutral-200 bg-neutral-50 p-5 ${className}`}>
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <MapPin className="h-4 w-4 text-primary-600" /> Werkgebied
        </div>
        {homeBase && <p className="mt-2 text-sm text-neutral-600">Vestigingsplaats: {homeBase.name}</p>}
        {radiusKm ? <p className="text-sm text-neutral-600">Straal: {radiusKm} km</p> : null}
        <p className="mt-2 text-sm text-neutral-500">
          {municipalities.length > 0 ? municipalities.map((m) => m.name).join(", ") : "Nog geen gemeenten geselecteerd."}
        </p>
        <p className="mt-3 text-xs text-neutral-400">Kaartweergave verschijnt zodra een Mapbox-token is ingesteld.</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 ${className}`}>
      <img src={src} alt="Werkgebied op kaart" width={640} height={height} className="h-auto w-full" loading="lazy" />
    </div>
  );
}
