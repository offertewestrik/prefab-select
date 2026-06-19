/* =====================================================================
   Droomhuis in Dubai — NL/EN taalschakelaar (i18n)
   Tekst-walker: vervangt zichtbare NL-tekst door EN op basis van een
   woordenlijst. Keuze wordt onthouden (localStorage) en geldt site-breed.
   Diepe artikel-/woningteksten blijven in deze v1 Nederlands.
   ===================================================================== */
(function () {
  "use strict";

  // Alleen items waar EN afwijkt van NL. (Identieke termen worden overgeslagen.)
  const MAP = {
    /* nav + chrome */
    "Woningen": "Properties", "Nieuwbouw": "New developments", "Locaties": "Locations",
    "Diensten": "Services", "Kennisbank": "Knowledge base", "Over Joy": "About Joy",
    "Waarom Dubai": "Why Dubai", "Plan een adviesgesprek": "Schedule a consultation",
    "Adviesgesprek": "Consultation", "Home": "Home",

    /* hero */
    "Uw droom, ons doel": "Your dream, our mission",
    "Vind uw": "Find your", "droomhuis": "dream home", "in Dubai": "in Dubai",
    "Nederlandse begeleiding bij het kopen, investeren en wonen in exclusief vastgoed in Dubai.":
      "Dutch guidance for buying, investing and living in exclusive Dubai real estate.",
    "Bekijk woningen": "View properties", "Gratis adviesgesprek": "Free consultation",

    /* lead form (consultation) */
    "Gratis & vrijblijvend": "Free & no obligation",
    "Plan een gratis adviesgesprek": "Schedule a free consultation",
    "Vertel ons kort uw wensen — Joy neemt persoonlijk contact met u op.":
      "Tell us briefly what you're looking for — Joy will personally get in touch.",
    "Plan mijn adviesgesprek": "Schedule my consultation",
    "100% gratis · Geen verplichtingen": "100% free · No obligations",
    "Bedankt! Joy neemt zo snel mogelijk persoonlijk contact met u op.":
      "Thank you! Joy will personally get back to you as soon as possible.",
    "Voornaam": "First name", "Achternaam": "Last name", "E-mailadres": "Email address",
    "+31 Telefoonnummer": "Phone number",

    /* trust bar */
    "Belasting op huurinkomsten": "Tax on rental income", "Gemiddeld rendement": "Average yield",
    "Buitenlandse eigendom": "Foreign ownership", "Toplocaties in Dubai": "Prime locations in Dubai",
    "Tevreden klanten": "Happy clients",

    /* why */
    "Waarom investeren in Dubai?": "Why invest in Dubai?",
    "Een slimme keuze voor de toekomst": "A smart choice for the future",
    "Dubai is één van de meest aantrekkelijke vastgoedmarkten ter wereld.":
      "Dubai is one of the most attractive property markets in the world.",
    "0% Belasting": "0% Tax", "Geen inkomstenbelasting op huurinkomsten en winst.":
      "No income tax on rental income or profit.",
    "Hoge Huuropbrengsten": "High Rental Returns", "Gemiddelde rendementen tussen 6% en 9%.":
      "Average yields between 6% and 9%.",
    "Sterke Economie": "Strong Economy", "Een stabiele economie en veilige omgeving.":
      "A stable economy and a safe environment.",
    "Internationale Hub": "International Hub", "Strategische ligging tussen Europa, Azië en Afrika.":
      "Strategically located between Europe, Asia and Africa.",
    "Investeer in vastgoed en kom in aanmerking voor een Golden Visa.":
      "Invest in property and qualify for a Golden Visa.",

    /* cinema */
    "De Dubai levensstijl": "The Dubai lifestyle",
    "U koopt geen huis. U koopt een levensstijl.": "You're not buying a house. You're buying a lifestyle.",
    "Belastingvrij leven, 350 dagen zon, ongeëvenaarde luxe en een vastgoedmarkt die blijft groeien. Zo voelt thuiskomen in Dubai.":
      "Tax-free living, 350 days of sun, unrivalled luxury and a property market that keeps growing. That's what coming home to Dubai feels like.",

    /* locations */
    "Populaire locaties": "Popular locations", "De beste wijken in Dubai": "The best areas in Dubai",
    "Bekijk alle locaties": "View all locations", "Wijk": "Area",
    "Interactieve kaart": "Interactive map", "Ontdek Dubai per wijk": "Explore Dubai by area",
    "Beweeg over de kaart en bekijk per locatie de gemiddelde prijzen, het verwachte rendement en het type woningen.":
      "Hover the map to see average prices, expected returns and property types per area.",
    "Wijk in beeld": "Area in focus", "Bekijk wijk": "View area", "Rendement": "Return", "Type": "Type",
    "Vanaf · richtprijs": "From · guide price", "Visa mogelijk": "Visa eligible",
    "Iconisch wonen aan zee": "Iconic seaside living", "Luxe leven aan het water": "Luxury living by the water",
    "Hart van de stad": "Heart of the city", "Zakelijk centrum van Dubai": "Dubai's business hub",
    "Groen, luxe en exclusief": "Green, luxurious and exclusive", "Betaalbaar & gewild": "Affordable & popular",

    /* calculator */
    "Bereken uw rendement": "Calculate your return",
    "Ontdek wat uw investering kan opleveren. Eenvoudig, snel en 100% gratis.":
      "Discover what your investment could yield. Simple, fast and 100% free.",
    "Aankoopprijs (AED)": "Purchase price (AED)", "Verwachte huur per jaar (AED)": "Expected annual rent (AED)",
    "Eigen inbreng (%)": "Down payment (%)", "Geschat rendement": "Estimated return",
    "per jaar": "per year", "Jaarlijkse huur": "Annual rent", "Maandelijkse cashflow": "Monthly cash flow",
    "Terugverdientijd": "Payback period",
    "Indicatieve berekening. 0% inkomstenbelasting in Dubai is verwerkt. Vraag Joy om een persoonlijke analyse.":
      "Indicative calculation. Dubai's 0% income tax is included. Ask Joy for a personal analysis.",

    /* properties */
    "Uitgelichte projecten": "Featured projects", "Exclusieve woningen & projecten": "Exclusive homes & projects",
    "Bekijk alle woningen": "View all properties", "Uitgelicht": "Featured", "Vanaf": "From",
    "Bekijk woning": "View property",

    /* lifestyle */
    "Leven op wereldniveau": "Living at world-class level",
    "Van penthouse-uitzichten tot het jachthavenleven en villa's met privéstrand — een impressie van het dagelijks leven in Dubai.":
      "From penthouse views to marina life and villas with private beaches — a glimpse of everyday life in Dubai.",
    "Uitzicht op de Burj Khalifa": "Views of the Burj Khalifa", "Waterfront": "Waterfront",
    "Het Marina-leven": "Marina living", "Villa's": "Villas", "Interieur op maat": "Bespoke interiors",

    /* reviews */
    "Ervaringen": "Testimonials", "Wat onze klanten zeggen": "What our clients say",
    "Op basis van Google-reviews": "Based on Google reviews",
    "Joy van den Hurk was een genot om mee te werken en zeer responsief en ondersteunend bij mijn zoektocht naar een woning in Dubai Marina. Sterk aanbevolen.":
      "Joy van den Hurk was a pleasure to work with — very responsive and supportive during my search for a home in Dubai Marina. Highly recommended.",
    "Huurder in Dubai": "Tenant in Dubai", "Kopers": "Buyers", "Verhuurder · Marina Gate": "Landlord · Marina Gate",
    "Vastgoedvraag": "Property enquiry", "Cliënt": "Client", "Huurder": "Tenant",
    "Nieuwe inwoner van Dubai": "New Dubai resident", "Verhuurder": "Landlord",

    /* social */
    "Volg ons op social media": "Follow us on social media", "Altijd als eerste op de hoogte": "Always the first to know",
    "Op Instagram, TikTok en Facebook delen we dagelijks het laatste nieuws: nieuwe off-plan projecten, exclusieve woningen, marktnieuws en updates uit Dubai. Volg ons en mis niets.":
      "On Instagram, TikTok and Facebook we share the latest news daily: new off-plan projects, exclusive homes, market news and updates from Dubai. Follow us and never miss a thing.",
    "Nieuwe projecten": "New projects", "Marktnieuws": "Market news", "Exclusieve woningen": "Exclusive homes",
    "Updates uit Dubai": "Updates from Dubai", "Onze nieuwste reels": "Our latest reels",
    "Bekijk mijn reels": "Watch my reels",
    "Dagelijks": "Daily", "nieuwe posts & stories": "new posts & stories", "Dubai vastgoed": "Dubai real estate",

    /* about */
    "Over mij": "About me", "Nederlandse vastgoedmakelaar in Dubai": "Dutch real estate agent in Dubai",
    "Mijn naam is Joy van den Hurk, een ervaren vastgoedmakelaar gevestigd in het zonnige Dubai. Na een succesvolle carrière als vastgoedmakelaar in Nederland, besloot ik de volgende stap in mijn professionele reis te zetten door naar Dubai te verhuizen.":
      "My name is Joy van den Hurk, an experienced real estate agent based in sunny Dubai. After a successful career as an agent in the Netherlands, I decided to take the next step in my professional journey by moving to Dubai.",
    "Deze keuze werd gedreven door de unieke kansen die Dubai biedt aan jonge ondernemers, in combinatie met de uitzonderlijke veiligheid en netheid van de stad. Met mijn uitgebreide kennis van zowel de Nederlandse als de Dubai vastgoedmarkt, ben ik de ideale partner voor wie op zoek is naar een betrouwbare samenwerking.":
      "This choice was driven by the unique opportunities Dubai offers young entrepreneurs, combined with the city's exceptional safety and cleanliness. With my extensive knowledge of both the Dutch and Dubai property markets, I am the ideal partner for anyone looking for a reliable collaboration.",
    "Momenteel ben ik gespecialiseerd in de bestaande vastgoedmarkt van Dubai Marina, evenals in off-plan (nieuwbouw) projecten verspreid over het gehele Emiraat. Niet alleen begeleid ik mijn klanten, maar ik investeer zelf ook actief in vastgoed in Dubai. Dit geeft me een uniek perspectief en begrip van de markt, wat ik inzet om mijn klanten nog beter van dienst te kunnen zijn.":
      "I currently specialise in the existing property market of Dubai Marina, as well as off-plan (new-build) projects across the entire Emirate. I not only guide my clients, but actively invest in Dubai property myself. This gives me a unique perspective and understanding of the market, which I use to serve my clients even better.",
    "Voor mij staat het opbouwen van langdurige relaties met mijn klanten centraal. Mijn doel is om mijn klanten volledig te begeleiden in het vastgoedproces in Dubai — van de aankoop tot doorverkoop, tussentijdse verkoop, en lange- en korte termijn verhuur. Ik heb al vele klanten succesvol geholpen hun vastgoedambities in Dubai te realiseren.":
      "Building long-term relationships with my clients is central to how I work. My goal is to guide my clients through the entire property process in Dubai — from purchase to resale, interim sales, and long- and short-term rental. I have already helped many clients successfully realise their property ambitions in Dubai.",
    "Ervaren makelaar in Nederland én Dubai": "Experienced agent in the Netherlands and Dubai",
    "Specialist in Dubai Marina & off-plan nieuwbouw": "Specialist in Dubai Marina & off-plan new-builds",
    "Investeert zelf actief in Dubai vastgoed": "Actively invests in Dubai property herself",
    "Volledige begeleiding: aankoop, verkoop & verhuur": "Full guidance: buying, selling & renting",
    "Focus op langdurige klantrelaties": "Focused on long-term client relationships",
    "Ik beschouw mijn werk niet slechts als mijn beroep, maar als mijn passie. Ik kijk ernaar uit om samen met u een mooie en vruchtbare samenwerking aan te gaan.":
      "I see my work not merely as my profession, but as my passion. I look forward to building a wonderful and rewarding collaboration with you.",
    "Meer over Joy": "More about Joy", "Transacties": "Transactions",

    /* knowledge teaser */
    "Alles over vastgoed in Dubai": "Everything about Dubai real estate",
    "Bekijk de kennisbank": "Explore the knowledge base",
    "Investeren & rendement": "Investing & returns", "Investeren in Dubai vastgoed": "Investing in Dubai real estate",
    "Rendement, kosten, financiering en risico's — de complete gids voor investeerders.":
      "Returns, costs, financing and risks — the complete guide for investors.",
    "Wonen & verhuizen": "Living & relocating",
    "Verkrijg via vastgoed een 10-jarig verblijfsvisum — voorwaarden en het aanvraagproces.":
      "Get a 10-year residence visa through property — requirements and the application process.",
    "Wijken & locaties": "Areas & locations", "De beste wijken van Dubai": "The best areas of Dubai",
    "Van Palm Jumeirah tot JVC — prijzen, rendement en sfeer per wijk vergeleken.":
      "From Palm Jumeirah to JVC — prices, yields and vibe compared per area.",
    "Lees verder →": "Read more →", "Lees verder": "Read more",

    /* cta band */
    "Klaar om uw droomhuis in Dubai te vinden?": "Ready to find your dream home in Dubai?",
    "Plan een vrijblijvend adviesgesprek met Joy en ontdek uw mogelijkheden.":
      "Schedule a no-obligation consultation with Joy and discover your options.",

    /* partners + services */
    "Samenwerkingen & partners": "Partners & collaborations", "Toonaangevende ontwikkelaars": "Leading developers",
    "Vastgoed kopen": "Buying property", "Veilig kopen met Nederlandse begeleiding van A tot Z.":
      "Buy safely with Dutch guidance from A to Z.",
    "Hoog rendement, belastingvrij en datagedreven geadviseerd.": "High returns, tax-free and data-driven advice.",
    "Woning verkopen": "Selling property", "De beste prijs met professionele marketing en netwerk.":
      "The best price with professional marketing and network.",

    /* contact */
    "Contact opnemen": "Get in touch", "Laten we uw doelen realiseren": "Let's achieve your goals",
    "Heeft u vragen of wilt u vrijblijvend sparren? Ik help u graag verder met het vinden van uw ideale woning of investering in Dubai.":
      "Have a question or want to brainstorm with no obligation? I'm happy to help you find your ideal home or investment in Dubai.",
    "Bel of WhatsApp": "Call or WhatsApp", "E-mail": "Email", "Gevestigd in": "Based in",
    "Dubai, Verenigde Arabische Emiraten": "Dubai, United Arab Emirates",
    "Verstuur & bevestig": "Send & confirm",
    "Bedankt voor uw bericht! Joy neemt zo spoedig mogelijk persoonlijk contact met u op.":
      "Thank you for your message! Joy will personally get back to you as soon as possible.",
    "Naam *": "Name *", "E-mail *": "Email *", "Telefoon *": "Phone *", "Waar kan ik u mee helpen?": "How can I help you?",

    /* footer */
    "Luxe vastgoed en investeringen in Dubai, met persoonlijke Nederlandse begeleiding van A tot Z.":
      "Luxury real estate and investments in Dubai, with personal Dutch guidance from A to Z.",
    "Alle woningen": "All properties", "Off-plan projecten": "Off-plan projects",
    "Penthouses & villa's": "Penthouses & villas", "Rendement berekenen": "Calculate return",
    "Alle artikelen": "All articles", "Investeren in Dubai": "Investing in Dubai", "Kosten koper": "Buyer's costs",

    /* aanbod overzicht (UI) */
    "Woningaanbod": "Property listings", "Exclusief vastgoed te koop in": "Exclusive real estate for sale in",
    "Villa's, penthouses, appartementen en off-plan projecten in de meest gewilde wijken — zorgvuldig geselecteerd en met Nederlandse begeleiding van A tot Z.":
      "Villas, penthouses, apartments and off-plan projects in the most sought-after areas — carefully selected and with Dutch guidance from A to Z.",
    "Zoek op naam, wijk of ontwikkelaar…": "Search by name, area or developer…",
    "Alle types": "All types", "Alle wijken": "All areas", "Ready & off-plan": "Ready & off-plan",
    "Alle slaapkamers": "All bedrooms", "Aanbevolen": "Recommended", "Prijs ↑": "Price ↑", "Prijs ↓": "Price ↓",
    "woningen gevonden": "properties found",
    "Niet gevonden wat u zoekt?": "Didn't find what you're looking for?",
    "Joy heeft toegang tot het volledige Dubai-aanbod, inclusief off-market woningen. Vertel ons uw wensen.":
      "Joy has access to the entire Dubai market, including off-market homes. Tell us what you're looking for.",
    "Persoonlijk advies": "Personal advice", "Vraagprijs": "Asking price",

    /* kennisbank index (UI) */
    "Alles over vastgoed in": "Everything about real estate in",
    "Zoek in de kennisbank…": "Search the knowledge base…", "Alles": "All",
    "Staat uw vraag er niet bij?": "Can't find your question?",
    "Neem contact op": "Get in touch", "Markt & nieuwbouw": "Market & new-build",
    "Kopen & proces": "Buying & process",
  };

  const NL2EN = MAP;
  const EN2NL = {};
  for (const k in MAP) if (!(MAP[k] in EN2NL)) EN2NL[MAP[k]] = k;

  const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, IFRAME: 1, TEXTAREA: 1 };

  function walk(toEn) {
    const dict = toEn ? NL2EN : EN2NL;
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentNode;
        if (p && (SKIP[p.nodeName] || p.closest("[data-no-i18n]"))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n;
    while ((n = tw.nextNode())) {
      const raw = n.nodeValue, t = raw.trim();
      if (dict[t] != null) {
        const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
        n.nodeValue = lead + dict[t] + trail;
      }
    }
    // placeholders
    document.querySelectorAll("[placeholder]").forEach((el) => {
      const v = el.getAttribute("placeholder"), t = v && v.trim();
      if (t && dict[t] != null) el.setAttribute("placeholder", dict[t]);
    });
  }

  let current = "nl";
  function setLang(lang) {
    if (lang === current) { reflectButtons(lang); return; }
    walk(lang === "en");
    current = lang;
    document.documentElement.lang = lang;
    reflectButtons(lang);
    try { localStorage.setItem("dh_lang", lang); } catch (e) {}
  }
  function reflectButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang));
  }

  function init() {
    let saved = "nl";
    try { saved = localStorage.getItem("dh_lang") || "nl"; } catch (e) {}
    setLang(saved);
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lang-btn]");
      if (b) { e.preventDefault(); setLang(b.getAttribute("data-lang-btn")); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
