// Dienstencatalogus (seed). Categorieën en alle diensten uit de opdracht voor
// AanbouwPlatform.nl. Prijsindicaties zijn realistische NL-marktrichtprijzen
// (richtbedragen, incl. werk en materiaal tenzij anders vermeld), in admin per
// dienst aan te passen. `long` is feitelijke startcontent die in de admin/CMS
// verder verrijkt kan worden.

export const categories = [
  { slug: "aan-en-uitbouw", name: "Aan- & uitbouw", order: 1, icon: "home" },
  { slug: "opbouw-en-verbouw", name: "Opbouw & verbouw", order: 2, icon: "layers" },
  { slug: "extra-woonruimte", name: "Extra woonruimte", order: 3, icon: "house-plus" },
  { slug: "constructie-en-fundering", name: "Constructie & fundering", order: 4, icon: "hard-hat" },
  { slug: "kozijnen-puien-gevel", name: "Kozijnen, puien & gevel", order: 5, icon: "panel-top" },
  { slug: "advies-en-vergunning", name: "Advies & vergunning", order: 6, icon: "file-check" },
];

// Aanbouw kent geen toestelmerken zoals een loodgietersplatform; de merken-
// dimensie blijft beschikbaar in het schema maar wordt hier niet gevuld.
export const brands: { slug: string; name: string; type: string }[] = [];

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
  // ── Aan- & uitbouw ──
  { slug: "aanbouw", name: "Aanbouw", category: "aan-en-uitbouw", short: "Extra ruimte tegen de woning, op de begane grond.", from: 25000, to: 80000, unit: "per project", long: "Een aanbouw vergroot je woning op de begane grond — denk aan een ruimere woonkeuken, bijkeuken of extra kamer. Een bouwbedrijf verzorgt het complete traject: fundering, casco, dak en afwerking. Vraag vrijblijvend offertes aan van geverifieerde aannemers bij jou in de buurt." },
  { slug: "uitbouw", name: "Uitbouw", category: "aan-en-uitbouw", short: "Uitbreiding van een bestaande ruimte, bijv. de woonkamer.", from: 18000, to: 60000, unit: "per project", long: "Met een uitbouw trek je een bestaande ruimte door naar buiten, vaak aan de achtergevel. Populair voor een grotere woonkamer of keuken met veel lichtinval via een schuifpui of lichtstraat. De aannemer regelt fundering, constructie en afwerking." },

  // ── Opbouw & verbouw ──
  { slug: "dakopbouw", name: "Dakopbouw", category: "opbouw-en-verbouw", short: "Een extra verdieping of opbouw op het bestaande dak.", from: 30000, to: 90000, unit: "per project", long: "Een dakopbouw creëert een volwaardige extra verdieping op je woning, ideaal voor een extra slaapkamer of badkamer. Een bouwbedrijf beoordeelt de draagconstructie, verzorgt de opbouw en sluit alles waterdicht aan." },
  { slug: "garage-ombouw", name: "Garage ombouw", category: "opbouw-en-verbouw", short: "Een garage verbouwen tot volwaardige leefruimte.", from: 12000, to: 40000, unit: "per project", long: "Een garage-ombouw verandert ongebruikte ruimte in een thuiskantoor, slaapkamer of bijkeuken. De aannemer isoleert, plaatst kozijnen, en verzorgt elektra, verwarming en afwerking." },

  // ── Extra woonruimte ──
  { slug: "mantelzorgwoning", name: "Mantelzorgwoning", category: "extra-woonruimte", short: "Gelijkvloerse (prefab) woning voor zorg dichtbij.", from: 60000, to: 130000, unit: "per woning", long: "Een mantelzorgwoning biedt zelfstandige, gelijkvloerse woonruimte in de tuin of tegen de woning. Vaak (deels) prefab geleverd en snel geplaatst. Een bouwbedrijf adviseert over indeling, fundering en vergunningsvrij bouwen." },
  { slug: "poolhouse", name: "Poolhouse", category: "extra-woonruimte", short: "Luxe bijgebouw bij het zwembad of de tuin.", from: 20000, to: 60000, unit: "per project", long: "Een poolhouse is een luxe bijgebouw met bijvoorbeeld een lounge, buitenkeuken, sauna of doucheruimte. Een aannemer ontwerpt en bouwt het passend bij je woning en tuin." },
  { slug: "veranda", name: "Veranda", category: "extra-woonruimte", short: "Overdekt terras of veranda aan de woning of in de tuin.", from: 6000, to: 25000, unit: "per project", long: "Een veranda maakt je terras het hele jaar bruikbaar. Van een strak aluminium overkapping tot een houten veranda met glazen schuifwanden — een vakman plaatst het op maat." },
  { slug: "tuinkantoor", name: "Tuinkantoor", category: "extra-woonruimte", short: "Een vrijstaand tuinkantoor of werkruimte in de tuin.", from: 12000, to: 45000, unit: "per project", long: "Een tuinkantoor geeft een rustige, gescheiden werkplek met daglicht en isolatie. Vaak vergunningsvrij te plaatsen. Een bouwbedrijf verzorgt fundering, casco, elektra en afwerking." },
  { slug: "prefab-woning", name: "Prefab woning", category: "extra-woonruimte", short: "Volledige prefab (mantelzorg)woning of recreatiewoning.", from: 80000, to: 180000, unit: "per woning", long: "Een prefab woning wordt in de fabriek gebouwd en op locatie geplaatst — snel, voorspelbaar in kosten en met hoge kwaliteit. Geschikt als mantelzorg-, recreatie- of starterswoning." },

  // ── Constructie & fundering ──
  { slug: "fundering", name: "Fundering", category: "constructie-en-fundering", short: "Funderingswerk en grondwerk voor de uitbreiding.", from: 8000, to: 25000, unit: "per project", long: "Een goede fundering is de basis van elke aan- of uitbouw. Een aannemer verzorgt het grondwerk, de fundering op staal of palen en de aansluiting op de bestaande constructie, volgens de constructieberekening." },
  { slug: "staalconstructie", name: "Staalconstructie", category: "constructie-en-fundering", short: "Stalen draagconstructies, spanten en lateien.", from: 3000, to: 20000, unit: "per project", long: "Voor grote openingen, schuifpuien of een open verbinding tussen ruimtes is een stalen draagconstructie nodig. Een constructeur berekent en een bouwbedrijf plaatst de staalconstructie veilig en exact op maat." },

  // ── Kozijnen, puien & gevel ──
  { slug: "kozijnen", name: "Kozijnen", category: "kozijnen-puien-gevel", short: "Levering en plaatsing van kozijnen.", from: 500, to: 1500, unit: "per kozijn", long: "Nieuwe kozijnen verbeteren isolatie, comfort en uitstraling. Een vakman adviseert over materiaal (kunststof, hout of aluminium) en glas, en plaatst de kozijnen wind- en waterdicht." },
  { slug: "schuifpui", name: "Schuifpui", category: "kozijnen-puien-gevel", short: "Schuifpuien en grote glaspartijen.", from: 3500, to: 9000, unit: "per pui", long: "Een schuifpui zorgt voor maximale lichtinval en een vloeiende overgang naar de tuin. Een bouwbedrijf bepaalt de juiste maatvoering en constructie en plaatst de pui inclusief afwerking." },
  { slug: "gevelafwerking", name: "Gevelafwerking", category: "kozijnen-puien-gevel", short: "Metsel-, stuc- en gevelbekledingswerk.", from: 60, to: 180, unit: "per m²", long: "De gevelafwerking bepaalt de uitstraling van je uitbreiding. Van handvormstenen tot strak stucwerk of houten gevelbekleding — een vakman zorgt voor een naadloze aansluiting op de bestaande gevel." },

  // ── Advies & vergunning ──
  { slug: "vergunning-begeleiding", name: "Vergunning begeleiding", category: "advies-en-vergunning", short: "Begeleiding bij de omgevingsvergunning.", from: 750, to: 3500, unit: "per traject", long: "Voor veel uitbreidingen is een omgevingsvergunning nodig. Een adviseur of bouwbedrijf verzorgt de tekeningen, constructieberekeningen en de complete aanvraag, zodat je project vlot en zonder verrassingen door de gemeente komt." },
];
