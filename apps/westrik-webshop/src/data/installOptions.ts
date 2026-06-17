import type { InstallOption } from './types';

/** Installatie-opties zoals gevraagd: levering, installatie, afvoer oude ketel, onderhoud. */
export const cvInstallOptions: InstallOption[] = [
  {
    id: 'levering',
    label: 'Alleen levering',
    description: 'Wij leveren de ketel gratis bij je thuis. Installatie regel je zelf.',
    price: 0,
  },
  {
    id: 'installatie',
    label: 'Levering + installatie',
    description: 'Vakkundige montage en inbedrijfstelling door een gecertificeerde monteur.',
    price: 595,
  },
  {
    id: 'afvoer',
    label: 'Installatie incl. afvoer oude ketel',
    description: 'Volledige montage én milieuvriendelijke afvoer van je oude ketel.',
    price: 745,
  },
  {
    id: 'onderhoud',
    label: 'Onderhoudscontract toevoegen',
    description: 'Jaarlijkse onderhoudsbeurt en 24/7 storingsdienst. €11,95 p/m.',
    price: 143,
  },
];

export const boilerInstallOptions: InstallOption[] = [
  {
    id: 'levering',
    label: 'Alleen levering',
    description: 'Gratis thuisbezorgd. Aansluiten doe je zelf.',
    price: 0,
  },
  {
    id: 'installatie',
    label: 'Levering + installatie',
    description: 'Aansluiting op water en elektra door een vakman.',
    price: 245,
  },
  {
    id: 'afvoer',
    label: 'Installatie incl. afvoer oude boiler',
    description: 'Montage én afvoer van je oude boiler.',
    price: 345,
  },
];
