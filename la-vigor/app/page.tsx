import { Hero } from "../components/hero/Hero";

/**
 * La Vigor — homepage.
 * Phase 2 ships only the cinematic hero experience. Subsequent sections
 * (menu, gallery, reviews, contact, footer) are intentionally not built yet.
 */
export default function Home() {
  return (
    <main className="relative">
      <Hero />
    </main>
  );
}
