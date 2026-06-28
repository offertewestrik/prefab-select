import { organizationLd, websiteLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/marketing/home/hero";
import { TrustSection } from "@/components/marketing/home/trust-section";
import { PopularServices } from "@/components/marketing/home/popular-services";
import { HowItWorks } from "@/components/marketing/home/how-it-works";
import { WhyUs } from "@/components/marketing/home/why-us";
import { FeaturedInstallers } from "@/components/marketing/home/featured-installers";
import { Reviews } from "@/components/marketing/home/reviews";
import { Projects } from "@/components/marketing/home/projects";
import { AiBenefits } from "@/components/marketing/home/ai-benefits";
import { Cta } from "@/components/marketing/home/cta";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { searchInstallers, type InstallerCardData } from "@/features/installers/server/directory";
import { getLatestReviews, type ReviewAggregate } from "@/features/reviews/server/aggregation";

export const revalidate = 3600;

type PopularService = {
  slug: string;
  name: string;
  shortDescription: string;
  priceFrom: number | null;
  priceTo: number | null;
  priceUnit: string | null;
};

const EMPTY_REVIEWS: ReviewAggregate = {
  average: 0,
  count: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  latest: [],
};

export default async function HomePage() {
  // Alle data komt uit de bestaande API's — niets aan de backend gewijzigd.
  let popular: PopularService[] = [];
  let serviceOptions: { slug: string; name: string }[] = [];
  let installers: InstallerCardData[] = [];
  let reviews: ReviewAggregate = EMPTY_REVIEWS;

  try {
    const cats = await getServicesByCategory();
    const all = cats.flatMap((c) => c.services);
    popular = all.slice(0, 8);
    serviceOptions = all.map((s) => ({ slug: s.slug, name: s.name }));
  } catch {
    /* graceful: lege staat */
  }

  try {
    const result = await searchInstallers({ sort: "rating" });
    installers = result.items;
  } catch {
    /* graceful: sectie rendert niets */
  }

  try {
    reviews = await getLatestReviews();
  } catch {
    reviews = EMPTY_REVIEWS;
  }

  const rating = reviews.count > 0 ? reviews.average.toFixed(1).replace(".", ",") : "9,4";

  return (
    <main className="overflow-x-hidden">
      <JsonLd data={[organizationLd(), websiteLd()]} />

      <Hero services={serviceOptions} rating={rating} reviewCount={reviews.count} />
      <TrustSection />
      <PopularServices services={popular} />
      <HowItWorks />
      <WhyUs />
      <FeaturedInstallers installers={installers} />
      <Reviews data={reviews} />
      <Projects />
      <AiBenefits />
      <Cta />
    </main>
  );
}
