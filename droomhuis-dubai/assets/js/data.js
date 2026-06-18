/* =====================================================================
   Droomhuis in Dubai — content data
   Featured projects · Locations · Reviews  (demo content, indicatief)
   ===================================================================== */
window.DH = (function () {
  // ---- Featured projects ---------------------------------------------
  const PROPERTIES = [
    {
      tag: "Uitgelicht",
      slug: "ellington-beach-house",
      name: "Ellington Beach House",
      loc: "Palm Jumeirah",
      price: "AED 5.200.000",
      beds: 3, baths: 4, area: "201 m²",
      roi: "7,8%",
      img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tag: "Uitgelicht",
      slug: "address-residences-the-bay",
      name: "Address Residences The Bay",
      loc: "Dubai Harbour",
      price: "AED 3.800.000",
      beds: 2, baths: 3, area: "180 m²",
      roi: "6,9%",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tag: "Uitgelicht",
      slug: "sobha-one",
      name: "Sobha One",
      loc: "Business Bay",
      price: "AED 2.100.000",
      beds: 2, baths: 2, area: "120 m²",
      roi: "8,1%",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tag: "Uitgelicht",
      slug: "nad-al-sheba-gardens",
      name: "Nad Al Sheba Gardens",
      loc: "Nad Al Sheba",
      price: "AED 6.500.000",
      beds: 4, baths: 5, area: "350 m²",
      roi: "7,5%",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // ---- Popular locations ---------------------------------------------
  const LOCATIONS = [
    { name: "Palm Jumeirah", desc: "Iconisch wonen aan zee", href: "kennisbank/palm-jumeirah-woningen.html", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop" },
    { name: "Dubai Marina", desc: "Luxe leven aan het water", href: "kennisbank/dubai-marina-appartementen.html", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop" },
    { name: "Downtown Dubai", desc: "Hart van de stad", href: "kennisbank/downtown-dubai-wonen.html", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
    { name: "Business Bay", desc: "Zakelijk centrum van Dubai", href: "kennisbank/business-bay-vastgoed.html", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
    { name: "Dubai Hills Estate", desc: "Groen, luxe en exclusief", href: "kennisbank/dubai-hills-estate.html", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { name: "Jumeirah Village Circle", desc: "Betaalbaar & gewild", href: "kennisbank/jumeirah-village-circle-jvc.html", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop" },
  ];

  // ---- Reviews -------------------------------------------------------
  const REVIEWS = [
    { name: "Chris Travis", role: "Huurder in Dubai", text: "Joy was een genot om mee om te gaan. Punctueel voor bezichtigingen en goed geïnformeerd over de woning en de bijkomende vragen rond verhuizing, facturering en andere administratieve taken die nodig zijn bij het huren in Dubai. Zou het volledig aanbevelen." },
    { name: "Family Swissa", role: "Kopers", text: "We hebben een fantastische ervaring gehad met onze makelaar, Joy van den Hurk Real Estate Dubai. We vonden haar deskundig, professioneel en oprecht betrokken." },
    { name: "Juan Ignacio", role: "Verhuurder · Marina Gate", text: "Agent Joy van den Hurk heeft uitstekend werk geleverd bij het verhuren van mijn appartement in Marina Gate. Super professioneel en effectief werk. 100% aan te bevelen." },
    { name: "Handcraft Media", role: "Vastgoedvraag", text: "Joy is een uitstekende makelaar. Haar kennis van de markt is indrukwekkend, ze was altijd op tijd, reageerde snel en was prettig om mee te werken. Ik kan haar ten zeerste aanbevelen voor elke vastgoedvraag." },
    { name: "Monique", role: "Cliënt", text: "Geweldige ervaring met Joy van den Hurk. Zeer informatief, duidelijk en prettig in de omgang!" },
    { name: "Hussein Aboud", role: "Cliënt", text: "Hé, ik vond het erg leuk om met Joy samen te werken. Ze was zeer professioneel, behulpzaam en deed haar uiterste best voor ons." },
    { name: "Kuren Dhand", role: "Huurder", text: "Joy was een plezier om mee te werken. Ze liet ons het appartement een paar keer zien en beantwoordde al onze vragen. Ze was te allen tijde beschikbaar om verdere vragen te beantwoorden." },
    { name: "Walid Shihabi", role: "Dubai Marina", text: "Joy van den Hurk was een genot om mee te werken en was zeer responsief en ondersteunend bij mijn zoektocht naar een woning in Dubai Marina. Sterk aanbevolen." },
    { name: "Christy Liu", role: "Nieuwe inwoner van Dubai", text: "Joy was zeer professioneel en prettig om mee te werken. Ze was altijd op tijd voor bezichtigingen en erg geduldig om onze vragen te beantwoorden. Ze is een geweldige hulpbron voor nieuwe inwoners van Dubai." },
    { name: "Tanuja Paramasivam", role: "Verhuurder", text: "Joy was een genot om mee om te gaan. Ik heb mijn appartement snel en efficiënt verhuurd, voor een goede prijs. Ik raad haar ten zeerste aan. Ze is professioneel en efficiënt." },
  ];

  return { PROPERTIES, LOCATIONS, REVIEWS };
})();
