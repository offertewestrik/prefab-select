import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'cv-ketels',
    title: 'CV-Ketels',
    short: 'HR-combiketels van A-merken',
    description:
      'Hoogrendement combiketels van Intergas, Remeha, Vaillant, Nefit Bosch en ATAG. Allemaal Hybrid Ready en inclusief installatie door gecertificeerde monteurs.',
    icon: 'Flame',
    image: 'linear-gradient(135deg,#102350,#2a57b5)',
    brands: ['Intergas', 'Remeha', 'Vaillant', 'Nefit Bosch', 'ATAG'],
    highlights: ['CW3 t/m CW6', 'A-label', 'Hybrid Ready', 'Tot 10 jaar garantie'],
  },
  {
    slug: 'boilers',
    title: 'Boilers',
    short: 'Elektrisch, close-in & warmwater',
    description:
      'Elektrische boilers, warmwaterboilers, close-in boilers en keukenboilers. Direct warm water waar je het nodig hebt, energiezuinig en stil.',
    icon: 'Droplets',
    image: 'linear-gradient(135deg,#173474,#2e9bff)',
    brands: ['Daalderop', 'Inventum', 'ATAG'],
    highlights: ['10 – 200 liter', 'Elektrisch & gas', 'Wand & vloer', 'Energielabel A'],
  },
  {
    slug: 'hybride-warmtepompen',
    title: 'Hybride Warmtepompen',
    short: 'Combineer ketel met warmtepomp',
    description:
      'Bespaar tot 60% op je gasverbruik door je CV-ketel te combineren met een hybride warmtepomp. Subsidie via ISDE mogelijk.',
    icon: 'Wind',
    image: 'linear-gradient(135deg,#0a1838,#4a78cf)',
    brands: ['Remeha', 'Vaillant', 'Nefit Bosch'],
    highlights: ['Tot 60% besparing', 'ISDE-subsidie', 'Stil & zuinig', 'Hybride'],
  },
  {
    slug: 'thermostaten',
    title: 'Thermostaten',
    short: 'Slim & modulerend regelen',
    description:
      'Slimme, modulerende thermostaten voor maximaal comfort en de laagste stookkosten. Bedien je verwarming vanaf je telefoon.',
    icon: 'Thermometer',
    image: 'linear-gradient(135deg,#102350,#7ba0df)',
    brands: ['Honeywell', 'Remeha', 'Nefit Bosch'],
    highlights: ['Slim & app-bediend', 'Modulerend', 'Energiebesparend'],
  },
  {
    slug: 'expansievaten',
    title: 'Expansievaten',
    short: 'Houd je systeem op druk',
    description:
      'Expansievaten voor cv- en tapwatersystemen. Beschermt je installatie tegen drukverschillen en verlengt de levensduur.',
    icon: 'CircleGauge',
    image: 'linear-gradient(135deg,#173474,#2a57b5)',
    brands: ['Flamco'],
    highlights: ['8 – 35 liter', 'CV & tapwater', 'Lange levensduur'],
  },
  {
    slug: 'rookgasafvoer',
    title: 'Rookgasafvoer',
    short: 'Concentrisch & parallel',
    description:
      'Complete rookgasafvoersets, dakdoorvoeren en concentrische buizen voor een veilige en goedgekeurde installatie.',
    icon: 'Pipette',
    image: 'linear-gradient(135deg,#0a1838,#2a57b5)',
    highlights: ['Concentrisch', 'Dakdoorvoer', 'CE-gekeurd'],
  },
  {
    slug: 'installatiemateriaal',
    title: 'Installatiemateriaal',
    short: 'Alles voor de montage',
    description:
      'Ophangbeugels, koppelingen, gaskranen, vulslangen en al het materiaal dat je nodig hebt voor een complete installatie.',
    icon: 'Wrench',
    image: 'linear-gradient(135deg,#102350,#4a78cf)',
    highlights: ['Compleet', 'A-kwaliteit', 'Snelle levering'],
  },
  {
    slug: 'onderhoudscontracten',
    title: 'Onderhoudscontracten',
    short: 'Zorgeloos & 24/7 service',
    description:
      'Houd je ketel jarenlang storingsvrij met een onderhoudscontract. Inclusief jaarlijkse beurt, voorrang bij storingen en 24/7 storingsdienst.',
    icon: 'ShieldCheck',
    image: 'linear-gradient(135deg,#173474,#2e9bff)',
    highlights: ['Jaarlijkse beurt', '24/7 storingsdienst', 'Voorrangsservice'],
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
