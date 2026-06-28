// ─────────────────────────────────────────────────────────────────────────
//  Menselijke, eerlijke teksten voor de stad-landingspagina's.
//
//  Variatie komt uit ECHTE attributen (provincie, inwonertal, buurgemeenten),
//  niet uit het simpelweg invullen van een plaatsnaam. Er worden bewust GEEN
//  verzonnen lokale "feiten" of aantallen gebruikt — alleen behulpzame,
//  controleerbare informatie. Doel: content waar een bezoeker écht iets aan
//  heeft en die Google beloont in plaats van afstraft.
// ─────────────────────────────────────────────────────────────────────────

export type CityFacts = {
  name: string;
  province: string;
  population: number | null;
};

/** Waar regio-typeringen per provincie (algemeen waar, geen specifieke claims). */
const PROVINCE_NOTE: Record<string, string> = {
  "Noord-Holland":
    "In grote delen van Noord-Holland staan veel vooroorlogse woningen en appartementen. Verouderd leidingwerk, oudere cv-ketels en compacte badkamers vragen daar geregeld om een ervaren installateur.",
  "Zuid-Holland":
    "Zuid-Holland is een van de dichtstbevolkte regio's van het land. In oudere stadswijken kom je vaak smalle huizen met verouderde leidingen tegen, terwijl nieuwbouwwijken juist om moderne, duurzame installaties vragen.",
  Utrecht:
    "De provincie Utrecht combineert historische binnensteden met ruimere, nieuwere woonwijken. Beide brengen hun eigen klussen mee, van het vernieuwen van oude leidingen tot het plaatsen van duurzame verwarming.",
  "Noord-Brabant":
    "Noord-Brabant kent veel ruime gezinswoningen en groeiende nieuwbouwwijken. Verduurzaming — denk aan warmtepompen en vloerverwarming — is hier een veelgevraagde klus.",
  Gelderland:
    "Gelderland loopt uiteen van stedelijke gebieden tot landelijke dorpen. Het type woning verschilt sterk per plaats, waardoor lokaal advies van een vakman extra waardevol is.",
  Overijssel:
    "In Overijssel vind je zowel historische stadskernen als veel vrijstaande woningen op het platteland, elk met eigen wensen op het gebied van verwarming en sanitair.",
  Drenthe:
    "Drenthe is een groene, ruim opgezette provincie met relatief veel vrijstaande en oudere woningen, waar goed onderhoud en verduurzaming van de installatie belangrijk zijn.",
  Groningen:
    "Groningen combineert een levendige (studenten)stad met uitgestrekte dorpen. Van het opknappen van oudere huurwoningen tot nieuwbouw: het werk is er gevarieerd.",
  Friesland:
    "Friesland is een weidse provincie met veel kleinere kernen. Een vakman uit de eigen regio die snel ter plaatse is, maakt hier bij spoed echt verschil.",
  Flevoland:
    "Flevoland bestaat grotendeels uit naoorlogse nieuwbouw. De woningen zijn relatief modern, waardoor het accent vaak ligt op onderhoud, uitbreiding en verduurzaming.",
  Zeeland:
    "Zeeland is een kustprovincie met veel oudere woningen en vakantiehuizen. Vocht, zilte lucht en seizoensgebruik stellen extra eisen aan leidingwerk en installaties.",
  Limburg:
    "Limburg kent een afwisseling van stadskernen en heuvelachtig buitengebied, met zowel karakteristieke oudere panden als moderne woningen.",
};

function provinceNote(c: CityFacts): string {
  return (
    PROVINCE_NOTE[c.province] ??
    `${c.name} ligt in ${c.province}, waar uiteenlopende woningen vragen om vakkundig installatie- en loodgieterswerk.`
  );
}

/** Natuurlijke openingsalinea — varieert met de provincie en de plaatsnaam. */
export function cityIntro(c: CityFacts): string {
  return `Of het nu gaat om een lekkage die snel verholpen moet worden, een nieuwe cv-ketel of een complete badkamer: in ${c.name} koppelen we je aan gecertificeerde loodgieters en installateurs uit de eigen regio. ${provinceNote(c)} Je vergelijkt gratis en vrijblijvend meerdere offertes en kiest zelf met wie je in zee gaat.`;
}

/** Behulpzame, evergreen secties. Eerlijk over kosten; geen verzonnen cijfers. */
export function cityBody(c: CityFacts): { heading: string; body: string }[] {
  return [
    {
      heading: `Een betrouwbare loodgieter vinden in ${c.name}`,
      body: `Een goede loodgieter herken je niet aan de laagste prijs alleen. Let op aantoonbare ervaring, geldige keurmerken (zoals InstallQ, Kiwa of OK CV), een heldere offerte vooraf en eerlijke beoordelingen van eerdere klanten. Via ons vergelijk je in ${c.name} meerdere vakmannen naast elkaar op prijs, beschikbaarheid én vakmanschap — zonder dat je zelf eindeloos hoeft te zoeken en bellen.`,
    },
    {
      heading: `Wat kost een loodgieter in ${c.name}?`,
      body: `De kosten hangen sterk af van de klus. Voor regulier loodgieterswerk reken je doorgaans op een uurtarief van €45 tot €75 plus €40 tot €80 voorrijkosten; bij spoed, 's avonds of in het weekend liggen de tarieven hoger. Grotere klussen — zoals een cv-ketel vervangen (vanaf circa €1.250) of een badkamerrenovatie — gaan meestal op offerte. Vraag daarom altijd vooraf een duidelijke prijsopgave, dan weet je in ${c.name} precies waar je aan toe bent.`,
    },
    {
      heading: `Spoed? Snel een loodgieter in ${c.name}`,
      body: `Een gesprongen leiding of een uitgevallen cv-ketel kan niet wachten. Geef bij je aanvraag aan dat het om spoed gaat en omschrijf kort het probleem; beschikbare vakmannen uit ${c.name} en omgeving reageren dan met voorrang, vaak nog dezelfde dag. Sluit bij een lekkage eerst zelf de hoofdkraan om verdere schade te beperken.`,
    },
  ];
}

/** Lokaal geformuleerde, eerlijke FAQ. `nearby` zijn echte buurgemeenten. */
export function cityFaqs(c: CityFacts, nearby: string[]): { question: string; answer: string }[] {
  const omgeving = nearby.slice(0, 3);
  const omgevingAntwoord = omgeving.length
    ? `Ja. De aangesloten vakmannen werken in ${c.name} en omliggende plaatsen zoals ${omgeving.join(", ")}. Vul je postcode in en je ziet meteen wie er in jouw buurt beschikbaar is.`
    : `Ja. De aangesloten vakmannen werken in ${c.name} en de directe omgeving. Vul je postcode in en je ziet meteen wie er in jouw buurt beschikbaar is.`;
  return [
    {
      question: `Wat kost een loodgieter in ${c.name}?`,
      answer: `Een loodgieter in ${c.name} rekent doorgaans €45 tot €75 per uur plus €40 tot €80 voorrijkosten; bij spoed of in het weekend ligt dat hoger. Grotere klussen gaan op offerte. Vraag vooraf een prijsopgave en vergelijk gerust meerdere offertes voordat je kiest.`,
    },
    {
      question: `Hoe snel kan een loodgieter in ${c.name} langskomen?`,
      answer: `Voor gewone klussen kun je vaak binnen enkele dagen terecht; bij spoed regelmatig nog dezelfde dag. Meestal ontvang je binnen enkele uren tot één werkdag reacties van beschikbare vakmannen uit ${c.name} en omgeving.`,
    },
    {
      question: `Kan ik 's avonds of in het weekend een spoedloodgieter in ${c.name} krijgen?`,
      answer: `Ja, voor spoedgevallen zoals een lekkage, gaslucht of een uitgevallen cv-ketel zijn er in ${c.name} loodgieters met een 24/7 spoeddienst. Geef bij je aanvraag aan dat het dringend is, dan reageren beschikbare vakmannen met voorrang.`,
    },
    {
      question: `Zijn de loodgieters in ${c.name} gecertificeerd?`,
      answer: `De vakmannen op ons platform zijn gescreend en verzekerd en beschikken, afhankelijk van het werk, over erkenningen zoals InstallQ, Kiwa, OK CV, STEK of VCA. Zo werk je in ${c.name} altijd met een betrouwbare professional.`,
    },
    {
      question: `Werken de vakmannen ook in de omgeving van ${c.name}?`,
      answer: omgevingAntwoord,
    },
  ];
}
