import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urls, breadcrumbLd, itemListLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/features/seo/metadata";
import { getCityBySlug, getSeedCitySlugs, getNearbyCities } from "@/features/geo/server/queries";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { getReviewsForCity } from "@/features/reviews/server/aggregation";
import { ReviewsSection } from "@/components/marketing/reviews-section";
import { cityIntro, cityBody, cityFaqs } from "@/features/geo/content/city-content";
import { getCityArticle } from "@/features/geo/content/city-article";
import { C, HEAD, BODY, PAGE_BG, IcStar, IcCheck, IcArrow, IcPin, IcShield } from "@/components/marketing/ds";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Alleen de grootste steden vooraf renderen; de rest komt on-demand via ISR.
  const cities = await getSeedCitySlugs(40);
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Loodgieter & installateur in ${city.name}`,
    description: `Zoek je een loodgieter of installateur in ${city.name} (${city.province.name})? Vergelijk gecertificeerde vakmannen uit de regio en vraag gratis offertes aan.`,
    path: urls.city(slug),
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const [categories, nearby, reviews] = await Promise.all([
    getServicesByCategory(),
    getNearbyCities(city.lat, city.lng, city.slug, 8),
    getReviewsForCity(city.name),
  ]);

  const facts = { name: city.name, province: city.province.name, population: city.population };
  const nearbyNames = nearby.map((n) => n.name);
  // Uniek long-form artikel indien beschikbaar; anders de gegenereerde module-content.
  const article = getCityArticle(slug);
  const intro = article ? article.intro : cityIntro(facts);
  const body = article ? article.body : cityBody(facts).map((b) => ({ heading: b.heading, text: b.body }));
  const faqs = article && article.faqs.length > 0 ? article.faqs : cityFaqs(facts, nearbyNames);

  const serviceList = categories.flatMap((cat) =>
    cat.services.map((s) => ({
      name: `${s.name} in ${city.name}`,
      path: urls.serviceCity(s.slug, city.slug),
    })),
  );

  const css = `
    .lph-stad *{box-sizing:border-box}
    .lph-stad [data-grid3] > a{transition:transform .25s ease, box-shadow .25s ease}
    .lph-stad [data-grid3] > a:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    .lph-stad details > summary{list-style:none}
    .lph-stad details > summary::-webkit-details-marker{display:none}
    .lph-stad details[open] .lph-faq-chev{transform:rotate(180deg)}
    @media (max-width:980px){ .lph-stad [data-grid3]{grid-template-columns:repeat(2,1fr) !important} }
    @media (max-width:640px){ .lph-stad [data-grid3]{grid-template-columns:1fr !important} }
  `;

  return (
    <main className="lph-stad" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Steden", path: urls.cities() },
            { name: city.name, path: urls.city(slug) },
          ]),
          ...(serviceList.length > 0 ? [itemListLd(serviceList)] : []),
          faqLd(faqs),
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <Link href={urls.cities()} style={{ color: C.muted3, textDecoration: "none" }}>Steden</Link><span>/</span>
          <span style={{ color: C.ink }}>{city.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(900px 420px at 12% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", borderBottom: `1px solid ${C.line2}`, padding: "44px 0 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#EFF4FF", borderRadius: 999, padding: "6px 13px", fontSize: 12.5, fontWeight: 700, color: C.blueDark, marginBottom: 16 }}>
            <IcPin stroke={C.blue} s={15} />{city.province.name}
          </div>
          <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 38, lineHeight: 1.12, letterSpacing: "-.025em", color: C.ink, margin: 0 }}>
            Loodgieter &amp; installateur in {city.name}
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: C.muted, maxWidth: 720 }}>{intro}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
            <Link href={`/aanvraag?plaats=${city.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}>
              Vraag gratis offertes aan <IcArrow />
            </Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
            {[
              { ic: <IcShield stroke={C.green} s={14} />, t: "Gecertificeerd & verzekerd" },
              { ic: <IcCheck s={15} stroke={C.green} />, t: "100% gratis & vrijblijvend" },
              { ic: <IcStar s={14} />, t: "Snel geholpen" },
            ].map((chip, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 13px", fontSize: 12.5, fontWeight: 700, color: "#1F2A45", boxShadow: "0 3px 10px rgba(15,27,51,.04)" }}>
                {chip.ic}{chip.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Redactionele content (SEO) */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 28px 8px" }}>
        <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 44 }}>
          {body.map((block) => (
            <div key={block.heading}>
              <h2 style={{ fontFamily: HEAD, fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, margin: 0 }}>{block.heading}</h2>
              {block.text.split(/\n\n+/).map((para, i) => (
                <p key={i} style={{ fontSize: 15.5, lineHeight: 1.7, color: C.body, marginTop: 12, marginBottom: 0 }}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Diensten per categorie */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 28px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 style={{ fontFamily: HEAD, fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, margin: "0 0 18px" }}>
                {cat.name} in {city.name}
              </h2>
              <div data-grid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {cat.services.map((s) => (
                  <Link
                    key={s.slug}
                    href={urls.serviceCity(s.slug, city.slug)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 6px 18px rgba(15,27,51,.05)", textDecoration: "none" }}
                  >
                    <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
                      {s.name} in {city.name}
                    </span>
                    <span style={{ display: "flex", flexShrink: 0 }} aria-hidden>
                      <IcArrow stroke={C.blue} s={17} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {reviews.count > 0 && (
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px 64px" }}>
          <ReviewsSection data={reviews} heading={`Wat klanten in ${city.name} zeggen`} />
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "84px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
          <h2 style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 8 }}>Veelgestelde vragen</h2>
          <p style={{ fontSize: 14.5, color: C.muted, marginBottom: 22 }}>Over een loodgieter of installateur in {city.name}.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 820 }}>
            {faqs.map((f, i) => (
              <details key={f.question} open={i === 0} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 13, overflow: "hidden" }}>
                <summary style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "17px 20px", cursor: "pointer" }}>
                  <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{f.question}</span>
                  <span className="lph-faq-chev" style={{ display: "flex", flexShrink: 0, transition: "transform .2s ease" }} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </summary>
                <p style={{ padding: "0 20px 18px", fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Nabije gemeenten */}
      {nearby.length > 0 && (
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 28px" }}>
          <h2 style={{ fontFamily: HEAD, fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, margin: "0 0 16px" }}>Nabije gemeenten</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {nearby.map((c) => (
              <Link
                key={c.slug}
                href={urls.city(c.slug)}
                title={`Loodgieter en installateur in ${c.name}`}
                style={{ fontSize: 13, fontWeight: 600, color: C.blue, background: "#EFF4FF", border: "1px solid #DCE7FF", borderRadius: 999, padding: "8px 14px", textDecoration: "none" }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Slot-CTA */}
      <div style={{ maxWidth: 1120, margin: "8px auto 0", padding: "0 28px" }}>
        <div style={{ background: "linear-gradient(120deg,#0E1F45,#1A2E5C)", borderRadius: 18, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 21, color: "#fff" }}>Vakman nodig in {city.name}?</div>
            <div style={{ color: "#9FB0CE", fontSize: 14, marginTop: 3 }}>Ontvang gratis en vrijblijvend tot 3 offertes.</div>
          </div>
          <Link href={`/aanvraag?plaats=${city.slug}`} style={{ background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.34)" }}>Vraag offertes aan</Link>
        </div>
      </div>

      <div style={{ height: 50 }} />
    </main>
  );
}
