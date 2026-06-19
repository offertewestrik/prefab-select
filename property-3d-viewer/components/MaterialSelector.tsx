"use client";

import type { MaterialPreset } from "@/data/properties3d";

type Props = {
  materials: MaterialPreset[];
  activeId: string;
  onChange: (id: string) => void;
};

/**
 * Materiaalkiezer (Champagne Stone, White Marble, Warm Wood, Dark Bronze).
 * Wisselt de afwerking van de gevel/woning live.
 */
export default function MaterialSelector({ materials, activeId, onChange }: Props) {
  return (
    <div className="materials glass">
      <span className="m-label">Afwerking</span>
      {materials.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`swatch${m.id === activeId ? " active" : ""}`}
          style={{ background: m.swatch }}
          onClick={() => onChange(m.id)}
          aria-label={m.label}
          title={m.label}
        />
      ))}
    </div>
  );
}
