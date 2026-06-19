/* =====================================================================
   Droomhuis in Dubai — 3D property viewer data
   ===================================================================== */
import type { Vector3Tuple } from "three";

export type Hotspot = {
  id: string;
  label: string;
  position: Vector3Tuple;      // positie van de pulserende punt
  camPos: Vector3Tuple;        // camerapositie bij focus
  title: string;
  description: string;
};

export type MaterialPreset = {
  id: string;
  label: string;
  color: string;
  roughness: number;
  metalness: number;
  swatch: string;              // kleur voor de UI-swatch
};

export type FloorRoom = {
  id: string;                  // koppelt aan een hotspot id
  label: string;
  /** polygoonpunten (0-100 svg-coördinaten) van de kamer op de plattegrond */
  points: string;
};

export type Property3D = {
  name: string;
  location: string;
  price: string;
  modelUrl?: string;           // optioneel: /models/villa-dubai.glb
  hotspots: Hotspot[];
  materials: MaterialPreset[];
  floor: { viewBox: string; rooms: FloorRoom[] };
};

export const property: Property3D = {
  name: "Signature Beachfront Villa",
  location: "Palm Jumeirah, Dubai",
  price: "AED 18.500.000",
  modelUrl: "/models/villa-dubai.glb",
  // posities afgestemd op het AI-gegenereerde villa-model (front = +z, pool links)
  hotspots: [
    {
      id: "living",
      label: "Woonkamer",
      position: [0, 1.1, 1.9],
      camPos: [0.5, 3, 9],
      title: "Luxe woonkamer",
      description: "Open leefruimte met dubbele plafondhoogte achter de glazen entreepui, met panoramisch uitzicht.",
    },
    {
      id: "kitchen",
      label: "Keuken",
      position: [-1.6, 1.0, 0.8],
      camPos: [-7, 3.5, 5],
      title: "Chef-keuken",
      description: "Volledig uitgeruste open keuken met marmeren kookeiland en topapparatuur.",
    },
    {
      id: "master",
      label: "Master Suite",
      position: [1.4, 1.75, 0.7],
      camPos: [7, 4.5, 5],
      title: "Master suite",
      description: "Ruime slaapkamer op de bovenverdieping met walk-in closet, ensuite en privé-terras.",
    },
    {
      id: "bath",
      label: "Badkamer",
      position: [-1.4, 1.75, 0.5],
      camPos: [-7, 4.5, 4],
      title: "Spa-badkamer",
      description: "Ensuite met regendouche, vrijstaand bad en natuursteen afwerking.",
    },
    {
      id: "pool",
      label: "Infinity Pool",
      position: [-1.5, 0.4, 2.6],
      camPos: [-4.5, 3, 9],
      title: "Privé infinity pool",
      description: "Verwarmd overloopzwembad met ruim zonneterras en tropische tuin met dadelpalmen.",
    },
    {
      id: "terrace",
      label: "Terras",
      position: [1.8, 0.45, 2.0],
      camPos: [6.5, 3, 8.5],
      title: "Loungeterras",
      description: "Outdoor lounge en buitenkeuken op het natuurstenen terras — perfect voor de Dubai-avonden.",
    },
  ],
  materials: [
    { id: "champagne", label: "Champagne Stone", color: "#e7dcc6", roughness: 0.85, metalness: 0.05, swatch: "#e7dcc6" },
    { id: "marble", label: "White Marble", color: "#f4f2ed", roughness: 0.35, metalness: 0.05, swatch: "#f4f2ed" },
    { id: "wood", label: "Warm Wood", color: "#b07d4e", roughness: 0.7, metalness: 0.0, swatch: "#b07d4e" },
    { id: "bronze", label: "Dark Bronze", color: "#5a4a39", roughness: 0.4, metalness: 0.6, swatch: "#5a4a39" },
  ],
  floor: {
    viewBox: "0 0 100 100",
    rooms: [
      { id: "living", label: "Woonkamer", points: "52,52 92,52 92,90 52,90" },
      { id: "kitchen", label: "Keuken", points: "8,52 48,52 48,90 8,90" },
      { id: "master", label: "Master", points: "52,8 92,8 92,48 52,48" },
      { id: "bath", label: "Bad", points: "30,8 48,8 48,30 30,30" },
      { id: "pool", label: "Pool", points: "8,8 26,8 26,48 8,48" },
      { id: "terrace", label: "Terras", points: "8,92 92,92 92,98 8,98" },
    ],
  },
};
