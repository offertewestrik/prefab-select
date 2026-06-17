import { brand, contact, faqs, serviceAreas } from "@/lib/site";

/** Structured data for Dubai local SEO + rich FAQ results. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://alnaqaa.ae/#business",
        name: "النقاء لمياه الشرب — Al Naqaa Drinking Water",
        description:
          "توصيل مياه الشرب النقية في دبي — غالونات 19 لتر، عبوات مياه واشتراكات أسبوعية للمنازل والمكاتب والشركات.",
        image: brand.logo,
        telephone: contact.phone,
        email: contact.email,
        url: "https://alnaqaa.ae",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        areaServed: [
          { "@type": "City", name: "Dubai" },
          ...serviceAreas.map((a) => ({ "@type": "Place", name: a })),
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
