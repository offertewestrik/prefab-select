/* =====================================================================
   Droomhuis in Dubai — content data
   Properties · Dubai areas · Reviews
   (Demo content — prijzen/ROI indicatief)
   ===================================================================== */
window.DH = (function () {
  // ---- Featured properties -------------------------------------------
  const PROPERTIES = [
    {
      id: "palm-villa",
      tag: "Off-plan",
      cat: "offplan",
      feat: true,
      name: "Signature Beachfront Villa",
      loc: "Palm Jumeirah",
      price: "AED 18.500.000",
      roi: "7,4%",
      beds: 5,
      baths: 6,
      area: "742 m²",
      img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1400&auto=format&fit=crop",
    },
    {
      id: "downtown-pent",
      tag: "Penthouse",
      cat: "bestaand",
      feat: false,
      name: "Sky Penthouse",
      loc: "Downtown Dubai",
      price: "AED 9.200.000",
      roi: "6,8%",
      beds: 3,
      baths: 4,
      area: "298 m²",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "marina-apt",
      tag: "Investering",
      cat: "investering",
      feat: false,
      name: "Marina View Residence",
      loc: "Dubai Marina",
      price: "AED 2.450.000",
      roi: "8,9%",
      beds: 2,
      baths: 2,
      area: "112 m²",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "business-bay",
      tag: "Off-plan",
      cat: "offplan",
      feat: false,
      name: "Canal Front Apartments",
      loc: "Business Bay",
      price: "AED 1.890.000",
      roi: "9,3%",
      beds: 1,
      baths: 2,
      area: "84 m²",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "jvc-townhouse",
      tag: "Investering",
      cat: "investering",
      feat: false,
      name: "Garden Townhouse",
      loc: "Jumeirah Village Circle",
      price: "AED 2.150.000",
      roi: "8,1%",
      beds: 3,
      baths: 3,
      area: "186 m²",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "palm-pent",
      tag: "Penthouse",
      cat: "bestaand",
      feat: true,
      name: "Oceanfront Sky Mansion",
      loc: "Palm Jumeirah",
      price: "AED 32.000.000",
      roi: "6,2%",
      beds: 4,
      baths: 5,
      area: "560 m²",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  // ---- Dubai areas (interactive map) ---------------------------------
  // x/y are percentages on the stylised map canvas
  const AREAS = [
    {
      id: "palm",
      name: "Palm Jumeirah",
      x: 22, y: 40,
      tag: "Iconisch · Beachfront",
      desc: "Het wereldberoemde palm-eiland met exclusieve villa's, signature penthouses en privéstranden. Dé locatie voor status en waardevastheid.",
      price: "AED 9M+", roi: "6–7%",
    },
    {
      id: "marina",
      name: "Dubai Marina",
      x: 33, y: 55,
      tag: "Waterfront · Lifestyle",
      desc: "Bruisende waterkant met jachthaven, restaurants en hoogbouw. Geliefd bij huurders, waardoor hier consistent hoge huurrendementen worden behaald.",
      price: "AED 1,8M+", roi: "8–9%",
    },
    {
      id: "downtown",
      name: "Downtown Dubai",
      x: 58, y: 58,
      tag: "Burj Khalifa · Premium",
      desc: "Het kloppend hart rond de Burj Khalifa en Dubai Mall. Prestige-adres met sterke vraag naar luxe appartementen en penthouses.",
      price: "AED 2,5M+", roi: "6–7%",
    },
    {
      id: "businessbay",
      name: "Business Bay",
      x: 60, y: 70,
      tag: "Canal · Groei",
      desc: "Zakelijk centrum aan het Dubai Canal in volle ontwikkeling. Aantrekkelijke off-plan instapprijzen met sterk verwacht groeipotentieel.",
      price: "AED 1,5M+", roi: "8–9%",
    },
    {
      id: "jvc",
      name: "Jumeirah Village Circle",
      x: 44, y: 78,
      tag: "Family · Value",
      desc: "Ruim opgezette, betaalbare community met villa's en townhouses. Populair onder gezinnen en bekend om hoog netto huurrendement.",
      price: "AED 0,9M+", roi: "8–10%",
    },
  ];

  // ---- Reviews -------------------------------------------------------
  const REVIEWS = [
    { name: "Chris Travis", role: "Huurder · Dubai Marina", text: "Joy was een genot om mee om te gaan. Punctueel voor bezichtigingen en goed geïnformeerd over de woning en alle vragen rond verhuizing, facturering en administratie bij het huren in Dubai. Volledig aan te bevelen." },
    { name: "Family Swissa", role: "Kopers", text: "We hebben een fantastische ervaring gehad met onze makelaar, Joy van den Hurk. We vonden haar deskundig, professioneel en oprecht betrokken bij onze zoektocht." },
    { name: "Juan Ignacio", role: "Verhuurder · Marina Gate", text: "Joy heeft uitstekend werk geleverd bij het verhuren van mijn appartement in Marina Gate. Super professioneel en effectief. 100% aan te bevelen." },
    { name: "Handcraft Media", role: "Investeerder", text: "Joy is een uitstekende makelaar. Haar kennis van de markt is indrukwekkend, ze was altijd op tijd, reageerde snel en was prettig om mee te werken. Ten zeerste aanbevolen." },
    { name: "Monique", role: "Cliënt", text: "Geweldige ervaring met Joy van den Hurk. Zeer informatief, duidelijk en prettig in de omgang!" },
    { name: "Hussein Aboud", role: "Cliënt", text: "Ik vond het erg leuk om met Joy samen te werken. Ze was zeer professioneel, behulpzaam en deed haar uiterste best voor ons." },
    { name: "Kuren Dhand", role: "Huurder", text: "Joy was een plezier om mee te werken. Ze liet ons het appartement een paar keer zien en beantwoordde al onze vragen, en was altijd beschikbaar." },
    { name: "Walid Shihabi", role: "Cliënt · Dubai Marina", text: "Joy was een genot om mee te werken en zeer responsief en ondersteunend bij mijn zoektocht naar een woning in Dubai Marina. Sterk aanbevolen." },
    { name: "Christy Liu", role: "Nieuwe inwoner", text: "Joy was zeer professioneel en prettig om mee te werken. Altijd op tijd voor bezichtigingen en erg geduldig met onze vragen. Een geweldige hulp voor nieuwe inwoners van Dubai." },
    { name: "Tanuja Paramasivam", role: "Verhuurder", text: "Joy heeft mijn appartement snel en efficiënt verhuurd, voor een goede prijs. Ik raad haar ten zeerste aan. Professioneel en efficiënt." },
  ];

  return { PROPERTIES, AREAS, REVIEWS };
})();
