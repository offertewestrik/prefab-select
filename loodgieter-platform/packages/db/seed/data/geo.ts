// Provincies + gemeenten (startset met echte coördinaten/inwoneraantallen).
//
// Dit is de realistische startset (grootste gemeenten). De VOLLEDIGE set van
// ~342 gemeenten wordt geïmporteerd via `seed/import-gemeenten.ts` uit de open
// PDOK/CBS-dataset. Beide gebruiken `upsert` op slug, dus combineren is veilig.

export const provinces = [
  { name: "Groningen", slug: "groningen" },
  { name: "Friesland", slug: "friesland" },
  { name: "Drenthe", slug: "drenthe" },
  { name: "Overijssel", slug: "overijssel" },
  { name: "Flevoland", slug: "flevoland" },
  { name: "Gelderland", slug: "gelderland" },
  { name: "Utrecht", slug: "utrecht" },
  { name: "Noord-Holland", slug: "noord-holland" },
  { name: "Zuid-Holland", slug: "zuid-holland" },
  { name: "Zeeland", slug: "zeeland" },
  { name: "Noord-Brabant", slug: "noord-brabant" },
  { name: "Limburg", slug: "limburg" },
];

type Muni = {
  name: string;
  slug: string;
  province: string; // province slug
  population: number;
  lat: number;
  lng: number;
};

export const municipalities: Muni[] = [
  { name: "Amsterdam", slug: "amsterdam", province: "noord-holland", population: 905000, lat: 52.3676, lng: 4.9041 },
  { name: "Rotterdam", slug: "rotterdam", province: "zuid-holland", population: 651000, lat: 51.9244, lng: 4.4777 },
  { name: "Den Haag", slug: "den-haag", province: "zuid-holland", population: 548000, lat: 52.0705, lng: 4.3007 },
  { name: "Utrecht", slug: "utrecht", province: "utrecht", population: 361000, lat: 52.0907, lng: 5.1214 },
  { name: "Eindhoven", slug: "eindhoven", province: "noord-brabant", population: 238000, lat: 51.4416, lng: 5.4697 },
  { name: "Groningen", slug: "groningen", province: "groningen", population: 233000, lat: 53.2194, lng: 6.5665 },
  { name: "Tilburg", slug: "tilburg", province: "noord-brabant", population: 224000, lat: 51.5555, lng: 5.0913 },
  { name: "Almere", slug: "almere", province: "flevoland", population: 218000, lat: 52.3508, lng: 5.2647 },
  { name: "Breda", slug: "breda", province: "noord-brabant", population: 184000, lat: 51.5719, lng: 4.7683 },
  { name: "Nijmegen", slug: "nijmegen", province: "gelderland", population: 179000, lat: 51.8126, lng: 5.8372 },
  { name: "Enschede", slug: "enschede", province: "overijssel", population: 161000, lat: 52.2215, lng: 6.8937 },
  { name: "Apeldoorn", slug: "apeldoorn", province: "gelderland", population: 165000, lat: 52.2112, lng: 5.9699 },
  { name: "Arnhem", slug: "arnhem", province: "gelderland", population: 164000, lat: 51.9851, lng: 5.8987 },
  { name: "Haarlem", slug: "haarlem", province: "noord-holland", population: 162000, lat: 52.3874, lng: 4.6462 },
  { name: "Amersfoort", slug: "amersfoort", province: "utrecht", population: 159000, lat: 52.1561, lng: 5.3878 },
  { name: "Zaanstad", slug: "zaanstad", province: "noord-holland", population: 156000, lat: 52.4389, lng: 4.8295 },
  { name: "Haarlemmermeer", slug: "haarlemmermeer", province: "noord-holland", population: 160000, lat: 52.3008, lng: 4.6897 },
  { name: "'s-Hertogenbosch", slug: "s-hertogenbosch", province: "noord-brabant", population: 155000, lat: 51.6978, lng: 5.3037 },
  { name: "Zoetermeer", slug: "zoetermeer", province: "zuid-holland", population: 125000, lat: 52.0575, lng: 4.4931 },
  { name: "Zwolle", slug: "zwolle", province: "overijssel", population: 130000, lat: 52.5168, lng: 6.083 },
  { name: "Leiden", slug: "leiden", province: "zuid-holland", population: 125000, lat: 52.1601, lng: 4.497 },
  { name: "Leeuwarden", slug: "leeuwarden", province: "friesland", population: 124000, lat: 53.2012, lng: 5.7999 },
  { name: "Maastricht", slug: "maastricht", province: "limburg", population: 121000, lat: 50.8514, lng: 5.691 },
  { name: "Dordrecht", slug: "dordrecht", province: "zuid-holland", population: 119000, lat: 51.8133, lng: 4.6901 },
  { name: "Ede", slug: "ede", province: "gelderland", population: 117000, lat: 52.0402, lng: 5.6649 },
  { name: "Alphen aan den Rijn", slug: "alphen-aan-den-rijn", province: "zuid-holland", population: 112000, lat: 52.129, lng: 4.6557 },
  { name: "Emmen", slug: "emmen", province: "drenthe", population: 107000, lat: 52.7792, lng: 6.9069 },
  { name: "Delft", slug: "delft", province: "zuid-holland", population: 104000, lat: 52.0116, lng: 4.3571 },
  { name: "Venlo", slug: "venlo", province: "limburg", population: 102000, lat: 51.3704, lng: 6.1724 },
  { name: "Deventer", slug: "deventer", province: "overijssel", population: 101000, lat: 52.2552, lng: 6.1639 },
  { name: "Sittard-Geleen", slug: "sittard-geleen", province: "limburg", population: 91000, lat: 50.9986, lng: 5.8589 },
  { name: "Helmond", slug: "helmond", province: "noord-brabant", population: 92000, lat: 51.4793, lng: 5.657 },
  { name: "Oss", slug: "oss", province: "noord-brabant", population: 92000, lat: 51.765, lng: 5.5236 },
  { name: "Amstelveen", slug: "amstelveen", province: "noord-holland", population: 90000, lat: 52.3114, lng: 4.8701 },
  { name: "Purmerend", slug: "purmerend", province: "noord-holland", population: 92000, lat: 52.505, lng: 4.9591 },
  { name: "Hilversum", slug: "hilversum", province: "noord-holland", population: 90000, lat: 52.2292, lng: 5.1669 },
  { name: "Nissewaard", slug: "nissewaard", province: "zuid-holland", population: 86000, lat: 51.845, lng: 4.329 },
  { name: "Hengelo", slug: "hengelo", province: "overijssel", population: 81000, lat: 52.2659, lng: 6.793 },
  { name: "Schiedam", slug: "schiedam", province: "zuid-holland", population: 79000, lat: 51.9197, lng: 4.3889 },
  { name: "Roosendaal", slug: "roosendaal", province: "noord-brabant", population: 77000, lat: 51.5306, lng: 4.4654 },
  { name: "Gouda", slug: "gouda", province: "zuid-holland", population: 74000, lat: 52.0116, lng: 4.7104 },
  { name: "Vlaardingen", slug: "vlaardingen", province: "zuid-holland", population: 74000, lat: 51.912, lng: 4.3419 },
  { name: "Almelo", slug: "almelo", province: "overijssel", population: 73000, lat: 52.3568, lng: 6.6625 },
  { name: "Lelystad", slug: "lelystad", province: "flevoland", population: 81000, lat: 52.5185, lng: 5.4714 },
  { name: "Hoorn", slug: "hoorn", province: "noord-holland", population: 75000, lat: 52.6425, lng: 5.0597 },
];
