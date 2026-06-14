import type { MetadataRoute } from "next";

// PWA-manifest: maakt het CRM installeerbaar als app op iPhone/iPad en Android
// (eigen icoon op het beginscherm, opent fullscreen zonder browserbalk).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prefab Select CRM",
    short_name: "Prefab CRM",
    description: "CRM-dashboard van Prefab Select — leads, pijplijn, offertes & rapportage.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#172554",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
