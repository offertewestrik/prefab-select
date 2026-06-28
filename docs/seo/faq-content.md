# FAQ Content — Loodgieterplatform.nl (AEO-ready)

Ready-to-use Dutch FAQ Q&A pairs, written **answer-first** so AI engines (ChatGPT, Claude, Gemini, Perplexity) can lift them cleanly, and so they wire directly into `FAQPage` JSON-LD via the existing `faqLd()` helper and on-page FAQ `<details>` sections.

**Authoring rules applied:**
- Answer first sentence carries the core fact (number / yes-no / definition).
- 40–60 words per answer, plain Dutch, no fluff.
- Prices = ranges incl. btw & montage; flagged as *richtprijs* (not a quote).
- Review counts / vakman numbers are **marketing figures** and are deliberately kept out of factual answers.
- Group = target page. Each group is one `FAQPage` block.

> Prices and ranges below mirror `packages/db/seed/data/services.ts`. Refresh the year ("2026") and ranges when seed data changes, so recency-sensitive engines (Perplexity/Gemini) stay accurate.

---

## Homepage (`/`)

**Q: Hoe werkt Loodgieterplatform.nl?**
A: Je plaatst gratis en vrijblijvend een aanvraag met je klus en postcode. Binnen korte tijd ontvang je tot 3 offertes van gecertificeerde loodgieters en installateurs uit jouw regio. Je vergelijkt prijs, reviews en beschikbaarheid en kiest zelf met wie je in zee gaat.

**Q: Is offertes vergelijken via Loodgieterplatform.nl gratis?**
A: Ja, het aanvragen en vergelijken van offertes is volledig gratis en vrijblijvend voor consumenten. Je zit nergens aan vast en bepaalt zelf of en met welke vakman je verder gaat. Je betaalt alleen de installateur die je uiteindelijk kiest, volgens diens offerte.

**Q: Zijn de loodgieters op het platform gecertificeerd?**
A: Ja, we werken met gecertificeerde en verzekerde vakmannen. Afhankelijk van het werk beschikken zij over erkenningen zoals Sterkin/Kiwa, InstallQ, OK CV, STEK of VCA. Op de pagina Keurmerken lees je wat elk keurmerk garandeert en waar je als consument op kunt letten.

**Q: Hoe snel ontvang ik offertes?**
A: Meestal ontvang je binnen enkele uren tot één werkdag de eerste offertes, afhankelijk van de klus en je regio. Bij spoed, zoals een lekkage of uitgevallen CV-ketel, kun je aangeven dat het dringend is zodat beschikbare vakmannen sneller reageren.

**Q: In welke regio's is Loodgieterplatform.nl actief?**
A: Loodgieterplatform.nl bemiddelt in onder meer Noord-Brabant, Gelderland, Zuid-Holland, Noord-Holland en Utrecht. Vul je postcode in bij de aanvraag; we koppelen je dan aan gecertificeerde vakmannen die in jouw gemeente werkzaam zijn.

---

## CV-ketel (`/diensten/cv-en-verwarming`, `/cv-ketel-vervangen`, `/nieuwe-cv-ketel`)

**Q: Wat kost een nieuwe CV-ketel in 2026?**
A: Een nieuwe CV-ketel kost in 2026 gemiddeld €1.250 tot €2.800 inclusief btw en montage. De prijs hangt af van het vermogen, het merk (zoals Intergas, Remeha, Nefit, Vaillant of ATAG), het type (combi of solo) en de complexiteit van de aansluiting. Vergelijk offertes voor een prijs op maat.

**Q: Wat kost het vervangen van een CV-ketel?**
A: Het vervangen van een CV-ketel kost doorgaans €1.250 tot €2.500 inclusief installatie en het milieuverantwoord afvoeren van de oude ketel. De exacte prijs hangt af van het gekozen model en of de bestaande aansluitingen geschikt zijn. Vraag vrijblijvend meerdere offertes aan om te vergelijken.

**Q: Hoe lang gaat een CV-ketel mee?**
A: Een CV-ketel gaat gemiddeld 12 tot 15 jaar mee bij goed jaarlijks onderhoud. Neemt het rendement af, ontstaan er storingen of stijgt je gasverbruik, dan is vervanging vaak voordeliger dan blijven repareren. Een installateur adviseert op basis van leeftijd en staat van je ketel.

**Q: Hoe lang duurt het plaatsen van een nieuwe CV-ketel?**
A: Het plaatsen van een nieuwe CV-ketel duurt meestal een halve tot een hele werkdag wanneer de bestaande aansluitingen geschikt zijn. Is er extra leidingwerk of een nieuwe rookgasafvoer nodig, dan kan het langer duren. De vakman zorgt voor montage, inbedrijfstelling en uitleg.

**Q: Hoeveel garantie krijg ik op een CV-ketel?**
A: Op een nieuwe CV-ketel krijg je doorgaans 2 tot 5 jaar fabrieksgarantie, afhankelijk van merk en of je een onderhoudscontract afsluit. Daarnaast geldt garantie op de installatie zelf. Controleer altijd de garantievoorwaarden in de offerte van de installateur.

**Q: Wat moet ik doen bij een CV-storing?**
A: Lees bij een CV-storing eerst de foutcode op het display en controleer de waterdruk (idealiter 1,0–2,0 bar). Helpt bijvullen of resetten niet, schakel dan een vakman in. Bij een storingsdienst kan een monteur de oorzaak vaak nog dezelfde dag verhelpen.

---

## Warmtepomp (`/diensten/warmtepompen`, `/warmtepomp`, `/hybride-warmtepomp`)

**Q: Wat kost een warmtepomp installeren in 2026?**
A: Een warmtepomp installeren kost in 2026 ongeveer €4.250 tot €12.000, afhankelijk van het type en systeem. Een hybride warmtepomp ligt rond €3.500–€7.000, een lucht-water warmtepomp rond €6.000–€14.000. Vaak is ISDE-subsidie mogelijk, wat de netto kosten flink verlaagt.

**Q: Wat is een hybride warmtepomp?**
A: Een hybride warmtepomp is een combinatie van een elektrische warmtepomp en je bestaande CV-ketel. De warmtepomp neemt het grootste deel van de verwarming over en de ketel springt bij op koude dagen. Zo bespaar je fors op gas zonder je hele installatie te vervangen.

**Q: Kom ik in aanmerking voor ISDE-subsidie op een warmtepomp?**
A: Veel huiseigenaren komen in aanmerking voor ISDE-subsidie bij de aanschaf van een warmtepomp, mits het toestel op de RVO-apparatenlijst staat en wordt geïnstalleerd door een erkend bedrijf. De hoogte hangt af van type en vermogen. Een gecertificeerde installateur helpt met de juiste keuze en aanvraag.

**Q: Hybride of volledig elektrische warmtepomp — wat is beter?**
A: Kies een hybride warmtepomp bij een bestaande gasaansluiting en gemiddelde isolatie: lagere investering, snelle gasbesparing. Kies een volledige lucht-water warmtepomp bij een goed geïsoleerde woning met vloerverwarming of lage-temperatuurradiatoren. Een installateur berekent de warmtebehoefte en adviseert wat bij jouw woning past.

**Q: Hoe lang duurt het installeren van een warmtepomp?**
A: Het installeren van een warmtepomp duurt gemiddeld 1 tot 3 werkdagen, afhankelijk van het type, de plaatsing van de buitenunit en eventuele aanpassingen aan het afgiftesysteem. De installateur verzorgt de warmtebehoefteberekening, montage, inbedrijfstelling en uitleg over het gebruik.

**Q: Is mijn woning geschikt voor een warmtepomp?**
A: Een woning is geschikt voor een (volledige) warmtepomp als deze goed geïsoleerd is en kan verwarmen op lage temperatuur, bijvoorbeeld met vloerverwarming of grotere radiatoren. Is dat nog niet zo, dan is een hybride warmtepomp vaak een goede tussenstap. Een installateur beoordeelt dit ter plaatse.

---

## Lekkage & spoed (`/diensten/lekkage-en-spoed`, `/gaslekkage`, `/cv-storing`)

**Q: Wat kost een loodgieter bij spoed of een lekkage?**
A: Een spoedbezoek voor een lekkage kost doorgaans €90 tot €350, afhankelijk van het tijdstip, de aanrijkosten en de aard van het probleem. 's Nachts en in het weekend gelden vaak hogere tarieven. Vraag vooraf naar het voorrijtarief en uurloon zodat je niet voor verrassingen staat.

**Q: Wat moet ik doen bij een waterlekkage?**
A: Sluit bij een waterlekkage eerst de hoofdwaterkraan (meterkast) om verdere schade te beperken en vang lekkend water op. Schakel daarna snel een loodgieter in om de oorzaak op te sporen en te herstellen. Maak foto's voor je verzekering voordat je iets opruimt.

**Q: Wat doe ik bij een vermoedelijke gaslekkage?**
A: Ruik je gas, sluit dan direct de hoofdgaskraan, open ramen en deuren en gebruik geen elektrische schakelaars, stekkers of open vuur. Verlaat zo nodig de woning en bel bij acuut gevaar het noodnummer. Laat de lekkage altijd herstellen door een erkende installateur.

**Q: Kan ik 's nachts of in het weekend een loodgieter krijgen?**
A: Ja, voor spoedgevallen zoals lekkages, gaslucht of een uitgevallen CV-ketel zijn er loodgieters met een 24/7 spoeddienst. Geef bij je aanvraag aan dat het dringend is; beschikbare vakmannen in jouw regio reageren dan met voorrang, vaak nog dezelfde dag of nacht.

**Q: Hoe snel kan een spoedloodgieter ter plaatse zijn?**
A: Bij spoed kan een beschikbare loodgieter vaak binnen enkele uren ter plaatse zijn, afhankelijk van het tijdstip, je regio en de drukte. Vermeld duidelijk wat er aan de hand is en je postcode, zodat de dichtstbijzijnde vakman snel kan inschatten en uitrukken.

---

## Badkamer & sanitair (`/diensten/badkamer-en-sanitair`)

**Q: Wat kost een nieuwe badkamer in 2026?**
A: Een complete badkamerrenovatie kost in 2026 grofweg €6.000 tot €15.000 of meer, afhankelijk van grootte, materialen, tegelwerk en sanitair. Het installatie- en loodgieterswerk (leidingen, afvoeren, kranen, toilet) is hiervan een deel. Vraag offertes op maat aan om de kosten voor jouw situatie te vergelijken.

**Q: Hoe lang duurt het verbouwen van een badkamer?**
A: Een badkamerverbouwing duurt gemiddeld 1 tot 3 weken, afhankelijk van de omvang, sloopwerk, tegelwerk en droogtijden. Het loodgieters- en installatiewerk is daarbinnen meestal enkele dagen. Een goede planning met de vakman voorkomt vertraging en stemt de verschillende werkzaamheden op elkaar af.

**Q: Wat kost het vervangen van een kraan of toilet?**
A: Het vervangen van een kraan kost meestal €80 tot €200 inclusief arbeid, een toilet vervangen ongeveer €150 tot €450, exclusief het sanitair zelf. De prijs hangt af van bereikbaarheid van de aansluitingen en het type. Vraag een vakman om een offerte voor een exacte prijs.

**Q: Welke garantie krijg ik op badkamerwerk?**
A: Op installatie- en loodgieterswerk in de badkamer geldt doorgaans garantie van de uitvoerende vakman, vaak 1 tot 5 jaar afhankelijk van het werk. Op sanitair en kranen geldt daarnaast fabrieksgarantie. Leg de garantievoorwaarden altijd vast in de offerte of opdrachtbevestiging.

---

## Implementatienoot voor het dev-team

- Wire each group as one `FAQPage` via `faqLd([{ question, answer }, ...])` on de bijbehorende pagina, plus zichtbare `<details>` Q&A zodat content én markup overeenkomen (Google/AI verlangen consistentie tussen on-page en schema).
- Houd vraag-formuleringen dicht bij echte AI-prompts ("wat kost…", "hoe lang duurt…", "wat doe ik bij…").
- Refresh prijzen en het jaartal periodiek; recency telt voor Perplexity en Gemini.
- Voeg geen review-aantallen of vakman-aantallen toe aan deze antwoorden of aan AggregateRating tenzij verifieerbaar — dit zijn marketingcijfers.
