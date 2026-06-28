import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brand, regionsSentence } from "@repo/core";
import { urls, breadcrumbLd, serviceLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { priceFromFor } from "@/lib/format";
import { getServiceBySlug, getAllServiceSlugs } from "@/features/catalog/server/queries";
import { getTopCities } from "@/features/geo/server/queries";
import { getReviewsForService } from "@/features/reviews/server/aggregation";
import { searchInstallers } from "@/features/installers/server/directory";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getAllServiceSlugs();
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const title = service.seoTitle ?? `${service.name} — vergelijk vakmannen & prijzen`;
  const description =
    service.metaDescription ??
    `${service.name}: ${service.shortDescription} Vergelijk gratis offertes van gecertificeerde vakmannen via ${brand.name}. Vraag nu vrijblijvend aan.`;
  return {
    title,
    description,
    alternates: { canonical: urls.service(slug) },
    openGraph: { title, description, url: urls.service(slug) },
  };
}

// ── Design tokens uit de handoff (Nederlands Loodgieterplatform Design System) ──
const HEAD = "var(--font-sora), 'Sora', sans-serif";
const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";
const C = {
  ink: "#0E1B33",
  body: "#3A4A66",
  muted: "#56627C",
  muted2: "#6B7896",
  muted3: "#8A94A8",
  blue: "#2563EB",
  blueDark: "#1E4FD6",
  orange: "#F26A1B",
  green: "#16A34A",
  star: "#FFB400",
  line: "#EAEFF6",
  line2: "#EEF2F8",
};

const MONO = [
  { bg: "#EFF4FF", fg: "#2563EB" },
  { bg: "#E9F7EF", fg: "#16A34A" },
  { bg: "#FFF3E9", fg: "#F26A1B" },
];

const STEPS = [
  { n: 1, t: "Aanvraag plaatsen", p: "Vertel ons over je situatie." },
  { n: 2, t: "Offertes ontvangen", p: "Tot 3 offertes van vakmannen." },
  { n: 3, t: "Vergelijken", p: "Prijs, reviews & beschikbaarheid." },
  { n: 4, t: "Vakman kiezen", p: "Jij bepaalt met wie je werkt." },
];

const euro = (n: number) => "€" + n.toLocaleString("nl-NL");

// Redactionele FAQ-sets voor de belangrijkste dienst-categorieën (AEO/SEO).
const CURATED_FAQS: Record<string, { question: string; answer: string }[]> = {
  cv: [
    { question: "Wat kost een nieuwe CV-ketel in 2026?", answer: "Een nieuwe CV-ketel kost in 2026 gemiddeld €1.850 tot €2.800 inclusief btw en montage. De prijs hangt af van het vermogen, het merk (zoals Intergas, Remeha, Nefit, Vaillant of ATAG), het type (combi of solo) en de complexiteit van de aansluiting. Vergelijk offertes voor een prijs op maat." },
    { question: "Wat kost het vervangen van een CV-ketel?", answer: "Het vervangen van een CV-ketel kost doorgaans €1.850 tot €2.800 inclusief installatie en het milieuverantwoord afvoeren van de oude ketel. De exacte prijs hangt af van het model en of de bestaande aansluitingen geschikt zijn. Vraag vrijblijvend meerdere offertes aan om te vergelijken." },
    { question: "Hoe lang gaat een CV-ketel mee?", answer: "Een CV-ketel gaat gemiddeld 12 tot 15 jaar mee bij goed jaarlijks onderhoud. Neemt het rendement af, ontstaan er storingen of stijgt je gasverbruik, dan is vervanging vaak voordeliger dan blijven repareren. Een installateur adviseert op basis van leeftijd en staat van je ketel." },
    { question: "Hoe lang duurt het plaatsen van een nieuwe CV-ketel?", answer: "Het plaatsen van een nieuwe CV-ketel duurt meestal een halve tot een hele werkdag wanneer de bestaande aansluitingen geschikt zijn. Is er extra leidingwerk of een nieuwe rookgasafvoer nodig, dan kan het langer duren. De vakman zorgt voor montage, inbedrijfstelling en uitleg." },
    { question: "Hoeveel garantie krijg ik op een CV-ketel?", answer: "Op een nieuwe CV-ketel krijg je doorgaans 2 tot 5 jaar fabrieksgarantie, afhankelijk van merk en of je een onderhoudscontract afsluit. Daarnaast geldt garantie op de installatie zelf. Controleer altijd de garantievoorwaarden in de offerte van de installateur." },
  ],
  warmtepomp: [
    { question: "Wat kost een warmtepomp installeren in 2026?", answer: "Een warmtepomp installeren kost in 2026 ongeveer €4.250 tot €12.000, afhankelijk van het type en systeem. Een hybride warmtepomp ligt rond €3.500–€7.000, een lucht-water warmtepomp rond €6.000–€14.000. Vaak is ISDE-subsidie mogelijk, wat de netto kosten flink verlaagt." },
    { question: "Wat is een hybride warmtepomp?", answer: "Een hybride warmtepomp is een combinatie van een elektrische warmtepomp en je bestaande CV-ketel. De warmtepomp neemt het grootste deel van de verwarming over en de ketel springt bij op koude dagen. Zo bespaar je fors op gas zonder je hele installatie te vervangen." },
    { question: "Kom ik in aanmerking voor ISDE-subsidie op een warmtepomp?", answer: "Veel huiseigenaren komen in aanmerking voor ISDE-subsidie bij de aanschaf van een warmtepomp, mits het toestel op de RVO-apparatenlijst staat en wordt geïnstalleerd door een erkend bedrijf. De hoogte hangt af van type en vermogen. Een gecertificeerde installateur helpt met de keuze en aanvraag." },
    { question: "Hybride of volledig elektrische warmtepomp — wat is beter?", answer: "Kies een hybride warmtepomp bij een bestaande gasaansluiting en gemiddelde isolatie: lagere investering, snelle gasbesparing. Kies een volledige lucht-water warmtepomp bij een goed geïsoleerde woning met vloerverwarming of lage-temperatuurradiatoren. Een installateur berekent de warmtebehoefte en adviseert." },
    { question: "Hoe lang duurt het installeren van een warmtepomp?", answer: "Het installeren van een warmtepomp duurt gemiddeld 1 tot 3 werkdagen, afhankelijk van het type, de plaatsing van de buitenunit en eventuele aanpassingen aan het afgiftesysteem. De installateur verzorgt de warmtebehoefteberekening, montage, inbedrijfstelling en uitleg over het gebruik." },
  ],
  lekkage: [
    { question: "Wat kost een loodgieter bij spoed of een lekkage?", answer: "Een spoedbezoek voor een lekkage kost doorgaans €90 tot €350, afhankelijk van het tijdstip, de aanrijkosten en de aard van het probleem. 's Nachts en in het weekend gelden vaak hogere tarieven. Vraag vooraf naar het voorrijtarief en uurloon zodat je niet voor verrassingen staat." },
    { question: "Wat moet ik doen bij een waterlekkage?", answer: "Sluit bij een waterlekkage eerst de hoofdwaterkraan (meterkast) om verdere schade te beperken en vang lekkend water op. Schakel daarna snel een loodgieter in om de oorzaak op te sporen en te herstellen. Maak foto's voor je verzekering voordat je iets opruimt." },
    { question: "Kan ik 's nachts of in het weekend een loodgieter krijgen?", answer: "Ja, voor spoedgevallen zoals lekkages, gaslucht of een uitgevallen CV-ketel zijn er loodgieters met een 24/7 spoeddienst. Geef bij je aanvraag aan dat het dringend is; beschikbare vakmannen in jouw regio reageren dan met voorrang, vaak nog dezelfde dag of nacht." },
    { question: "Hoe snel kan een spoedloodgieter ter plaatse zijn?", answer: "Bij spoed kan een beschikbare loodgieter vaak binnen enkele uren ter plaatse zijn, afhankelijk van het tijdstip, je regio en de drukte. Vermeld duidelijk wat er aan de hand is en je postcode, zodat de dichtstbijzijnde vakman snel kan inschatten en uitrukken." },
  ],
  radiator: [
    { question: "Wat kost het plaatsen van een radiator?", answer: "Een radiator laten plaatsen kost gemiddeld €150 tot €500 per radiator inclusief arbeid, exclusief de radiator zelf. De prijs hangt af van het type, de aansluitingen en of er extra leidingwerk nodig is. Vraag een offerte aan voor een prijs op maat." },
    { question: "Wat kost het vervangen van een radiator?", answer: "Het vervangen van een bestaande radiator kost doorgaans €120 tot €350 per stuk inclusief montage, mits de aansluitingen op dezelfde plek blijven. Moeten leidingen worden verlegd, dan lopen de kosten op. Vergelijk vrijblijvend meerdere offertes." },
    { question: "Welke radiator past het best bij mijn woning?", answer: "Dat hangt af van de warmtebehoefte van de ruimte en je verwarmingssysteem. Bij lage-temperatuurverwarming (warmtepomp) zijn grotere of speciale radiatoren nodig. Een installateur berekent het benodigde vermogen en adviseert het juiste type en formaat." },
    { question: "Kan ik radiatoren combineren met een warmtepomp?", answer: "Ja, mits de radiatoren geschikt zijn voor lage-temperatuurverwarming of worden vervangen door grotere exemplaren. Een installateur beoordeelt of je huidige radiatoren voldoen en adviseert eventuele aanpassingen voor een efficiënte combinatie." },
    { question: "Hoe lang duurt het plaatsen van radiatoren?", answer: "Eén radiator vervangen duurt vaak 1 tot 2 uur; meerdere radiatoren of nieuw leidingwerk een halve tot hele werkdag. De vakman zorgt voor montage, aansluiten, ontluchten en een controle op lekkage." },
  ],
  ontstopping: [
    { question: "Wat kost een ontstopping?", answer: "Een afvoer of riool laten ontstoppen kost doorgaans €90 tot €250, afhankelijk van de ernst, de locatie en het tijdstip. Bij spoed of 's nachts gelden hogere tarieven. Vraag vooraf naar het voorrij- en uurtarief zodat je niet voor verrassingen staat." },
    { question: "Wat kan ik zelf doen bij een verstopping?", answer: "Probeer bij een lichte verstopping eerst een ontstopper (plopper) of een ontstoppingsveer; vermijd agressieve chemische middelen die leidingen aantasten. Helpt dit niet of zit de verstopping dieper in het riool, schakel dan een vakman met professioneel materieel in." },
    { question: "Hoe snel kan een ontstopper langskomen?", answer: "Bij spoed kan een beschikbare vakman vaak binnen enkele uren ter plaatse zijn. Geef je postcode en de aard van de verstopping door, dan reageert de dichtstbijzijnde ontstoppingsspecialist met voorrang — vaak nog dezelfde dag." },
    { question: "Hoe wordt een verstopping verholpen?", answer: "Een vakman lokaliseert de verstopping, vaak met een rioolcamera, en verhelpt deze met hogedrukreiniging, een veer of mechanische reiniging. Daarna wordt gecontroleerd of de afvoer weer vrij doorloopt en krijg je advies om herhaling te voorkomen." },
    { question: "Wie betaalt de ontstopping: huurder of verhuurder?", answer: "Een eenvoudige verstopping door dagelijks gebruik komt vaak voor rekening van de huurder; verstoppingen door een gebrek aan de leiding of het riool zijn meestal voor de verhuurder. Controleer je huurcontract en maak bij twijfel vooraf afspraken." },
  ],
  badkamer: [
    { question: "Wat kost een nieuwe badkamer in 2026?", answer: "Een complete badkamerrenovatie kost in 2026 grofweg €6.000 tot €15.000 of meer, afhankelijk van grootte, materialen, tegelwerk en sanitair. Het installatie- en loodgieterswerk (leidingen, afvoeren, kranen, toilet) is hiervan een deel. Vraag offertes op maat aan om de kosten te vergelijken." },
    { question: "Hoe lang duurt het verbouwen van een badkamer?", answer: "Een badkamerverbouwing duurt gemiddeld 1 tot 3 weken, afhankelijk van de omvang, sloopwerk, tegelwerk en droogtijden. Het loodgieters- en installatiewerk is daarbinnen meestal enkele dagen. Een goede planning met de vakman voorkomt vertraging en stemt de werkzaamheden op elkaar af." },
    { question: "Wat kost het vervangen van een kraan of toilet?", answer: "Het vervangen van een kraan kost meestal €80 tot €200 inclusief arbeid, een toilet vervangen ongeveer €150 tot €450, exclusief het sanitair zelf. De prijs hangt af van bereikbaarheid van de aansluitingen en het type. Vraag een vakman om een offerte voor een exacte prijs." },
    { question: "Welke garantie krijg ik op badkamerwerk?", answer: "Op installatie- en loodgieterswerk in de badkamer geldt doorgaans garantie van de uitvoerende vakman, vaak 1 tot 5 jaar afhankelijk van het werk. Op sanitair en kranen geldt daarnaast fabrieksgarantie. Leg de garantievoorwaarden altijd vast in de offerte of opdrachtbevestiging." },
  ],
};

/** Passende (gecommitte) categoriefoto voor de dienst-hero. */
function dienstFoto(slug: string, name: string): string {
  const s = `${slug} ${name}`.toLowerCase();
  let cat = "cv-ketels";
  if (/(zonne|solar|laadpaal|pv|batterij|elektra|meterkast)/.test(s)) cat = "zonnepanelen";
  else if (/(dak|zink|goot|pannen|bitumen)/.test(s)) cat = "dakwerk";
  else if (/warmtepomp/.test(s)) cat = "warmtepompen";
  else if (/(airco|koel)/.test(s)) cat = "warmtepompen";
  else if (/vloerverwarming/.test(s)) cat = "vloerverwarming";
  else if (/radiator/.test(s)) cat = "radiatoren";
  else if (/(badkamer|sanitair|toilet|douche|wastafel|kraan|wc)/.test(s)) cat = "badkamers";
  else if (/keuken/.test(s)) cat = "keukenleidingen";
  else if (/(lek|spoed|ontstop|riool|afvoer|verstop|storing)/.test(s)) cat = "lekkages";
  else if (/(leiding|loodgiet)/.test(s)) cat = "leidingwerk";
  else if (/(cv|ketel|geiser|verwarm|boiler|warm.?water)/.test(s)) cat = "cv-ketels";
  return `/foto/${cat}/${cat}-01.jpg`;
}

function curatedFaqKey(slug: string, name: string): string | null {
  const s = `${slug} ${name}`.toLowerCase();
  if (/warmtepomp/.test(s)) return "warmtepomp";
  if (/radiator/.test(s)) return "radiator";
  if (/(ontstop|riool|afvoer|verstop)/.test(s)) return "ontstopping";
  if (/(cv|ketel|geiser|verwarm)/.test(s)) return "cv";
  if (/(lek|spoed|storing)/.test(s)) return "lekkage";
  if (/(badkamer|sanitair|toilet|douche|kraan)/.test(s)) return "badkamer";
  return null;
}

// Generieke FAQ-fallback per dienst (als er nog geen redactionele FAQ in de DB staat).
function genericFaqs(name: string, lname: string, priceSpan: string): { question: string; answer: string }[] {
  return [
    { question: `Wat kost ${lname} gemiddeld?`, answer: `De richtprijs voor ${lname} ligt rond ${priceSpan} inclusief btw en montage. De exacte prijs hangt af van je situatie, de gekozen materialen en de regio. Vergelijk vrijblijvend meerdere offertes voor een prijs op maat.` },
    { question: `Hoe snel kan ${lname} worden uitgevoerd?`, answer: `Vaak kun je al binnen enkele dagen terecht en bij spoed soms dezelfde dag. Je ontvangt meestal binnen enkele uren tot één werkdag offertes van beschikbare vakmannen uit jouw regio.` },
    { question: `Zijn de vakmannen voor ${name.toLowerCase()} gecertificeerd?`, answer: `Ja. Alle aangesloten vakmannen zijn gescreend, verzekerd en beschikken over de relevante erkenningen en keurmerken (zoals InstallQ, Kiwa, OK CV, STEK of VCA), afhankelijk van het werk.` },
    { question: `Is het aanvragen van offertes gratis en vrijblijvend?`, answer: `Zeker. Het aanvragen en vergelijken van offertes voor ${lname} is 100% gratis en vrijblijvend. Je zit nergens aan vast en kiest zelf met welke vakman je in zee gaat.` },
    { question: `Krijg ik garantie op ${lname}?`, answer: `Ja. Je krijgt garantie op de uitvoering door de vakman en, waar van toepassing, fabrieksgarantie op de gebruikte materialen. De voorwaarden staan helder in de offerte.` },
  ];
}
const monogram = (name: string) => {
  const w = name.trim().split(/\s+/).filter(Boolean);
  const letters = w.map((x) => x[0] ?? "").join("");
  return (letters || "?").slice(0, 2).toUpperCase();
};

// ── Kleine inline-iconen (matchen de SVG's uit het ontwerp) ──
function IcStar({ s = 12 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={C.star} aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
    </svg>
  );
}
function IcCheckRing({ stroke = C.green, s = 18 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.7" />
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcCheck({ s = 16, w = 2.6 }: { s?: number; w?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M5 13l4 4L19 7" stroke={C.green} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcShield({ stroke = C.green, s = 15 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcArrow({ stroke = "#fff", s = 17 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcLock({ stroke = C.blue, s = 14 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={stroke} strokeWidth="1.7" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [topCities, reviews, installers] = await Promise.all([
    getTopCities(12),
    getReviewsForService(slug),
    searchInstallers({ service: slug, sort: "rating" }),
  ]);

  const related = service.relatedFrom.map((r) => r.to).filter((t) => t.publish === "ACTIVE");
  const brands = service.brands.map((b) => b.brand.name);
  const brandList = brands.length ? brands.slice(0, 6) : ["Remeha", "Nefit", "Vaillant", "Intergas", "ATAG", "Bosch"];
  const specialists = installers.items.slice(0, 3);

  const rating = reviews.count > 0 ? reviews.average.toFixed(1).replace(".", ",") : "9,4";
  const effFrom = priceFromFor(slug, service.priceFrom);
  const fromPrice = effFrom != null ? euro(effFrom) : null;
  const priceSpan =
    effFrom != null && service.priceTo != null && service.priceTo > effFrom
      ? `${euro(effFrom)} – ${euro(service.priceTo)}`
      : fromPrice
        ? `vanaf ${fromPrice}`
        : "Op aanvraag";
  const lname = service.name.toLowerCase();
  const heroVideo = /(cv|ketel|geiser)/.test(`${slug} ${service.name}`.toLowerCase()) ? "/video/dienst-cv.mp4" : null;
  const heroPhoto = dienstFoto(slug, service.name);
  const curatedKey = curatedFaqKey(slug, service.name);
  const curated = curatedKey ? CURATED_FAQS[curatedKey] : undefined;
  const faqs =
    service.faqs.length > 0
      ? service.faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : (curated ?? genericFaqs(service.name, lname, priceSpan));

  const css = `
    .svc *{box-sizing:border-box}
    .svc input{transition:border-color .18s ease, box-shadow .18s ease}
    .svc input:focus{border-color:${C.blue} !important;box-shadow:0 0 0 4px rgba(37,99,235,.13)}
    .svc [data-grid3] > div, .svc [data-grid4] > a{transition:transform .25s ease, box-shadow .25s ease}
    .svc [data-grid3] > div:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    .svc details > summary{list-style:none}
    .svc details > summary::-webkit-details-marker{display:none}
    .svc details[open] .svc-chev{transform:rotate(180deg)}
    @media (max-width:920px){ .svc [data-2col]{grid-template-columns:1fr !important} .svc [data-sticky]{position:static !important} }
    @media (max-width:680px){ .svc [data-grid3]{grid-template-columns:1fr !important} .svc [data-grid2]{grid-template-columns:1fr !important} .svc [data-steps]{flex-direction:column !important} .svc [data-steparrow]{display:none !important} }
  `;

  return (
    <main className="svc" style={{ fontFamily: BODY, color: C.body, background: "radial-gradient(900px 520px at 86% 4%, rgba(37,99,235,.05), transparent 60%), linear-gradient(180deg,#F5F7FB 0%,#F1F4F9 100%)", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Diensten", path: "/diensten" },
            { name: service.name, path: urls.service(slug) },
          ]),
          serviceLd({
            name: service.name,
            description: service.shortDescription,
            path: urls.service(slug),
            areaServed: regionsSentence(),
            priceFrom: service.priceFrom,
            rating: reviews.count > 0 ? { value: reviews.average, count: reviews.count } : undefined,
            reviews: reviews.latest.map((r) => ({ author: r.authorLabel, rating: r.rating, title: r.title, body: r.body })),
          }),
          faqLd(faqs),
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <Link href="/diensten" style={{ color: C.muted3, textDecoration: "none" }}>Diensten</Link><span>/</span>
          <span style={{ color: C.ink }}>{service.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(900px 420px at 12% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", padding: "40px 0 36px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px" }}>
          <div data-2col style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 36, alignItems: "start" }}>
            <div>
              {/* Hero-visual: video (cv-ketel) of categoriefoto */}
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 18px 40px rgba(15,27,51,.13)", marginBottom: 18, background: "linear-gradient(135deg,#1E4FD6 0%,#2563EB 45%,#0E1F45 100%)" }}>
                {heroVideo ? (
                  <video autoPlay muted loop playsInline poster="/foto/_posters/dienst-cv.jpg" preload="metadata" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={heroPhoto} alt={`${service.name} — vakwerk via ${brand.name}`} fill sizes="(max-width:920px) 100vw, 40vw" style={{ objectFit: "cover" }} />
                )}
                <div style={{ position: "relative", height: 232, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 15, background: "linear-gradient(125deg,rgba(8,18,40,.10),rgba(8,18,40,0) 42%,rgba(8,18,40,.46))" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, background: C.blue, color: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, boxShadow: "0 8px 18px rgba(37,99,235,.4)" }}>
                      <IcShield stroke="#fff" s={13} />Geverifieerde monteurs
                    </span>
                  </div>
                  {fromPrice && (
                    <div>
                      <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,.95)", backdropFilter: "blur(6px)", borderRadius: 10, padding: "8px 12px", fontSize: 12.5, fontWeight: 700, color: C.ink }}>
                        vanaf&nbsp;<span style={{ fontFamily: HEAD, fontWeight: 800, color: C.blue, fontSize: 15 }}>{fromPrice}</span>&nbsp;incl. montage
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#EFF4FF", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 700, color: C.blueDark, marginBottom: 14 }}>
                <IcStar s={13} />{rating} · {installers.total > 0 ? `${installers.total} vakmannen beschikbaar` : "gemiddelde beoordeling"}
              </div>
              <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 38, lineHeight: 1.1, letterSpacing: "-.025em", color: C.ink }}>{service.name}</h1>
              <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: C.muted, maxWidth: 540 }}>{service.shortDescription}</p>

              <div data-grid2 style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 22px", marginTop: 22, maxWidth: 520 }}>
                {["Gecertificeerde monteurs", "Vaak binnen 48 uur geplaatst", "Tot 5 jaar garantie", "Alle topmerken"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14.5, fontWeight: 600, color: "#1F2A45" }}>
                    <IcCheckRing />{t}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
                <a href="#aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}>
                  Vraag gratis offertes aan <IcArrow />
                </a>
                {fromPrice && (
                  <span style={{ fontSize: 14, color: C.muted2, fontWeight: 600 }}>vanaf <span style={{ fontFamily: HEAD, fontWeight: 800, color: C.ink, fontSize: 18 }}>{fromPrice}</span></span>
                )}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                {[
                  { ic: <IcShield stroke={C.green} />, t: "Gecertificeerd & verzekerd" },
                  { ic: <IcCheckRing stroke={C.blue} s={15} />, t: "Tot 5 jaar garantie" },
                  { ic: <IcStar s={14} />, t: reviews.count > 0 ? `${rating} · ${reviews.count} reviews` : `${rating} gemiddeld` },
                  { ic: <IcLock />, t: "Veilig betalen via platform" },
                ].map((chip, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: "1px solid #EAEFF6", borderRadius: 10, padding: "9px 13px", fontSize: 12.5, fontWeight: 700, color: "#1F2A45", boxShadow: "0 3px 10px rgba(15,27,51,.04)" }}>
                    {chip.ic}{chip.t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#9AA6BC", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 11 }}>Onze monteurs installeren o.a.</div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 22px" }}>
                  {brandList.map((b) => (
                    <span key={b} style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 17, color: "#AEB9CC" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky aanvraagkaart — navigeert naar bestaande /aanvraag flow */}
            <form action="/aanvraag" method="get" data-sticky id="aanvraag" style={{ position: "sticky", top: 96, background: "#fff", border: "1px solid #EAEFF6", borderRadius: 18, boxShadow: "0 22px 54px rgba(15,27,51,.13)", overflow: "hidden" }}>
              <input type="hidden" name="dienst" value={slug} />
              <div style={{ background: "#FFF6E9", borderBottom: "1px solid #FBE6C8", padding: "9px 18px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "#9A5A12" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange }} />Nog 3 vakmannen vrij vandaag
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 700, color: C.ink }}>Gratis offertes voor {lname}</h3>
                <p style={{ fontSize: 13, color: C.muted2, marginTop: 4, marginBottom: 14 }}>In 2 minuten — vrijblijvend en gratis.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1.5px solid #E5EAF1", borderRadius: 11, padding: "11px 13px" }}>
                    <IcShield stroke={C.blue} s={18} /><span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{service.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input name="postcode" placeholder="Postcode" style={{ flex: 1, padding: "12px 13px", border: "1.5px solid #E5EAF1", borderRadius: 11, fontFamily: "inherit", fontSize: 14, color: C.ink, outline: "none" }} />
                    <input name="huisnummer" placeholder="Nr." style={{ width: 80, padding: "12px 13px", border: "1.5px solid #E5EAF1", borderRadius: 11, fontFamily: "inherit", fontSize: 14, color: C.ink, outline: "none" }} />
                  </div>
                  <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, background: C.blue, border: 0, cursor: "pointer", borderRadius: 11, fontFamily: "inherit", fontWeight: 700, fontSize: 15, color: "#fff", boxShadow: "0 12px 24px rgba(37,99,235,.28)" }}>
                    Offertes aanvragen <IcArrow s={16} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 12, fontSize: 11.5, fontWeight: 600, color: C.muted3 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IcCheck s={12} w={3} />Gratis</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IcCheck s={12} w={3} />Vrijblijvend</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IcLock s={11} stroke={C.blue} />SSL</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Prijzen */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "100px 28px" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", color: C.ink }}>Wat kost {lname}?</h2>
        <p style={{ fontSize: 15, color: C.muted, marginTop: 8, maxWidth: 640 }}>Richtprijzen inclusief montage en inbedrijfstelling. De exacte prijs hangt af van je situatie en de gekozen materialen.</p>
        <div data-grid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 22 }}>
          {/* Richtprijs (uitgelicht) */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.blue}`, borderRadius: 16, padding: 22, boxShadow: "0 14px 30px rgba(37,99,235,.12)", position: "relative" }}>
            <span style={{ position: "absolute", top: -10, left: 22, background: C.blue, color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "4px 10px", borderRadius: 999, textTransform: "uppercase" }}>Richtprijs</span>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>{service.name}</div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 26, color: C.blue, margin: "8px 0 4px" }}>{priceSpan}</div>
            <div style={{ fontSize: 13, color: C.muted3 }}>{service.priceUnit ? `per ${service.priceUnit}` : "incl. btw & montage"}</div>
            <div style={{ height: 1, background: C.line2, margin: "14px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5, color: C.body }}>
              <span style={{ display: "flex", gap: 8 }}><IcCheck />Vrijblijvende offerte op maat</span>
              <span style={{ display: "flex", gap: 8 }}><IcCheck />Vergelijk tot 3 vakmannen</span>
            </div>
          </div>
          {/* Inbegrepen */}
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>Wat zit erbij in</div>
            <div style={{ fontSize: 13, color: C.muted3, marginTop: 4 }}>Standaard bij de meeste offertes</div>
            <div style={{ height: 1, background: C.line2, margin: "14px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5, color: C.body }}>
              {["Montage door een vakman", "Inbedrijfstelling & uitleg", "Afvoer van oude materialen", "Eindcontrole & oplevering"].map((t) => (
                <span key={t} style={{ display: "flex", gap: 8 }}><IcCheck />{t}</span>
              ))}
            </div>
          </div>
          {/* Goed om te weten */}
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>Goed om te weten</div>
            <div style={{ fontSize: 13, color: C.muted3, marginTop: 4 }}>Waar je op kunt rekenen</div>
            <div style={{ height: 1, background: C.line2, margin: "14px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5, color: C.body }}>
              {["Gecertificeerde & verzekerde vakmannen", "Tot 5 jaar garantie", "Vaak binnen 48 uur ingepland", "100% gratis & vrijblijvend"].map((t) => (
                <span key={t} style={{ display: "flex", gap: 8 }}><IcCheck />{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "104px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 36 }}>Zo werkt het</h2>
        <div data-steps style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          {STEPS.map((st, i) => (
            <div key={st.n} style={{ display: "contents" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 8px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: st.n === 4 ? C.blue : "#EFF4FF", color: st.n === 4 ? "#fff" : C.blue, fontFamily: HEAD, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 17 }}>{st.n}</div>
                <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15, color: C.ink }}>{st.t}</div>
                <p style={{ fontSize: 13, color: C.muted2, marginTop: 5, lineHeight: 1.5 }}>{st.p}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div data-steparrow style={{ paddingTop: 18, color: "#C2CEE0" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Specialisten */}
      {specialists.length > 0 && (
        <section style={{ background: "linear-gradient(180deg,#F5F7FB,#F1F4F9)", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "100px 28px" }}>
            <h2 style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 22 }}>{service.name} specialisten</h2>
            <div data-grid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {specialists.map((sp, i) => {
                const m = MONO[i % MONO.length]!;
                return (
                  <Link key={sp.id} href={`/vakmannen/${sp.slug}`} style={{ display: "block", background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 20, boxShadow: "0 6px 18px rgba(15,27,51,.05)", textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 50, height: 50, borderRadius: 13, background: m.bg, color: m.fg, fontFamily: HEAD, fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>{monogram(sp.name)}</span>
                      <div>
                        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{sp.name}</div>
                        <div style={{ fontSize: 12, color: C.muted3 }}>{sp.city ?? sp.provinces[0] ?? "Heel Nederland"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, background: "#FFF8E8", border: "1px solid #FCE9C0", borderRadius: 8, padding: "3px 8px", fontSize: 12.5, fontWeight: 800, color: C.ink }}>
                        <IcStar />{sp.ratingAvg > 0 ? sp.ratingAvg.toFixed(1).replace(".", ",") : "Nieuw"}
                      </span>
                      <span style={{ fontSize: 12, color: C.muted3, fontWeight: 600 }}>
                        {sp.ratingCount > 0 ? `${sp.ratingCount} reviews` : "Nieuw op het platform"}
                        {sp.emergencyService ? " · 24/7 spoed" : ""}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "104px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
          <h2 style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 8 }}>Veelgestelde vragen</h2>
          <p style={{ fontSize: 14.5, color: C.muted, marginBottom: 22 }}>Over {lname}.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 820 }}>
            {faqs.map((f, i) => (
              <details key={f.question} open={i === 0} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 13, overflow: "hidden" }}>
                <summary style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "17px 20px", cursor: "pointer" }}>
                  <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{f.question}</span>
                  <span className="svc-chev" style={{ display: "flex", flexShrink: 0, transition: "transform .2s ease" }} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </summary>
                <p style={{ padding: "0 20px 18px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Andere diensten + per stad */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "90px 28px" }}>
        <div data-grid2 style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {related.length > 0 && (
            <div>
              <h3 style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 14 }}>Andere diensten</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {related.map((r) => (
                  <Link key={r.slug} href={urls.service(r.slug)} style={{ fontSize: 13, fontWeight: 600, color: "#475069", background: "#F4F7FB", border: "1px solid #E6ECF5", borderRadius: 8, padding: "8px 12px", textDecoration: "none" }}>{r.name}</Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 14 }}>{service.name} per stad</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {topCities.map((c) => (
                <Link key={c.slug} href={urls.serviceCity(slug, c.slug)} style={{ fontSize: 13, fontWeight: 600, color: C.blue, background: "#EFF4FF", border: "1px solid #DCE7FF", borderRadius: 8, padding: "8px 12px", textDecoration: "none" }}>{c.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slot-CTA */}
      <div style={{ maxWidth: 1120, margin: "36px auto 0", padding: "0 28px" }}>
        <div style={{ background: "linear-gradient(120deg,#0E1F45,#1A2E5C)", borderRadius: 18, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 21, color: "#fff" }}>Klaar voor {lname}?</div>
            <div style={{ color: "#9FB0CE", fontSize: 14, marginTop: 3 }}>Ontvang gratis en vrijblijvend tot 3 offertes.</div>
          </div>
          <Link href={`/aanvraag?dienst=${slug}`} style={{ background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.34)" }}>Vraag offertes aan</Link>
        </div>
      </div>

      <div style={{ height: 50 }} />
    </main>
  );
}
