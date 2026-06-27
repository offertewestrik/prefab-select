// Dienstencatalogus (seed). Categorieën, merken en alle diensten uit de opdracht.
// Prijsindicaties zijn realistische NL-marktrichtprijzen (richtbedragen, excl. btw),
// in admin per dienst aan te passen. `long` is feitelijke startcontent die in de
// admin/CMS verder verrijkt kan worden.

export const categories = [
  { slug: "cv-en-verwarming", name: "CV & verwarming", order: 1, icon: "flame" },
  { slug: "warmtepompen", name: "Warmtepompen", order: 2, icon: "thermometer" },
  { slug: "koeling-airco", name: "Koeling & airco", order: 3, icon: "wind" },
  { slug: "radiatoren", name: "Radiatoren", order: 4, icon: "radiator" },
  { slug: "vloerverwarming", name: "Vloerverwarming", order: 5, icon: "grid-3x3" },
  { slug: "badkamer-en-sanitair", name: "Badkamer & sanitair", order: 6, icon: "bath" },
  { slug: "leidingwerk", name: "Leidingwerk", order: 7, icon: "pipe" },
  { slug: "lekkage-en-spoed", name: "Lekkage & spoed", order: 8, icon: "droplets" },
  { slug: "afvoer-en-riool", name: "Afvoer & riolering", order: 9, icon: "waves" },
  { slug: "dak-en-zink", name: "Dak & zinkwerk", order: 10, icon: "home" },
  { slug: "warm-water", name: "Warm water", order: 11, icon: "shower-head" },
  { slug: "duurzaam-en-elektra", name: "Duurzaam & elektra", order: 12, icon: "zap" },
];

export const brands = [
  { slug: "intergas", name: "Intergas", type: "cv-ketel" },
  { slug: "remeha", name: "Remeha", type: "cv-ketel" },
  { slug: "nefit", name: "Nefit", type: "cv-ketel" },
  { slug: "vaillant", name: "Vaillant", type: "cv-ketel" },
  { slug: "atag", name: "ATAG", type: "cv-ketel" },
  { slug: "daikin", name: "Daikin", type: "warmtepomp" },
  { slug: "mitsubishi-electric", name: "Mitsubishi Electric", type: "airco" },
  { slug: "lg", name: "LG", type: "warmtepomp" },
  { slug: "panasonic", name: "Panasonic", type: "warmtepomp" },
];

type Svc = {
  slug: string;
  name: string;
  category: string; // category slug
  short: string;
  from?: number;
  to?: number;
  unit?: string;
  long: string;
  brands?: string[]; // brand slugs
};

export const services: Svc[] = [
  // ── CV & verwarming ──
  { slug: "cv-ketel-vervangen", name: "CV-ketel vervangen", category: "cv-en-verwarming", short: "Nieuwe CV-ketel inclusief installatie en afvoer van de oude.", from: 1250, to: 2500, unit: "per ketel", brands: ["intergas", "remeha", "nefit", "vaillant", "atag"], long: "Een CV-ketel gaat gemiddeld 12 tot 15 jaar mee. Bij vervanging plaatst de installateur een nieuwe HR-ketel, sluit deze aan op de bestaande installatie en voert de oude ketel milieuverantwoord af. Vraag vrijblijvend offertes aan van gecertificeerde monteurs bij jou in de buurt." },
  { slug: "nieuwe-cv-ketel", name: "Nieuwe CV-ketel", category: "cv-en-verwarming", short: "Advies en plaatsing van een nieuwe HR-combiketel.", from: 1250, to: 2800, unit: "per ketel", brands: ["intergas", "remeha", "nefit", "vaillant", "atag"], long: "Bij een nieuwe CV-ketel kies je het juiste vermogen en type (solo of combi) op basis van je woning en warmwaterbehoefte. Een erkende installateur adviseert het passende model en verzorgt de complete installatie." },
  { slug: "cv-onderhoud", name: "CV-ketel onderhoud", category: "cv-en-verwarming", short: "Periodieke onderhoudsbeurt voor een veilige, zuinige ketel.", from: 80, to: 150, unit: "per beurt", long: "Jaarlijks of tweejaarlijks onderhoud houdt je CV-ketel veilig, zuinig en betrouwbaar, en voorkomt onverwachte storingen in de winter. De monteur controleert, reinigt en stelt de ketel optimaal af." },
  { slug: "cv-reparatie", name: "CV-ketel reparatie", category: "cv-en-verwarming", short: "Reparatie van een defecte CV-ketel door een vakman.", from: 90, to: 350, unit: "per reparatie", long: "Een lekkende ketel, vreemde geluiden of geen warmte: een ervaren monteur stelt de oorzaak vast en repareert de CV-ketel met de juiste onderdelen." },
  { slug: "cv-storing", name: "CV-ketel storing verhelpen", category: "cv-en-verwarming", short: "Snelle storingsdienst voor een uitgevallen CV-ketel.", from: 90, to: 250, unit: "per bezoek", long: "Geen warm water of verwarming door een storingscode? Een loodgieter/monteur leest de foutcode uit en verhelpt de storing, vaak nog dezelfde dag." },
  { slug: "boiler", name: "Boiler plaatsen of vervangen", category: "warm-water", short: "Plaatsing of vervanging van een elektrische of indirecte boiler.", from: 450, to: 1500, unit: "per boiler", long: "Een boiler zorgt voor voldoende warm water in huis. Een installateur adviseert de juiste inhoud en type en verzorgt de aansluiting op water en elektra of de CV-installatie." },
  { slug: "geiser", name: "Geiser vervangen", category: "warm-water", short: "Vervanging van een verouderde geiser door een veilige oplossing.", from: 350, to: 1200, unit: "per geiser", long: "Oude geisers zijn vaak onzuinig en minder veilig. Een vakman vervangt de geiser of adviseert een modern alternatief zoals een combiketel of doorstroomboiler." },

  // ── Warmtepompen ──
  { slug: "warmtepomp", name: "Warmtepomp installeren", category: "warmtepompen", short: "Advies en installatie van een duurzame warmtepomp.", from: 4250, to: 12000, unit: "per systeem", brands: ["daikin", "lg", "panasonic"], long: "Een warmtepomp verwarmt je woning duurzaam met elektriciteit en omgevingswarmte. Een gecertificeerde installateur berekent de warmtebehoefte, adviseert het juiste type en verzorgt de complete installatie — vaak met recht op ISDE-subsidie." },
  { slug: "hybride-warmtepomp", name: "Hybride warmtepomp", category: "warmtepompen", short: "Combinatie van CV-ketel en warmtepomp voor lager gasverbruik.", from: 3500, to: 7000, unit: "per systeem", brands: ["daikin", "remeha", "vaillant"], long: "Een hybride warmtepomp werkt samen met je bestaande CV-ketel en neemt het grootste deel van de verwarming over. Zo bespaar je fors op gas zonder je hele installatie aan te passen." },
  { slug: "lucht-water-warmtepomp", name: "Lucht-water warmtepomp", category: "warmtepompen", short: "Volledige lucht-water warmtepomp voor verwarming en warm water.", from: 6000, to: 14000, unit: "per systeem", brands: ["daikin", "lg", "panasonic"], long: "Een lucht-water warmtepomp haalt warmte uit de buitenlucht en is geschikt als hoofdverwarming, vooral in goed geïsoleerde woningen met vloerverwarming of lage-temperatuur-radiatoren." },

  // ── Koeling & airco ──
  { slug: "airco", name: "Airco installeren", category: "koeling-airco", short: "Plaatsing van een split-airco voor koeling en verwarming.", from: 1250, to: 3500, unit: "per unit", brands: ["daikin", "mitsubishi-electric", "lg", "panasonic"], long: "Een split-airco koelt in de zomer en kan in de winter bijverwarmen. Een F-gassen-gecertificeerde monteur bepaalt het juiste vermogen en de beste plek voor binnen- en buitenunit." },
  { slug: "airco-onderhoud", name: "Airco onderhoud", category: "koeling-airco", short: "Reiniging en controle voor een gezonde, efficiënte airco.", from: 80, to: 160, unit: "per beurt", long: "Periodiek airco-onderhoud houdt het rendement hoog en de lucht schoon. De monteur reinigt filters en verdamper, controleert het koudemiddel en de werking." },
  { slug: "airco-reparatie", name: "Airco reparatie", category: "koeling-airco", short: "Reparatie van een airco die niet of slecht koelt.", from: 90, to: 400, unit: "per reparatie", brands: ["daikin", "mitsubishi-electric"], long: "Koelt je airco niet meer of lekt deze? Een gecertificeerde monteur spoort het probleem op, vult zo nodig koudemiddel bij en repareert de installatie." },

  // ── Radiatoren ──
  { slug: "radiator-vervangen", name: "Radiator vervangen", category: "radiatoren", short: "Vervanging van een oude of lekkende radiator.", from: 150, to: 450, unit: "per radiator", long: "Een verouderde of lekkende radiator wordt vakkundig gedemonteerd en vervangen door een nieuw, goed renderend model, inclusief aansluiten en ontluchten." },
  { slug: "radiator-plaatsen", name: "Radiator plaatsen", category: "radiatoren", short: "Plaatsing van een extra of nieuwe radiator.", from: 250, to: 600, unit: "per radiator", long: "Een extra radiator zorgt voor meer warmtecomfort. De installateur bepaalt de juiste capaciteit, plaatst de radiator en sluit deze aan op de CV-installatie." },
  { slug: "radiator-ontluchten", name: "Radiator ontluchten", category: "radiatoren", short: "Ontluchten en bijvullen voor goed verwarmende radiatoren.", from: 60, to: 120, unit: "per bezoek", long: "Koude plekken of tikkende radiatoren wijzen op lucht in de installatie. De monteur ontlucht de radiatoren, vult de CV-druk bij en controleert de werking." },
  { slug: "verdeler-vervangen", name: "Verdeler vervangen", category: "vloerverwarming", short: "Vervanging van een vloerverwarmingsverdeler.", from: 400, to: 1200, unit: "per verdeler", long: "De verdeler regelt de doorstroming van je vloerverwarming. Bij lekkage of slechte regeling vervangt de installateur de verdeler inclusief afstellen van de groepen." },

  // ── Vloerverwarming ──
  { slug: "vloerverwarming-leggen", name: "Vloerverwarming leggen", category: "vloerverwarming", short: "Aanleg van watervoerende vloerverwarming.", from: 50, to: 110, unit: "per m²", long: "Vloerverwarming geeft een gelijkmatige, comfortabele warmte en werkt ideaal samen met een warmtepomp. De installateur legt de leidingen, sluit de verdeler aan en stelt het systeem in." },
  { slug: "vloerverwarming-infrezen", name: "Vloerverwarming infrezen", category: "vloerverwarming", short: "Infrezen van vloerverwarming in een bestaande vloer.", from: 40, to: 80, unit: "per m²", long: "Bij infrezen worden sleuven in de bestaande dekvloer gefreesd en de leidingen daarin gelegd — een snelle oplossing om vloerverwarming toe te voegen zonder nieuwe vloer." },
  { slug: "elektrische-vloerverwarming", name: "Elektrische vloerverwarming", category: "vloerverwarming", short: "Elektrische vloerverwarming, ideaal voor badkamers.", from: 60, to: 130, unit: "per m²", long: "Elektrische vloerverwarming is snel te plaatsen onder tegels en populair in badkamers en kleinere ruimtes. De monteur legt de matten en sluit de thermostaat aan." },

  // ── Badkamer & sanitair ──
  { slug: "badkamer-renovatie", name: "Badkamer renovatie", category: "badkamer-en-sanitair", short: "Complete badkamerrenovatie van ontwerp tot oplevering.", from: 6000, to: 20000, unit: "per project", long: "Een badkamerrenovatie omvat sloop, leiding- en elektrawerk, tegelwerk en het plaatsen van sanitair. Vraag offertes aan van vakmannen die het hele traject verzorgen, vaak met garantie." },
  { slug: "toilet-renovatie", name: "Toilet renovatie", category: "badkamer-en-sanitair", short: "Vernieuwing van het toilet, inclusief sanitair en tegelwerk.", from: 1500, to: 5000, unit: "per project", long: "Bij een toiletrenovatie vervang je de pot, het reservoir (eventueel inbouw), tegelwerk en leidingen. Een loodgieter levert een waterdicht, fris en modern toilet op." },

  // ── Leidingwerk ──
  { slug: "leidingwerk", name: "Leidingwerk", category: "leidingwerk", short: "Aanleg en aanpassing van water- en cv-leidingen.", from: 50, to: 90, unit: "per uur", long: "Of het nu gaat om nieuwe aansluitingen, verleggen of vervangen van leidingen: een loodgieter legt het leidingwerk vakkundig en lekvrij aan." },
  { slug: "waterleiding", name: "Waterleiding aanleggen of repareren", category: "leidingwerk", short: "Nieuwe waterleiding of reparatie van een bestaande leiding.", from: 90, to: 350, unit: "per klus", long: "Van een nieuwe kraanaansluiting tot het vervangen van verouderde leidingen — een loodgieter zorgt voor een veilige, lekvrije drinkwaterinstallatie." },
  { slug: "gasleiding", name: "Gasleiding aanleggen of aanpassen", category: "leidingwerk", short: "Veilig aanleggen of aanpassen van gasleidingen.", from: 120, to: 450, unit: "per klus", long: "Werk aan gasleidingen vereist een erkende installateur. De vakman legt of past de gasleiding aan, test op lekdichtheid en levert volgens de geldende normen op." },

  // ── Afvoer & riolering ──
  { slug: "afvoer", name: "Afvoer aanleggen of repareren", category: "afvoer-en-riool", short: "Aanleg of reparatie van afvoerleidingen.", from: 90, to: 350, unit: "per klus", long: "Een goede afvoer voorkomt stankoverlast en lekkage. De loodgieter legt afvoeren aan of repareert beschadigde leidingen onder gootsteen, douche of wasmachine." },
  { slug: "riolering", name: "Riolering", category: "afvoer-en-riool", short: "Aanleg, reparatie en inspectie van riolering.", from: 150, to: 800, unit: "per klus", long: "Bij verstopte of beschadigde riolering voert de vakman een camera-inspectie uit, lokaliseert het probleem en herstelt of vervangt het betreffende deel." },
  { slug: "ontstopping", name: "Ontstopping", category: "afvoer-en-riool", short: "Snel ontstoppen van afvoer, toilet of riool.", from: 95, to: 250, unit: "per bezoek", long: "Een verstopte afvoer of toilet wordt met hogedruk of veer professioneel ontstopt. Veel ontstoppingsdiensten komen met spoed en rekenen een vast voorrijtarief." },

  // ── Lekkage & spoed ──
  { slug: "lekkage", name: "Lekkage verhelpen", category: "lekkage-en-spoed", short: "Opsporen en verhelpen van lekkages.", from: 90, to: 400, unit: "per klus", long: "Een loodgieter spoort de bron van de lekkage op — vaak met lekdetectie — en verhelpt deze, van een druppelende kraan tot een lekkende leiding in de muur." },
  { slug: "waterlekkage", name: "Waterlekkage", category: "lekkage-en-spoed", short: "Spoedhulp bij waterlekkage en waterschade.", from: 95, to: 400, unit: "per bezoek", long: "Bij waterlekkage telt elke minuut. Een spoedloodgieter stopt de lekkage, beperkt de waterschade en herstelt de oorzaak." },
  { slug: "daklekkage", name: "Daklekkage", category: "lekkage-en-spoed", short: "Opsporen en repareren van lekkages in het dak.", from: 120, to: 600, unit: "per klus", long: "Een daklekkage wordt opgespoord en gerepareerd, of het nu gaat om dakbedekking, loodslabben of de aansluiting rond een schoorsteen of dakraam." },
  { slug: "gaslekkage", name: "Gaslekkage", category: "lekkage-en-spoed", short: "Direct ingrijpen bij een (vermoedelijke) gaslekkage.", from: 120, to: 350, unit: "per bezoek", long: "Ruik je gas? Sluit de hoofdkraan, ventileer en schakel direct hulp in. Een erkende installateur spoort de gaslekkage op en herstelt de leiding veilig volgens de normen." },
  { slug: "spoed-loodgieter", name: "Spoed loodgieter", category: "lekkage-en-spoed", short: "Met spoed een loodgieter aan huis, vaak dezelfde dag.", from: 95, to: 300, unit: "per bezoek", long: "Bij acute problemen zoals lekkage of een verstopping komt een spoedloodgieter snel langs. Geef de urgentie aan in je aanvraag, dan koppelen we je aan een beschikbare vakman in de buurt." },
  { slug: "24-7-loodgieter", name: "24/7 loodgieter", category: "lekkage-en-spoed", short: "Dag en nacht een loodgieter beschikbaar voor noodgevallen.", from: 120, to: 350, unit: "per bezoek", long: "Voor noodgevallen buiten kantooruren zijn er loodgieters die 24/7 beschikbaar zijn. Houd rekening met een avond-, nacht- of weekendtarief." },

  // ── Dak & zinkwerk ──
  { slug: "dakgoot", name: "Dakgoot repareren of vervangen", category: "dak-en-zink", short: "Reparatie, reiniging of vervanging van de dakgoot.", from: 90, to: 600, unit: "per klus", long: "Een lekkende of verstopte dakgoot kan waterschade veroorzaken. De vakman reinigt, repareert of vervangt de goot en zorgt voor een goede afwatering." },
  { slug: "zinkwerk", name: "Zinkwerk", category: "dak-en-zink", short: "Vakkundig zinkwerk voor goten, kilgoten en loketten.", from: 120, to: 800, unit: "per klus", long: "Zinkwerk vraagt vakmanschap. Een loodgieter verzorgt nieuw of vervangend zinkwerk voor goten, kilgoten, loketten en aansluitingen rond dakdoorvoeren." },
  { slug: "plat-dak-bitumen", name: "Bitumen dakbedekking (plat dak)", category: "dak-en-zink", short: "Nieuw of vervangend bitumen dak (dakleer) voor platte daken.", from: 50, to: 110, unit: "per m²", long: "Bitumen (dakleer) is de meest toegepaste dakbedekking voor platte daken. De dakdekker brengt meerdere lagen aan, werkt de randen en doorvoeren waterdicht af en zorgt voor een goede afschot en levensduur van 20 tot 30 jaar." },
  { slug: "plat-dak-epdm", name: "EPDM dakbedekking (plat dak)", category: "dak-en-zink", short: "Naadloze EPDM-rubber dakbedekking voor een plat dak.", from: 55, to: 120, unit: "per m²", long: "EPDM is een duurzame rubber dakbedekking die in één naadloos vel wordt gelegd. Ideaal voor platte daken, dakkapellen en aanbouwen, met een lange levensduur en weinig onderhoud." },
  { slug: "pannendak-vervangen", name: "Pannendak vervangen", category: "dak-en-zink", short: "Volledig vervangen van de dakpannen op een hellend dak.", from: 70, to: 160, unit: "per m²", long: "Bij het vervangen van een pannendak verwijdert de dakdekker de oude pannen, controleert of vervangt het dakbeschot en panlatten, en legt nieuwe dakpannen inclusief nokvorsten en hulpstukken." },
  { slug: "dakpannen-repareren", name: "Dakpannen repareren of vervangen", category: "dak-en-zink", short: "Losse, kapotte of verschoven dakpannen herstellen.", from: 90, to: 600, unit: "per klus", long: "Verschoven of gebroken dakpannen kunnen lekkage veroorzaken. De vakman vervangt losse pannen, herstelt de nokvorsten en controleert de waterdichtheid van het dak." },
  { slug: "dakrenovatie", name: "Dakrenovatie", category: "dak-en-zink", short: "Complete renovatie van plat of hellend dak inclusief isolatie.", from: 5000, to: 25000, unit: "per project", long: "Een dakrenovatie pakt het hele dak aan: dakbedekking, isolatie, dakbeschot, goten en afwerking. De dakdekker adviseert over materiaal en isolatiewaarde en levert een waterdicht, energiezuinig dak op." },
  { slug: "dakisolatie", name: "Dakisolatie", category: "dak-en-zink", short: "Isoleren van het dak voor lagere stookkosten en meer comfort.", from: 50, to: 150, unit: "per m²", long: "Dakisolatie voorkomt warmteverlies en kan in aanmerking komen voor subsidie. De vakman isoleert aan de binnen- of buitenzijde (bij dakrenovatie), afhankelijk van de constructie en gewenste isolatiewaarde." },
  { slug: "dakraam-plaatsen", name: "Dakraam plaatsen", category: "dak-en-zink", short: "Plaatsing van een dakraam (bijv. Velux) inclusief waterdicht afwerken.", from: 600, to: 2000, unit: "per dakraam", long: "Een dakraam brengt daglicht en ventilatie in een zolder of dakverdieping. De vakman plaatst het raam, werkt het waterdicht af met gootstukken en herstelt de binnenafwerking." },
  { slug: "dakkapel-plaatsen", name: "Dakkapel plaatsen", category: "dak-en-zink", short: "Plaatsing van een dakkapel voor meer ruimte en daglicht.", from: 6000, to: 20000, unit: "per dakkapel", long: "Een dakkapel vergroot de leefruimte en lichtinval op zolder. De vakman levert en monteert de (prefab) dakkapel, sluit deze waterdicht aan op het dak en verzorgt de afwerking." },
  { slug: "loodwerk", name: "Loodwerk en loodslabben", category: "dak-en-zink", short: "Loodwerk rond schoorsteen, dakkapel en muuraansluitingen.", from: 120, to: 600, unit: "per klus", long: "Lood zorgt voor een waterdichte aansluiting rond schoorstenen, dakkapellen en muren. De loodgieter vervangt versleten loodslabben en herstelt de aansluitingen vakkundig." },

  // ── Duurzaam & elektra ──
  { slug: "zonnepanelen", name: "Zonnepanelen", category: "duurzaam-en-elektra", short: "Advies en installatie van zonnepanelen.", from: 2500, to: 8000, unit: "per installatie", long: "Met zonnepanelen wek je je eigen stroom op. Een installateur berekent de opbrengst, adviseert het aantal panelen en de omvormer en verzorgt montage en aansluiting." },
  { slug: "thuisbatterij", name: "Thuisbatterij", category: "duurzaam-en-elektra", short: "Plaatsing van een thuisbatterij voor opslag van zonne-energie.", from: 3500, to: 9000, unit: "per systeem", long: "Een thuisbatterij slaat overdag opgewekte zonne-energie op voor gebruik in de avond. De installateur stemt de capaciteit af op je verbruik en zonnepanelen." },
  { slug: "laadpalen", name: "Laadpaal installeren", category: "duurzaam-en-elektra", short: "Installatie van een laadpaal voor je elektrische auto.", from: 800, to: 2000, unit: "per laadpaal", long: "Een eigen laadpaal laadt je elektrische auto veilig en snel. Een elektromonteur plaatst de laadpaal, legt de bekabeling aan en zorgt voor een aparte, beveiligde groep." },
  { slug: "elektra", name: "Elektra", category: "duurzaam-en-elektra", short: "Elektrawerk: groepen, bekabeling, aansluitingen.", from: 50, to: 90, unit: "per uur", long: "Van een extra stopcontact tot nieuwe bekabeling: een elektromonteur verzorgt veilig elektrawerk volgens de NEN 1010-norm." },
  { slug: "meterkast", name: "Meterkast vervangen of uitbreiden", category: "duurzaam-en-elektra", short: "Vernieuwen of uitbreiden van de meterkast/groepenkast.", from: 350, to: 1500, unit: "per kast", long: "Een verouderde meterkast zonder aardlekschakelaars is onveilig. De monteur vervangt of breidt de groepenkast uit en maakt deze geschikt voor moderne belasting zoals laadpaal en zonnepanelen." },
];
