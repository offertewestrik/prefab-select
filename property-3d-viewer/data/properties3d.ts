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
  hotspots: [
    {
      id: "living",
      label: "Woonkamer",
      position: [1.6, 1.3, -0.6],
      camPos: [5.5, 3.2, 4.5],
      title: "Luxe woonkamer",
      description: "Open leefruimte met dubbele plafondhoogte en panoramisch uitzicht op de skyline van Dubai.",
    },
    {
      id: "kitchen",
      label: "Keuken",
      position: [-1.4, 1.2, -1.2],
      camPos: [-5, 3, 3.5],
      title: "Chef-keuken",
      description: "Volledig uitgeruste open keuken met marmeren kookeiland en topapparatuur.",
    },
    {
      id: "master",
      label: "Master Suite",
      position: [0.6, 3.0, 1.6],
      camPos: [4.5, 5, 5.5],
      title: "Master suite",
      description: "Ruime slaapkamer met walk-in closet, ensuite badkamer en privé-terras.",
    },
    {
      id: "bath",
      label: "Badkamer",
      position: [-1.8, 3.0, 1.4],
      camPos: [-5, 5, 4.5],
      title: "Spa-badkamer",
      description: "Ensuite met regendouche, vrijstaand bad en natuursteen afwerking.",
    },
    {
      id: "pool",
      label: "Infinity Pool",
      position: [-2.2, 0.5, 3.2],
      camPos: [-3.5, 2.6, 7.5],
      title: "Privé infinity pool",
      description: "Verwarmd zwembad met overloop, zicht op de skyline en een ruim zonneterras.",
    },
    {
      id: "terrace",
      label: "Terras",
      position: [2.6, 0.6, 2.6],
      camPos: [6, 2.8, 7],
      title: "Loungeterras",
      description: "Outdoor lounge met buitenkeuken — perfect voor de Dubai-avonden.",
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
