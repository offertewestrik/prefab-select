import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { KellyCTA } from './KellyCTA';
import Diensten from './pages/Diensten';
import PrefabUitbouw from './pages/PrefabUitbouw';
import PrefabAanbouw from './pages/PrefabAanbouw';
import Mantelzorgwoning from './pages/Mantelzorgwoning';
import Poolhouse from './pages/Poolhouse';
import PrefabChalet from './pages/PrefabChalet';
import Vakantiewoningen from './pages/Vakantiewoningen';
import Zakelijk from './pages/Zakelijk';
import AIExpert from './pages/AIExpert';
import AboutPage from './pages/About';
import FAQPage from './pages/FAQPage';
import Werkwijze from './pages/Werkwijze';
import Dashboard from './pages/Dashboard';
import ZeelandLandingPage from './pages/ZeelandLandingPage';
import ZeelandSchuurtjesProject from './pages/ZeelandSchuurtjesProject';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Trees, 
  Star, 
  Menu, 
  X,
  ChevronDown,
  Box,
  Layout,
  Hammer,
  Zap,
  Check,
  MapPin,
  Play,
  Clock,
  Factory,
  ShieldCheck,
  Timer,
  Construction,
  Users,
  Search,
  Sparkles,
  PenTool,
  MessageCircle,
  Gem,
  RefreshCw,
  Leaf,
  Plus,
  TrendingUp,
  Shield,
  Quote
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  slug: string;
  features: string[];
  category: string;
  number: string;
  material: string;
  status: string;
  details: string;
}

interface USP {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Step {
  title: string;
  description: string;
  cta?: string;
  link?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// --- Data ---
const services: Service[] = [
  {
    id: 'uitbouw',
    title: 'Hoogwaardige Prefab Uitbouw',
    description: 'Vergroot uw woning met een moderne prefab uitbouw die volledig wordt afgestemd op uw wensen. Luxe uitstraling, snelle plaatsing en hoogwaardige afwerking gecombineerd in één moderne woonoplossing.',
    longDescription: 'Een prefab uitbouw is de snelste manier om uw woonkamer of keuken te vergroten. Wij leveren een volledig afgewerkte module die in één dag geplaatst wordt. Geen maandenlange verbouwing, maar direct genieten van extra luxe leefruimte.',
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    slug: 'prefab-uitbouw',
    features: ['Binnen 1 dag geplaatst', 'Hoogwaardige isolatie', 'Keuze uit diverse gevelafwerkingen', 'Inclusief elektra en stucwerk'],
    category: 'Premium Prefab Oplossing',
    number: '01',
    material: 'Hoogwaardig staalframe & duurzame gevelsystemen',
    status: 'Beschikbaar voor maatwerk',
    details: 'Volledig op maat ontworpen prefab uitbouw met moderne architectuur, hoogwaardige isolatie en luxe afwerkingsmogelijkheden.'
  },
  {
    id: 'aanbouw',
    title: 'Moderne Prefab Aanbouw',
    description: 'Creëer extra ruimte voor een leefkeuken, thuiskantoor of slaapkamer met een hoogwaardige prefab aanbouw die perfect aansluit op uw woning.',
    longDescription: 'Wilt u een kantoor aan huis of een extra slaapkamer op de begane grond? Onze prefab aanbouw modules zijn flexibel inzetbaar en worden volledig naar uw wens ontworpen en geproduceerd.',
    image: 'https://i.imgur.com/fmQecXk.jpeg',
    slug: 'prefab-aanbouw',
    features: ['Multifunctionele indeling', 'Modern design', 'Onderhoudsarme materialen', 'Direct aansluitbaar op bestaande bouw'],
    category: 'Premium Prefab Oplossing',
    number: '02',
    material: 'Staalframe constructie & premium afwerking',
    status: 'Beschikbaar voor maatwerk',
    details: 'Efficiënt gebouwde prefab aanbouw met snelle plaatsing, hoogwaardige materialen en moderne uitstraling.'
  },
  {
    id: 'bouwen',
    title: 'Moderne Modulaire Woningen',
    description: 'Volledig modulaire woonoplossingen geproduceerd in een gecontroleerde prefab omgeving voor maximale kwaliteit, snelheid en duurzaamheid.',
    longDescription: 'Wij bouwen complete prefab woningen die voldoen aan de hoogste architectonische eisen. Door onze slimme bouwmethode realiseren we uw droomhuis in een fractie van de tijd die een traditionele bouwer nodig heeft.',
    image: 'https://i.imgur.com/v4jk0SK.jpeg',
    slug: 'prefab-bouwen',
    features: ['All-electric woningen', 'Architectonisch maatwerk', 'Vaste prijsgarantie', 'Energieneutraal wonen'],
    category: 'Premium Modulair Bouwen',
    number: '03',
    material: 'Hoogwaardig staalframe & duurzame bouwsystemen',
    status: 'Beschikbaar voor nieuwbouwprojecten',
    details: 'Innovatieve modulaire woningen met luxe architectuur, energiezuinige oplossingen en moderne prefab technieken.'
  },
  {
    id: 'vakantie',
    title: 'Moderne Vakantiewoningen',
    description: 'Luxe prefab recreatiewoningen ontworpen voor comfort, uitstraling en maximale beleving in een natuurlijke omgeving.',
    longDescription: 'Luxe vrijetijdsverblijven die aanvoelen als een volwaardige woning. Of het nu in het bos, aan het water of in de duinen is: onze vakantiewoningen bieden het ultieme comfort.',
    image: 'https://i.imgur.com/ZsBPHxQ.jpeg',
    slug: 'vakantiewoningen',
    features: ['Hoog rendement voor verhuur', 'Duurzame bouw', 'Luxe uitstraling', 'Wintervast en comfortabel'],
    category: 'Luxe Prefab Recreatie',
    number: '04',
    material: 'Duurzame gevelbekleding & staalframe constructie',
    status: 'Beschikbaar voor recreatieprojecten',
    details: 'Hoogwaardige prefab vakantiewoningen met moderne architectuur, luxe afwerking en snelle realisatie.'
  },
  {
    id: 'chalets',
    title: 'Luxe Prefab Chalets',
    description: 'Moderne prefab chalets met hoogwaardige afwerking en een luxe uitstraling voor recreatief of permanent gebruik.',
    longDescription: 'Onze moderne chalets combineren de vrijheid van kamperen met de luxe van een hotel. Gemaakt van de beste materialen voor jarenlang onbezorgd plezier.',
    image: 'https://i.imgur.com/Tqh8vyd.jpeg',
    slug: 'chalets',
    features: ['Eenvoudig te verplaatsen', 'Tijdloos ontwerp', 'Onderhoudsvrij', 'Slimme ruimteoplossingen'],
    category: 'Premium Chaletbouw',
    number: '05',
    material: 'Staalframe, hout & composiet gevelsystemen',
    status: 'Beschikbaar voor maatwerk',
    details: 'Volledig prefab geproduceerde chalets met moderne architectuur, luxe leefruimtes en hoogwaardige materialen.'
  },
  {
    id: 'poolhouses',
    title: 'Luxe Prefab Poolhouses',
    description: 'De ultieme toevoeging aan uw wellness-ervaring. Onze prefab poolhouses combineren luxe design met praktische functionaliteit voor bij uw zwembad.',
    longDescription: 'Een poolhouse is meer dan alleen een kleedruimte. Het is een verlengstuk van uw tuin en wooncomfort. Onze prefab poolhouses worden volledig naar uw wens ontworpen, inclusief opties voor een buitenkeuken, sauna of bar.',
    image: 'https://i.imgur.com/gGBOzjd.jpeg',
    slug: 'poolhouses',
    features: ['Direct gebruiksklaar', 'Architectonisch ontwerp', 'Hoogwaardige materialen', 'Geïntegreerde techniek'],
    category: 'Premium Wellness Oplossing',
    number: '06',
    material: 'Aluminium, glas & duurzame houtsoorten',
    status: 'Beschikbaar voor maatwerk',
    details: 'Exclusieve prefab poolhouses met oog voor detail, hoogwaardige afwerking en een tijdloos modern design.'
  }
];

const usps: USP[] = [
  { title: 'Specialist in prefab', description: 'Jarenlange ervaring in hoogwaardige prefab uitbouwen.', icon: <Factory size={24} /> },
  { title: 'Snelle levering', description: 'Productie en plaatsing in recordtijd, minimale bouwtijd.', icon: <Timer size={24} /> },
  { title: 'Scherpe prijzen', description: 'Transparante kosten zonder verrassingen achteraf.', icon: <ShieldCheck size={24} /> },
  { title: 'Ervaren vakmensen', description: 'Gerealiseerd door een team van vakkundige specialisten.', icon: <Users size={24} /> },
  { title: 'Complete begeleiding', description: 'Van eerste ontwerp tot de uiteindelijke oplevering.', icon: <PenTool size={24} /> }
];

const constructionModules = [
  {
    id: 'steel-frame',
    title: 'Het Staalskelet',
    description: 'De basis van elke Prefab Select module is een hyper-nauwkeurig stalen frame.',
    details: 'Ons S355 structureel staal wordt laser-gesneden met een tolerantie van minder dan 1mm. Dit zorgt voor een onverwoestbare basis die niet krimpt, niet werkt en generaties lang meegaat.',
    icon: <Box size={32} />,
    image: 'https://i.imgur.com/v4jk0SK.jpeg',
    specs: [
      { label: 'Materiaal', value: 'S355 Structureel Staal' },
      { label: 'Precisie', value: '+/- 0.5mm' },
      { label: 'Levensduur', value: '100+ Jaar' }
    ]
  },
  {
    id: 'wall-system',
    title: 'Geavanceerd Wandsysteem',
    description: 'Thermische excellentie door meerlaagse isolatie en luchtdichte afsluiting.',
    details: 'Onze wanden bestaan uit een hybride opbouw van PIR-isolatie en minerale wol. Dit resulteert in een Rc-waarde van 6.0 of hoger, waardoor uw woning extreem energiezuinig is.',
    icon: <Layout size={32} />,
    image: 'https://i.imgur.com/ZsBPHxQ.jpeg',
    specs: [
      { label: 'Isolatie', value: 'Rc 6.0+' },
      { label: 'Dikte', value: '280mm' },
      { label: 'Ventilatie', value: 'Geïntegreerd' }
    ]
  },
  {
    id: 'glass-modules',
    title: 'Architectonisch Glas',
    description: 'Maximale lichtinval zonder concessies aan comfort.',
    details: 'Wij werken uitsluitend met triple-glazed HR+++ veiligheidsglas in ultraslanke aluminium profielen. Onzichtbare overgangen tussen binnen en buiten.',
    icon: <Search size={32} />,
    image: 'https://i.imgur.com/Tqh8vyd.jpeg',
    specs: [
      { label: 'Type', value: 'Triple Glazed HR+++' },
      { label: 'Profiel', value: 'Minimaal Aluminium' },
      { label: 'U-waarde', value: '0.6 W/m²K' }
    ]
  },
  {
    id: 'floor-foundation',
    title: 'Modulaire Vloersystemen',
    description: 'Stabiliteit en comfort vanaf de grond af aan.',
    details: 'De vloerconstructie integreert direct alle noodzakelijke installaties, inclusief vloerverwarming en koeling. Afgewerkt met een anhydriet gietvloer voor perfecte vlakheid.',
    icon: <Zap size={32} />,
    image: 'https://i.imgur.com/covRQg3.jpeg',
    specs: [
      { label: 'Systeem', value: 'Geïntegreerde Vloerverwarming' },
      { label: 'Opbouw', value: 'Staal-Beton Composiet' },
      { label: 'Isolatie', value: 'Rc 5.0' }
    ]
  },
  {
    id: 'smart-roof',
    title: 'Intelligent Daksysteem',
    description: 'Klaar voor de toekomst, van zonnepanelen tot groendak.',
    details: 'Onze platdak-units zijn voorzien van hoogwaardige EPDM-bedekking met een levensduur van 40 jaar. Voorbereid op hoge belasting voor zonnepanelen of sedum-beplanting.',
    icon: <Factory size={32} />,
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    specs: [
      { label: 'Bedekking', value: 'EPDM / Bitumen' },
      { label: 'Zon-ready', value: 'Standaard' },
      { label: 'Waterafvoer', value: 'Inpandig' }
    ]
  }
];

const steps: Step[] = [
  { 
    title: 'Ontwerp je droom', 
    description: 'Ontwerp zelf je aanbouw of bezoek onze showroom.',
    cta: 'Ontwerp je aanbouw',
    link: 'https://prefabselectconfigurator.nl'
  },
  { 
    title: 'Inmeten & Advies', 
    description: 'Al jouw wensen bekend? Dan komen we langs en meten alles in.',
    cta: 'Bekijk werkwijze',
    link: '/diensten'
  },
  { 
    title: 'Snelle Plaatsing', 
    description: 'Tijd voor het plaatsen. Binnen 5 dagen staat je aanbouw.',
    cta: 'Vraag Offerte',
    link: '/offerte'
  }
];

const faqs: FAQ[] = [
  { question: 'Wat kost een prefab uitbouw ongeveer?', answer: 'Een prefab uitbouw van ±15 m² begint rond de €45.000. Luxe varianten liggen rond de €55.000. Bij ons krijgt u altijd een duidelijke prijs vooraf, zonder verrassingen achteraf.' },
  { question: 'Is een vergunning nodig voor een uitbouw?', answer: 'Dat hangt af van je woning en gemeente. In veel gevallen is een uitbouw aan de achterzijde vergunningsvrij, maar we checken dit altijd voor je bij jouw gemeente.' },
  { question: 'Hoe snel wordt een uitbouw geplaatst?', answer: 'Omdat wij het grootste deel vooraf in de fabriek maken, kunnen we de uitbouw vaak binnen 1 tot 2 dagen plaatsen en binnen 4 tot 6 weken compleet opleveren.' },
  { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja, dat doen we regelmatig. Wij zorgen dat alle benodigde leidingen en elektra al technisch goed voorbereid zijn in de fabriek.' },
  { question: 'Is prefab wel stevig genoeg?', answer: 'Ja — alles wordt onder gecontroleerde omstandigheden in de fabriek gebouwd, wat vaak een betere en constantere kwaliteit oplevert dan traditionele bouw op locatie.' }
];

const blogs = [
  {
    id: 1,
    title: "Wat kost een uitbouw van 15m² in 2026?",
    category: "Investering",
    date: "12 Mei, 2024",
    readTime: "5 min",
    image: "https://i.imgur.com/fmQecXk.jpeg",
    excerpt: "Als je overweegt om een uitbouw te laten plaatsen, is dit waarschijnlijk je eerste vraag: wat kost het eigenlijk?",
    content: `Prefab bouwen is de afgelopen jaren enorm populair geworden. Niet alleen vanwege de snelheid, maar ook door de voorspelbare kosten en hoge kwaliteit. 

Toch is één vraag het belangrijkst: **wat kost prefab bouwen per m²?** In deze gids leggen we alles duidelijk uit, zodat je precies weet waar je aan toe bent.

### 💰 Gemiddelde prijs prefab bouwen per m²

De prijs van prefab bouwen begint gemiddeld vanaf:
- **€2.500 per m²** (basis uitvoering)
- **€4.500 per m²** (luxe uitvoering)

Waar je uiteindelijk op uitkomt, hangt volledig af van jouw wensen. Een eenvoudige prefab uitbouw is uiteraard goedkoper dan een luxe afgewerkte woning met grote glaspartijen en extra voorzieningen.

### 🧱 Waar bestaat de prijs uit?

De prijs bestaat uit meer dan alleen de constructie alleen:
- **Constructie**: Vaak staal of hout als duurzame basis.
- **Wanden & Isolatie**: Hoogwaardige prefab elementen met maximale isolatiewaarde.
- **Kozijnen & Glas**: Bijvoorbeeld een moderne schuifpui voor optimaal licht.
- **Transport & Plaatsing**: Vakkundige montage in slechts enkele dagen.
- **Afwerking**: Volledige ontzorging bij de binnen- en buitenafwerking.

> **Let op**: Hoe luxer de afwerking, hoe hoger de prijs per m².

### 📊 Voorbeeldprijzen prefab bouwen

**Basis prefab (± €2.500 – €3.000 per m²)**
- Standaard kozijnen
- Basis afwerking
- Eenvoudige indeling
- *Geschikt voor: standaard uitbouwen en aanbouwen*

**Middenklasse prefab (± €3.000 – €3.800 per m²)**
- Betere isolatie
- Grotere ramen of een schuifpui
- Hoogwaardigere afwerking
- *De meest gekozen optie*

**Luxe prefab (± €3.800 – €4.500 per m²)**
- Hoogwaardige, exclusieve materialen
- Grote glaspartijen en lichtstraten
- Luxe interieur afwerking
- *Voor wie echt kwaliteit en uitstraling wil*

### 🏠 Wat kost een prefab uitbouw van 15 m²?

Een veel gekozen formaat in Nederland is 15 m².
- **Basis uitvoering**: ± €45.000
- **Luxe uitvoering**: €55.000 – €65.000+

### ⚙️ Waarom prefab vaak goedkoper is

Prefab lijkt soms even duur als traditionele bouw, maar door de efficiëntie is het vaak voordeliger omdat:
- De **bouwtijd korter** is (minder arbeidskosten op locatie).
- Er **minder fouten** worden gemaakt dankzij fabrieksproductie.
- Er **geen vertraging** is door weersomstandigheden.
- De **planning 100% voorspelbaar** is.

### ⏱️ Sneller bouwen = lagere kosten

Een traditionele bouw kan 8–12 weken duren. Bij prefab is de doorlooptijd:
- **Productie**: 2–4 weken (in de fabriek)
- **Plaatsing**: 1–2 dagen (op locatie)

### 🚀 Conclusie

Prefab bouwen is de toekomst. Het biedt de perfecte balans tussen snelheid, kwaliteit en prijszekerheid. Of u nu meer leefruimte wilt voor uw gezin of een modern thuiskantoor, prefab is dé oplossing.`,
    slug: "kosten-uitbouw-15m2"
  },
  {
    id: 2,
    title: "Prefab uitbouw vs traditionele uitbouw: wat is beter?",
    category: "Vergelijking",
    date: "8 Mei, 2024",
    readTime: "7 min",
    image: "https://i.imgur.com/covRQg3.jpeg",
    excerpt: "Veel mensen twijfelen tussen een prefab uitbouw en een traditionele uitbouw. Logisch, want het is een flinke investering.",
    content: `Veel mensen twijfelen tussen een prefab uitbouw en een traditionele uitbouw. Logisch, want het is een flinke investering. Het grootste verschil zit in de manier van bouwen.

Bij een traditionele uitbouw wordt alles op locatie gebouwd. Dit kost tijd en is afhankelijk van weersomstandigheden. Bij prefab gebeurt het grootste deel in de fabriek.

Wat betekent dat concreet?
- **Prefab is sneller** (vaak binnen 1–2 dagen geplaatst)
- Minder overlast tijdens de bouw
- Betere kwaliteitscontrole

Een traditionele uitbouw kan nog steeds interessant zijn bij complexe projecten, maar voor standaard uitbreidingen kiezen steeds meer mensen voor prefab.`,
    slug: "prefab-vs-traditioneel"
  },
  {
    id: 3,
    title: "Hoe lang duurt het plaatsen van een uitbouw?",
    category: "Proces",
    date: "1 Mei, 2024",
    readTime: "4 min",
    image: "https://i.imgur.com/6VuTqto.jpeg",
    excerpt: "De duur van een uitbouw verschilt enorm per type.",
    content: `De duur van een uitbouw verschilt enorm per type. Bij traditionele bouw moet je denken aan 6 tot 10 weken. Bij prefab ligt dat totaal anders:
- **Productie**: 2–4 weken
- **Plaatsing**: 1–2 dagen

Dat is vaak het moment waar klanten van schrikken — hoe snel het ineens gaat. De echte winst zit niet alleen in tijd, maar ook in rust. Je zit niet wekenlang in een bouwplaats.`,
    slug: "duur-plaatsen-uitbouw"
  },
  {
    id: 4,
    title: "Heb je een vergunning nodig voor een uitbouw?",
    excerpt: "Dit is een vraag die bijna iedereen stelt — en het antwoord is: soms.",
    content: `Dit is een vraag die bijna iedereen stelt — en het antwoord is: soms. In veel gevallen is een uitbouw aan de achterkant van de woning vergunningsvrij, zolang je binnen bepaalde afmetingen blijft.

Maar let op:
- Regels verschillen per gemeente
- Hoekwoningen hebben vaak andere regels
- Hoogte en diepte zijn bepalend

Daarom is het slim om dit altijd vooraf te laten checken door een expert.`,
    slug: "vergunning-uitbouw"
  },
  {
    id: 5,
    title: "Wat zijn de voordelen van een prefab uitbouw?",
    excerpt: "Waarom kiezen zoveel mensen tegenwoordig voor prefab?",
    content: `Waarom kiezen zoveel mensen tegenwoordig voor prefab? Omdat het simpelweg praktischer is.

De belangrijkste voordelen:
- **Snelle plaatsing**
- **Minder overlast**
- **Vaste prijs vooraf**
- **Betere afwerking**

Wat klanten vaak zeggen is dat ze het proces veel minder zwaar vonden dan verwacht. En dat is precies waar prefab het verschil maakt.`,
    slug: "voordelen-prefab-uitbouw"
  },
  {
    id: 6,
    title: "Is een prefab uitbouw duurzaam?",
    excerpt: "Duurzaamheid speelt een steeds grotere rol bij verbouwen.",
    content: `Duurzaamheid speelt een steeds grotere rol bij verbouwen. Prefab heeft hier een aantal voordelen:
- Minder materiaalverspilling
- Efficiënter productieproces
- Betere isolatie mogelijk

Omdat alles in een gecontroleerde omgeving wordt gemaakt, is de kwaliteit vaak consistenter. Dat zie je terug in energieverbruik en comfort.`,
    slug: "duurzaamheid-prefab-uitbouw"
  },
  {
    id: 7,
    title: "Kun je een keuken in een uitbouw plaatsen?",
    excerpt: "Ja, en dit gebeurt heel vaak.",
    content: `Ja, en dit gebeurt heel vaak. Een uitbouw wordt juist vaak gebruikt om een grotere, open keuken te creëren.

Wel zijn er een paar dingen om rekening mee te houden:
- Extra leidingen
- Elektra voor apparatuur
- Moderne ventilatie

Dit wordt allemaal vooraf meegenomen in het ontwerp. Het resultaat is vaak een veel ruimere en lichtere leefruimte.`,
    slug: "keuken-in-uitbouw"
  },
  {
    id: 8,
    title: "Wat beïnvloedt the prijs van een uitbouw het meest?",
    excerpt: "Niet iedereen weet waar de grootste kosten zitten.",
    content: `Niet iedereen weet waar de grootste kosten zitten. Dit zijn de belangrijkste factoren:
- Grootte van de uitbouw
- Type kozijnen (groot verschil!)
- Afwerkingsniveau
- Extra opties (lichtstraat, schuifpui)

Vooral grote schuifpuien en lichtstraten kunnen de prijs flink verhogen. Daarom is het slim om vooraf te bepalen wat voor jou echt belangrijk is.`,
    slug: "factoren-prijs-uitbouw"
  },
  {
    id: 9,
    title: "Is een uitbouw een goede investering?",
    excerpt: "In veel gevallen: ja.",
    content: `In veel gevallen: ja. Een uitbouw zorgt voor meer woonruimte, meer licht en vaak een hogere woningwaarde.

Vooral in steden waar ruimte schaars is, kan een uitbouw de waarde van je woning aanzienlijk verhogen. Daarnaast verhoogt het direct je dagelijkse wooncomfort.`,
    slug: "investering-uitbouw"
  },
  {
    id: 10,
    title: "Kan een uitbouw ook bij een kleine tuin?",
    excerpt: "Ja, dat kan zeker.",
    content: `Ja, dat kan zeker. Ook bij kleinere tuinen zijn er vaak slimme oplossingen mogelijk.

Denk aan:
- Compacte maar functionele uitbouwen
- Veel glasgebruik voor ruimtelijk gevoel
- Slimme verbinding tussen binnen en buiten

Het gaat niet alleen om het aantal meters, maar vooral om hoe je de beschikbare ruimte optimaal benut.`,
    slug: "uitbouw-kleine-tuin"
  }
];

interface Stat {
  label: string;
  value: string;
}

interface Advantage {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CityPage {
  name: string;
  slug: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  stats?: Stat[];
  advantages?: Advantage[];
  faqs?: FAQ[];
}

const cityPages: CityPage[] = [
  {
    name: 'Eindhoven',
    slug: 'eindhoven',
    image: 'https://i.imgur.com/0I3QNTg.jpg',
    category: 'Regio Eindhoven',
    title: 'Prefab Schuur Eindhoven – Hoogwaardige Bergingen & Snelle Plaatsing',
    content: `Bent u op zoek naar een hoogwaardige **prefab schuur in Eindhoven**? Prefab Select is uw specialist voor moderne bergingen, bijgebouwen en schuren die met Zwitserse precisie worden vervaardigd en in recordtijd worden geplaatst. 

Of het nu gaat om een functionele opslagruimte in de tuin of een architectonisch bijgebouw dat naadloos aansluit bij uw woning, wij bieden maatwerk oplossingen voor particulieren en professionele opdrachtgevers in de gehele regio Eindhoven.`,
    advantages: [
      { title: 'Plaatsing in 1 dag', description: 'Omdat de schuur vooraf wordt voorbereid, is de bouwtijd op locatie korter dan bij traditionele bouw.' },
      { title: 'Volledig maatwerk', description: 'Afmetingen, gevelbekleding, dakafwerking, deuren en indeling worden afgestemd op uw wensen.' },
      { title: 'Hoogwaardige Kwaliteit', description: 'Wij werken met sterke constructies en onderhoudsarme materialen voor een lange levensduur.' }
    ],
    faqs: [
      {
        question: 'Wat kost een prefab schuur in Eindhoven?',
        answer: 'De prijs van een prefab schuur hangt af van de afmetingen, materialen, afwerking, fundering en extra opties zoals isolatie of elektra. Gemiddeld begint een hoogwaardige prefab berging vanaf €8.500 tot €15.000+, afhankelijk van het afwerkingsniveau.'
      },
      {
        question: 'Hoe snel kan een prefab schuur geplaatst worden?',
        answer: 'De eigenlijke montage op locatie neemt vaak slechts één werkdag in beslag. Het voortraject (ontwerp en productie) duurt gemiddeld 4 tot 8 weken.'
      },
      {
        question: 'Is een vergunning nodig voor een prefab schuur?',
        answer: 'In veel gevallen is een bijgebouw tot een bepaalde oppervlakte vergunningsvrij. Dit is afhankelijk van de locatie en de geldende regels in Eindhoven. Wij voeren graag een vergunningcheck voor u uit.'
      }
    ]
  },
  {
    name: 'Breda',
    slug: 'breda',
    image: 'https://i.imgur.com/fmQecXk.jpeg',
    category: 'West-Brabant',
    title: 'Prefab Aanbouw Breda – Meer Ruimte, Licht en Woningwaarde',
    content: `Wilt u uw woning in Breda vergroten zonder de maandenlange chaos van een traditionele verbouwing? Een **prefab aanbouw in Breda** is de ideale manier om direct extra comfort en licht in huis te halen. In populair wijken zoals Ginneken, Princenhage of de Belcrum zien we een enorme stijging in de vraag naar kwalitatieve woninguitbreidingen. Wij bedienen de gehele regio West-Brabant, inclusief [Tilburg](/regio/tilburg) en [Bergen op Zoom](/regio/bergen-op-zoom).

Met een **aanbouw aan de woning** investeert u niet alleen in uw dagelijkse woongenot, maar ook in de toekomstige verkoopwaarde van uw huis. Onze prefab modules worden volledig afgewerkt geleverd, inclusief stucwerk, elektra en vloerverwarming indien gewenst.

### De kosten van een aanbouw in Breda
Transparantie staat bij ons voorop. Gemiddeld liggen de **aanbouw kosten per m²** in Breda op:
- Vanaf **€2.600 per m²** voor een standaard prefab module
- Vanaf **€3.800 per m²** voor een luxe architectonische aanbouw

Voor een gemiddelde aanbouw van 15 m² in Breda kunt u rekenen op een totaalprijs tussen de **€48.000 en €65.000**. Dit is afhankelijk van de gekozen materialen, zoals triple-glas (HR+++) of een exclusieve gevelafwerking.

### Voordelen van Prefab Select in regio Breda
Huiseigenaren in West-Brabant kiezen voor Prefab Select vanwege onze focus op kwaliteit:
1. **Snelle bouwtijd**: De eigenlijke plaatsing in Breda duurt vaak slechts **één tot twee dagen**.
2. **Weerbestendig**: Omdat we in de fabriek bouwen, heeft regen geen invloed op de kwaliteit van de constructie.
3. **Hoogwaardige isolatie**: Onze wanden halen standaard een Rc-waarde van 6.0, wat zorgt voor een lagere energierekening.

Nieuwsgierig naar wat er mogelijk is voor uw woning? Verken onze [Prefab Bouwen](/prefab-bouwen) service of [Ontwerp je aanbouw](https://prefabselectconfigurator.nl).`
  },
  {
    name: 'Tilburg',
    slug: 'tilburg',
    image: 'https://i.imgur.com/v4jk0SK.jpeg',
    category: 'Midden-Brabant',
    title: 'Prefab Aanbouw Tilburg – Snel Extra Woonruimte met Prefab Select',
    content: `Bent u op zoek naar een expert voor uw **prefab aanbouw in Tilburg**? Of u nu woont in de Reeshof, de Blaak of in een karakteristiek pand bij het Wilhelminapark, wij realiseren hoogwaardige uitbreidingen die naadloos aansluiten op uw bestaande woning. 

**Prefab bouwen in Tilburg** is de oplossing voor wie niet wil verhuizen, maar wel behoefte heeft aan die extra slaapkamer, leefkeuken of een modern thuiskantoor. Onze constructies zijn gebaseerd op un oersterk staalskelet, wat zorgt voor maximale flexibiliteit in ontwerp.

### Waarom Prefab in Tilburg?
- **Minimale overlast**: Geen maandenlang vrachtverkeer en lawaai in uw straat.
- **Vaste prijs**: Geen onverwachte meerprijzen tijdens de bouw.
- **Energiezuinig**: Klaar voor de toekomst met uitstekende isolatiewaarden.

### Kosten indicatie regio Tilburg
Voor un **prefab uitbouw van 15m² in Tilburg** kunt u rekenen op un vanafprijs van circa €45.000. Wilt u un complete woning laten bouwen? Bekijk dan onze pagina over [Prefab Bouwen](/prefab-bouwen).

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Den Bosch',
    slug: 'den-bosch',
    image: 'https://i.imgur.com/Mcivs2I.jpeg',
    category: 'Noord-Brabant',
    title: 'Uitbouw Den Bosch – Luxe Prefab Woninguitbreiding op Maat',
    content: `Woon je in 's-Hertogenbosch en droom je van een grotere woonkeuken of een lichte woonkamer met zicht op de tuin? Een **uitbouw in Den Bosch** laten plaatsen was nog nooit zo eenvoudig. Wij combineren vakmanschap met de snelheid van moderne prefab technologie.

In Den Bosch hechten bewoners veel waarde aan architectonische kwaliteit. Daarom zijn onze **prefab aanbouw** modules volledig aanpasbaar aan de stijl van uw woning, of dat nu een moderne villa in Maaspoort is of een sfeervolle jaren '30 woning in Zuid.

### Uw partner voor prefab in Den Bosch
Waarom Prefab Select de favoriete keuze is in de regio 's-Hertogenbosch:
- **Luxe uitstraling**: Gebruik van weggewerkte kozijnen en hoogwaardige materialen.
- **Snelheid**: Wij plaatsen uw nieuwe leefruimte in recordtijd (1-2 dagen).
- **Zorgeloos**: Wij regelen alles van ontwerp tot de laatste plint.

### Wat kost een luxe uitbouw in Den Bosch?
De **kosten voor een uitbouw** in 's-Hertogenbosch liggen gemiddeld tussen de **€2.500 en €4.000 per m²**. Een investering die zich direct terugbetaalt in woonplezier en een hogere taxatiewaarde van uw vastgoed.

Benieuwd naar onze andere diensten? Ontdek onze [Luxe Chalets](/chalets) of [Vakantiewoningen](/vakantiewoningen).

[Ontvang binnen 24 uur een offerte voor Den Bosch](/offerte)`
  },
  {
    name: 'Rotterdam',
    slug: 'rotterdam',
    image: 'https://i.imgur.com/covRQg3.jpeg',
    category: 'Zuid-Holland',
    title: 'Uitbouw Rotterdam – Slimme Ruimteoplossingen in de Havenstad',
    content: `Woon je in Rotterdam en merk je dat je woning te klein begint te worden? In un stad waar space is schaars, zoeken steeds meer huiseigenaren naar manieren om hun woning slimmer te benutten met un **prefab uitbouw in Rotterdam**.

Een uitbouw laten plaatsen is in Rotterdam vaak de meest logische stap. In plaats van verhuizen — wat in Rotterdam vaak duur en lastig is — kun je je huidige woning uitbreiden met un **hoogwaardige aanbouw**. Wij zijn ook uw partner in nabijgelegen steden zoals [Den Haag](/regio/den-haag) en [Leidschendam](/regio/leidschendam).

### Waarom un uitbouw in Rotterdam?
In Rotterdam draait alles om efficiënt gebruik van ruimte. Met un **prefab aanbouw woning** kun je:
- Je woonkamer aanzienlijk vergroten
- Een open woonkeuken creëren met kookeiland
- Meer lichtinval realiseren door grote schuifpuien
- De woningwaarde direct verhogen

### Wat kost un uitbouw in Rotterdam?
De prijs hangt af van jouw keuzes, maar gemiddeld liggen de **uitbouw kosten per m²** in Rotterdam op:
- **€2.600 per m²** voor un standaard uitvoering
- **€4.000 per m²** voor un luxe architectonische uitvoering

Voor un uitbouw van ongeveer 15 m² in Rotterdam betekent dit un investering tussen de **€50.000 en €65.000**, afhankelijk van de complexiteit in de stad.

### Prefab uitbouw Rotterdam – Snelheid en minimale overlast
In un drukke stad als Rotterdam wilt u zo min mogelijk overlast. Daarom kiezen steeds meer huiseigenaren voor de **prefab bouwmethode**. Voordelen zijn un snelle plaatsing (vaak binnen 1-2 dagen) en minimale logistieke hinder in de buurt.

[Vraag un vrijblijvende offerte aan voor regio Rotterdam](/offerte)`
  },
  {
    name: 'Bergen op Zoom',
    slug: 'bergen-op-zoom',
    title: 'Prefab Uitbouw Bergen op Zoom – Hoogwaardige Woninguitbreiding',
    content: `Woon je in Bergen op Zoom of Halsteren en merk je dat je woning niet meer voldoende ruimte biedt? Een **prefab uitbouw in Bergen op Zoom** is de perfecte manier om uw leefomgeving te vergroten zonder de stress van un lange verbouwing.

In Bergen op Zoom zien we vooral un grote vraag naar **moderne aanbouw** oplossingen voor gezinswoningen. Of het nu gaat om un kantoor aan huis of un verlenging van uw woonkamer, Prefab Select levert topkwaliteit met un Rc-waarde van 6.0.

### Waarom un uitbouw in Bergen op Zoom?
Onze klanten in West-Brabant kiezen voor zekerheid:
- **Gegarandeerde kwaliteit**: Gebouwd onder gecontroleerde fabrieksomstandigheden.
- **Vaste planning**: Wij plaatsen uw uitbouw vaak binnen **1 tot 2 dagen**.
- **Duurzaam**: Maximale isolatie voor un lagere energierekening.

### Kosten indicatie Bergen op Zoom
Een **prefab uitbouw** van 15 m² in Bergen op Zoom begint vanaf ca. **€45.000**. Dit is inclusief transport, plaatsing en un hoogwaardige afwerking.

Bekijk onze [Prefab Uitbouw](/prefab-uitbouw) projecten of [Vraag un offerte aan](/offerte).`
  },
  {
    name: 'Oss',
    slug: 'oss',
    title: 'Prefab Uitbouw Oss – Slim Uitbreiden & Waardevermeerdering',
    content: `Wilt u uw woning in Oss verduurzamen en vergroten? Een **prefab uitbouw in Oss** biedt de uitkomst. In plaats van verhuizen, wat in de huidige markt lastig is, kiest u voor un hoogwaardige aanbouw die jarenlang meegaat.

Oss heeft veel woningen die zich uitstekend lenen voor un **modulaire uitbouw**. Door te kiezen voor prefab, voorkomt u maandenlange bouwoverlast voor uzelf en uw buren.

### Voordelen uitbouw Oss
- **Snelle realisatie**: Van fundering tot oplevering in recordtijd.
- **All-in service**: Wij verzorgen het ontwerp, de productie en de plaatsing.
- **Hoog rendement**: Een uitbouw is un van de beste investeringen voor de waarde van uw woning.

### Wat kost un aanbouw in Oss?
De gemiddelde **kosten per m² voor un uitbouw** in Oss liggen rond de €2.500 tot €3.500. Benieuwd naar de exacte prijs voor uw situatie?

[Vraag direct un offerte aan voor regio Oss](/offerte)`
  },
  {
    name: 'Laren',
    slug: 'laren',
    title: 'Prefab Uitbouw Laren – Exclusieve Woninguitbreiding in het Gooi',
    content: `In Laren staan kwaliteit en esthetiek voorop. Een **prefab uitbouw in Laren** van Prefab Select voldoet aan de allerhoogste architectonische eisen. Wij realiseren luxe leefruimtes die naadloos aansluiten op het karakter van uw woning in het Gooi.

Onze **hoogwaardige aanbouw** modules maken gebruik van ultraslanke profielen en triple-glazed glas, waardoor u geniet van maximale lichtinval met behoud van privacy en thermisch comfort (Rc 6.0+).

### Exclusief prefab in Laren
- **Onzichtbare overgangen**: Design dat de grens tussen binnen en buiten doet vervagen.
- **Minimale bouwduur**: Wij plaatsen uw nieuwe leefruimte in slechts **48 uur**.
- **Maatwerk**: Volledige vrijheid in gevelbekleding en indeling.

Bekijk onze [Prefab Bouwen](/prefab-bouwen) projecten for inspiratie.

[Vraag un persoonlijk adviesgesprek aan for Laren](/offerte)`
  },
  {
    name: 'Amsterdam',
    slug: 'amsterdam',
    image: 'https://i.imgur.com/fmQecXk.jpeg',
    category: 'Hoofdstad',
    title: 'Prefab Uitbouw Amsterdam – Slimme Ruimteoplossingen in de Stad',
    content: `Wonen in Amsterdam betekent vaak creatief omgaan met ruimte. Een **prefab uitbouw in Amsterdam** is dé manier om extra meters te winnen zonder uw geliefde buurt te verlaten. Of het nu gaat om un dakterras-opbouw of un uitbreiding in uw stadstuin, wij weten hoe we in un compacte omgeving moeten bouwen. Ook in de directe omgeving van de hoofdstad, zoals in [Amstelveen](/regio/amstelveen), [Haarlem](/regio/haarlem), [Almere](/regio/almere) en [Utrecht](/regio/utrecht) realiseren wij hoogwaardige projecten.

Dankzij onze **modulaire bouwmethode** kunnen we in Amsterdam bouwen met minimale logistieke hinder. De meeste onderdelen worden kant-en-klaar geleverd and met un kraan op hun plek gehesen.

### Waarom Amsterdam kiest for prefab:
- **Snelheid**: Binnen 1 dag wind- en waterdicht.
- **Geen bouwstof**: Geen maandenlang zagen and boren op locatie.
- **Hoogwaardig**: Onze isolatiewaarden overtreffen the standaard bouwbesluit eisen.

### Kosten uitbouw Amsterdam
Door the complexe logistiek in Amsterdam kunnen kosten variëren. Gemiddeld investeert u €3.000 tot €4.500 per m² for un luxe, zorgeloze uitvoering.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Den Haag',
    slug: 'den-haag',
    title: 'Prefab Uitbouw Den Haag – Meer Ruimte met Behoud van Karakter',
    content: `Uw woning in Den Haag uitbreiden met respect for de architectuur? Prefab Select is gespecialiseerd in **prefab uitbouw in Den Haag**. Van de statige woningen in het Statenkwartier tot de moderne bouw in Leidschenveen, wij bieden un passende oplossing.

Een **aanbouw aan de woning** in Den Haag zorgt for de nodige extra leefruimte for uw gezin of thuiskantoor. Onze prefab technologie garandeert un snelle plaatsing and un afwerking van topniveau.

### De voordelen for Den Haag:
- **Architectonisch maatwerk**: Wij zorgen dat de aanbouw past bij uw huidige gevel.
- **Snelle plaatsing**: Vaak binnen **één dag** gerealiseerd.
- **Duurzaam & Geïsoleerd**: Rc-waarde van 6.0 for optimaal comfort.

[Ontdek onze werkwijze](/diensten) or [vraag un offerte aan](/offerte)`
  },
  {
    name: 'Amstelveen',
    slug: 'amstelveen',
    title: 'Prefab Uitbouw Amstelveen – Luxe & Comfort voor Uw Woning',
    content: `Op zoek naar un **prefab uitbouw in Amstelveen**? Prefab Select realiseert luxe woninguitbreidingen die uw wooncomfort direct naar un hoger niveau tillen. Onze modules zijn perfect for gezinnen die behoefte hebben aan un ruimere keuken of un lichte woonkamer met zicht op the tuin.

Met un **hoogwaardige prefab aanbouw** in Amstelveen kiest u for un snelle, schone and kwalitatieve bouwoplossing. Wij werken uitsluitend met the beste materialen and un oersterk staalskelet.

### Voordelen prefab in Amstelveen:
- **Snelle verwerking**: Minimale overlast for uw directe omgeving.
- **Luxe afwerking**: Inclusief opties for lichtstraten and grote glaspartijen.
- **Toekomstbestendig**: Energieneutraal gebouwd met the hoogste isolatienormen.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Nijmegen',
    slug: 'nijmegen',
    image: 'https://i.imgur.com/v4jk0SK.jpeg',
    category: 'Gelderland',
    title: 'Prefab Uitbouw Nijmegen – Duurzaam Extra Woonruimte Creëren',
    content: `Woont u in Nijmegen en wilt u meer leefruimte creëren zonder de overlast van un traditionele verbouwing? Een **prefab uitbouw in Nijmegen** is de oplossing. Wij bouwen hoogwaardige, geïsoleerde modules die in recordtijd staan.

Nijmegen is un stad van innovatie en duurzaamheid. Onze **modulaire aanbouw** oplossingen sluiten hier perfect bij aan door het gebruik van circulaire materialen en un uistekende isolatiewaarde (Rc 6.0).

### Uw voordelen in Nijmegen:
- **Zwitserse precisie**: Prefab bouw van de hoogste kwaliteit.
- **Plaatsing in 1-2 dagen**: Snel genieten van uw nieuwe ruimte.
- **Vaste prijs**: Geen verrassingen, 100% transparantie.

### Wat kost un uitbouw in Nijmegen?
Gemiddeld liggen de **uitbouw kosten per m²** in Nijmegen tussen de €2.500 en €4.000, afhankelijk van de luxe en afwerking.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Antwerpen',
    slug: 'antwerpen',
    image: 'https://i.imgur.com/qTIctyr.jpeg',
    category: 'Regio Antwerpen',
    title: 'Specialist in prefab uitbouw, aanbouw en dakkapel in Antwerpen',
    content: `### Specialist in prefab uitbouwen en dakkapellen in Antwerpen
Prefab Select is gespecialiseerd in hoogwaardige prefab uitbouwen, prefab aanbouwen en dakkapellen in Antwerpen en omgeving. Wij realiseren moderne woninguitbreidingen voor zowel particuliere woningen als nieuwbouwprojecten in de regio Antwerpen.

### Snel extra woonruimte
Een prefab uitbouw in Antwerpen biedt een snelle en efficiënte manier om extra woonruimte te creëren zonder langdurige verbouwingen. Dankzij onze prefab bouwmethodes worden grote delen vooraf geproduceerd waardoor de montage op locatie veel sneller verloopt. 

Steeds meer woningeigenaren kiezen voor een prefab aanbouw in Antwerpen vanwege de moderne uitstraling, snelle plaatsing en uitstekende isolatie. Daarnaast verhoogt een prefab uitbouw direct de waarde van uw woning.

### Volledige ontzorging
Prefab Select verzorgt het volledige traject van ontwerp tot plaatsing. Wij denken mee over indeling, afwerking, materiaalkeuze en vergunningen zodat u volledig ontzorgd wordt tijdens het project. Ook voor een prefab dakkapel in Antwerpen bent u bij Prefab Select aan het juiste adres. Een dakkapel zorgt voor extra ruimte en natuurlijk licht op zolder en wordt vaak binnen één dag geplaatst dankzij prefab productie.

Onze prefab dakkapellen worden volledig op maat geproduceerd en zijn beschikbaar in diverse stijlen, kleuren en afwerkingen passend bij zowel moderne als klassieke woningen.`,
    stats: [
      { label: 'Specialist', value: 'Prefab' },
      { label: 'Montage', value: 'Snelle' },
      { label: 'Design', value: 'Modern' },
      { label: 'Afwerking', value: 'Top' }
    ],
    advantages: [
      { title: 'Snelle Plaatsing', description: 'Dankzij prefab productie kunnen uitbouwen en dakkapellen snel worden geplaatst met minimale overlast.' },
      { title: 'Hoogwaardige Materialen', description: 'Wij werken uitsluitend met duurzame materialen en moderne prefab constructies van hoge kwaliteit.' },
      { title: 'Volledig Maatwerk', description: 'Iedere prefab uitbouw of dakkapel wordt volledig afgestemd op uw woning en wensen.' }
    ],
    faqs: [
      { question: 'Wat kost een prefab uitbouw in Antwerpen?', answer: 'De kosten van een prefab uitbouw in Antwerpen hangen af van de afmetingen, afwerking en materiaalkeuze. Vraag vrijblijvend een offerte aan voor een prijsindicatie.' },
      { question: 'Hoe snel wordt een prefab aanbouw geplaatst?', answer: 'Dankzij prefab productie kan een prefab uitbouw vaak binnen enkele dagen geplaatst worden afhankelijk van het project.' },
      { question: 'Is een vergunning nodig voor een prefab dakkapel?', answer: 'Dit hangt af van de locatie, afmetingen en regelgeving in Antwerpen. Prefab Select helpt u graag met advies over vergunningen.' }
    ]
  },
  {
    name: 'Leidschendam',
    slug: 'leidschendam',
    image: 'https://i.imgur.com/covRQg3.jpeg',
    category: 'Zuid-Holland',
    title: 'Prefab Uitbouw Leidschendam – Luxe Woninguitbreiding op Maat',
    content: `Wilt u uw woning in Leidschendam vergroten met un moderne, lichte leefruimte? Een **prefab uitbouw in Leidschendam** van Prefab Select biedt the perfecte balans tussen snelheid and kwaliteit.

Wij realiseren **hoogwaardige aanbouw** projecten die naadloos aansluiten op the architectuur van uw woning in Leidschendam-Voorburg. Of u nu kiest for un riante uitbouw van the woonkamer of un moderne kantoorruimte.

### Waarom kiezen for prefab in Leidschendam?
- **Minimale bouwtijd**: Wij plaatsen uw nieuwe module vaak binnen **24 tot 48 uur**.
- **Hoogwaardige afwerking**: Strak gestucte wanden and luxe kozijnen naar keuze.
- **Zorgeloos**: Wij regelen the vergunningscheck and het transport.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Utrecht',
    slug: 'utrecht',
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    category: 'Midden-Nederland',
    title: 'Prefab Uitbouw Utrecht – Snel & Duurzaam Woning Vergroten',
    content: `Wilt u een **prefab uitbouw in Utrecht** laten plaatsen? In de Domstad, waar de woningmarkt extreem krap is, is een woninguitbreiding de slimste manier om extra leefruimte te creëren zonder te verhuizen. Of u nu woont in Leidsche Rijn, Tuindorp of de binnenstad van Utrecht, wij realiseren hoogwaardige prefab modules met Zwitserse precisie.

Een **prefab aanbouw in Utrecht** biedt u het voordeel van minimale overlast in de drukke stad. Omdat we de module volledig in onze fabriek bouwen, staat de uitbouw vaak al binnen **één dag** wind- en waterdicht bij u in de tuin.

### Kosten uitbouw Utrecht
De **kosten voor een uitbouw** in Utrecht variëren per type afwerking. Gemiddeld kunt u rekenen op:
- **€2.600 per m²** voor een hoogwaardige basisuitvoering
- **€4.200 per m²** voor een exclusieve architectonische aanbouw

Voor een gemiddelde Utrechtse woning betekent een uitbouw van 15 m² een investering tussen de €48.000 en €65.000, een bedrag dat zich direct terugbetaalt in de woningwaarde. Bekijk ook onze [Prefab Uitbouw projecten](/prefab-uitbouw-laten-plaatsen) voor meer inspiratie.

### Vergunningsvrij uitbouwen in Utrecht
In Utrecht gelden specifieke regels voor vergunningsvrij bouwen. Vaak is een uitbouw aan de achterzijde tot 4 meter diep vergunningsvrij. Wij checken dit altijd gratis voor u via de officiële kanalen van de gemeente Utrecht.

[Bekijk onze werkwijze](/diensten) of [vraag direct een offerte aan](/offerte)`
  },
  {
    name: 'Almere',
    slug: 'almere',
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    category: 'Flevoland',
    title: 'Prefab Aanbouw Almere – De Toekomst van Modulair Bouwen',
    content: `Almere is de stad van innovatie en moderne architectuur. Een **prefab aanbouw in Almere** sluit dan ook naadloos aan bij het karakter van deze stad. Of u nu woont in Almere Stad, Haven of Buiten, wij bieden duurzame oplossingen voor wie snel extra woonruimte nodig heeft.

Met een **prefab uitbouw in Almere** kiest u voor de hoogste isolatienormen (Rc 6.0+) en een razendsnelle plaatsing. Waar traditionele bouw maanden kan duren, staat onze module vaak binnen **24 uur**.

### Waarom Prefab Select in Almere?
- **Innovatieve techniek**: Gebruik van sterke staalconstructies voor een onverslijtbare basis.
- **Snelle plaatsing**: Minimale bouwoverlast voor uzelf en de buren in de wijk.
- **Vaste prijs**: Volledige transparantie over de **uitbouw kosten** vooraf.

### Kosten indicatie Almere
Voor een kwalitatieve uitbouw in Almere kunt u rekenen op een vanafprijs van ca. €2.500 per m². Of u nu zoekt naar een [prefab uitbouw](/prefab-uitbouw-laten-plaatsen) of een [aanbouw woning](/prefab-aanbouw), wij helpen u verder.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Haarlem',
    slug: 'haarlem',
    image: 'https://i.imgur.com/fmQecXk.jpeg',
    category: 'Kennemerland',
    title: 'Prefab Uitbouw Haarlem – Luxe & Snelheid in de Regio Kennemerland',
    content: `Wilt u uw karakteristieke woning in Haarlem vergroten met een moderne **prefab uitbouw**? Of het nu gaat om een jaren '30 woning in Haarlem-Noord of een moderner pand in Schalkwijk, Prefab Select realiseert luxe woninguitbreidingen die passen bij uw stijl.

Een **prefab aanbouw in Haarlem** is de ideale manier om snel extra meters te winnen. Omdat we de meest complexe onderdelen in de fabriek voorbereiden, heeft u op locatie minimale overlast. 

### Voordelen uitbouw Haarlem:
- **Behoud van karakter**: Wij stemmen het ontwerp af op de bestaande architectuur.
- **Snelheid**: Binnen 1-2 dagen een wind- en waterdichte uitbouw.
- **Hoge Rc-waarde**: Uitstekende isolatie voor maximaal wooncomfort.

### Kosten uitbouw Haarlem
Gemiddeld liggen de **kosten per m² voor een uitbouw** in Haarlem tussen de €2.600 en €4.500. Dit is inclusief onze volledige begeleiding van vergunningscheck tot oplevering.

[Ontdek onze luxe chalets](/chalets) of [Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Mantelzorgwoning',
    slug: 'mantelzorgwoning-prefab',
    title: 'Mantelzorgwoning prefab – comfortabel wonen dichtbij huis',
    content: `Wil je een mantelzorgwoning laten plaatsen voor een ouder, familielid of naaste? Dan is een prefab mantelzorgwoning een snelle en praktische oplossing om zorg dichtbij huis te organiseren.

Bij Prefabselect.nl realiseren wij mantelzorgwoningen op maat, volledig afgestemd op jouw situatie. Zo creëer je een zelfstandige woonruimte in de tuin, zonder dat iemand zijn vertrouwde omgeving hoeft te verlaten.

### Wat is een mantelzorgwoning?
Een mantelzorgwoning is een zelfstandige woonruimte op eigen terrein, bedoeld voor iemand die zorg nodig heeft of juist zorg verleent. Het grote voordeel: je woont dicht bij elkaar, maar behoudt toch privacy en zelfstandigheid.

### Waarom kiezen voor een prefab mantelzorgwoning?
Steeds meer mensen kiezen voor een prefab mantelzorgwoning in plaats van traditionele bouw. Voordelen:
- **Snelle plaatsing** – vaak binnen enkele dagen
- Minder overlast tijdens de bouw
- Vaste prijs vooraf
- Hoogwaardige afwerking
- Energiezuinige bouw

### Wat kost een mantelzorgwoning?
De kosten hangen af van grootte, afwerking en indeling. Gemiddeld kun je denken aan:
- Vanaf **€40.000 – €60.000** voor compacte modellen
- Grotere en luxe uitvoeringen vanaf **€70.000+**

### Mogelijkheden op maat
Wij bieden diverse mogelijkheden voor de indeling:
- 1- of 2-persoons woning
- Woonkamer met keuken
- Slaapkamer en badkamer
- Gelijkvloerse indeling (essentieel voor zorg)
- **Extra opties**: drempelloze toegang, aangepaste badkamer, airco en verwarming.

### Hoe werkt het traject?
1. **Offerte aanvragen**: Ontvang een eerste indicatie.
2. **Advies en ontwerp**: We maken een maatwerk ontwerp voor jouw situatie.
3. **Productie**: De woning wordt volledig voorbereid in de fabriek.
4. **Plaatsing**: Binnen korte tijd wordt de woning geplaatst.
5. **Afwerking**: De woning wordt gebruiksklaar gemaakt.

### Vergunning nodig?
In veel gevallen is een mantelzorgwoning vergunningsvrij, mits er sprake is van een zorgsituatie en de woning op eigen terrein staat. Wij helpen je met het controleren van de regels.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Recreatiewoning',
    slug: 'recreatiewoning-prefab',
    title: 'Prefab Recreatiewoning Laten Plaatsen – Luxe & Duurzaam',
    content: `Droomt u van un eigen vakantieplek of un verhuurobject met un hoog rendement? Een **prefab recreatiewoning** van Prefab Select combineert modern design met de hoogste bouwkwaliteit.

Of het nu gaat om un luxe chalet aan de kust of un moderne vakantiewoning in de bossen, onze **modulaire recreatiewoningen** zijn direct klaar voor gebruik.

### Waarom kiezen for un prefab recreatiewoning?
- **All-season comfort**: Dankzij top-isolatie het hele jaar door behaaglijk.
- **Snel operationeel**: Ideaal for vakantieparken of particuliere kavels.
- **Onderhoudsarm**: Gebruik van duurzame materialen die jarenlang mooi blijven.

Ontdek onze verschillende [Vakantiewoningen](/vakantiewoningen) and [Chalets](/chalets).

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Prefab Uitbouw',
    slug: 'prefab-uitbouw-laten-plaatsen',
    title: 'Prefab uitbouw laten plaatsen – snel extra ruimte zonder lange verbouwing',
    content: `Wil je jouw woning vergroten zonder maandenlang in een verbouwing te zitten? Dan is een prefab uitbouw de slimste oplossing.

Bij Prefabselect.nl realiseren wij complete prefab uitbouwen op maat, die binnen korte tijd geplaatst worden en direct zorgen voor meer ruimte, licht en comfort.

👉 **Vaak al binnen 1 tot 2 dagen geplaatst**

### Wat is een prefab uitbouw?
Een prefab uitbouw is een woninguitbreiding die grotendeels in de fabriek wordt gemaakt. Denk aan wanden, kozijnen, isolatie en afwerking — alles wordt vooraf voorbereid. Daarna wordt de uitbouw in één keer bij jouw woning geplaatst.

**Het resultaat:**
- Snellere bouw
- Hogere kwaliteit
- Minder overlast

### Waarom kiezen voor een prefab uitbouw?
Steeds meer huiseigenaren kiezen voor prefab in plaats van traditionele bouw. 

**De belangrijkste voordelen:**
- **Snelle plaatsing** – vaak binnen 1 tot 2 dagen
- Tot 60% kortere bouwtijd
- Minder overlast rondom de woning
- Vaste prijs vooraf
- Strakke en consistente afwerking

Vooral als je snel resultaat wilt zonder gedoe, is prefab de beste keuze.

### Wat kost een prefab uitbouw?
De prijs van een prefab uitbouw laten plaatsen hangt af van jouw wensen. Gemiddeld liggen de prefab uitbouw kosten per m² op:
- Vanaf **€2.500 per m²** (standaard uitvoering)
- Vanaf **€3.000 per m²** (luxe uitvoering)

Voor een prefab uitbouw van 15 m² betekent dit een investering van ongeveer **€45.000 tot €55.000**. De uiteindelijke prijs wordt bepaald door de grootte, type kozijnen, afwerking en extra opties zoals een lichtstraat of vloerverwarming.

👉 **Je ontvangt altijd een duidelijke offerte vooraf.**

### Hoe lang duurt een prefab uitbouw?
Een traditionele uitbouw kan 6 tot 10 weken duren. Bij prefab is dit veel sneller:
- **Productie**: 2–4 weken
- **Plaatsing**: 1–2 dagen
- **Totale doorlooptijd**: 4–6 weken

Dit is voor veel mensen de belangrijkste reden om voor prefab te kiezen.

### Hoe werkt een prefab uitbouw laten plaatsen?
Wij houden het proces overzichtelijk:
1. **Offerte aanvragen**: Je geeft je wensen door en ontvangt een prijsindicatie.
2. **Advies en inmeten**: We bekijken jouw woning en bespreken de mogelijkheden.
3. **Ontwerp op maat**: Je krijgt een ontwerp dat perfect aansluit op jouw situatie.
4. **Productie van de uitbouw**: De prefab uitbouw wordt in de fabriek gemaakt.
5. **Plaatsing op locatie**: Binnen korte tijd wordt de uitbouw geplaatst.
6. **Afwerking en oplevering**: Alles wordt netjes afgewerkt en gebruiksklaar gemaakt.

### Welke mogelijkheden zijn er?
Een prefab uitbouw kan volledig op maat worden gemaakt. Veel gekozen opties zijn een woonkamer uitbouw, keuken uitbouw of een grote open leefruimte.

**Extra opties:**
- Grote schuifpuien (tot 5 meter)
- Lichtstraten voor extra daglicht
- Vloerverwarming en luxe afwerking
- Elektra en waterleidingen volledig voorbereid

### Heb je een vergunning nodig?
In veel gevallen is een uitbouw vergunningsvrij, vooral aan de achterzijde van de woning. Dit hangt af van de grootte, locatie en gemeentelijke regels. Wij helpen je met het controleren hiervan.

### Prefab uitbouw vs traditionele uitbouw
Bij prefab kies je voor snelheid, minder overlast en een vaste planning. Bij traditionele bouw heb je vaak te maken met een langere bouwtijd, meer rommel en meer afhankelijkheid van het weer. Voor wie snelheid en duidelijkheid wil, is prefab meestal de beste keuze.

### Is een prefab uitbouw een goede investering?
Ja, een prefab uitbouw zorgt voor meer woonruimte, meer licht en een betere indeling. Dit vertaalt zich direct in een waardeverhoging van je woning en meer dagelijks wooncomfort.

### Waarom kiezen voor Prefabselect.nl?
Wij zorgen voor een compleet traject: van maatwerk ontwerp tot snelle realisatie en hoogwaardige afwerking. Geen verrassingen achteraf, maar duidelijke communicatie en vakmanschap.

[Ontwerp je aanbouw](https://prefabselectconfigurator.nl)`
  },
  {
    name: 'Zeeland',
    slug: 'zeeland',
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    category: 'Provincie Zeeland',
    title: 'Prefab Uitbouw & Dakkapel Zeeland – Hoogwaardige Woninguitbreiding',
    content: `Bent u op zoek naar meer ruimte in de prachtige provincie Zeeland? Of u nu woont in Middelburg, Vlissingen of Goes, een prefab uitbouw of dakkapel van Prefab Select is de ideale manier om uw wooncomfort te verhogen. Wij zijn dé specialist in Zeeland voor hoogwaardige modulaire bouwoplossingen.`
  }
];

function CityLandingPage() {
  const { slug } = useParams();
  const page = useMemo(() => cityPages.find(p => p.slug === slug), [slug]);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  if (!page) return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-950 text-white">
      <h2 className="text-3xl font-display font-bold mb-4 tracking-tighter">Pagina niet gevonden.</h2>
      <Link to="/" className="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Terug naar home</Link>
    </div>
  );

  const heroImage = page.image || 'https://i.imgur.com/6VuTqto.jpeg';

  // Custom Eindhoven layout components
  const EindhovenHero = () => (
    <section className="bg-white py-24 pt-40 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -z-10" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-blue-600" />
            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.4em]">
              Regio Eindhoven
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-display font-black text-blue-950 leading-[0.9] mb-10 uppercase tracking-tighter italic">
            Prefab Schuur <br /> 
            <span className="text-blue-600 not-italic">Eindhoven</span>
          </h1>
          <p className="text-2xl text-slate-500 leading-relaxed mb-12 font-medium max-w-xl">
            Uw specialist in hoogwaardige prefab schuren en bergingen. Snel geplaatst, architectonisch ontworpen en gebouwd voor de toekomst.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/offerte" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1">
              Offerte aanvragen
            </Link>
            <Link to="/contact" className="bg-white border-2 border-slate-100 hover:border-blue-600 text-slate-900 px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all hover:bg-slate-50">
              Adviesgesprek
            </Link>
          </div>
          
          <div className="mt-20 grid grid-cols-2 gap-10">
            <div>
              <p className="text-3xl font-display font-black text-blue-950 tracking-tighter mb-2">1 DAG</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plaatsing op locatie</p>
            </div>
            <div>
              <p className="text-3xl font-display font-black text-blue-950 tracking-tighter mb-2">RC 6.0</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Maximale Isolatie</p>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-7">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src="https://i.imgur.com/0I3QNTg.jpg" 
                alt="Prefab schuur Eindhoven" 
                className="rounded-[3rem] object-cover h-[500px] w-full shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-5 space-y-6">
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                src="https://i.imgur.com/zY3snyq.jpg" 
                alt="Prefab berging Eindhoven" 
                className="rounded-[2.5rem] object-cover h-[240px] w-full shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl">
                <p className="font-display font-black text-2xl uppercase tracking-tighter leading-none mb-3">Premium Maatwerk</p>
                <p className="text-[11px] font-black uppercase tracking-widest opacity-60">Architectural quality</p>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l-2 border-b-2 border-blue-100 rounded-bl-[4rem] -z-10" />
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-white text-blue-950">
      {page.slug === 'eindhoven' ? <EindhovenHero /> : (
        /* Premium Hero Section */
        <section className="relative min-h-[70vh] flex items-center pt-32 pb-24 overflow-hidden bg-blue-950">
          <div className="absolute inset-0 z-0">
            <motion.div style={{ y: yHero }} className="absolute inset-0">
              <img 
                src={heroImage} 
                alt={`Prefab bouw in ${page.name}`} 
                className="w-full h-full object-cover opacity-30 grayscale-[0.5] contrast-[1.1]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none">
                  PREFAB SELECT {page.category ? page.category.toUpperCase() : 'ONTWERP & BOUW'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase">
                Prefab Bouw <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">in {page.name}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100/60 mb-12 max-w-2xl leading-relaxed font-medium border-l-4 border-blue-600 pl-8">
                {page.title}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/offerte" 
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                >
                  Vraag Offerte Aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="#content" 
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Lees Meer
                </Link>
              </div>

              {/* Injected Stats from turn */}
              {page.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                  {page.stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                    >
                      <div className="text-2xl font-black text-blue-400 uppercase tracking-tighter">{stat.value}</div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Floating CTA for Eindhoven */}
      {page.slug === 'eindhoven' && (
        <div className="fixed bottom-10 right-10 z-50">
          <Link 
            to="/offerte" 
            className="flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(31,94,255,0.4)] transition-all duration-500 hover:-translate-y-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl animate-pulse">
              💬
            </div>
            <div>
              <p className="text-[10px] text-blue-100 font-black uppercase tracking-widest opacity-70">Kelly staat voor je klaar</p>
              <p className="font-display font-black uppercase tracking-tighter text-sm">Vraag Direct Een Offerte Aan</p>
            </div>
          </Link>
        </div>
      )}

      {/* SEO Content Section */}
      <section id="content" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-blue-950 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg prose-strong:text-blue-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                <Markdown>{page.content}</Markdown>
              </article>
              


              {/* Advantages Block */}
              {page.advantages && (
                <div className="mt-24">
                  <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-12">Waarom kiezen voor Prefab Select?</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {page.advantages.map((adv, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 group">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={20} />
                        </div>
                        <h4 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">{adv.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{adv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Block */}
              {page.faqs && (
                <div className="mt-24">
                  <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-12 italic">Veelgestelde Vragen</h2>
                  <div className="space-y-8">
                    {page.faqs.map((faq, i) => (
                      <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-shadow">
                        <h4 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">{faq.question}</h4>
                        <p className="text-slate-500 leading-relaxed text-lg font-medium">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Default Trust Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-slate-100">
                {[
                  { title: 'Plaatsing in 1 dag', desc: 'Snel en efficiënt op locatie.', icon: <Timer size={24} /> },
                  { title: 'Vaste Prijs Vooraf', desc: 'Geen verrassingen achteraf.', icon: <Gem size={24} /> },
                  { title: 'Hoogste Isolatie', desc: 'Toekomstbestendig bouwen.', icon: <Factory size={24} /> }
                ].map((feature, i) => (
                  <div key={feature.title} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <aside className="lg:col-span-4 space-y-10">
              <div className="p-10 rounded-[3rem] bg-blue-950 text-white shadow-3xl sticky top-32 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] -mr-16 -mt-16" />
                <h4 className="text-2xl font-display font-black mb-6 tracking-tighter uppercase leading-none">Vrijblijvende <br /> Prijsopgave</h4>
                <p className="text-sm text-blue-300/60 mb-10 leading-relaxed font-bold uppercase tracking-widest">
                  Ontvang binnen 24 uur een voorstel voor uw project in {page.name}.
                </p>
                <Link 
                  to="/offerte" 
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border border-blue-400/20 shadow-2xl hover:bg-blue-500 transition-all duration-300 active:scale-95 flex items-center justify-center gap-4 group"
                >
                  Nu Aanvragen <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-blue-200/40">
                    <CheckCircle2 size={12} className="text-blue-500" /> Kwaliteitscontrole
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-blue-200/40">
                    <CheckCircle2 size={12} className="text-blue-500" /> Vergunning Check
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-blue-200/40">
                    <CheckCircle2 size={12} className="text-blue-500" /> Eigen Productie
                  </div>
                </div>
              </div>

              {/* Kelly Bar / CTA */}
              <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-3xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] -mr-16 -mt-16" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 p-1">
                    <img 
                      src="https://i.imgur.com/cXPWGDM.jpeg" 
                      alt="Kelly" 
                      className="w-full h-full object-cover rounded-full" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest">Altijd dichtbij</p>
                    <p className="text-lg font-display font-black uppercase tracking-tighter">Kelly helpt je verder</p>
                  </div>
                </div>
                <p className="text-sm text-blue-100 mb-8 leading-relaxed font-medium">
                  Heb je specifieke vragen over een project in {page.name}? Ik sta klaar om je te adviseren over de beste prefab oplossing.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-50 transition-all">
                  Contact opnemen <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}

function BlogSection() {
  return (
    <section id="blogs" className="py-16 bg-white overflow-hidden relative border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">Inzichten & Advies</h2>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-blue-950 tracking-tighter uppercase mb-4 leading-none">
              Kennis van <br />
              <span className="text-blue-600 italic font-light lowercase">modulair bouwen.</span>
            </h3>
          </div>
          <Link to="/" className="px-8 py-4 bg-blue-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-blue-600 hover:translate-y-[-1px] flex items-center gap-3 group shadow-xl">
            Alle artikelen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <motion.div 
              key={blog.id}
              whileHover={{ y: -5 }}
              className="bg-blue-50/20 rounded-2xl flex flex-col border border-blue-50 hover:bg-white hover:shadow-xl transition-all duration-500 group h-full"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-blue-400">
                    <Clock size={11} /> {blog.readTime}
                  </div>
                </div>

                <h4 className="text-xl font-display font-black text-blue-950 mb-6 tracking-tighter uppercase group-hover:text-blue-600 transition-colors leading-tight">
                  {blog.title}
                </h4>

                <p className="text-[13px] text-blue-900/40 leading-relaxed font-medium line-clamp-2 mb-8 italic">
                  "{blog.excerpt}"
                </p>

                <div className="mt-auto pt-6 border-t border-blue-50 flex items-center justify-between">
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-950 hover:text-blue-600 flex items-center transition-colors group"
                  >
                    Lees meer <ArrowRight size={11} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[8px] font-black text-blue-950/20 uppercase tracking-[0.2em]">{blog.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Shared Components ---

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  return null;
}

const WhatsAppButton = () => (
  <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-4">
    {/* WhatsApp Button */}
    <a 
      href="https://wa.me/31850607775" 
      target="_blank" 
      rel="noreferrer"
      className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-125 transition-transform flex items-center justify-center border-4 border-white group relative"
      title="Chat via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <div className="absolute right-full mr-4 bg-green-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-2xl">
        WhatsApp Contact
      </div>
    </a>
  </div>
);

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-xl border-t-2 border-blue-50"
        >
          <a href="#footer" className="block w-full bg-blue-600 text-white text-center py-3.5 rounded-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/20 text-[10px]">
            Vraag offerte aan
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [kellyOpen, setKellyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > window.innerHeight) {
        setKellyOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Diensten', 
      href: '/diensten',
      dropdown: [
        { name: 'Prefab uitbouw', href: '/diensten/prefab-uitbouw' },
        { name: 'Prefab aanbouw', href: '/diensten/prefab-aanbouw' },
        { name: 'Mantelzorgwoning', href: '/diensten/mantelzorgwoning' },
        { name: 'Chalet', href: '/diensten/prefab-chalets' },
        { name: 'Poolhouse', href: '/diensten/poolhouse' },
        { name: 'Vakantiewoning', href: '/diensten/vakantiewoningen' },
      ]
    },
    { name: 'Projecten', href: '/projecten' },
    { name: 'Showroom afspraak', href: '/contact' },
    { 
      name: 'Over ons', 
      href: '/over-ons',
      dropdown: [
        { name: 'Over Prefab Select', href: '/over-ons' },
        { name: 'Onze Werkwijze', href: '/werkwijze' },
        { name: 'Veelgestelde Vragen', href: '/faq' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    { name: 'Zakelijk', href: '/zakelijk' },
    { name: 'Klantenservice', action: 'kelly' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'translate-y-[-10px]' : 'translate-y-0'}`}>
      {/* Top Info Bar */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-12 opacity-100 mb-2'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="tel:31850607775" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Phone size={12} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">+31 85 060 7775</span>
            </a>
            <a href="mailto:info@prefabselect.nl" className="flex items-center gap-2 group hidden md:flex">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Mail size={12} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">info@prefabselect.nl</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 group transition-all duration-500">
              <div className="relative">
                <img 
                  src="https://i.imgur.com/cXPWGDM.jpeg" 
                  alt="Kelly" 
                  className="w-8 h-8 rounded-full object-cover transition-all duration-500 ring-2 ring-blue-500/50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-blue-950 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-widest text-white uppercase leading-none">Kelly Specialist</span>
                <span className="text-[7px] font-bold text-blue-400 uppercase tracking-widest mt-1 leading-none">Nu bereikbaar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-4 py-5 rounded-[2.5rem] transition-all duration-1000 ${scrolled ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200' : 'bg-blue-950/10 backdrop-blur-md border border-white/10'}`}>
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-700 ${scrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}>
                <Box className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-[14px] font-display font-black tracking-tighter uppercase leading-none transition-colors ${scrolled ? 'text-blue-950' : 'text-white'}`}>
                Prefab Select
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors ${scrolled ? 'text-blue-900/60' : 'text-white/60'}`}>
                Modulair bouwen
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link: any) => (
              link.action === 'kelly' ? (
                <button
                  key={link.name}
                  onClick={() => setKellyOpen(true)}
                  className="flex items-center gap-3 transition-all relative group py-2"
                >
                  <div className="relative">
                    <img 
                      src="https://i.imgur.com/cXPWGDM.jpeg" 
                      alt="Kelly" 
                      className={`w-12 h-12 rounded-full object-cover border-2 shadow-md transition-all duration-300 ${scrolled ? 'border-blue-600 bg-white shadow-blue-600/10' : 'border-white bg-blue-950/20 shadow-white/15'} group-hover:scale-105`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[10px] uppercase font-black tracking-[0.1em] transition-colors duration-300 ${scrolled ? 'text-blue-950 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400 drop-shadow-sm'}`}>
                      Kelly (Adviseur)
                    </span>
                    <span className={`text-[8px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-blue-600' : 'text-blue-400'}`}>
                      Nu online
                    </span>
                  </div>
                </button>
              ) : link.dropdown ? (
                <div key={link.name} className="relative group py-2">
                  <Link 
                    to={link.href} 
                    className={`flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.4em] transition-all ${scrolled ? 'text-blue-950/60 hover:text-blue-950' : 'text-white/70 hover:text-white drop-shadow-sm'}`}
                  >
                    {link.name}
                    <ChevronDown size={12} className={`transition-transform duration-300 group-hover:-rotate-180`} />
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full ${scrolled ? 'bg-blue-600' : 'bg-blue-400'}`} />
                  </Link>
                  <div className="absolute top-full left-0 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white shadow-[0_40px_80px_rgba(29,78,216,0.1)] rounded-2xl flex flex-col w-56 overflow-hidden border border-slate-100">
                    {link.dropdown.map(item => (
                      <Link 
                        key={item.name} 
                        to={item.href} 
                        className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-blue-950 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-50 last:border-0"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-[10px] uppercase font-black tracking-[0.4em] transition-all relative group py-2 ${scrolled ? 'text-blue-950/60 hover:text-blue-950' : 'text-white/70 hover:text-white drop-shadow-sm'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full ${scrolled ? 'bg-blue-600' : 'bg-blue-400'}`} />
                </Link>
              )
            ))}
            
            <Link to="/offerte" className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl relative group ${scrolled ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-white text-blue-950 shadow-white/10'}`}>
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
              <span className="relative z-10">Vraag offerte aan</span>
            </Link>
          </div>
          
          {/* Kelly Contact Modal */}
          <AnimatePresence>
            {kellyOpen && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setKellyOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="fixed top-24 right-10 w-96 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 z-[60] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4 leading-tight">
                      Neem vrijblijvend <br /> contact met ons op.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-10">
                      We helpen je graag met advies, vragen of een vrijblijvende offerte.
                    </p>

                    <div className="space-y-4">
                      <a 
                        href="tel:31850607775"
                        className="flex items-center justify-center gap-3 w-full bg-blue-950 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all duration-300"
                      >
                        <Phone size={14} />
                        Bel voor direct contact
                      </a>
                      <Link 
                        to="/contact"
                        onClick={() => setKellyOpen(false)}
                        className="flex items-center justify-center gap-3 w-full border border-blue-950/10 text-blue-950 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all duration-300"
                      >
                        Offerte of afspraak
                      </Link>
                      <div className="pt-8 text-center">
                          <a href="mailto:info@prefabselect.nl" className="text-[10px] uppercase font-black tracking-widest text-blue-950/50 hover:text-blue-950 transition-colors">
                              info@prefabselect.nl
                          </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 lg:hidden">
            {/* Direct access button for Kelly on mobile */}
            <button 
              onClick={() => setKellyOpen(true)}
              className="flex items-center gap-2 group relative active:scale-95 transition-all"
              title="Praat met Kelly"
            >
              <div className="relative">
                <img 
                  src="https://i.imgur.com/cXPWGDM.jpeg" 
                  alt="Kelly" 
                  className={`w-11 h-11 rounded-full object-cover border-2 shadow-md transition-all duration-300 ${scrolled ? 'border-blue-600 bg-white shadow-blue-600/15' : 'border-white bg-blue-950/25 shadow-white/20'}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white animate-pulse" />
              </div>
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all ${scrolled ? 'bg-blue-900/5 text-blue-900 border-blue-100 shadow-sm' : 'bg-white/10 text-white border-white/10 shadow-sm'}`}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 z-[60] bg-blue-950 p-10 flex flex-col justify-center"
          >
            <button className="absolute top-10 right-10 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-2xl" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-10">
              {navLinks.map((link: any) => (
                link.action === 'kelly' ? (
                  <button 
                    key={link.name}
                    onClick={() => {
                        setKellyOpen(true);
                        setIsOpen(false);
                    }}
                    className="flex items-center gap-4 transition-all"
                  >
                    <div className="relative inline-block">
                        <img 
                            src="https://i.imgur.com/cXPWGDM.jpeg" 
                            alt="Kelly" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-950" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                        {link.name}
                      </span>
                      <span className="text-sm text-blue-400 font-bold uppercase tracking-widest mt-2">
                        Wij staan voor je klaar
                      </span>
                    </div>
                  </button>
                ) : link.dropdown ? (
                  <div key={link.name} className="flex flex-col gap-4">
                    <Link 
                      to={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-3xl md:text-5xl font-display font-black text-white hover:text-blue-400 transition-colors uppercase tracking-tighter leading-none"
                    >
                      {link.name}
                    </Link>
                    <div className="flex flex-col gap-3 pl-6 border-l-2 border-white/10 mt-2">
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.name} 
                          to={item.href} 
                          onClick={() => setIsOpen(false)}
                          className="text-lg md:text-xl font-display font-black text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl md:text-5xl font-display font-black text-white hover:text-blue-400 transition-colors uppercase tracking-tighter leading-none"
                  >
                    {link.name}
                  </Link>
                )
              ))}

              <Link 
                to="/offerte"
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 text-white py-7 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl mt-12 text-center hover:bg-blue-500 transition-colors"
              >
                Vraag offerte aan
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(30,58,138,0.1)] h-full"
    >
      <Link to={`/diensten#${service.slug}`} className="flex flex-col h-full">
        {/* Cinematic Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-950/5 group-hover:bg-blue-950/0 transition-all duration-1000" />
          
          {/* Number */}
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-lg flex items-center justify-center text-white text-[10px] font-black group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 shadow-lg">
              {service.number}
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[7px] font-black uppercase tracking-[0.2em] text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {service.category}
            </div>
          </div>
        </div>
        
        {/* Content Body */}
        <div className="p-6 lg:p-8 flex flex-col flex-1 relative bg-white">
          <div className="mb-4">
            <h3 className="text-lg lg:text-xl font-display font-black text-blue-950 uppercase tracking-tighter leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-500">
              {service.title}
            </h3>
            <p className="text-slate-500 text-[13px] leading-relaxed font-medium line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50 mb-4">
            <div className="space-y-1.5">
              <span className="text-[7.5px] font-black text-slate-300 uppercase tracking-widest block">Materiaal</span>
              <p className="text-[10px] font-bold text-blue-950/80 leading-tight">{service.material}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[7.5px] font-black text-slate-300 uppercase tracking-widest block">Status</span>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{service.status}</p>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Details</span>
            <p className="text-[12px] text-slate-500 leading-relaxed italic">{service.details}</p>
          </div>
          
          {/* CTA Button */}
          <div className="mt-auto">
            <div className="w-full h-11 bg-linear-to-r from-blue-700 to-blue-600 rounded-xl flex items-center justify-center gap-2 text-white font-black uppercase tracking-[0.2em] text-[9px] shadow-xl transition-all duration-500 overflow-hidden relative group/btn active:scale-95">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">Ontdek Concept</span>
              <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- Page Content Components ---

function TrustBar() {
  return (
    <div className="bg-blue-950 border-b border-white/5 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-10 mb-12">
        <div className="flex flex-col items-center md:items-start text-blue-400">
          <div className="flex items-center space-x-1.5 mb-3">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            <span className="ml-4 font-display font-black text-2xl text-white">4.9/5</span>
          </div>
          <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.3em] font-black">Klantbeoordeling</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-display font-black text-white mb-1.5">100+</span>
          <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.3em] font-black">Tevreden Klanten</p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-2xl font-display font-black text-white mb-1.5 uppercase tracking-tighter leading-none">Landelijke Dekking</span>
          <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.3em] font-black">Nederland & België</p>
        </div>
      </div>

      <div className="relative flex">
        <div className="animate-marquee-slow flex whitespace-nowrap gap-4">
          {[
            'https://i.imgur.com/Bt9LWYz.jpg',
            'https://i.imgur.com/R2Z9Yfp.jpg',
            'https://i.imgur.com/4AyN3hF.jpg',
            'https://i.imgur.com/47ijUwH.jpg',
            'https://i.imgur.com/4bIY5ZT.jpg',
            'https://i.imgur.com/46sMwSq.jpg',
            'https://i.imgur.com/vSyvYll.jpg',
            'https://i.imgur.com/7y2KfpB.jpg',
            'https://i.imgur.com/o6PQKeZ.jpg',
            'https://i.imgur.com/ecQYJNh.jpg',
            'https://i.imgur.com/UeCrs10.jpg',
            'https://i.imgur.com/mO4gZsK.jpg',
            'https://i.imgur.com/90CULA7.jpg',
            'https://i.imgur.com/Bt9LWYz.jpg',
            'https://i.imgur.com/R2Z9Yfp.jpg',
            'https://i.imgur.com/4AyN3hF.jpg',
            'https://i.imgur.com/47ijUwH.jpg',
            'https://i.imgur.com/4bIY5ZT.jpg',
            'https://i.imgur.com/46sMwSq.jpg',
            'https://i.imgur.com/vSyvYll.jpg',
            'https://i.imgur.com/7y2KfpB.jpg',
            'https://i.imgur.com/o6PQKeZ.jpg',
            'https://i.imgur.com/ecQYJNh.jpg',
            'https://i.imgur.com/UeCrs10.jpg',
            'https://i.imgur.com/mO4gZsK.jpg',
            'https://i.imgur.com/90CULA7.jpg'
          ].map((img, i) => (
            <div key={i} className="w-28 h-16 rounded-xl overflow-hidden flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 border border-white/10">
              <img src={img} alt="Project" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}} />
    </div>
  );
}


function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-20 bg-white border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">Vragen</h2>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-blue-950 tracking-tighter uppercase mb-6 leading-none">Heldere <br /><span className="text-blue-600 italic font-light lowercase">antwoorden.</span></h3>
          <p className="text-base text-blue-900/50 leading-relaxed font-medium mb-10 border-l-4 border-blue-100 pl-6 max-w-sm italic">
            Wij geloven in volledige transparantie over ons proces en de materialen.
          </p>
          <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100/50 shadow-sm transition-all hover:shadow-md">
            <p className="text-[9px] font-black text-blue-600 mb-4 uppercase tracking-widest leading-none">Geen antwoord gevonden?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://wa.me/31850607775"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[8px] flex items-center justify-center hover:bg-green-600 transition-all shadow-lg gap-2"
              >
                WhatsApp <MessageCircle size={10} />
              </a>
              <a 
                href="tel:31850607775"
                className="flex-1 bg-blue-950 text-white py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[8px] flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg gap-2"
              >
                Bel ons <Phone size={10} />
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className={`rounded-xl overflow-hidden border transition-all duration-500 ${openIndex === index ? 'border-blue-400 bg-white shadow-lg' : 'border-blue-50 bg-blue-50/10'}`}>
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 text-left transition-colors font-display font-bold text-blue-950"
              >
                <span className="text-base tracking-tighter uppercase leading-tight">{faq.question}</span>
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${openIndex === index ? 'rotate-180 bg-blue-600 text-white border-blue-600' : 'text-blue-400 border-blue-100'}`}>
                  <ChevronDown size={12} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-6 text-blue-900/60 leading-relaxed font-medium text-[13px]"
                  >
                    <div className="w-6 h-0.5 bg-blue-600 mb-3 rounded-full" />
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Prefab Uitbouw Laten Plaatsen",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Prefabselect.nl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Steenspil 24",
        "postalCode": "4661 TZ",
        "addressLocality": "Halsteren",
        "addressRegion": "Noord-Brabant",
        "addressCountry": "NL"
      },
      "url": "https://www.prefabselect.nl"
    },
    "description": "Wilt u extra woonruimte creëren zonder te verhuizen? Met een prefab uitbouw van Prefabselect.nl vergroot u uw woning snel, efficiënt en zonder langdurige verbouwing.",
    "areaServed": ["Eindhoven", "Breda", "Tilburg", "Den Bosch", "Rotterdam", "Bergen op Zoom", "Nederland"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Prefab Uitbouw Diensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Prefab Uitbouw 15m2",
            "description": "Basis prefab uitbouw vanaf €45.000"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxe Prefab Uitbouw",
            "description": "Inclusief keuken en luxe afwerking vanaf €55.000"
          }
        }
      ]
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

function SEOText() {
  return (
    <section className="py-12 md:py-24 bg-blue-950 text-blue-50/70 border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          {/* Main SEO Intro */}
          <div className="space-y-6 md:space-y-10 text-center">
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1] md:leading-[0.85]">
              Prefab uitbouw laten plaatsen – snel extra ruimte zonder gedoe
            </h2>
            <div className="prose prose-invert lg:prose-xl max-w-none">
              <p className="text-xl leading-relaxed text-blue-50/70">
                Steeds meer mensen kiezen ervoor om hun woning uit te breiden in plaats van te verhuizen. Logisch ook — verhuizen is duur, kost tijd en je levert vaak in op locatie. Wat wij merken bij klanten van <strong>Prefabselect.nl</strong>, is dat ze vooral één ding willen: 
                <span className="text-blue-400 font-bold ml-2 italic">snel meer ruimte, zonder maandenlang in een bouwput te zitten.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-blue-50/70">
            <div className="space-y-6 border-l-8 border-blue-600 pl-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vlot & efficiënt</h3>
              <p className="text-lg leading-relaxed">
                Een traditionele uitbouw duurt vaak 2 tot 3 maanden. Met een prefab uitbouw is dat compleet anders. Omdat wij het grootste deel vooraf in de fabriek maken, kunnen we de uitbouw vaak <strong>binnen 1 tot 2 dagen plaatsen</strong>.
              </p>
            </div>
            <div className="space-y-6 border-l-8 border-blue-600 pl-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Klantervaring</h3>
              <p className="text-lg leading-relaxed">
                 Geen ingewikkelde trajecten, maar gewoon: duidelijk, strak geregeld en snel resultaat. Dit is precies waar wij op focussen bij Prefab Select.
              </p>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-white/10 relative overflow-hidden group mb-12 md:mb-24">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-blue-600/20"></div>
            <h3 className="text-xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 md:mb-12 leading-none">Wat kost een prefab uitbouw ongeveer?</h3>
            <div className="prose prose-invert max-w-none mb-8 md:mb-12">
              <p className="text-base md:text-lg text-blue-50/70 mb-8">De prijs hangt natuurlijk af van jouw wensen, maar om je een eerlijk beeld te geven:</p>
              <ul className="text-lg list-none p-0 space-y-6">
                <li className="flex items-center gap-6">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                  <span className="text-blue-50/70">Een prefab uitbouw van ±15 m² begint rond de <strong>€45.000</strong></span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                  <span className="text-blue-50/70">Luxe varianten liggen rond de <strong>€55.000</strong></span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                  <span className="text-blue-50/70">Grote schuifpuien of een lichtstraat kunnen de prijs verhogen</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-400 leading-relaxed text-center">
                Wat we belangrijk vinden: je krijgt bij ons altijd een duidelijke prijs vooraf, zonder verrassingen achteraf.
              </p>
            </div>
          </div>

          {/* Traject Section */}
          <div className="space-y-12 md:space-y-16">
            <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter text-center">Hoe het traject er in de praktijk uitziet</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { step: "1", title: "Offerte aanvragen", desc: "Binnen korte tijd nemen we contact met je op." },
                { step: "2", title: "Woning & Wensen", desc: "Wat is mogelijk? Wat past het beste bij uw situatie?" },
                { step: "3", title: "Ontwerp op maat", desc: "Geen standaard oplossing, maar afgestemd op u." },
                { step: "4", title: "Productie", desc: "Alles gebeurt gecontroleerd in onze eigen fabriek." },
                { step: "5", title: "Plaatsing", desc: "Binnen 1 dag staat the uitbouw er vaak al!" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl transition-all hover:translate-y-[-10px] group">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-4 md:mb-6 block leading-none">Stap 0{item.step}</span>
                  <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-blue-400 transition-colors uppercase leading-none">{item.title}</h4>
                  <p className="text-xs md:text-sm text-blue-50/40 leading-relaxed font-bold uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Considerations Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center pt-12 md:pt-24">
            <div className="space-y-8 md:space-y-10">
              <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">Waar moet je rekening mee houden?</h3>
              <p className="text-base md:text-lg leading-relaxed text-blue-50/70 border-l-4 border-blue-600 pl-6 md:pl-10">
                Eerlijk is eerlijk: een uitbouw is maatwerk. Dingen die invloed hebben op de uiteindelijke uitkomst: de grootte, het type kozijnen of schuifpui, de afwerking (basis of luxe) en extra's zoals keuken of vloerverwarming. 
              </p>
              <p className="text-[10px] md:text-[11px] font-black text-blue-400 uppercase tracking-[0.5em] leading-none">
                Twijfel je wat slim is? Dat is precies waar wij je bij helpen.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-[80px] p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden border border-white/10 group">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px]"></div>
               <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 text-blue-400 leading-none">Direct duidelijkheid</h4>
               <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase tracking-[0.3em] mb-12">
                 Benieuwd wat er bij jouw woning mogelijk is? Vraag vrijblijvend een offerte aan via www.prefabselect.nl
               </p>
               <Link to="/offerte" className="w-full bg-blue-600 text-white py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-500 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all duration-300 shadow-2xl active:scale-95 group flex items-center justify-center gap-4 border border-blue-400/20">
                 Vraag Offerte Aan <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

          <div className="text-center pt-24 border-t border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-50/20 leading-[2.5]">
              # prefab uitbouw laten plaatsen • # prefab uitbouw kosten • # uitbouw woning prijs • # uitbouw plaatsen • # prefab aanbouw • # prefab aanbouw specialist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-blue-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.imgur.com/AC0hk9k.jpg" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-blue-950/80 via-blue-900/60 to-blue-950" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-10"
        >
          <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-blue-400 mb-4 block leading-none">Ontwerp uw toekomst</h2>
          <h3 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tighter leading-[1] md:leading-[0.8] mb-8 md:mb-10 uppercase">
            Klaar voor meer <br />
            <span className="text-blue-400 italic font-light lowercase text-3xl md:text-6xl">leefruimte?</span>
          </h3>
          <p className="text-base md:text-xl text-blue-50/70 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium border-x-4 border-blue-600 px-6 md:px-10">
            Zet vandaag de eerste stap naar een woning die perfect aansluit bij uw ambities en gezinssituatie.
          </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/offerte" className="w-full sm:w-auto bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl border border-blue-400/20 hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 active:scale-95 group flex items-center justify-center gap-3">
              Vraag offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-2xl active:scale-95 flex items-center justify-center gap-3 group"
            >
              Contact <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="bg-blue-950 text-white pt-2 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-24 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-lg font-display font-bold tracking-tighter flex items-center gap-2">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center text-blue-600">
                <Box className="w-4 h-4" />
              </div>
              <span>PREFAB<span className="text-blue-400">SELECT</span></span>
            </Link>
            <p className="text-blue-200 text-[10px] leading-relaxed max-w-xs font-medium uppercase tracking-wider">
              Circulair, modulair en efficiënt bouwen voor de toekomst.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-blue-400 text-left">Producten</h4>
            <ul className="space-y-4 text-blue-300 text-[10px] font-bold uppercase tracking-widest leading-none text-left">
              {services.map(s => (
                <li key={s.id}><Link to={`/dienst/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-blue-400 text-left">Informatie</h4>
            <ul className="space-y-4 text-blue-300 text-[10px] font-bold uppercase tracking-widest leading-none text-left">
              <li><Link to="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Veelgestelde Vragen</Link></li>
              <li><Link to="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-blue-400 text-left">Contact</h4>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-left">
              <ul className="space-y-6 text-blue-200">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-widest text-blue-300/50 mb-1">Telefoon</p>
                    <a href="tel:+31850607775" className="text-sm font-display font-bold text-white hover:text-blue-400 transition-colors tracking-tight">
                      +31 85 060 7775
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-widest text-blue-300/50 mb-1">Email</p>
                    <a href="mailto:info@prefabselect.nl" className="text-sm font-display font-bold text-white hover:text-blue-400 transition-colors">
                      info@prefabselect.nl
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-widest text-blue-300/50 mb-1">Locatie</p>
                    <p className="text-sm font-display font-bold text-white leading-tight">
                      Steenspil 24<br />
                      4661 TZ Halsteren
                    </p>
                  </div>
                </li>
                <li className="pt-4 border-t border-white/5 flex gap-8">
                  <div>
                    <p className="text-[8px] uppercase font-black tracking-widest text-blue-300/40 mb-1">KVK</p>
                    <p className="text-[10px] font-bold text-blue-100">84056630</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-black tracking-widest text-blue-300/40 mb-1">BTW</p>
                    <p className="text-[10px] font-bold text-blue-100">NL863079234B01</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-blue-400/50 font-black uppercase tracking-[0.2em] space-y-4 md:space-y-0 pb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <p>© 2024 Prefab Select. Alle rechten voorbehouden.</p>
          </div>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function OfferteForm({ className = "", title = "Vraag direct een vrijblijvende offerte aan" }: { className?: string; title?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    };

    try {
      console.log("Sending lead to Make webhook (via backend)...");
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || "Er is iets misgegaan bij het versturen van uw aanvraag.");
      }

      if (result.webhookStatus === "not_configured") {
        console.warn("MAKE_WEBHOOK_URL is missing in environment variables. Lead won't be synced to Make.com.");
      } else {
        console.log("Lead sent successfully");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: any) {
      console.error("Form submission error:", err);
      // We show a user-friendly error but still allow the "success" state if it's just an API config issue 
      // OR we just show the error. Given the user's focus on Exact CRM, let's show the error if it fails.
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="offerte-form" className={`bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-blue-100 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] -mr-16 -mt-16 transition-all duration-1000" />
      
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 text-center"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl border border-blue-400">
            <Check size={36} strokeWidth={3} />
          </div>
          <h4 className="text-2xl font-display font-black text-blue-950 mb-4 tracking-tighter uppercase">Bedankt!</h4>
          <p className="text-base text-blue-900/60 leading-relaxed font-black uppercase tracking-widest leading-tight">
            We hebben uw aanvraag ontvangen.<br />
            Binnen 24 uur contact.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="mb-8 font-display">
            <h4 className="text-xl font-black text-blue-950 uppercase tracking-tighter mb-2 leading-none text-left">
              {title}
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required
                name="name"
                type="text" 
                placeholder="Volledige Naam" 
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950 placeholder:text-blue-300 uppercase tracking-widest" 
              />
              <input 
                required
                name="phone"
                type="tel" 
                placeholder="Telefoonnummer" 
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950 placeholder:text-blue-300 uppercase tracking-widest" 
              />
            </div>
            <input 
              required
              name="email"
              type="email" 
              placeholder="E-mailadres" 
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950 placeholder:text-blue-300 uppercase tracking-widest" 
            />
            <div className="relative group">
              <select 
                required
                name="projectType"
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950 placeholder:text-blue-300 appearance-none uppercase tracking-widest cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="bg-white font-bold uppercase">Selecteer ProjectType</option>
                {services.map(s => <option key={s.id} value={s.title} className="bg-white font-bold">{s.title}</option>)}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600/40">
                <ChevronDown size={14} />
              </div>
            </div>
            <textarea 
              name="message"
              placeholder="Bericht (optioneel)" 
              rows={3}
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950 placeholder:text-blue-300 resize-none uppercase tracking-widest leading-relaxed" 
            />
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-widest">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_-15px_rgba(29,78,216,0.5)] border border-blue-400/20 hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(29,78,216,0.6)] transition-all duration-300 active:scale-95 group flex items-center justify-center gap-3 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Bezig met verzenden...' : (
                <>
                  Start mijn aanvraag <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-6 mt-8">
               <div className="flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
                 <CheckCircle2 size={14} /> 24u Respons
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
               <div className="flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
                 <ShieldCheck size={14} /> AVG-Veilig
               </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// --- Page Components ---


export function PrefabSteps() {
  const steps = [
    {
      title: 'Vrijblijvend Advies',
      description: 'We bespreken uw wensen en bekijken de mogelijkheden op locatie of in onze showroom.',
      image: 'https://i.imgur.com/nn4AexH.jpeg',
      icon: <MessageCircle size={24} />,
      number: '01'
    },
    {
      title: 'Ontwerp op Maat',
      description: 'Onze architecten vertalen uw visie naar een technisch hoogwaardig prefab ontwerp.',
      image: 'https://i.imgur.com/SpVtuPf.jpeg',
      icon: <PenTool size={24} />,
      number: '02'
    },
    {
      title: 'Eigen Productie',
      description: 'In onze eigen fabriek bouwen wij uw module onder ideale omstandigheden met oog voor detail.',
      image: 'https://i.imgur.com/Mcivs2I.jpeg',
      icon: <Factory size={24} />,
      number: '03'
    },
    {
      title: 'Snelle Plaatsing',
      description: 'De complete module wordt op locatie geplaatst met minimale overlast en een korte doorlooptijd.',
      image: 'https://i.imgur.com/PTfKgEE.jpeg',
      icon: <Zap size={24} />,
      number: '04'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50/30 to-transparent pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-100/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">HET PROCES</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 leading-[0.9] tracking-tighter uppercase mb-8">
              In 4 Heldere Stappen <br />
              <span className="text-blue-600 italic font-light lowercase">naar uw ideale woning.</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
              Wij begeleiden u van het allereerste idee tot de uiteindelijke oplevering op locatie. Helder, transparant en met focus op kwaliteit.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(29,78,216,0.1)] transition-all duration-700 h-full flex flex-col group/card relative z-10 overflow-hidden">
                {/* Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-blue-950/10 transition-colors duration-700" />
                  
                  {/* Number Overlay */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20">
                    <span className="text-[10px] font-black text-white tracking-widest">{step.number}</span>
                  </div>
                  
                  {/* Icon Badge */}
                  <div className="absolute -bottom-6 right-8 w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center shadow-xl z-20 group-hover:bg-blue-600 transition-colors duration-500">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pt-10 flex-grow flex flex-col">
                  <h3 className="text-xl font-display font-black text-blue-950 tracking-tighter uppercase mb-4 group-hover:text-blue-600 transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed font-medium">
                    {step.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/diensten" className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-blue-600 group/link">
                      Lees meer <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumIntro() {
  const trustElements = [
    { text: 'Eigen productie', icon: <Factory size={16} /> },
    { text: 'Snelle plaatsing', icon: <Timer size={16} /> },
    { text: 'Hoogwaardige afwerking', icon: <Star size={16} /> },
    { text: 'Volledig maatwerk', icon: <PenTool size={16} /> }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Right Side: Image First on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:order-2 order-1"
          >
            <div className="relative group">
              {/* Luxury Frame */}
              <div className="absolute -inset-4 border border-blue-600/10 rounded-[3.5rem] transition-all duration-1000 group-hover:scale-[1.02]" />
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://i.imgur.com/6v4bsrj.jpeg" 
                  alt="Modern Architecture Prefab" 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
            </div>
          </motion.div>

          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:order-1 order-2 space-y-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-blue-600/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">VAKMANSCHAP IN PREFAB</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-blue-950 leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
                Prefab bouw <br />
                oplossingen
              </h2>

              <div className="space-y-6 max-w-xl">
                <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                  Prefab Select realiseert hoogwaardige prefab bouwoplossingen met focus op kwaliteit, duurzaamheid en snelle realisatie.
                </p>
                <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] italic border-l-2 border-blue-600 pl-6 py-1">
                  “<Link to="/diensten/prefab-uitbouw" className="hover:text-blue-400 transition-colors">Prefab uitbouwen</Link>, <Link to="/diensten/mantelzorgwoning" className="hover:text-blue-400 transition-colors">mantelzorgwoningen</Link>, <Link to="/diensten/prefab-chalets" className="hover:text-blue-400 transition-colors">chalets</Link>, <Link to="/diensten/poolhouse" className="hover:text-blue-400 transition-colors">poolhouses</Link> en <Link to="/diensten/prefab-aanbouw" className="hover:text-blue-400 transition-colors">modulaire woningen</Link> volledig op maat gerealiseerd.”
                </p>
              </div>
            </div>

            {/* Trust Row */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {trustElements.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tight text-blue-950/80">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/offerte" className="inline-flex items-center justify-center gap-4 bg-linear-to-r from-blue-700 to-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:shadow-[0_20px_40px_rgba(29,78,216,0.3)] hover:-translate-y-1 transition-all duration-500 group active:scale-95">
                Vraag Offerte Aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/diensten" className="inline-flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-blue-950 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-blue-600 hover:text-blue-600 transition-all duration-500 active:scale-95">
                Bekijk Onze Werkwijze
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden bg-blue-950">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: yHero }} className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="https://i.imgur.com/NuWPxEj.jpg"
            className="w-full h-full object-cover opacity-100 grayscale-0 contrast-[1.1] scale-105"
          >
            <source src="/intro-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-blue-950/20 via-blue-950/40 to-blue-950/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-start relative z-10 w-full text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 md:space-y-10"
        >
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-[1] md:leading-[0.9] mb-4 md:mb-6 tracking-tighter uppercase">
              Prefab bouw <br />
              oplossingen
            </h1>
            <p className="text-sm md:text-base text-blue-50/80 mb-6 max-w-lg leading-relaxed font-medium border-l-4 border-blue-600 pl-6">
              Vergroot uw woning met een moderne prefab uitbouw. Luxe uitstraling, hoogwaardige afwerking en snelle plaatsing.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Eigen productie',
                'Snelle plaatsing',
                'Hoogwaardige afwerking',
                'Volledig maatwerk'
              ].map((usp) => (
                <div key={usp} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Check className="text-blue-400" size={12} strokeWidth={4} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{usp}</span>
                </div>
              ))}
            </div>
          </div>
          
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 md:gap-4 mb-2">
            <Link to="/offerte" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 text-center text-[10px] active:scale-95 group flex items-center justify-center gap-3 border border-blue-400/20 shadow-xl">
              Vraag offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="https://prefabselectconfigurator.nl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 text-center text-[10px] active:scale-95 group flex items-center justify-center gap-3"
            >
              Ontwerp je aanbouw
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            <OfferteForm className="relative z-10 border-white/5 shadow-2xl scale-[1] origin-right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const benefits = [
    {
      title: "Kwaliteit & Vakmanschap",
      description: "Wij produceren prefab uitbouwen volledig in eigen beheer voor maximale controle over kwaliteit, planning en afwerking.",
      icon: <Factory className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Razendsnel geplaatst",
      description: "Binnen slechts enkele dagen geplaatst op locatie. Minder overlast, minder bouwafval en sneller genieten.",
      icon: <Timer className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Volledig maatwerk",
      description: "Van moderne prefab uitbouwen tot luxe aanbouwen met lichtstraat: alles wordt afgestemd op jouw stijl en wensen.",
      icon: <PenTool className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Waardevermeerdering",
      description: "Niet alleen extra leefruimte en meer comfort, maar ook direct een hogere marktwaarde van jouw woning.",
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Duurzaam & Energiezuinig",
      description: "Hoogwaardige isolatie, circulaire materialen en een aanzienlijk lagere CO₂-uitstoot dan bij traditionele bouw.",
      icon: <Leaf className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Transparante prijzen",
      description: "Weten waar je aan toe bent met heldere offertes. Geen verborgen kosten of onverwachte meerprijzen achteraf.",
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block leading-none">DE VOORDELEN</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter uppercase mb-6 leading-none">
              Waarom kiezen voor <br />
              <span className="text-blue-600 italic font-light lowercase underline decoration-blue-200 underline-offset-8">Prefab Select?</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-[0_40px_80px_rgba(29,78,216,0.1)] hover:-translate-y-2 relative overflow-hidden active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-8 p-4 bg-blue-50/50 rounded-2xl inline-block transition-colors group-hover:bg-blue-600/10">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4 group-hover:text-blue-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModularCircularSection() {
  return (
    <section className="py-24 bg-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block leading-none">DUURZAAMHEID</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter uppercase mb-2 leading-none">
                Modulair & Circulair <br />
                <span className="text-blue-600 italic font-light lowercase underline decoration-blue-200 underline-offset-8">Bouwen.</span>
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Wij geloven in de toekomst van modulair en circulair bouwen. Onze prefab systemen worden slim opgebouwd uit duurzame modules die efficiënt geproduceerd én flexibel toepasbaar zijn. Hierdoor beperken we materiaalverspilling en creëren we uitbreidingen die toekomstbestendig zijn.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Duurzaam', icon: <Leaf size={16} /> },
                { label: 'Snelle bouwtijd', icon: <Timer size={16} /> },
                { label: 'Minder afval', icon: <RefreshCw size={16} /> },
                { label: 'Energiezuinig', icon: <Zap size={16} /> }
              ].map((usp, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-blue-400 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {usp.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tight text-blue-950/80">{usp.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-10 pt-6">
               <div className="space-y-1">
                 <p className="text-4xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none">60%</p>
                 <p className="text-[9px] font-black uppercase tracking-widest text-blue-600/60 leading-none">Minder CO₂</p>
               </div>
               <div className="space-y-1">
                 <p className="text-4xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none">0%</p>
                 <p className="text-[9px] font-black uppercase tracking-widest text-blue-600/60 leading-none">Vertraging</p>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 border border-blue-600/10 rounded-[3.5rem] transition-all duration-1000 group-hover:scale-[1.02]" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://i.imgur.com/2uyJ2rP.jpeg" 
                alt="Modulair Bouwen Prefab Select" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-transparent" />
            </div>
            
            {/* Stats Overlay for Image */}
            <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl hidden md:block z-20">
              <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-2">100%</p>
              <p className="text-[11px] font-black uppercase tracking-widest text-blue-100">Duurzaam Maatwerk</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyPrefabSelectStats() {
  return (
    <section className="py-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -mr-48 -mt-48" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter leading-none mb-12 uppercase italic">
              Onze Regio's
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-4">
              {cityPages.map((city) => (
                <Link 
                  key={city.slug} 
                  to={`/regio/${city.slug}`}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all block hover:translate-x-1 duration-300"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function PhotoSlider({ images, currentIndex, onChange, titles }: { images: string[], currentIndex: number, onChange: (i: number) => void, titles: string[] }) {
  return (
    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/10">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent" />
      
      <div className="absolute top-10 left-10 z-10">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-4xl font-display font-black text-white/10 leading-none">0{currentIndex + 1}</span>
          <div className="h-px w-12 bg-blue-400/50" />
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-6 z-10">
        <motion.div
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[80%]"
        >
          <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">{titles[currentIndex]}</h4>
        </motion.div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onChange(i)}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i === currentIndex ? "w-12 bg-blue-400" : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="px-6 py-2.5 bg-blue-950/60 backdrop-blur-2xl rounded-2xl border border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              FASE {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Shared Components ---

function OfferteLandingPage() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const location = useLocation();
  const isConfigurator = location.pathname.includes('configurator');

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-64 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yHero }} className="absolute inset-0">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              poster="https://i.imgur.com/NuWPxEj.jpg"
              className="w-full h-full object-cover opacity-60 grayscale scale-105"
            >
              <source src="/intro-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start relative z-10 w-full text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none">
                {isConfigurator ? 'ONTWERP JE AANBOUW' : 'START UW PROJECT'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase whitespace-pre-line">
              {isConfigurator ? (
                <>Ontwerp uw <br /> eigen prefab <br /> <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">op maat.</span></>
              ) : (
                <>Vraag uw <br /> vrijblijvende <br /> <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">offerte aan.</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/60 mb-12 max-w-xl leading-relaxed font-medium border-l-4 border-blue-600 pl-8">
              {isConfigurator 
                ? "Stel in enkele stappen uw ideale uitbouw of module samen en ontvang direct een heldere kostenindicatie en technisch ontwerp."
                : "Ontvang binnen 24 uur een gedetailleerde prijsindicatie voor uw unieke prefab project. Transparant, deskundig en volledig op maat."
              }
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {[
                { label: isConfigurator ? 'Direct Resultaat' : 'Snel Antwoord', value: isConfigurator ? 'Live' : '24u' },
                { label: 'Volledig Gratis', value: '€0' },
                { label: 'Geen Verplichting', value: 'Vrij' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-display font-black text-white tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[9px] text-blue-400 uppercase tracking-widest font-black">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <OfferteForm className="relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/5" />
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Factory />, title: 'Eigen Fabriek', text: 'Kwaliteit in eigen hand' },
              { icon: <Timer />, title: 'Snel Proces', text: 'Geen onnodige wachttijden' },
              { icon: <ShieldCheck />, title: 'BBL Gecertificeerd', text: 'Voldoet aan alle eisen' },
              { icon: <PenTool />, title: 'Maatwerk', text: 'Unieke architectuur' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-lg shadow-blue-900/5">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-950 mb-1 leading-none">{item.title}</h4>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-none">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <KellyCTA />
      <FAQSection />
    </div>
  );
}

function ImageCycler({ images }: { images: { id: string; title: string; desc: string }[] }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={`https://i.imgur.com/${images[index].id}.jpeg`} 
            alt={images[index].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-blue-950/20 to-transparent" />
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">ONZE WERKWIJZE</span>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase mb-4 leading-none">
                {images[index].title}
              </h3>
              <p className="text-white/60 font-medium max-w-xl text-lg">
                {images[index].desc}
              </p>
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute top-12 right-12 flex gap-3">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-blue-500' : 'w-4 bg-white/20'}`} 
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, i }: { project: any; i: number }) {
  const [index, setIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && project.images && project.images.length > 1) {
      timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
    } else {
      setIndex(0);
    }
    return () => clearInterval(timer);
  }, [isHovered, project.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img 
            key={index}
            src={project.images[index]} 
            alt={project.title} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-blue-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2 block">
            {project.category} — {project.label}
          </span>
          <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tighter uppercase leading-none group-hover:text-blue-200 transition-colors duration-500">
            {project.title}
          </h3>
          
          {/* Progress Indicators (on hover) */}
          <div className={`mt-4 flex gap-1 transform transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {project.images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`h-0.5 rounded-full transition-all duration-300 ${idx === index ? 'w-6 bg-blue-500' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>

          {/* Hover Detail */}
          <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-[10px] font-bold text-white/60 flex items-center gap-2">
              BEKIJK DETAILS <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsGallery() {
  const projects = [
    {
      title: 'Moderne Prefab Uitbouw',
      label: 'Amsterdam',
      images: [
        'https://i.imgur.com/6VuTqto.jpeg',
        'https://i.imgur.com/fmQecXk.jpeg',
        'https://i.imgur.com/covRQg3.jpeg'
      ],
      category: 'Uitbouw'
    },
    {
      title: 'Nieuwbouwproject Zeeland',
      label: 'Zeeland',
      images: [
        'https://i.imgur.com/p3qz8V3.jpeg',
        'https://i.imgur.com/qEZsZu3.jpeg',
        'https://i.imgur.com/p3qz8V3.jpeg'
      ],
      category: 'Woning'
    },
    {
      title: 'Tijdelijke Huisvesting Gemeente Zeeland',
      label: 'Zeeland',
      images: [
        'https://i.imgur.com/Xw3KJAw.jpeg',
        'https://i.imgur.com/OXQVqhE.jpeg',
        'https://i.imgur.com/J9LXOFY.jpeg',
        'https://i.imgur.com/EpCTEPX.jpeg',
        'https://i.imgur.com/pdPfZKs.jpeg'
      ],
      category: 'Huisvesting'
    },
    {
      title: 'Modern Tuinkantoor',
      label: 'Haarlem',
      images: [
        'https://i.imgur.com/QPFS37f.jpeg',
        'https://i.imgur.com/FuFuikO.jpeg',
        'https://i.imgur.com/666SW9V.jpeg',
        'https://i.imgur.com/6VuTqto.jpeg',
        'https://i.imgur.com/covRQg3.jpeg'
      ],
      category: 'Kantoor'
    },
    {
      title: 'Uitbouw en Dakkapel',
      label: 'Zeeland',
      images: [
        'https://i.imgur.com/Sz7tRBj.jpeg',
        'https://i.imgur.com/3rgQRvA.jpeg',
        'https://i.imgur.com/Bz6iO5Q.jpeg'
      ],
      category: 'Uitbouw'
    },
    {
      title: 'Duurzame Vakantiewoning',
      label: 'Veluwe',
      images: [
        'https://i.imgur.com/SpbBOkT.jpeg',
        'https://i.imgur.com/bpRIfmN.jpeg',
        'https://i.imgur.com/oL4afNw.jpeg'
      ],
      category: 'Vakantie'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="projecten">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">GEREALISEERDE PROJECTEN</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter leading-[0.9] uppercase mb-8">
              Hoogwaardige Prefab <br />
              <span className="text-blue-600 italic font-light lowercase">Projecten In Nederland</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Ontdek moderne prefab uitbouwen, modulaire woningen en luxe prefab oplossingen gerealiseerd met focus op kwaliteit, vakmanschap en hoogwaardige afwerking.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} />
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { text: 'Eigen productie', icon: <Factory size={20} /> },
              { text: 'Hoogwaardige afwerking', icon: <Star size={20} /> },
              { text: 'Snelle plaatsing', icon: <Timer size={20} /> },
              { text: 'Vakmanschap in prefab', icon: <Gem size={20} /> }
            ].map((trust, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-4 text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-lg shadow-blue-900/5">
                  {trust.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-950/60 group-hover:text-blue-600 transition-colors">
                  {trust.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <PremiumIntro />
      <PrefabSteps />
      <ProjectsGallery />
      <KellyCTA />
      <WhyChooseUsSection />
      <ModularCircularSection />
      <WhyPrefabSelectStats />
    </>
  );
}

function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Huge Premium Hero Section */}
      <section className="relative min-h-screen flex items-center pt-64 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/PZcZ8X8.jpeg" 
            alt="Waarom Prefab Select Hero" 
            className="w-full h-full object-cover opacity-60 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-950/90 via-blue-950/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none">THE ARCHITECTURAL CHOICE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-10">
              Kwaliteit die <br />
              <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">staat als een huis.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/60 font-medium mb-12 max-w-xl leading-relaxed border-l-4 border-blue-600 pl-8 italic">
              Hoogwaardige prefab oplossingen, volledig in eigen beheer geproduceerd en binnen slechts enkele dagen geplaatst.
            </p>
            
            <div className="flex flex-wrap gap-8 items-center pt-4">
              <Link to="/offerte" className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all active:scale-95 group flex items-center gap-4 border border-blue-400/20">
                Start jouw project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#benefits" className="text-white/40 hover:text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                  <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </div>
                Ontdek de voordelen
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Stat Overlay */}
        <div className="absolute bottom-12 right-12 hidden xl:block z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl"
          >
            <p className="text-4xl font-display font-black text-blue-400 mb-1 tracking-tighter uppercase leading-none">100%</p>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 leading-none">Eigen Beheer</p>
          </motion.div>
        </div>
      </section>

      <div id="benefits">
        <WhyChooseUsSection />
      </div>
      
      <ModularCircularSection />
      
      <WhyPrefabSelectStats />
      
      {/* Premium Trust Experience */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://i.imgur.com/AC0hk9k.jpg" 
                alt="Architectural Quality" 
                className="w-full h-full object-cover grayscale contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-blue-950/20" />
            </div>
            {/* Minimal Quote Badge */}
            <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-12 rounded-[3.5rem] shadow-2xl max-w-sm hidden md:block">
              <Quote className="text-blue-400 absolute top-8 left-8 opacity-20" size={60} />
              <p className="text-sm font-bold italic leading-relaxed mb-6 relative z-10">
                "De snelheid en precisie waarmee Prefab Select werkt is ongekend. Binnen 2 dagen stond onze nieuwe uitbouw, zonder wekenlang gedoe."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-[10px]">DV</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Familie de Vries</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-blue-200 mt-1">Uitbouw Zeeland</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 order-1 lg:order-2"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block leading-none">CERTIFICERING & GARANTIE</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-[0.9]">
                Garantie op <br />
                <span className="text-blue-600 italic font-light lowercase underline decoration-blue-200 underline-offset-8">perfectie.</span>
              </h2>
            </div>
            
            <p className="text-lg text-slate-500 leading-relaxed font-black uppercase tracking-widest border-l-4 border-blue-600 pl-8">
              Onze prefab oplossingen voldoen aan de nieuwste bouw- en isolatie-eisen volgens het Bbl. Wij staan achter ons vakmanschap met uitgebreide garanties.
            </p>
            
            <div className="grid gap-6">
              {[
                "10 Jaar constructie-garantie",
                "Voldoet aan alle Bbl-eisen",
                "Montage door eigen vakmensen",
                "Uitsluitend A-merk materialen"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-950">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

function BlogPage() {
  const { slug } = useParams();
  const blog = useMemo(() => blogs.find(b => b.slug === slug), [slug]);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!blog) return <div className="py-24 text-center text-blue-950 font-bold font-display uppercase tracking-widest text-[10px]">Artikel niet gevonden.</div>;

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Reading Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Header - Minimal & Architectural */}
      <section className="relative pt-64 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/30 blur-[120px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-400/10 blur-[120px] rounded-full -ml-32 -mb-32" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="flex items-center justify-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                {blog.category}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                <Clock size={12} strokeWidth={3} /> {blog.readTime}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase whitespace-pre-line">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center gap-8 pt-10 border-t border-white/10 max-w-sm mx-auto">
              <div className="text-left space-y-1">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/60 leading-none">GEPUBLICEERD OP</p>
                <p className="text-[11px] font-black text-white uppercase tracking-wider">{blog.date}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-left space-y-1">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/60 leading-none">AUTEUR</p>
                <p className="text-[11px] font-black text-white uppercase tracking-wider">PREFAB SELECT</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_350px] gap-24 items-start">
            
            {/* Main Content Area */}
            <article className="relative">
              {/* Decorative intro letter or element could go here if needed, but let's keep it clean */}
              <div className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-blue-950 
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
                prose-strong:text-blue-950 prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-slate-50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-blue-900
                prose-a:text-blue-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:border prose-img:border-slate-100
                markdown-body">
                <Markdown>{blog.content}</Markdown>
              </div>

              {/* Sophisticated Footer CTA for Blogs */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 p-12 md:p-20 bg-blue-950 rounded-[3rem] border border-white/5 relative overflow-hidden text-white shadow-2xl group"
              >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-blue-600/20" />
                
                <div className="relative z-10 max-w-xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-8 block leading-none">VOLGENDE STAP</span>
                  <h4 className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase mb-8 leading-[0.9]">
                    Klaar om uw <br/>
                    <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">visie te realiseren?</span>
                  </h4>
                  <p className="text-lg text-blue-100/40 mb-12 font-medium leading-relaxed">
                    Onze architecten en bouwexperts staan klaar om samen met u de perfecte prefab oplossing te ontwerpen.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link to="/offerte" className="inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-500 transition-all duration-300 shadow-xl group/btn border border-blue-400/20 active:scale-95">
                      Vraag Vrijblijvende Offerte <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar - Precision Desktop Layout */}
            <aside className="hidden lg:block sticky top-32 space-y-16">
              {/* Navigation */}
              <div className="space-y-8">
                <Link to="/#blogs" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 hover:text-blue-600 transition-all">
                  <div className="w-10 h-10 rounded-xl border border-blue-50 flex items-center justify-center group-hover:bg-blue-50 transition-all shadow-sm">
                    <ArrowRight size={14} strokeWidth={3} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </div>
                  Terug naar Overzicht
                </Link>
              </div>

              {/* Newsletter / Professional Engagement */}
              <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 leading-none">BLIJF GEÏNSPIREERD</h5>
                  <p className="text-xs font-bold text-blue-950 leading-relaxed uppercase tracking-widest opacity-60">Ontvang maandelijks de laatste prefab trends en gerealiseerde projecten in uw inbox.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="UW E-MAILADRES" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-300 shadow-sm"
                  />
                  <button className="w-full bg-blue-950 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-blue-900 transition-all active:scale-95">
                    Inschrijven
                  </button>
                </form>
              </div>

              {/* Quick Contact Widget */}
              <div className="p-10 bg-white rounded-[2.5rem] border border-blue-100 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl -mr-12 -mt-12" />
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 leading-none relative z-10">DIRECT CONTACT</h5>
                <div className="space-y-6 relative z-10">
                  <a href="tel:0850607775" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Phone size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1.5">KLANTENSERVICE</p>
                      <p className="text-sm font-black text-blue-950 uppercase tracking-widest group-hover:text-blue-600 transition-colors">085 060 7775</p>
                    </div>
                  </a>
                  <a href="mailto:info@prefabselect.nl" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Mail size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1.5">E-MAIL OPSLAG</p>
                      <p className="text-sm font-black text-blue-950 uppercase tracking-widest group-hover:text-blue-600 transition-colors">info@prefabselect.nl</p>
                    </div>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Recentalized "Meer Artikelen" Grid - Updated */}
      <section className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-24">
            <div className="text-left space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none block">GERELATEERD</span>
              <h3 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none">
                Blijf <br/>
                <span className="text-blue-600 italic font-light lowercase underline decoration-blue-200 underline-offset-8">ontdekken.</span>
              </h3>
            </div>
            <Link to="/#blogs" className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-950 hover:text-blue-600 transition-all group px-8 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95">
              Alle artikelen <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.filter(b => b.slug !== slug).slice(0, 3).map((item) => (
              <Link to={`/blog/${item.slug}`} key={item.id} className="group h-full">
                <motion.div 
                   whileHover={{ y: -8 }}
                   className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-blue-950/5 h-full flex flex-col hover:border-blue-200 transition-all duration-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {item.readTime}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-display font-black text-blue-950 uppercase tracking-tighter leading-[1] mb-8 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-base font-medium text-slate-400 leading-relaxed mb-12 line-clamp-3 italic opacity-60">
                    "{item.excerpt}"
                  </p>
                  
                  <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-950 uppercase tracking-[0.3em] group-hover:translate-x-1 transition-all inline-flex items-center gap-3">
                      Lees Artikel <ArrowRight size={14} className="text-blue-600" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Contact Hero with the Homepage Form style */}
      <section className="relative min-h-[85vh] flex items-center pt-48 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0 text-left">
          <motion.div style={{ y: yHero }} className="absolute inset-0">
            <img 
              src="https://i.imgur.com/vOltRN1.jpg" 
              alt="Contact Prefab Select" 
              className="w-full h-full object-cover opacity-20 grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10 w-full text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none">
                CONTACT & SHOWROOM
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase whitespace-pre-line">
              Laten we uw <br />
              eigen droom <br />
              <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">realiseren.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/60 mb-12 max-w-xl leading-relaxed font-medium border-l-4 border-blue-600 pl-8">
              Heeft u vragen over onze prefab oplossingen of wilt u een showroom afspraak inplannen? Laat uw gegevens achter in het offerte formulier en wij nemen binnen 24 uur contact met u op.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {[
                { label: 'Showroom Afspraak', value: 'Plan' },
                { label: 'Advies op maat', value: 'Gratis' },
                { label: 'Snelle respons', value: '24u' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-display font-black text-white tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[9px] text-blue-400 uppercase tracking-widest font-black">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <OfferteForm title="Vraag een offerte aan of plan uw showroombezoek" className="relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/5" />
          </motion.div>
        </div>
      </section>

      {/* Kelly bar immediately after form/hero as requested */}
      <KellyCTA />

      {/* Optional extra section to keep page balanced */}
      <FAQSection />
    </div>
  );
}

function ProjectsPage() {
  return (
    <>
      <Hero />
      <PremiumIntro />
      <PrefabSteps />
      <ProjectsGallery />
      <KellyCTA />
      <WhyChooseUsSection />
      <ModularCircularSection />
      <WhyPrefabSelectStats />
      
      <FAQSection />
      <SEOText />
      
      {/* Blogs moved to bottom as requested */}
      <BlogSection />
      
      <FinalCTA />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <WhatsAppButton />
      <StickyMobileCTA />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offerte" element={<OfferteLandingPage />} />
          <Route path="/configurator" element={<OfferteLandingPage />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/diensten/prefab-uitbouw" element={<PrefabUitbouw />} />
          <Route path="/diensten/prefab-aanbouw" element={<PrefabAanbouw />} />
          <Route path="/diensten/mantelzorgwoning" element={<Mantelzorgwoning />} />
          <Route path="/diensten/poolhouse" element={<Poolhouse />} />
          <Route path="/diensten/prefab-chalets" element={<PrefabChalet />} />
          <Route path="/diensten/vakantiewoningen" element={<Vakantiewoningen />} />
          <Route path="/zakelijk" element={<Zakelijk />} />
          <Route path="/onze-modules" element={<Diensten />} />
          <Route path="/werkwijze" element={<Werkwijze />} />
          <Route path="/over-ons" element={<AboutPage />} />
          <Route path="/wie-wij-zijn" element={<AboutPage />} />
          <Route path="/waarom-prefab-select" element={<WhyChooseUsPage />} />
          <Route path="/projecten" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai-expert" element={<AIExpert />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/veelgestelde-vragen" element={<FAQPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/regio/zeeland" element={<ZeelandLandingPage />} />
          <Route path="/regio/zeeland/nieuwbouwproject" element={<ZeelandSchuurtjesProject />} />
          <Route path="/regio/:slug" element={<CityLandingPage />} />
          <Route path="/crm" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
