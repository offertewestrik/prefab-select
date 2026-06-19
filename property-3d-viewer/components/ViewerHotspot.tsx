"use client";

import { Html } from "@react-three/drei";
import type { Hotspot } from "@/data/properties3d";

type Props = {
  hotspot: Hotspot;
  active: boolean;
  onSelect: (id: string) => void;
};

/**
 * Klein gouden, pulserend punt dat in de 3D-scene zweeft.
 * Bij klik → camera beweegt naar de kamer en het infopaneel opent.
 */
export default function ViewerHotspot({ hotspot, active, onSelect }: Props) {
  return (
    <Html position={hotspot.position} center zIndexRange={[5, 0]} distanceFactor={10}>
      <button
        className={`hotspot${active ? " active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        aria-label={hotspot.label}
        type="button"
      >
        <span className="hotspot-ring" aria-hidden />
        <span className="hotspot-dot" aria-hidden />
        <span className="hotspot-label">{hotspot.label}</span>
      </button>
    </Html>
  );
}
