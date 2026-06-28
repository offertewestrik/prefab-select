import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductHighlightCards } from "@/components/ProductHighlightCards";
import { StatsBand } from "@/components/StatsBand";
import { WhyLaVigor } from "@/components/WhyLaVigor";
import { SignatureSpotlight } from "@/components/SignatureSpotlight";
import { MenuTabs } from "@/components/MenuTabs";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ReviewCards } from "@/components/ReviewCards";
import { LocationBlock } from "@/components/LocationBlock";
import { QRMenuCTA } from "@/components/QRMenuCTA";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ProductHighlightCards />
        <StatsBand />
        <WhyLaVigor />
        <SignatureSpotlight />
        <MenuTabs />
        <GalleryGrid />
        <ReviewCards />
        <LocationBlock />
        <QRMenuCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
