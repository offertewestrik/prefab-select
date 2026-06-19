"use client";

import { motion } from "framer-motion";
import type { Property3D } from "@/data/properties3d";

type Props = {
  floor: Property3D["floor"];
  activeId: string | null;
  onSelectRoom: (id: string) => void;
  onClose: () => void;
};

/**
 * Semi-transparante plattegrond-overlay. Elke kamer is klikbaar en
 * gekoppeld aan een hotspot → camera springt naar die ruimte.
 */
export default function FloorplanOverlay({ floor, activeId, onSelectRoom, onClose }: Props) {
  // middelpunt van een polygoon voor het label
  const centroid = (points: string): [number, number] => {
    const pts = points
      .trim()
      .split(/\s+/)
      .map((p) => p.split(",").map(Number) as [number, number]);
    const n = pts.length;
    const sum = pts.reduce((a, [x, y]) => [a[0] + x, a[1] + y], [0, 0]);
    return [sum[0] / n, sum[1] / n];
  };

  return (
    <motion.div
      className="floor-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="floor-card glass"
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Plattegrond</h3>
        <p className="fc-sub">Klik op een ruimte om er in 3D naartoe te gaan.</p>
        <svg className="floor-svg" viewBox={floor.viewBox} role="img" aria-label="Plattegrond">
          {floor.rooms.map((room) => {
            const [cx, cy] = centroid(room.points);
            return (
              <g key={room.id}>
                <polygon
                  className={`floor-room${room.id === activeId ? " active" : ""}`}
                  points={room.points}
                  onClick={() => onSelectRoom(room.id)}
                />
                <text className="floor-room-label" x={cx} y={cy}>
                  {room.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
}
