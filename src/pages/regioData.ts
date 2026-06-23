import type { RegioData } from './RegioLandingTemplate';

// ---------------------------------------------------------------------------
// Long-form, locally unique SEO content per regio (1500-2000+ woorden).
// Each entry feeds the Rotterdam-style RegioLandingTemplate.
// ---------------------------------------------------------------------------

export const regioData: Record<string, RegioData> = {
  steenbergen: {
    slug: 'steenbergen',
    name: 'Steenbergen',
    region: 'West-Brabant',
    heroImage: 'https://i.imgur.com/6VuTqto.jpeg',
    processImage: 'https://i.imgur.com/v4jk0SK.jpeg',
    metaTitle: 'Prefab Uitbouw Steenbergen | Uw Lokale Specialist — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Steenbergen? Prefab Select uit het naburige Halsteren bouwt snel en vakkundig. Lees alles over kosten, vergunning, fundering op polderklei en de aanpak per kern.',
    heroBadge: 'PREFAB SELECT STEENBERGEN',
    heroTitleLines: ['Uitbouw in Steenbergen', 'meer ruimte in de polder', 'zonder lange verbouwing'],
    heroIntro: 'Steenbergen is een fijne gemeente om te wonen, met rust, ruimte en het weidse polderlandschap binnen handbereik. Wilt u uw woning vergroten? Prefab Select, gevestigd in het naburige Halsteren, bouwt een stabiel gefundeerde, hoogwaardig geïsoleerde uitbouw — snel, schoon en met minimale overlast in uw straat.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Lokaal uit Halsteren', sub: 'Korte lijnen, snelle service' },
      { title: 'Solide fundering', sub: 'Berekend op de polderklei' },
    ],
    introEyebrow: 'UITBREIDEN IN PLAATS VAN VERHUIZEN',
    introHeading: ['Investeren op de plek', 'die u al koestert'],
    introParagraphs: [
      'Steenbergen combineert dorpse gemoedelijkheid met de ruimte van West-Brabant. Wie hier eenmaal gesetteld is — of dat nu in het centrum, in Welberg of in een van de polderkernen is — verlaat zijn vertrouwde omgeving niet graag. En dat hoeft ook niet. In plaats van de stress en de kosten van een verhuizing, kunt u uw huidige woning eenvoudig vergroten met een prefab uitbouw.',
      'Met een hoogwaardige uitbouw van Prefab Select vergroot u de begane grond aanzienlijk. Denk aan een royale leefkeuken, een lichte woonkamer met zicht op de tuin of een praktisch thuiskantoor. Dat brengt direct meer daglicht en woncomfort binnen, en verhoogt bovendien de waarde van uw woning op de Steenbergse huizenmarkt.',
      'Omdat onze vestiging letterlijk om de hoek ligt, bent u verzekerd van korte lijnen en persoonlijke begeleiding. Wij kennen de gemeente Steenbergen, de lokale bouwstijlen en de gemeentelijke procedures als geen ander.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'In droge, gecontroleerde fabrieksomstandigheden gefabriceerd',
      'Foutloze millimeterkwaliteit rechtstreeks uit onze werkplaats',
      'Minimale overlast en geen maandenlange bouwplaats in uw straat',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWSTOF IN UW TUIN',
    processHeading: ['Snel, droog fabricageproces', 'en een geruisloze opbouw'],
    processParagraphs: [
      'Klassieke aanbouw op locatie brengt weersrisico’s, lange droogtijden en geluidsoverlast met zich mee. Prefab Select keert dat proces om: wij bereiden alle wanden, kozijnen, daken en vloerelementen zorgvuldig voor in onze eigen fabriek, vrij van weersinvloeden.',
      'Terwijl die elementen onder droge omstandigheden ontstaan, leggen we bij u thuis een solide fundering aan, afgestemd op de Steenbergse polderbodem. Op de montagedag hijsen we de constructie op haar plek; dezelfde avond is uw woning weer volledig wind- en waterdicht gesloten. Daarna volgen alleen nog de fijne binnen- en buitenafwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & FUNDERING IN STEENBERGEN',
    welstandHeading: ['Vergunningsvrij waar het kan', 'zorgvuldig waar het moet'],
    welstandParagraphs: [
      'De landelijke regels bieden ruime mogelijkheden: een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep, mits een groot deel van het achtererf onbebouwd blijft. Wij doen kosteloos de vergunningcheck voor uw specifieke adres bij de gemeente Steenbergen.',
      'Let op: voor monumenten en binnen het beschermde dorpsgezicht van de oude vesting gelden strengere regels. Dan is een omgevingsvergunning en soms welstandsadvies nodig. Onze ontwerpers verzorgen het complete traject, inclusief tekeningen en aanvraag.',
      'Steenbergen ligt grotendeels in ingepolderd land met een kleibodem die plaatselijk slap kan zijn. Een doordachte fundering — afhankelijk van de locatie op staal of op palen — is daarom belangrijk voor een levenslang stabiele uitbouw. Wij berekenen dit altijd vooraf.',
    ],
    costHeading: 'Wat kost een uitbouw in Steenbergen?',
    costIntro: 'De gekozen kozijnen, glazen pui-opties en de funderingswijze bepalen de exacte calculatie. Onderstaande richtprijzen geven u een goed startpunt:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op laaggelegen polderlocaties in en rond Steenbergen kan de kleibodem een diepere paalfundering vereisen; wij berekenen dit vooraf zodat scheurvorming ten opzichte van de hoofdwoning wordt uitgesloten.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bekijken uw woning in Steenbergen, bespreken uw wensen en ontwerpen een uitbouw die esthetisch en constructief klopt.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Wij controleren gratis of uw plan vergunningsvrij is en verzorgen indien nodig de complete aanvraag bij de gemeente.' },
      { nr: '3', title: 'Fabricage', desc: 'In onze droge fabriek bouwen we wanden, kozijnen en daken millimeterprecies, vrij van weersinvloeden.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'We leggen een stabiele fundering op de polderbodem en hijsen de uitbouw in één dag wind- en waterdicht op haar plek.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en eventuele vloerverwarming worden geïnstalleerd. Uw nieuwe leefruimte is direct gebruiksklaar.' },
    ],
    districtsHeading: 'Bouwen per kern in de gemeente Steenbergen',
    districtsIntro: 'Elke kern heeft zijn eigen karakter, bebouwing en kavelmaten. Wij stemmen ons ontwerp daar zorgvuldig op af:',
    wijken: [
      { name: 'Steenbergen & Welberg', desc: 'Van de historische vesting tot ruime naoorlogse wijken. Hier benutten we vaak de vergunningsvrije ruimte aan de achterzijde optimaal.' },
      { name: 'Kruisland & De Heen', desc: 'Dorpse kernen met ruime tuinen en goede achterom-mogelijkheden, ideaal voor royale uitbouwen met veel glas.' },
      { name: 'Dinteloord & Nieuw-Vossemeer', desc: 'Polderdorpen met overwegend kleibodem. Hier besteden we extra aandacht aan een stabiele, berekende fundering.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Is een uitbouw de beste oplossing?', paragraphs: ['Zoekt u extra meters op de begane grond — een ruime leefkeuken, een kantoor of een lichte eetkamer — dan is een uitbouw veruit de meest gewenste optie.', 'Heeft u juist boven ruimte nodig? Dan adviseren wij u graag over een dakkapel of dakopbouw die past binnen de gemeentelijke regels.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Grondige voorbereiding geeft rust', paragraphs: ['Wij schatten kritieke randvoorwaarden zoals kraantoegankelijkheid, exacte erfgrenzen en funderingseisen op de polderklei vooraf nauwkeurig in.', 'Onze engineers lopen al deze facetten met u door vóór de fabricage, zodat meerwerk of vertraging in een later stadium wordt uitgesloten.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Daglicht en ruimtebeleving', paragraphs: ['Een uitbouw voegt niet alleen meters toe, maar verandert hoe u woont. Met een glazen achtergevel, vouwdeuren of een lichtstraat haalt u het polderlicht diep naar binnen.', 'Zo verbindt u binnen en buiten en wordt uw woonkamer een lichte, ruimtelijke plek om het hele jaar van te genieten.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Tochtvrij en energiezuinig', paragraphs: ['Onze prefab wanden, vloeren en daken halen isolatiewaarden tot Rc 6.0. Tocht en warmteverlies behoren definitief tot het verleden.', 'Dat verlaagt direct uw energierekening en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Uw woning in Steenbergen optimaal benutten',
        paragraphs: [
          'De gemeente Steenbergen kent een gevarieerde woningvoorraad: van karakteristieke woningen in de oude vesting tot ruime naoorlogse gezinswoningen en vrijstaande huizen in de polderkernen. Juist die woningen lenen zich uitstekend voor een uitbreiding aan de achterzijde, waar vaak een diepe tuin beschikbaar is.',
          'Wij kijken altijd eerst naar uw specifieke woningtype en indeling. Een te kleine keuken wordt zo een royale leefkeuken, een donkere woonkamer krijgt licht via een schuifpui, en een groeiend gezin krijgt eindelijk de ruimte die het nodig heeft — zonder dat u uit Steenbergen hoeft te vertrekken.'
        ],
      },
      {
        heading: 'Waardevermeerdering en woonplezier in de polder',
        paragraphs: [
          'Een uitbouw is in Steenbergen niet alleen een kwestie van comfort, maar ook van rendement. Extra woonoppervlak vertaalt zich vrijwel altijd in een hogere taxatie- en verkoopwaarde, zeker nu woonruimte schaars is. U investeert dus in uw dagelijks woongenot én in uw vermogen.',
          'Daarbij bouwen wij toekomstbestendig: met isolatiewaarden tot Rc 6.0 en voorbereiding op vloerverwarming en een warmtepomp is uw uitbouw klaar voor de energie-eisen van morgen. Dat houdt uw woning aantrekkelijk en uw energierekening laag.'
        ],
      }
    ],
    faqs: [
      { question: 'Werken jullie ook echt in Steenbergen en de kernen?', answer: 'Zeker. Onze vestiging staat in Halsteren, op slechts enkele minuten van Steenbergen. Wij bedienen Steenbergen, Welberg, Kruisland, De Heen, Dinteloord en Nieuw-Vossemeer met korte lijnen en snelle service.' },
      { question: 'Wat kost een prefab uitbouw in Steenbergen?', answer: 'Reken op een richtprijs van € 2.500 tot € 4.200 per m², afhankelijk van afwerking en fundering. Een uitbouw van 15 m² ligt doorgaans tussen € 44.000 en € 62.000. U ontvangt altijd een heldere offerte vooraf.' },
      { question: 'Heb ik een vergunning nodig in Steenbergen?', answer: 'Een uitbouw aan de achterkant is vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Bij monumenten of in het beschermde dorpsgezicht is wel een vergunning nodig. Wij checken dit gratis voor uw adres.' },
      { question: 'Moet ik letten op de fundering?', answer: 'Op laaggelegen polderlocaties kan de kleibodem slap zijn. Afhankelijk van uw kavel funderen we op staal of op palen. Wij berekenen dit altijd vooraf, zodat uw uitbouw levenslang stabiel blijft.' },
      { question: 'Hoelang duurt het plaatsen van een uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering, grondwerk en de fijne afwerking bent u meestal binnen 4 tot 6 weken volledig klaar.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja, dat doen we regelmatig. Alle benodigde leidingen, afvoeren en elektra worden al in de fabriek technisch voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Steenbergen en de kernen Welberg, Kruisland, De Heen, Dinteloord en Nieuw-Vossemeer. Vanuit onze vestiging in Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op polderklei verzorgen wij een berekende fundering. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  roosendaal: {
    slug: 'roosendaal',
    name: 'Roosendaal',
    region: 'West-Brabant',
    heroImage: 'https://i.imgur.com/fmQecXk.jpeg',
    processImage: 'https://i.imgur.com/covRQg3.jpeg',
    metaTitle: 'Prefab Uitbouw Roosendaal | Snel Extra Woonruimte — Prefab Select',
    metaDescription: 'Een prefab uitbouw in Roosendaal laten bouwen? Prefab Select levert snel, vakkundig en met vaste prijs. Lees over kosten, vergunning, zandgrond en de aanpak per wijk.',
    heroBadge: 'PREFAB SELECT ROOSENDAAL',
    heroTitleLines: ['Uitbouw in Roosendaal', 'ruimer wonen in west-brabant', 'zonder gedoe'],
    heroIntro: 'Roosendaal is een levendige stad met goede voorzieningen en gewilde woonwijken. Wilt u uw woning vergroten zonder te verhuizen? Prefab Select bouwt een hoogwaardig geïsoleerde uitbouw met een vaste prijs vooraf — snel geplaatst en met minimale overlast in uw buurt.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Vaste prijs vooraf', sub: 'Geen verrassingen achteraf' },
      { title: 'Snelle plaatsing', sub: 'Stabiel op zandgrond' },
    ],
    introEyebrow: 'UITBREIDEN IN PLAATS VAN VERTREKKEN',
    introHeading: ['Meer ruimte op de plek', 'die u al thuis noemt'],
    introParagraphs: [
      'Roosendaal heeft alles wat een woonstad aantrekkelijk maakt: een gezellig centrum rond de Markt, ruime woonwijken en een uitstekende ligging in West-Brabant. Het is dan ook geen wonder dat veel huiseigenaren liever uitbreiden dan verhuizen. Met een prefab uitbouw creëert u eenvoudig de extra ruimte die uw gezin nodig heeft.',
      'Of u nu droomt van een open leefkeuken, een ruime woonkamer of een werkplek aan huis: een uitbouw van Prefab Select sluit naadloos aan op uw bestaande woning. U wint kostbare vierkante meters én daglicht, en verhoogt tegelijk de waarde van uw huis op de Roosendaalse markt.',
      'Vanuit ons naburige Halsteren zijn wij snel in heel Roosendaal en omgeving. Dat betekent korte communicatielijnen, persoonlijk advies aan huis en een vlotte uitvoering.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Vaste prijs vooraf, zonder onverwachte meerkosten',
      'Hoogwaardige fabriekskwaliteit met Rc-waarde tot 6.0',
      'Minimale logistieke hinder in uw wijk',
    ],
    processEyebrow: 'EFFICIËNT EN SCHOON BOUWEN',
    processHeading: ['Voorbereid in de fabriek', 'gemonteerd in één dag'],
    processParagraphs: [
      'Bij traditionele bouw bent u afhankelijk van het weer en heeft u wekenlang een bouwplaats in de tuin. Prefab Select doet het anders: het grootste deel van uw uitbouw bouwen we kant-en-klaar in onze fabriek, onder constante, droge omstandigheden.',
      'Op locatie leggen we eerst een stevige fundering aan. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde dag is uw woning weer wind- en waterdicht. Zo gaat snelheid hand in hand met een constante, hoge kwaliteit.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN ROOSENDAAL',
    welstandHeading: ['Vaak vergunningsvrij', 'altijd goed geregeld'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde van uw woning is binnen het achtererfgebied vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit voor uw adres bij de gemeente Roosendaal.',
      'In het historische centrum rond de Markt en de Sint-Jan, en bij monumenten, kan een omgevingsvergunning en welstandsadvies nodig zijn. Onze ontwerpers nemen dat traject volledig voor u uit handen, inclusief tekeningen en overleg met de gemeente.',
      'Roosendaal ligt grotendeels op stevige zandgrond. Dat is gunstig: het maakt een snelle, stabiele plaatsing mogelijk, vaak met een eenvoudiger fundering dan in de natte polders verderop. Wij beoordelen de ondergrond altijd per locatie.',
    ],
    costHeading: 'Wat kost een uitbouw in Roosendaal?',
    costIntro: 'Uw afwerkingsniveau, kozijnkeuze en glaspartijen bepalen de uiteindelijke prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de Roosendaalse zandgrond is doorgaans een eenvoudiger fundering mogelijk dan in poldergebied; de exacte calculatie hangt af van uw afwerking en kavelsituatie.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Roosendaal, brengen uw wensen in kaart en maken een ontwerp op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle of uw plan vergunningsvrij is; indien nodig regelen wij de volledige aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd, vrij van weersinvloeden.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing van de uitbouw in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden netjes voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen per wijk in Roosendaal',
    districtsIntro: 'Roosendaal kent diverse wijken met verschillende bouwstijlen en kavels. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Tolberg & Kortendijk', desc: 'Ruim opgezette woonwijken met goede achterom-mogelijkheden. Ideaal voor royale uitbouwen met grote schuifpuien.' },
      { name: 'Kalsdonk & Langdonk', desc: 'Gevarieerde wijken waar wij de uitbouw zorgvuldig afstemmen op de bestaande architectuur en kavelmaat.' },
      { name: 'Centrum & Burgerhout', desc: 'Dichter bebouwd, met soms een beschermd karakter. Hier verzorgen wij waar nodig het vergunnings- en welstandstraject.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw, aanbouw of dakopbouw?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw de logische keuze: een grotere keuken, woonkamer of eetkamer.', 'Heeft u juist een extra slaap- of badkamer nodig? Dan kijken we samen naar een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf alles doordacht', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de ondergrond beoordelen we nauwkeurig voordat we starten met de fabricage.', 'Daardoor verloopt de montagedag vlekkeloos en voorkomen we meerwerk of vertraging achteraf.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Meer daglicht, meer woonplezier', paragraphs: ['Een uitbouw met veel glas transformeert uw benedenverdieping tot een lichte, ruimtelijke leefomgeving.', 'Schuifpuien en lichtstraten verbinden uw woonkamer met de tuin en maken het hele jaar door een verschil.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en sluit naadloos aan op vloerverwarming en een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Passend bij elk woningtype in Roosendaal',
        paragraphs: [
          'Roosendaal heeft een breed palet aan woningen: van statige panden rond het centrum en jaren-30 woningen tot ruime eengezinswoningen in wijken als Tolberg en Kortendijk. Voor vrijwel elk type is een prefab uitbouw een logische manier om extra leefruimte te winnen.',
          'Onze ontwerpers stemmen de gevel, kozijnen en dakafwerking af op uw bestaande woning, zodat de uitbouw oogt alsof hij er altijd al was. Of u nu kiest voor een strak modern ontwerp of een ingetogen aansluiting bij de bestaande architectuur — het past.'
        ],
      },
      {
        heading: 'Snel schakelen, vaste prijs, geen verrassingen',
        paragraphs: [
          'In een drukke woonstad als Roosendaal willen huiseigenaren vooral duidelijkheid: wat kost het, hoelang duurt het en wat krijg ik? Daarom werken wij met een vaste prijs vooraf en een heldere planning. Geen meerwerk-discussies achteraf, maar afspraken waar u op kunt rekenen.',
          'Omdat het leeuwendeel in onze fabriek wordt gebouwd, beperken we de overlast in uw straat tot een minimum. De montage gebeurt in één dag, waarna alleen de afwerking resteert. Zo geniet u snel van uw nieuwe ruimte.'
        ],
      }
    ],
    faqs: [
      { question: 'Komen jullie ook in Roosendaal?', answer: 'Ja. Vanuit ons naburige Halsteren zijn wij snel in heel Roosendaal en de kernen Wouw, Heerle, Moerstraten, Nispen en Wouwse Plantage.' },
      { question: 'Wat kost een prefab uitbouw in Roosendaal?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties. U krijgt altijd een vaste prijs vooraf.' },
      { question: 'Heb ik een vergunning nodig in Roosendaal?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. In het historische centrum en bij monumenten geldt soms een vergunningplicht. Wij checken dit gratis voor u.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Is prefab wel stevig genoeg?', answer: 'Absoluut. Alles wordt onder gecontroleerde omstandigheden in de fabriek gebouwd, wat een constantere en vaak hogere kwaliteit oplevert dan traditionele bouw op locatie.' },
      { question: 'Krijg ik echt een vaste prijs?', answer: 'Ja. Na het ontwerp ontvangt u een heldere, vaste offerte. Geen onverwachte meerkosten tijdens de bouw — dat is onze garantie.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Roosendaal en omgeving, waaronder Tolberg, Kortendijk, Kalsdonk en de kernen Wouw, Heerle en Nispen. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Op de Roosendaalse zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m², met vaste prijs vooraf. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  tholen: {
    slug: 'tholen',
    name: 'Tholen',
    region: 'Zeeland',
    heroImage: 'https://i.imgur.com/covRQg3.jpeg',
    processImage: 'https://i.imgur.com/6VuTqto.jpeg',
    metaTitle: 'Prefab Uitbouw Tholen | Lokale Specialist — Prefab Select',
    metaDescription: 'Prefab uitbouw op Tholen laten plaatsen? Prefab Select uit Halsteren steekt zo de Eendracht over. Lees over kosten, vergunning, fundering op zeeklei en de aanpak per kern.',
    heroBadge: 'PREFAB SELECT THOLEN',
    heroTitleLines: ['Uitbouw op Tholen', 'ruimte op het eiland', 'snel en vakkundig'],
    heroIntro: 'Het eiland Tholen biedt rust, ruimte en een fijne woonomgeving net over de provinciegrens. Wilt u uw woning vergroten? Prefab Select, gevestigd in het nabijgelegen Halsteren, steekt zo de Eendracht over en bouwt een stabiel gefundeerde, hoogwaardig geïsoleerde uitbouw — snel en met minimale overlast.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Vlakbij Halsteren', sub: 'Net over de Eendracht' },
      { title: 'Fundering op zeeklei', sub: 'Vooraf berekend en stabiel' },
    ],
    introEyebrow: 'UITBREIDEN OP HET EILAND',
    introHeading: ['Blijf wonen waar', 'u zich thuis voelt'],
    introParagraphs: [
      'Tholen is een gewilde plek om te wonen: dorpse rust, weidse polders, water binnen handbereik en toch dicht bij de voorzieningen van Bergen op Zoom. Veel eilandbewoners willen hier dan ook niet weg. Met een prefab uitbouw hoeft dat ook niet — u creëert simpelweg de extra ruimte die u zoekt.',
      'Of u nu woont in Tholen-stad, Sint-Maartensdijk, Sint-Annaland of een van de andere kernen: een uitbouw van Prefab Select vergroot uw woonkamer of keuken en haalt meer daglicht binnen. Het is een investering die zich direct vertaalt in wooncomfort én woningwaarde.',
      'Ondanks de provinciegrens zijn wij echt een lokale partij voor Tholen. Onze vestiging in Halsteren ligt op een steenworp afstand, wat zorgt voor korte lijnen en een snelle, persoonlijke service.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Vlakbij gevestigd: snelle service op heel Tholen',
      'Stabiele fundering, berekend op de Thoolse zeeklei',
      'Hoogwaardige isolatie tot Rc 6.0 voor laag energieverbruik',
    ],
    processEyebrow: 'DROOG GEBOUWD, SNEL GEPLAATST',
    processHeading: ['Voorbereid in de fabriek', 'gemonteerd op uw kavel'],
    processParagraphs: [
      'Traditioneel bouwen op het eiland betekent lang wachten op droog weer en wekenlang overlast. Prefab Select bouwt het leeuwendeel van uw uitbouw vooraf in de fabriek, onder constante en droge omstandigheden.',
      'Op uw kavel leggen we een fundering aan die is afgestemd op de Thoolse kleibodem. Op de montagedag hijsen we de voorbereide elementen op hun plek; dezelfde avond is uw woning weer volledig gesloten. Daarna resten alleen nog de afwerking en de finishing touches.',
    ],
    welstandEyebrow: 'VERGUNNING & BODEM OP THOLEN',
    welstandHeading: ['Vergunningsvrij waar het kan', 'maatwerk waar nodig'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep, mits voldoende achtererf onbebouwd blijft. Wij doen kosteloos de vergunningcheck voor uw adres bij de gemeente Tholen.',
      'In de historische kernen van Tholen-stad en Sint-Maartensdijk geldt soms een beschermd dorpsgezicht, en bij monumenten is altijd een vergunning nodig. Onze ontwerpers verzorgen het volledige traject, inclusief tekeningen en welstandsoverleg.',
      'Tholen is een eiland van zeeklei. Die bodem kan plaatselijk slap zijn, waardoor een berekende paalfundering verstandig is om verzakkingen te voorkomen. Wij beoordelen en berekenen de juiste funderingswijze altijd vooraf.',
    ],
    costHeading: 'Wat kost een uitbouw op Tholen?',
    costIntro: 'Uw afwerking, kozijnkeuze en de funderingswijze bepalen de exacte prijs. Onderstaande richtprijzen geven u houvast:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.300' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 82.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Omdat Tholen op zeeklei ligt, kan op laaggelegen locaties een diepere paalfundering nodig zijn; dit berekenen wij vooraf voor een levenslang stabiele uitbouw.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning op Tholen, bespreken uw plannen en ontwerpen een passende uitbouw.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Tholen; waar nodig regelen wij de volledige aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Berekende fundering op de zeeklei en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct gebruiksklaar.' },
    ],
    districtsHeading: 'Bouwen per kern op Tholen',
    districtsIntro: 'De gemeente Tholen telt meerdere kernen, elk met een eigen karakter en kavelopbouw:',
    wijken: [
      { name: 'Tholen-stad & Oud-Vossemeer', desc: 'Historische kernen waar wij het ontwerp en eventuele vergunningen zorgvuldig afstemmen op het beschermde karakter.' },
      { name: 'Sint-Annaland & Stavenisse', desc: 'Dorpse kernen met ruime tuinen, ideaal voor royale uitbouwen met veel glas en zicht op de polder.' },
      { name: 'Sint-Maartensdijk & Poortvliet', desc: 'Gevarieerde bebouwing op zeeklei, waar wij extra aandacht besteden aan een stabiele fundering.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Wat past het best bij uw woning?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een ruime keuken, woonkamer of eetkamer met zicht op de tuin.', 'Voor extra ruimte boven kijken we samen naar een dakkapel of dakopbouw, passend binnen de regels van de gemeente Tholen.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Alles doordacht vóór de bouw', paragraphs: ['Bereikbaarheid voor de kraan, erfgrenzen en de eigenschappen van de zeeklei beoordelen we vooraf nauwkeurig.', 'Zo verloopt de montage soepel en voorkomen we vertraging of meerwerk op uw kavel.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Het eilandlicht naar binnen', paragraphs: ['Tholen staat bekend om zijn weidse luchten. Met grote glaspartijen en een lichtstraat haalt u dat prachtige licht diep uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer met de tuin en het polderlandschap.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Warm, stil en energiezuinig', paragraphs: ['Met isolatiewaarden tot Rc 6.0 blijft uw uitbouw behaaglijk, ook bij stevige wind van zee.', 'Dat verlaagt uw energierekening en past perfect bij vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Bouwen op een eiland met karakter',
        paragraphs: [
          'Het eiland Tholen kent dorpse kernen met een sterk eigen karakter, van historische panden in Tholen-stad en Sint-Maartensdijk tot ruime woningen in de jongere buurten. Veel woningen hebben royale tuinen, wat volop mogelijkheden biedt voor een ruime uitbouw met grote glaspartijen.',
          'Wij houden bij ieder ontwerp rekening met de eilandsfeer en de weidse, open omgeving. Een uitbouw met schuifpui of lichtstraat verbindt uw woonkamer met de tuin en haalt het kenmerkende Zeeuwse licht naar binnen.'
        ],
      },
      {
        heading: 'Een lokale partner, ondanks de provinciegrens',
        paragraphs: [
          'Hoewel Tholen in Zeeland ligt, zijn wij dankzij onze vestiging in Halsteren feitelijk een lokale aannemer voor het eiland. Net over de Eendracht zijn we snel ter plaatse voor advies, inmeten en montage. Dat maakt de lijnen kort en de samenwerking persoonlijk.',
          'Wij kennen de gemeente Tholen, de lokale procedures en de Zeeuwse kleibodem. Die kennis vertalen we naar een uitbouw die niet alleen mooi is, maar ook bouwtechnisch tot in de puntjes klopt en levenslang stabiel blijft.'
        ],
      }
    ],
    faqs: [
      { question: 'Werken jullie ook op het eiland Tholen?', answer: 'Jazeker. Onze vestiging in Halsteren ligt net over de Eendracht. Wij bedienen Tholen-stad, Sint-Maartensdijk, Sint-Annaland, Stavenisse, Scherpenisse, Poortvliet, Oud-Vossemeer en Sint Philipsland.' },
      { question: 'Wat kost een prefab uitbouw op Tholen?', answer: 'Gemiddeld € 2.500 tot € 4.300 per m². Een uitbouw van 15 m² ligt doorgaans tussen € 44.000 en € 64.000, mede afhankelijk van de benodigde fundering.' },
      { question: 'Heb ik een vergunning nodig op Tholen?', answer: 'Aan de achterzijde vaak niet, tot vier meter diep. In de historische kernen en bij monumenten geldt wel een vergunningplicht. Wij checken dit gratis bij de gemeente Tholen.' },
      { question: 'Moet ik rekening houden met de bodem?', answer: 'Ja. Tholen ligt op zeeklei die plaatselijk slap kan zijn. Wij berekenen vooraf de juiste fundering — op staal of op palen — zodat uw uitbouw stabiel blijft.' },
      { question: 'Hoelang duurt de plaatsing?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken volledig klaar.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Zeker. Wij bereiden alle leidingen, afvoeren en elektra al in de fabriek voor, zodat uw keuken probleemloos kan worden aangesloten.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen op het eiland Tholen, waaronder Tholen-stad, Sint-Maartensdijk, Sint-Annaland, Stavenisse, Oud-Vossemeer en Sint Philipsland. Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op zeeklei verzorgen wij een berekende fundering. Richtprijs circa € 2.500 tot € 4.300 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  woensdrecht: {
    slug: 'woensdrecht',
    name: 'Woensdrecht',
    region: 'Brabantse Wal',
    heroImage: 'https://i.imgur.com/v4jk0SK.jpeg',
    processImage: 'https://i.imgur.com/6VuTqto.jpeg',
    metaTitle: 'Prefab Uitbouw Woensdrecht | Specialist op de Brabantse Wal — Prefab Select',
    metaDescription: 'Prefab uitbouw in de gemeente Woensdrecht (Hoogerheide, Ossendrecht, Putte, Huijbergen)? Prefab Select uit Halsteren is uw lokale specialist. Lees over kosten, vergunning en bouwen op de Wal.',
    heroBadge: 'PREFAB SELECT WOENSDRECHT',
    heroTitleLines: ['Uitbouw in Woensdrecht', 'meer ruimte op de wal', 'snel en lokaal geregeld'],
    heroIntro: 'De gemeente Woensdrecht ligt prachtig op de Brabantse Wal, tussen bos, heide en de Belgische grens. Wilt u uw woning vergroten? Prefab Select, gevestigd in het nabijgelegen Halsteren, bouwt een hoogwaardig geïsoleerde uitbouw — snel geplaatst, lokaal geregeld en met minimale overlast.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Echt lokaal', sub: 'Vanuit Halsteren om de hoek' },
      { title: 'Stabiel op zandgrond', sub: 'Snelle, vaste fundering' },
    ],
    introEyebrow: 'UITBREIDEN OP DE BRABANTSE WAL',
    introHeading: ['Wonen blijven waar', 'het zo fijn is'],
    introParagraphs: [
      'De gemeente Woensdrecht — met de kernen Hoogerheide, Ossendrecht, Putte, Huijbergen en Woensdrecht zelf — is geliefd om de groene omgeving, de rust en de ligging op de steilrand van de Brabantse Wal. Wie hier woont, blijft graag. Met een prefab uitbouw hoeft u dan ook niet te verhuizen om meer ruimte te krijgen.',
      'Een hoogwaardige uitbouw van Prefab Select vergroot uw begane grond met een lichte leefkeuken, een ruime woonkamer of een werkplek aan huis. U wint meters én daglicht, en verhoogt tegelijk de waarde van uw woning op de Wal.',
      'Wij zijn echt een buurtgenoot: onze vestiging in Halsteren ligt vlak bij de gemeente Woensdrecht. Dat betekent korte lijnen, persoonlijk advies aan huis en een snelle uitvoering tot aan de grens.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Lokale specialist van de Brabantse Wal',
      'Snelle, stabiele plaatsing op de zandgrond van de Wal',
      'Hoogwaardige isolatie tot Rc 6.0 voor laag energieverbruik',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd op locatie'],
    processParagraphs: [
      'Traditionele aanbouw brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden, vrij van regen en vorst.',
      'Op uw kavel leggen we een stevige fundering aan op de zandgrond van de Wal. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde avond is uw woning weer volledig wind- en waterdicht. Daarna volgen alleen nog de afwerking en details.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN WOENSDRECHT',
    welstandHeading: ['Vaak vergunningsvrij', 'altijd goed afgestemd'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit voor uw adres bij de gemeente Woensdrecht.',
      'In het buitengebied, bij monumenten of nabij beschermde natuur (zoals het Grenspark Kalmthoutse Heide) kunnen aanvullende regels gelden. Onze ontwerpers verzorgen waar nodig het volledige vergunnings- en welstandstraject.',
      'De Brabantse Wal bestaat grotendeels uit stevige zandgrond. Dat is gunstig voor een snelle, stabiele plaatsing. Op de steilrand kunnen plaatselijk hoogteverschillen voorkomen; daar houden wij bij ontwerp en fundering rekening mee zodat uw uitbouw perfect waterpas komt te staan.',
    ],
    costHeading: 'Wat kost een uitbouw in Woensdrecht?',
    costIntro: 'Uw afwerking, kozijnkeuze en glaspartijen bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de zandgrond van de Brabantse Wal is doorgaans een eenvoudiger fundering mogelijk; bij hoogteverschillen op de steilrand stemmen we de fundering daarop af.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in de gemeente Woensdrecht en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente; indien nodig verzorgen wij de volledige aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen per kern in de gemeente Woensdrecht',
    districtsIntro: 'De gemeente bestaat uit vijf kernen op en rond de Wal, elk met een eigen karakter:',
    wijken: [
      { name: 'Hoogerheide & Woensdrecht', desc: 'De grootste kernen met gevarieerde bebouwing. Hier benutten we de vergunningsvrije ruimte aan de achterzijde optimaal.' },
      { name: 'Ossendrecht & Putte', desc: 'Gemoedelijke kernen aan de grens met ruime tuinen, ideaal voor royale uitbouwen met veel glas.' },
      { name: 'Huijbergen', desc: 'Dorps en groen, omringd door natuur. Hier stemmen we het ontwerp zorgvuldig af op de landelijke omgeving.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw of toch iets anders?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een grotere keuken, woonkamer of eetkamer met tuinzicht.', 'Heeft u boven ruimte nodig? Dan adviseren wij over een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf tot in detail bekeken', paragraphs: ['Kraantoegankelijkheid, erfgrenzen, de zandgrond en eventuele hoogteverschillen op de Wal beoordelen we vooraf nauwkeurig.', 'Daardoor verloopt de montagedag vlekkeloos en sluiten we meerwerk of vertraging uit.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Het groen van de Wal naar binnen', paragraphs: ['De gemeente Woensdrecht is omgeven door bos en heide. Met grote glaspartijen en een lichtstraat haalt u dat groen letterlijk uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer naadloos met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Wonen op de Brabantse Wal optimaal benut',
        paragraphs: [
          'De gemeente Woensdrecht ligt op een unieke plek: de steilrand van de Brabantse Wal, met bos, heide en de Belgische grens binnen handbereik. De woningen variëren van dorpse kernwoningen tot ruime, landelijk gelegen huizen met veel buitenruimte.',
          'Juist die ruimte maakt een uitbouw aantrekkelijk. Wij ontwerpen een uitbreiding die het groen van de Wal naar binnen haalt en uw woning verrijkt met licht en leefruimte, perfect afgestemd op uw kavel en de glooiing van het landschap.'
        ],
      },
      {
        heading: 'Toekomstbestendig en energiezuinig bouwen',
        paragraphs: [
          'Steeds meer bewoners van de Wal willen verduurzamen. Een prefab uitbouw sluit daar naadloos op aan: dankzij hoogwaardige isolatie tot Rc 6.0 en voorbereiding op vloerverwarming en warmtepomp draagt uw uitbreiding bij aan een lager energieverbruik.',
          'Zo combineert u extra woonruimte met comfort en duurzaamheid. Uw woning wordt warmer, stiller en zuiniger — en blijft aantrekkelijk op de markt van de gemeente Woensdrecht.'
        ],
      }
    ],
    faqs: [
      { question: 'Welke kernen bedienen jullie rond Woensdrecht?', answer: 'Vanuit ons naburige Halsteren werken wij in alle kernen van de gemeente Woensdrecht: Hoogerheide, Woensdrecht, Ossendrecht, Putte en Huijbergen.' },
      { question: 'Wat kost een prefab uitbouw in Woensdrecht?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties.' },
      { question: 'Heb ik een vergunning nodig?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. In het buitengebied of bij monumenten kan een vergunning nodig zijn. Wij checken dit gratis voor u.' },
      { question: 'Houden jullie rekening met de Brabantse Wal?', answer: 'Zeker. Op de steilrand kunnen hoogteverschillen voorkomen. Wij stemmen ontwerp en fundering hierop af, zodat uw uitbouw stabiel en waterpas komt te staan.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja, dat doen we regelmatig. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in de gemeente Woensdrecht: Hoogerheide, Woensdrecht, Ossendrecht, Putte en Huijbergen. Vanuit Halsteren zijn wij snel ter plaatse op de Brabantse Wal. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op de zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  hoogerheide: {
    slug: 'hoogerheide',
    name: 'Hoogerheide',
    region: 'Brabantse Wal',
    heroImage: 'https://i.imgur.com/6VuTqto.jpeg',
    processImage: 'https://i.imgur.com/v4jk0SK.jpeg',
    metaTitle: 'Prefab Uitbouw Hoogerheide | Snel Extra Ruimte op de Wal — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Hoogerheide? Prefab Select uit het naburige Halsteren bouwt snel en vakkundig op de Brabantse Wal. Lees over kosten, vergunning, zandgrond en de aanpak.',
    heroBadge: 'PREFAB SELECT HOOGERHEIDE',
    heroTitleLines: ['Uitbouw in Hoogerheide', 'meer ruimte in het hart', 'van de wal'],
    heroIntro: 'Hoogerheide is het bruisende hart van de gemeente Woensdrecht, met een levendig winkelcentrum en de groene Brabantse Wal om de hoek. Wilt u uw woning vergroten? Prefab Select uit het nabijgelegen Halsteren bouwt een hoogwaardig geïsoleerde uitbouw — snel, lokaal en met minimale overlast.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Echt lokaal', sub: 'Vanuit Halsteren om de hoek' },
      { title: 'Stabiel op zandgrond', sub: 'Snelle, vaste fundering' },
    ],
    introEyebrow: 'UITBREIDEN OP DE BRABANTSE WAL',
    introHeading: ['Investeren waar', 'u graag woont'],
    introParagraphs: [
      'Hoogerheide is de grootste kern van de gemeente Woensdrecht en daarmee het kloppende hart van de Brabantse Wal. Met een gezellig centrum, goede voorzieningen en natuur binnen handbereik is het een plek waar mensen graag blijven wonen. Een prefab uitbouw maakt verhuizen overbodig: u creëert eenvoudig de ruimte die u zoekt.',
      'Met een uitbouw van Prefab Select vergroot u uw begane grond met een lichte leefkeuken, een ruime woonkamer of een werkplek aan huis. U wint vierkante meters én daglicht, en verhoogt tegelijk de waarde van uw woning in Hoogerheide.',
      'Onze vestiging in Halsteren ligt vlakbij, dus u profiteert van korte lijnen, persoonlijk advies aan huis en een vlotte uitvoering. Wij kennen Hoogerheide en de Wal door en door.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Lokale specialist, vanuit Halsteren snel ter plaatse',
      'Snelle, stabiele plaatsing op de zandgrond van de Wal',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd op locatie'],
    processParagraphs: [
      'Klassieke aanbouw op locatie brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden.',
      'Op uw kavel leggen we een stevige fundering aan op de zandgrond. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde avond is uw woning weer wind- en waterdicht gesloten. Daarna volgt alleen nog de fijne afwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN HOOGERHEIDE',
    welstandHeading: ['Vaak vergunningsvrij', 'altijd goed geregeld'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit voor uw adres bij de gemeente Woensdrecht.',
      'Bij monumenten of in bijzondere zones kan een omgevingsvergunning en welstandsadvies nodig zijn. Onze ontwerpers verzorgen waar nodig het volledige traject, inclusief tekeningen en gemeentelijk overleg.',
      'Hoogerheide ligt op de stevige zandgrond van de Brabantse Wal. Dat maakt een snelle en stabiele plaatsing mogelijk, vaak met een eenvoudiger fundering dan in poldergebied. Op de hoger gelegen delen van de Wal houden we rekening met eventuele hoogteverschillen.',
    ],
    costHeading: 'Wat kost een uitbouw in Hoogerheide?',
    costIntro: 'Uw afwerking, kozijnkeuze en glaspartijen bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de zandgrond van de Brabantse Wal is doorgaans een eenvoudiger fundering mogelijk; de exacte calculatie hangt af van uw afwerking en kavelsituatie.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Hoogerheide, bespreken uw wensen en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Woensdrecht; indien nodig regelen wij de volledige aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in en rond Hoogerheide',
    districtsIntro: 'Hoogerheide kent gevarieerde buurten en grenst aan de andere kernen van de Wal. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Centrum & Dorpsstraat', desc: 'Rond het winkelhart staat gevarieerde bebouwing. Hier benutten we de achterzijde vaak optimaal binnen de vergunningsvrije ruimte.' },
      { name: 'Woonwijken Aanwas & Kromme Elleboog', desc: 'Ruime naoorlogse wijken met goede achterom-mogelijkheden, ideaal voor royale uitbouwen met veel glas.' },
      { name: 'Richting Woensdrecht & vliegbasis', desc: 'Landelijker gelegen woningen waar we het ontwerp afstemmen op de groene omgeving van de Wal.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw of dakopbouw?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een grotere keuken, woonkamer of eetkamer.', 'Heeft u boven ruimte nodig? Dan adviseren wij over een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf tot in detail bekeken', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de zandgrond beoordelen we vooraf nauwkeurig.', 'Daardoor verloopt de montagedag vlekkeloos en sluiten we meerwerk of vertraging uit.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Het groen van de Wal naar binnen', paragraphs: ['Met grote glaspartijen en een lichtstraat haalt u het natuurlijke licht en groen van de Wal diep uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer naadloos met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Het hart van de gemeente Woensdrecht',
        paragraphs: [
          'Als grootste kern vormt Hoogerheide het levendige centrum van de Brabantse Wal, met een eigen winkelhart en goede voorzieningen. De woningvoorraad is divers: van compacte woningen rond het centrum tot ruime gezinswoningen in de omliggende buurten.',
          'Voor vrijwel al deze woningen biedt een uitbouw uitkomst wanneer de ruimte krap wordt. Wij ontwerpen een uitbreiding die past bij uw woning en bij het karakter van Hoogerheide, met oog voor zowel functie als uitstraling.'
        ],
      },
      {
        heading: 'Comfort dat blijft, waarde die groeit',
        paragraphs: [
          'Een uitbouw verandert hoe u woont: meer licht, meer ruimte en een betere indeling. Tegelijk is het een verstandige investering, want extra woonoppervlak verhoogt de waarde van uw woning in Hoogerheide.',
          'Met onze hoogwaardige, geïsoleerde bouwmethode is die investering bovendien toekomstbestendig. U geniet vandaag van het comfort en profiteert later van een woning die energiezuinig en gewild blijft.'
        ],
      }
    ],
    faqs: [
      { question: 'Komen jullie ook in Hoogerheide langs?', answer: 'Zeker. Onze vestiging in Halsteren ligt op korte afstand van Hoogerheide. Wij komen graag vrijblijvend bij u thuis langs voor advies.' },
      { question: 'Wat kost een prefab uitbouw in Hoogerheide?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties.' },
      { question: 'Heb ik een vergunning nodig?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Bij monumenten kan een vergunning nodig zijn. Wij checken dit gratis bij de gemeente Woensdrecht.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Is prefab wel stevig genoeg?', answer: 'Absoluut. Alles wordt onder gecontroleerde fabrieksomstandigheden gebouwd, wat een constantere en vaak hogere kwaliteit oplevert dan bouwen op locatie.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Hoogerheide, de grootste kern van de gemeente Woensdrecht op de Brabantse Wal. Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op de zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  ossendrecht: {
    slug: 'ossendrecht',
    name: 'Ossendrecht',
    region: 'Brabantse Wal',
    heroImage: 'https://i.imgur.com/fmQecXk.jpeg',
    processImage: 'https://i.imgur.com/covRQg3.jpeg',
    metaTitle: 'Prefab Uitbouw Ossendrecht | Lokale Kwaliteit aan de Grens — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Ossendrecht? Prefab Select uit Halsteren bouwt snel en vakkundig op de Brabantse Wal, vlak bij de Kalmthoutse Heide. Lees over kosten, vergunning en aanpak.',
    heroBadge: 'PREFAB SELECT OSSENDRECHT',
    heroTitleLines: ['Uitbouw in Ossendrecht', 'wonen aan de rand', 'van de natuur'],
    heroIntro: 'Ossendrecht ligt prachtig op de zuidpunt van de Brabantse Wal, grenzend aan de Kalmthoutse Heide en België. Wilt u uw woning vergroten zonder die fijne plek te verlaten? Prefab Select uit het naburige Halsteren bouwt een hoogwaardig geïsoleerde uitbouw — snel, lokaal en zorgeloos.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Lokaal uit Halsteren', sub: 'Snel ter plaatse aan de grens' },
      { title: 'Stabiel op zandgrond', sub: 'Snelle, vaste fundering' },
    ],
    introEyebrow: 'UITBREIDEN AAN DE GRENS',
    introHeading: ['Blijf wonen op', 'uw favoriete plek'],
    introParagraphs: [
      'Ossendrecht is geliefd om zijn rust, ruimte en bijzondere ligging aan de Kalmthoutse Heide. Wie hier woont, geniet van natuur voor de deur en de gemoedelijkheid van een grensdorp. Logisch dat veel bewoners liever uitbreiden dan verhuizen. Met een prefab uitbouw creëert u eenvoudig de extra ruimte die u nodig heeft.',
      'Met een uitbouw van Prefab Select vergroot u uw woonkamer of keuken en haalt u meer daglicht binnen. Het is een investering die zich direct vertaalt in wooncomfort én in de waarde van uw woning in Ossendrecht.',
      'Vanuit ons naburige Halsteren zijn wij snel ter plaatse, tot aan de Belgische grens. U profiteert van korte lijnen, persoonlijk advies en een vlotte, zorgeloze uitvoering.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Lokale specialist van de Brabantse Wal',
      'Snelle, stabiele plaatsing op de zandgrond',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'DROOG GEBOUWD, SNEL GEPLAATST',
    processHeading: ['Voorbereid in de fabriek', 'gemonteerd op uw kavel'],
    processParagraphs: [
      'Bij traditionele bouw bent u afhankelijk van het weer en heeft u wekenlang een bouwplaats in de tuin. Prefab Select bouwt het grootste deel van uw uitbouw kant-en-klaar in de fabriek, onder droge en constante omstandigheden.',
      'Op uw kavel leggen we eerst een stevige fundering aan op de zandgrond. Op de montagedag plaatsen we de voorbereide elementen; dezelfde dag is uw woning weer wind- en waterdicht. Zo combineren we snelheid met een constante, hoge kwaliteit.',
    ],
    welstandEyebrow: 'VERGUNNING & NATUUR IN OSSENDRECHT',
    welstandHeading: ['Vaak vergunningsvrij', 'met oog voor de omgeving'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit voor uw adres bij de gemeente Woensdrecht.',
      'Ossendrecht grenst aan beschermde natuur, waaronder het Grenspark Kalmthoutse Heide. In de buurt van natuurgebieden of bij monumenten kunnen aanvullende regels gelden. Onze ontwerpers verzorgen waar nodig het volledige vergunningstraject.',
      'Het dorp ligt op de stevige zandgrond van de Brabantse Wal. Dat is gunstig voor een snelle, stabiele plaatsing. Op de glooiingen van de Wal houden wij rekening met hoogteverschillen, zodat uw uitbouw perfect waterpas komt te staan.',
    ],
    costHeading: 'Wat kost een uitbouw in Ossendrecht?',
    costIntro: 'Uw afwerking, kozijnkeuze en glaspartijen bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de zandgrond van de Wal is doorgaans een eenvoudiger fundering mogelijk; bij hoogteverschillen stemmen we de fundering daarop af.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Ossendrecht en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Woensdrecht; waar nodig regelen wij de aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in en rond Ossendrecht',
    districtsIntro: 'Ossendrecht heeft een dorps centrum en landelijke randen aan de natuur. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Dorpscentrum & Dorpsstraat', desc: 'Gevarieerde bebouwing rond het centrum, waar we de achterzijde vaak optimaal benutten binnen de vergunningsvrije ruimte.' },
      { name: 'Rondom de Volksabdij & Putseweg', desc: 'Sfeervolle, groene omgeving waar we het ontwerp afstemmen op de landelijke uitstraling.' },
      { name: 'Richting Kalmthoutse Heide', desc: 'Woningen aan de rand van de natuur, waar zorgvuldig maatwerk en respect voor de omgeving voorop staan.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Wat past het best bij uw woning?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een ruime keuken, woonkamer of eetkamer met tuinzicht.', 'Voor extra ruimte boven kijken we samen naar een dakkapel of dakopbouw, passend binnen de regels.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Alles doordacht vóór de bouw', paragraphs: ['Bereikbaarheid voor de kraan, erfgrenzen en de zandgrond beoordelen we vooraf nauwkeurig.', 'Zo verloopt de montagedag soepel en voorkomen we vertraging of meerwerk.'] },
      { eyebrow: 'LICHT & SFEER', title: 'De natuur naar binnen halen', paragraphs: ['Aan de rand van de Kalmthoutse Heide is uitzicht goud waard. Met grote glaspartijen en een lichtstraat haalt u dat groen diep uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer met de tuin en de natuur.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Warm, stil en energiezuinig', paragraphs: ['Met isolatiewaarden tot Rc 6.0 blijft uw uitbouw het hele jaar behaaglijk.', 'Dat verlaagt uw energierekening en past perfect bij vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Wonen aan de rand van de natuur',
        paragraphs: [
          'Ossendrecht ligt op de zuidpunt van de Brabantse Wal, grenzend aan het Grenspark Kalmthoutse Heide. Veel woningen profiteren van een groene omgeving en ruime kavels, wat ideale omstandigheden schept voor een royale uitbouw.',
          'Wij ontwerpen uw uitbreiding zo dat het uitzicht en de rust optimaal tot hun recht komen. Met grote glaspartijen haalt u de natuur letterlijk uw woonkamer in, terwijl de hoogwaardige isolatie zorgt voor comfort in elk seizoen.'
        ],
      },
      {
        heading: 'Zorgeloos bouwen met een lokale specialist',
        paragraphs: [
          'Bouwen aan de grens en nabij beschermde natuur vraagt om kennis van de lokale regels. Als specialist van de Brabantse Wal nemen wij het volledige traject voor u uit handen, van vergunningscheck tot oplevering.',
          'U hoeft zich nergens zorgen over te maken: wij regelen het ontwerp, de eventuele aanvraag, de fundering en de montage. Zo verloopt uw project in Ossendrecht soepel en zonder verrassingen.'
        ],
      }
    ],
    faqs: [
      { question: 'Werken jullie ook in Ossendrecht?', answer: 'Jazeker. Vanuit ons naburige Halsteren zijn wij snel in Ossendrecht en de hele gemeente Woensdrecht, tot aan de Belgische grens.' },
      { question: 'Wat kost een prefab uitbouw in Ossendrecht?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties.' },
      { question: 'Heb ik een vergunning nodig?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Nabij natuurgebieden of bij monumenten kan een vergunning nodig zijn. Wij checken dit gratis voor u.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Houden jullie rekening met de glooiing van de Wal?', answer: 'Zeker. Op de glooiingen van de Brabantse Wal stemmen we ontwerp en fundering af op eventuele hoogteverschillen, zodat uw uitbouw stabiel en waterpas staat.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Ossendrecht, op de zuidpunt van de Brabantse Wal aan de Kalmthoutse Heide. Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op de zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  putte: {
    slug: 'putte',
    name: 'Putte',
    region: 'Brabantse Wal',
    heroImage: 'https://i.imgur.com/6VuTqto.jpeg',
    processImage: 'https://i.imgur.com/fmQecXk.jpeg',
    metaTitle: 'Prefab Uitbouw Putte | Maatwerk aan de Belgische Grens — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Putte? Prefab Select uit Halsteren bouwt snel en vakkundig in dit grensdorp op de Brabantse Wal. Lees over kosten, vergunning, zandgrond en aanpak.',
    heroBadge: 'PREFAB SELECT PUTTE',
    heroTitleLines: ['Uitbouw in Putte', 'meer ruimte aan', 'de grens'],
    heroIntro: 'Putte is een levendig grensdorp op de Brabantse Wal, half Nederlands en half Belgisch. Wilt u uw woning aan de Nederlandse zijde vergroten? Prefab Select uit het nabijgelegen Halsteren bouwt een hoogwaardig geïsoleerde uitbouw — snel, lokaal en zorgeloos.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Lokaal uit Halsteren', sub: 'Snel ter plaatse in Putte' },
      { title: 'Stabiel op zandgrond', sub: 'Snelle, vaste fundering' },
    ],
    introEyebrow: 'UITBREIDEN OP DE BRABANTSE WAL',
    introHeading: ['Wonen blijven', 'waar het bruist'],
    introParagraphs: [
      'Putte heeft een bijzonder karakter: een gezellig dorp dat de grens met België omarmt, met een levendige hoofdstraat en de groene Wal binnen handbereik. Wie hier woont, blijft graag. Met een prefab uitbouw hoeft u niet te verhuizen om meer ruimte te krijgen.',
      'Een uitbouw van Prefab Select vergroot uw begane grond met een lichte leefkeuken, een ruime woonkamer of een werkplek. U wint meters én daglicht, en verhoogt de waarde van uw woning aan de Nederlandse zijde van Putte.',
      'Onze vestiging in Halsteren ligt vlakbij, dus u profiteert van korte lijnen, persoonlijk advies en een snelle uitvoering. Wij kennen Putte en de regelgeving aan de Nederlandse kant goed.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Lokale specialist, vanuit Halsteren snel ter plaatse',
      'Snelle, stabiele plaatsing op de zandgrond van de Wal',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd op locatie'],
    processParagraphs: [
      'Traditionele aanbouw brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden.',
      'Op uw kavel leggen we een stevige fundering aan op de zandgrond. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde avond is uw woning weer wind- en waterdicht gesloten. Daarna volgt alleen nog de afwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN PUTTE',
    welstandHeading: ['Vaak vergunningsvrij', 'aan de Nederlandse zijde'],
    welstandParagraphs: [
      'Voor woningen aan de Nederlandse zijde van Putte gelden de Nederlandse regels: een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit bij de gemeente Woensdrecht.',
      'Bij monumenten of in bijzondere zones kan een omgevingsvergunning en welstandsadvies nodig zijn. Onze ontwerpers verzorgen waar nodig het complete traject, inclusief tekeningen en gemeentelijk overleg.',
      'Putte ligt op de stevige zandgrond van de Brabantse Wal, gunstig voor een snelle en stabiele plaatsing. Wij beoordelen de ondergrond en eventuele hoogteverschillen altijd per locatie.',
    ],
    costHeading: 'Wat kost een uitbouw in Putte?',
    costIntro: 'Uw afwerking, kozijnkeuze en glaspartijen bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Deze richtprijzen gelden voor woningen aan de Nederlandse zijde van Putte; op de zandgrond van de Wal is doorgaans een eenvoudiger fundering mogelijk.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Putte en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Woensdrecht; waar nodig regelen wij de aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in en rond Putte',
    districtsIntro: 'Putte heeft een levendig centrum en rustige woonbuurten aan de Nederlandse zijde. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Antwerpsestraat & centrum', desc: 'Rond de bruisende hoofdstraat staat gevarieerde bebouwing, waar we de achterzijde vaak optimaal benutten.' },
      { name: 'Woonbuurten richting Hoogerheide', desc: 'Rustige woonwijken met ruime tuinen, ideaal voor royale uitbouwen met veel glas.' },
      { name: 'Landelijke randen', desc: 'Woningen aan de groene rand van het dorp, waar we het ontwerp afstemmen op de omgeving.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw of dakopbouw?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een grotere keuken, woonkamer of eetkamer.', 'Heeft u boven ruimte nodig? Dan adviseren wij over een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf goed doordacht', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de zandgrond beoordelen we vooraf nauwkeurig.', 'Daardoor verloopt de montagedag vlekkeloos en sluiten we meerwerk of vertraging uit.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Meer daglicht, meer woonplezier', paragraphs: ['Met grote glaspartijen en een lichtstraat verandert uw benedenverdieping in een lichte, ruimtelijke leefomgeving.', 'Een uitbouw met schuifpui verbindt uw woonkamer met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Een grensdorp met een eigen dynamiek',
        paragraphs: [
          'Putte is een bijzonder dorp dat de grens met België omarmt, met een levendige hoofdstraat en een mix van woningtypes aan de Nederlandse zijde. Veel woningen hebben ruime tuinen die zich uitstekend lenen voor een uitbreiding aan de achterzijde.',
          'Wij ontwerpen een uitbouw die past bij uw woning en bij het karakter van Putte. Of het nu gaat om een grotere keuken, een lichte woonkamer of een werkplek aan huis — wij realiseren het op maat.'
        ],
      },
      {
        heading: 'Duidelijke Nederlandse regels, lokaal geregeld',
        paragraphs: [
          'Voor woningen aan de Nederlandse zijde van Putte gelden de Nederlandse bouwregels. Dat betekent dat een uitbouw aan de achterzijde vaak vergunningsvrij is tot vier meter diep. Wij controleren dit kosteloos en regelen waar nodig de complete aanvraag.',
          'Dankzij onze nabije vestiging in Halsteren schakelen we snel. U profiteert van korte lijnen, persoonlijk advies en een vlotte uitvoering — precies wat u wilt bij een project aan uw eigen woning.'
        ],
      }
    ],
    faqs: [
      { question: 'Bouwen jullie ook in Putte?', answer: 'Ja, aan de Nederlandse zijde van Putte. Vanuit ons naburige Halsteren zijn wij snel ter plaatse voor een vrijblijvend adviesgesprek.' },
      { question: 'Wat kost een prefab uitbouw in Putte?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties.' },
      { question: 'Welke regels gelden er in Putte?', answer: 'Voor woningen aan de Nederlandse zijde gelden de Nederlandse regels. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Wij checken dit gratis bij de gemeente Woensdrecht.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Is prefab wel stevig genoeg?', answer: 'Absoluut. Alles wordt onder gecontroleerde fabrieksomstandigheden gebouwd, wat een constantere en vaak hogere kwaliteit oplevert dan bouwen op locatie.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Putte, het grensdorp op de Brabantse Wal (Nederlandse zijde, gemeente Woensdrecht). Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op de zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  wouw: {
    slug: 'wouw',
    name: 'Wouw',
    region: 'West-Brabant',
    heroImage: 'https://i.imgur.com/fmQecXk.jpeg',
    processImage: 'https://i.imgur.com/v4jk0SK.jpeg',
    metaTitle: 'Prefab Uitbouw Wouw | Dorpse Charme, Moderne Ruimte — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Wouw? Prefab Select uit Halsteren bouwt snel en vakkundig in Wouw, Heerle en Moerstraten. Lees over kosten, vergunning, zandgrond en aanpak.',
    heroBadge: 'PREFAB SELECT WOUW',
    heroTitleLines: ['Uitbouw in Wouw', 'meer ruimte met behoud', 'van karakter'],
    heroIntro: 'Wouw is een karakteristiek dorp tussen Roosendaal en Bergen op Zoom, met de markante Sint-Lambertusbasiliek als baken. Wilt u uw woning vergroten met behoud van dat dorpse karakter? Prefab Select uit het nabijgelegen Halsteren bouwt een hoogwaardig geïsoleerde uitbouw — snel, lokaal en zorgeloos.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Lokaal uit Halsteren', sub: 'Snel ter plaatse in Wouw' },
      { title: 'Stabiel op zandgrond', sub: 'Snelle, vaste fundering' },
    ],
    introEyebrow: 'UITBREIDEN MET KARAKTER',
    introHeading: ['Wonen blijven in', 'uw vertrouwde dorp'],
    introParagraphs: [
      'Wouw heeft een warme, dorpse sfeer met gezellige straten rond de basiliek en ruime woningen aan de rand. Het is een plek waar mensen graag blijven wonen. Met een prefab uitbouw vergroot u uw woning zonder te verhuizen en zonder maandenlange bouwoverlast.',
      'Een uitbouw van Prefab Select voegt een lichte leefkeuken, een ruime woonkamer of een werkplek toe. U wint vierkante meters én daglicht, en verhoogt de waarde van uw woning in Wouw. Wij stemmen het ontwerp zorgvuldig af op de karakteristieke bebouwing.',
      'Vanuit ons naburige Halsteren zijn wij snel ter plaatse. Dat betekent korte lijnen, persoonlijk advies aan huis en een vlotte uitvoering — echt lokaal vakwerk.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Ontwerp afgestemd op de karakteristieke woningen in Wouw',
      'Snelle, stabiele plaatsing op de zandgrond',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd op locatie'],
    processParagraphs: [
      'Klassieke aanbouw op locatie brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden.',
      'Op uw kavel leggen we een stevige fundering aan op de zandgrond. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde avond is uw woning weer wind- en waterdicht gesloten. Daarna volgt alleen nog de fijne afwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN WOUW',
    welstandHeading: ['Vaak vergunningsvrij', 'met respect voor het dorp'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Wij voeren kosteloos de vergunningcheck uit voor uw adres bij de gemeente Roosendaal.',
      'Rond de historische dorpskern en bij monumenten kan een omgevingsvergunning en welstandsadvies nodig zijn. Onze ontwerpers verzorgen waar nodig het volledige traject, inclusief tekeningen en gemeentelijk overleg.',
      'Wouw ligt op stevige zandgrond, gunstig voor een snelle en stabiele plaatsing. Wij beoordelen de ondergrond altijd per locatie, zodat uw uitbouw levenslang stabiel blijft.',
    ],
    costHeading: 'Wat kost een uitbouw in Wouw?',
    costIntro: 'Uw afwerking, kozijnkeuze en glaspartijen bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de zandgrond rond Wouw is doorgaans een eenvoudiger fundering mogelijk; de exacte calculatie hangt af van uw afwerking en kavelsituatie.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Wouw en ontwerpen een uitbouw die past bij het dorpse karakter.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Roosendaal; waar nodig regelen wij de aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Stevige fundering op de zandgrond en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in Wouw en omliggende kernen',
    districtsIntro: 'Wouw en de omliggende dorpen hebben elk hun eigen sfeer. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Dorpskern rond de basiliek', desc: 'Karakteristieke bebouwing waar we het ontwerp en eventuele vergunningen zorgvuldig afstemmen op de historische sfeer.' },
      { name: 'Heerle & Moerstraten', desc: 'Dorpse kernen met ruime tuinen, ideaal voor royale uitbouwen met veel glas.' },
      { name: 'Wouwse Plantage', desc: 'Landelijk gelegen woningen omringd door groen, waar maatwerk en rust voorop staan.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw of dakopbouw?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een grotere keuken, woonkamer of eetkamer.', 'Heeft u boven ruimte nodig? Dan adviseren wij over een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf goed doordacht', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de zandgrond beoordelen we vooraf nauwkeurig.', 'Daardoor verloopt de montagedag vlekkeloos en sluiten we meerwerk of vertraging uit.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Meer daglicht in uw woning', paragraphs: ['Met grote glaspartijen en een lichtstraat verandert uw benedenverdieping in een lichte, ruimtelijke leefomgeving.', 'Een uitbouw met schuifpui verbindt uw woonkamer naadloos met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Karakter behouden, ruimte winnen',
        paragraphs: [
          'Wouw is een dorp met een sterk eigen gezicht, met de Sint-Lambertusbasiliek als baken en gezellige straten eromheen. De woningen variëren van karakteristieke panden in de kern tot ruimere huizen in Heerle, Moerstraten en Wouwse Plantage.',
          'Bij een uitbouw in Wouw staat respect voor dat karakter voorop. Wij stemmen materialen, kozijnen en vorm af op uw woning, zodat de uitbreiding natuurlijk aansluit en de dorpse sfeer behouden blijft.'
        ],
      },
      {
        heading: 'Een lichte, ruime leefomgeving',
        paragraphs: [
          'Veel woningen in en rond Wouw hebben fijne tuinen, maar de leefruimte binnen schiet soms tekort. Een uitbouw lost dat op: u creëert een open, lichte leefkeuken of woonkamer met directe verbinding naar buiten.',
          'Met grote glaspartijen, een schuifpui of een lichtstraat haalt u volop daglicht binnen. Het resultaat is een woning die niet alleen groter aanvoelt, maar ook prettiger om in te leven — het hele jaar door.'
        ],
      }
    ],
    faqs: [
      { question: 'Welke kernen bedienen jullie rond Wouw?', answer: 'Vanuit ons naburige Halsteren werken wij in Wouw, Heerle, Moerstraten en Wouwse Plantage, plus de rest van de gemeente Roosendaal.' },
      { question: 'Wat kost een prefab uitbouw in Wouw?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en opties.' },
      { question: 'Heb ik een vergunning nodig in Wouw?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Rond de historische kern en bij monumenten kan een vergunning nodig zijn. Wij checken dit gratis voor u.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Is prefab wel stevig genoeg?', answer: 'Absoluut. Alles wordt onder gecontroleerde fabrieksomstandigheden gebouwd, wat een constantere en vaak hogere kwaliteit oplevert dan bouwen op locatie.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Wouw en de kernen Heerle, Moerstraten en Wouwse Plantage (gemeente Roosendaal). Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op de zandgrond is een snelle, stabiele plaatsing mogelijk. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  lepelstraat: {
    slug: 'lepelstraat',
    name: 'Lepelstraat',
    region: 'West-Brabant',
    heroImage: 'https://i.imgur.com/6VuTqto.jpeg',
    processImage: 'https://i.imgur.com/covRQg3.jpeg',
    metaTitle: 'Prefab Uitbouw Lepelstraat | Uw Buurman uit Halsteren — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Lepelstraat? Prefab Select zit letterlijk om de hoek in Halsteren. Snel, vakkundig en lokaal. Lees over kosten, vergunning, polderklei en aanpak.',
    heroBadge: 'PREFAB SELECT LEPELSTRAAT',
    heroTitleLines: ['Uitbouw in Lepelstraat', 'uw specialist', 'om de hoek'],
    heroIntro: 'Lepelstraat ligt pal naast Halsteren, waar onze vestiging staat — wij zijn letterlijk uw buurman. Wilt u uw woning vergroten? Prefab Select bouwt een hoogwaardig geïsoleerde uitbouw met de kortste lijnen die u kunt wensen: snel, persoonlijk en zorgeloos.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Letterlijk om de hoek', sub: 'Onze vestiging staat in Halsteren' },
      { title: 'Fundering op polderklei', sub: 'Vooraf berekend en stabiel' },
    ],
    introEyebrow: 'UITBREIDEN OM DE HOEK',
    introHeading: ['De dichtstbijzijnde', 'specialist die er is'],
    introParagraphs: [
      'Lepelstraat is een rustig polderdorp dat direct grenst aan Halsteren. Dat maakt ons niet zomaar een lokale partij — wij zijn echt om de hoek gevestigd. Geen enkele aanbieder zit dichterbij, en dat merkt u aan de snelheid en persoonlijke aandacht.',
      'Met een prefab uitbouw van Prefab Select vergroot u uw woning met een lichte leefkeuken, een ruime woonkamer of een werkplek aan huis. U wint meters én daglicht, en verhoogt de waarde van uw woning in Lepelstraat.',
      'Doordat we naast de deur zitten, zijn de lijnen extreem kort: snel langskomen voor advies, snel inmeten en een vlotte uitvoering. Lokaler dan dit wordt het niet.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Dichtstbijzijnde specialist: onze vestiging staat in Halsteren',
      'Stabiele fundering, berekend op de polderklei',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd om de hoek'],
    processParagraphs: [
      'Traditionele aanbouw brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden — en die fabriek staat naast uw dorp.',
      'Op uw kavel leggen we een fundering aan die is afgestemd op de Lepelstraatse polderbodem. Op de montagedag plaatsen we de voorbereide elementen; dezelfde avond is uw woning weer wind- en waterdicht gesloten. Daarna volgt alleen nog de afwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN LEPELSTRAAT',
    welstandHeading: ['Vaak vergunningsvrij', 'altijd snel geregeld'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Lepelstraat valt onder de gemeente Bergen op Zoom; wij voeren kosteloos de vergunningcheck uit voor uw adres.',
      'Bij monumenten of in bijzondere zones kan een omgevingsvergunning nodig zijn. Onze ontwerpers verzorgen waar nodig het volledige traject, inclusief tekeningen en gemeentelijk overleg.',
      'Lepelstraat ligt in het polderlandschap met deels kleibodem. Een doordachte fundering — op staal of op palen, afhankelijk van de locatie — zorgt voor een levenslang stabiele uitbouw. Wij berekenen dit altijd vooraf.',
    ],
    costHeading: 'Wat kost een uitbouw in Lepelstraat?',
    costIntro: 'Uw afwerking, kozijnkeuze en de funderingswijze bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de polderklei rond Lepelstraat kan een berekende fundering nodig zijn; dit bepalen wij vooraf zodat scheurvorming ten opzichte van de hoofdwoning wordt uitgesloten.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We zijn zo bij u in Lepelstraat, bespreken uw wensen en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Bergen op Zoom; waar nodig regelen wij de aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze nabijgelegen fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Berekende fundering op de polderbodem en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in en rond Lepelstraat',
    districtsIntro: 'Lepelstraat is een compact polderdorp tussen Halsteren en Bergen op Zoom. Wij kennen elke straat:',
    wijken: [
      { name: 'Dorpskern Lepelstraat', desc: 'Rustige bebouwing met ruime tuinen, ideaal voor royale uitbouwen met veel glas en zicht op de polder.' },
      { name: 'Richting Halsteren', desc: 'Direct naast onze vestiging. Hier zijn we binnen enkele minuten ter plaatse voor advies en inmeten.' },
      { name: 'Polderrand & Markiezaat', desc: 'Woningen aan de groene rand, waar we het ontwerp afstemmen op de open polderomgeving.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Wat past het best?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een ruime keuken, woonkamer of eetkamer met tuinzicht.', 'Voor extra ruimte boven kijken we samen naar een dakkapel of dakopbouw, passend binnen de regels.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf alles doordacht', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de polderklei beoordelen we vooraf nauwkeurig.', 'Doordat we naast de deur zitten, schakelen we snel en voorkomen we vertraging of meerwerk.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Het polderlicht naar binnen', paragraphs: ['Met grote glaspartijen en een lichtstraat haalt u het weidse polderlicht diep uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer naadloos met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'De voordelen van een buurman als bouwer',
        paragraphs: [
          'Lepelstraat grenst direct aan Halsteren, waar onze vestiging staat. Dat geeft u een uniek voordeel: de dichtstbijzijnde uitbouwspecialist die er is. Korte reistijd betekent snel langskomen, snel inmeten en een soepele uitvoering.',
          'Wij kennen de woningen en de polderomgeving van Lepelstraat van dichtbij. Die lokale kennis vertalen we naar een uitbouw die perfect past bij uw woning en bij de open, landelijke sfeer van het dorp.'
        ],
      },
      {
        heading: 'Stevig gefundeerd in de polder',
        paragraphs: [
          'Lepelstraat ligt in het polderlandschap met deels kleibodem. Een goede fundering is hier belangrijk om verzakkingen te voorkomen. Wij berekenen vooraf nauwkeurig of we op staal of op palen funderen, afgestemd op uw specifieke kavel.',
          'Zo bent u verzekerd van een uitbouw die levenslang stabiel blijft, zonder scheurvorming ten opzichte van de bestaande woning. Degelijk vakwerk, letterlijk om de hoek geleverd.'
        ],
      }
    ],
    faqs: [
      { question: 'Hoe snel kunnen jullie in Lepelstraat langskomen?', answer: 'Zeer snel. Onze vestiging staat in het aangrenzende Halsteren, op enkele minuten van Lepelstraat. Lokaler en sneller wordt het niet.' },
      { question: 'Wat kost een prefab uitbouw in Lepelstraat?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en fundering.' },
      { question: 'Heb ik een vergunning nodig?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Lepelstraat valt onder de gemeente Bergen op Zoom; wij checken dit gratis voor u.' },
      { question: 'Moet ik letten op de fundering?', answer: 'Op de polderklei kan een berekende fundering nodig zijn. Wij bepalen vooraf of we op staal of op palen funderen, zodat uw uitbouw stabiel blijft.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Lepelstraat, het polderdorp direct naast Halsteren (gemeente Bergen op Zoom). Onze vestiging staat letterlijk om de hoek. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op polderklei verzorgen wij een berekende fundering. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },

  'nieuw-vossemeer': {
    slug: 'nieuw-vossemeer',
    name: 'Nieuw-Vossemeer',
    region: 'West-Brabant',
    heroImage: 'https://i.imgur.com/covRQg3.jpeg',
    processImage: 'https://i.imgur.com/6VuTqto.jpeg',
    metaTitle: 'Prefab Uitbouw Nieuw-Vossemeer | Lokaal Vakwerk in de Polder — Prefab Select',
    metaDescription: 'Prefab uitbouw of aanbouw in Nieuw-Vossemeer? Prefab Select uit Halsteren bouwt snel en vakkundig in dit polderdorp. Lees over kosten, vergunning, zeeklei en aanpak.',
    heroBadge: 'PREFAB SELECT NIEUW-VOSSEMEER',
    heroTitleLines: ['Uitbouw in Nieuw-Vossemeer', 'meer ruimte in', 'de polder'],
    heroIntro: 'Nieuw-Vossemeer is een rustig polderdorp aan de rand van de gemeente Steenbergen, dicht bij het water van de Eendracht. Wilt u uw woning vergroten? Prefab Select uit het nabijgelegen Halsteren bouwt een hoogwaardig geïsoleerde uitbouw — snel, lokaal en zorgeloos.',
    usps: [
      { title: 'Constructie in 1 dag', sub: 'Ruwbouw direct wind- & waterdicht' },
      { title: 'Lokaal uit Halsteren', sub: 'Snel ter plaatse in de polder' },
      { title: 'Fundering op zeeklei', sub: 'Vooraf berekend en stabiel' },
    ],
    introEyebrow: 'UITBREIDEN IN DE POLDER',
    introHeading: ['Wonen blijven', 'aan het water'],
    introParagraphs: [
      'Nieuw-Vossemeer is geliefd om zijn rust, ruimte en de nabijheid van het water. Wie hier woont, geniet van het weidse polderlandschap en de dorpse gemoedelijkheid. Met een prefab uitbouw hoeft u niet te verhuizen om meer ruimte te krijgen.',
      'Een uitbouw van Prefab Select vergroot uw begane grond met een lichte leefkeuken, een ruime woonkamer of een werkplek aan huis. U wint meters én daglicht, en verhoogt de waarde van uw woning in Nieuw-Vossemeer.',
      'Vanuit ons naburige Halsteren zijn wij snel ter plaatse. Dat betekent korte lijnen, persoonlijk advies aan huis en een vlotte uitvoering in de hele polder.',
    ],
    benefits: [
      'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
      'Lokale specialist, vanuit Halsteren snel ter plaatse',
      'Stabiele fundering, berekend op de polder- en zeeklei',
      'Hoogwaardige isolatie tot Rc 6.0 voor een lage energierekening',
    ],
    processEyebrow: 'GEEN MAANDENLANGE BOUWPLAATS',
    processHeading: ['Droog gebouwd in de fabriek', 'snel gemonteerd op locatie'],
    processParagraphs: [
      'Traditionele aanbouw brengt weersrisico’s, droogtijden en geluidsoverlast met zich mee. Prefab Select bouwt het grootste deel van uw uitbouw vooraf in de fabriek, onder droge en constante omstandigheden.',
      'Op uw kavel leggen we een fundering aan die is afgestemd op de polderbodem. Op de montagedag plaatsen we de voorbereide elementen met een kraan; dezelfde avond is uw woning weer wind- en waterdicht gesloten. Daarna volgt alleen nog de afwerking.',
    ],
    welstandEyebrow: 'VERGUNNING & ONDERGROND IN NIEUW-VOSSEMEER',
    welstandHeading: ['Vaak vergunningsvrij', 'met een stevige fundering'],
    welstandParagraphs: [
      'Een uitbouw aan de achterzijde binnen het achtererfgebied is vaak vergunningsvrij, als richtlijn tot vier meter diep. Nieuw-Vossemeer valt onder de gemeente Steenbergen; wij voeren kosteloos de vergunningcheck uit voor uw adres.',
      'Bij monumenten of in het dorpse beschermde gebied kan een omgevingsvergunning nodig zijn. Onze ontwerpers verzorgen waar nodig het volledige traject, inclusief tekeningen en gemeentelijk overleg.',
      'Nieuw-Vossemeer ligt in ingepolderd land met een klei- en zeekleibodem die plaatselijk slap kan zijn. Een berekende fundering is daarom belangrijk voor een levenslang stabiele uitbouw. Wij bepalen dit altijd vooraf.',
    ],
    costHeading: 'Wat kost een uitbouw in Nieuw-Vossemeer?',
    costIntro: 'Uw afwerking, kozijnkeuze en de funderingswijze bepalen de prijs. Onderstaande richtprijzen geven een goede indicatie:',
    costRows: [
      { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.200' },
      { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
      { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 80.000 of meer' },
    ],
    costNote: '* Richtbedragen incl. btw en installatie. Op de polder- en zeeklei rond Nieuw-Vossemeer kan een diepere paalfundering nodig zijn; dit berekenen wij vooraf voor een levenslang stabiele uitbouw.',
    steps: [
      { nr: '1', title: 'Advies & Ontwerp', desc: 'We bezoeken uw woning in Nieuw-Vossemeer en ontwerpen een uitbouw op maat.' },
      { nr: '2', title: 'Vergunningscheck', desc: 'Gratis controle bij de gemeente Steenbergen; waar nodig regelen wij de aanvraag.' },
      { nr: '3', title: 'Fabricage', desc: 'Uw uitbouw wordt millimeterprecies in onze droge fabriek gebouwd.' },
      { nr: '4', title: 'Fundering & Montage', desc: 'Berekende fundering op de polderbodem en plaatsing in één dag, wind- en waterdicht.' },
      { nr: '5', title: 'Afwerking', desc: 'Beglazing, elektra en afwerking worden voltooid. Uw nieuwe ruimte is direct bruikbaar.' },
    ],
    districtsHeading: 'Bouwen in en rond Nieuw-Vossemeer',
    districtsIntro: 'Nieuw-Vossemeer is een compact polderdorp met landelijke randen. Wij stemmen ons ontwerp daarop af:',
    wijken: [
      { name: 'Dorpskern', desc: 'Gevarieerde bebouwing rond het centrum, waar we de achterzijde vaak optimaal benutten binnen de vergunningsvrije ruimte.' },
      { name: 'Polderrand & Eendracht', desc: 'Woningen met zicht op het water en de polder, ideaal voor royale uitbouwen met grote glaspartijen.' },
      { name: 'Richting Steenbergen', desc: 'Landelijke woningen waar we het ontwerp afstemmen op de open omgeving en de kleibodem.' },
    ],
    analysisBoxes: [
      { eyebrow: 'DE JUISTE KEUZE', title: 'Uitbouw of dakopbouw?', paragraphs: ['Voor extra leefruimte op de begane grond is een uitbouw ideaal: een grotere keuken, woonkamer of eetkamer.', 'Heeft u boven ruimte nodig? Dan adviseren wij over een dakkapel of dakopbouw die binnen de regels past.'] },
      { eyebrow: 'GOEDE VOORBEREIDING', title: 'Vooraf goed doordacht', paragraphs: ['Kraantoegankelijkheid, erfgrenzen en de eigenschappen van de zeeklei beoordelen we vooraf nauwkeurig.', 'Daardoor verloopt de montagedag vlekkeloos en sluiten we meerwerk of vertraging uit.'] },
      { eyebrow: 'LICHT & SFEER', title: 'Het polder- en waterlicht naar binnen', paragraphs: ['Met grote glaspartijen en een lichtstraat haalt u het weidse licht van polder en water diep uw woning in.', 'Een uitbouw met schuifpui verbindt uw woonkamer naadloos met de tuin.'] },
      { eyebrow: 'DUURZAAM COMFORT', title: 'Energiezuinig en behaaglijk', paragraphs: ['Met isolatiewaarden tot Rc 6.0 is uw uitbouw warm in de winter en koel in de zomer.', 'Dat verlaagt uw energiekosten en combineert perfect met vloerverwarming of een warmtepomp.'] },
    ],
    extraBlocks: [
      {
        heading: 'Wonen aan het water in de polder',
        paragraphs: [
          'Nieuw-Vossemeer is een rustig polderdorp aan de Eendracht, geliefd om zijn ruimte en de nabijheid van het water. De woningen hebben vaak royale tuinen, wat volop mogelijkheden biedt voor een ruime uitbouw met veel glas en uitzicht.',
          'Wij ontwerpen uw uitbreiding zo dat het weidse polder- en waterlicht optimaal naar binnen komt. Een uitbouw met schuifpui verbindt uw woonkamer met de tuin en versterkt het gevoel van ruimte.'
        ],
      },
      {
        heading: 'Lokaal vakwerk met een stevige basis',
        paragraphs: [
          'De polder- en zeekleibodem rond Nieuw-Vossemeer vraagt om een doordachte fundering. Als specialist uit het nabije Halsteren kennen wij deze grondsoort goed en berekenen we de juiste funderingswijze altijd vooraf.',
          'Het resultaat is een uitbouw die snel geplaatst is en levenslang stabiel blijft. Van ontwerp en vergunningscheck tot fundering en afwerking nemen wij het hele traject voor u uit handen.'
        ],
      }
    ],
    faqs: [
      { question: 'Werken jullie ook in Nieuw-Vossemeer?', answer: 'Jazeker. Vanuit ons naburige Halsteren zijn wij snel in Nieuw-Vossemeer en de omliggende polderdorpen van de gemeente Steenbergen.' },
      { question: 'Wat kost een prefab uitbouw in Nieuw-Vossemeer?', answer: 'Gemiddeld € 2.500 tot € 4.200 per m². Een uitbouw van 15 m² begint rond de € 44.000, afhankelijk van afwerking en fundering.' },
      { question: 'Heb ik een vergunning nodig?', answer: 'Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep. Nieuw-Vossemeer valt onder de gemeente Steenbergen; wij checken dit gratis voor u.' },
      { question: 'Moet ik letten op de fundering?', answer: 'Op de polder- en zeeklei kan een diepere fundering nodig zijn. Wij berekenen vooraf de juiste funderingswijze, zodat uw uitbouw levenslang stabiel blijft.' },
      { question: 'Hoe snel staat mijn uitbouw?', answer: 'De ruwbouw staat doorgaans binnen één dag wind- en waterdicht. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken klaar.' },
      { question: 'Kan ik een keuken in de uitbouw plaatsen?', answer: 'Ja. Alle leidingen, afvoeren en elektra worden al in de fabriek voorbereid, zodat uw keuken naadloos aansluit.' },
    ],
    noscript: 'Prefab Select bouwt hoogwaardige prefab uitbouwen en aanbouwen in Nieuw-Vossemeer, een polderdorp van de gemeente Steenbergen aan de Eendracht. Vanuit Halsteren zijn wij snel ter plaatse. Een uitbouw aan de achterzijde is vaak vergunningsvrij tot vier meter diep; op polder- en zeeklei verzorgen wij een berekende fundering. Richtprijs circa € 2.500 tot € 4.200 per m². Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.',
  },
};
