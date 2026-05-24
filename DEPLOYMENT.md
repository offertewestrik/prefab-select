# Deployment Handler & Guide: Cloud Run & Firebase Setup

Dit document begeleidt u stap-voor-stap bij het implementeren en hosten van de volledige **Prefab Select** applicatie op uw eigen **Google Cloud Run** omgeving en het koppelen met uw eigen **Firebase** database.

---

## 💡 1. Veelgestelde Vragen & Architectuur in Nederland

### 1.1 Kan ik hetzelfde Firebase Project gebruiken als `prefabselectconfigurator.nl`?
**Ja, absoluut!** Dit is zelfs de aanbevolen methode als u al een Firebase-project heeft voor `prefabselectconfigurator.nl`. Door hetzelfde project te gebruiken, kunt u:
- Al uw leads, website-interacties en configuratiegegevens overzichtelijk in **één database** (Cloud Firestore) beheren.
- Dezelfde Firebase-project ID gebruiken voor beide apps, wat uw administratie bij Google Cloud vereenvoudigt.
- De client-side configuratie (ApiKey, AppId, etc.) simpelweg overnemen en in `firebase-applet-config.json` plakken.

### 1.2 Firebase als "Tussenstation" (Snelheid & Latency in Nederland)
Om te voorkomen dat de geografische afstand (bijv. als uw eerdere hostingpartij of platform in Londen of elders stond) voor vertraging zorgt, maakt deze applicatie gebruik van een slimme hybride opzet:
1. **Direct naar Firebase (Client-side)**: Wanneer een bezoeker een offerte aanvraagt of door de website navigeert, communiceert de browser rechtstreeks met Firebase Firestore. Omdat Firebase een wereldwijd Content Delivery Network (CDN) met edge-locaties direct in Amsterdam gebruikt, laden de pagina's en data-opslagen onmiddellijk (sub-milliseconde latency).
2. **Cloud Run in Eemshaven (Dichtbij)**: Wanneer we de Express backend draaien voor zware taken (zoals de Gemini AI-koppeling of e-mail notificaties via Resend), zetten we deze op in de Cloud Run regio **`europe-west4` (Eemshaven, Groningen)**. Dit zorgt ervoor dat alle server-to-server verbindingen binnen de landgrenzen van Nederland blijven met een ping van minder dan **10ms**!

---

## 🏗️ 2. Firebase Project Inrichting

Om uw eigen database en authenticatie te gebruiken (nieuw of gedeeld met `prefabselectconfigurator.nl`):

### Stap 2.1: Firebase Project kiezen of aanmaken
1. Ga naar de [Firebase Console](https://console.firebase.google.com/).
2. Selecteer uw bestaande project van **prefabselectconfigurator.nl** óf klik op **Project toevoegen** om een nieuwe aan te maken.

### Stap 2.2: Firestore Database Activeren
1. Navigeer in de Firebase Console in het linkermenu naar **Build > Firestore Database**.
2. Klik op **Database maken** (indien nog niet geactiveerd in uw project).
3. Kies de gewenste locatie: kies **europe-west4 (Eemshaven)** of **europe-west3 (Frankfurt)** voor optimale responsetijd in Nederland.
4. Start in **productiemodus** (veilig).

### Stap 2.3: Firebase Authentication Activeren
1. Ga in de Firebase Console naar **Build > Authentication**.
2. Klik op **Aan de slag** en stel de gewenste beheerder-aanmeldmethoden in (bijv. Google-inloggen of E-mail/Wachtwoord).

---

## 🔒 3. Beveiligingsregels (Firestore Rules)

De beveiligingsregels zijn uiterst belangrijk om uw database te beschermen tegen onbevoegde schrijvers of lezers.

### Stap 3.1: Beveiligingsregels publiceren via de Console
1. Open de `firestore.rules` die in deze repository staat.
2. Ga in de Firebase Console naar uw **Firestore Database** en klik op het tabblad **Regels**.
3. Plak de volledige inhoud van `firestore.rules` hierin en klik op **Publiceren**.

---

## ⚙️ 4. Lokale Client Configuratie

U moet de client-side Firebase configuratie bijwerken zodat uw website praat met het juiste project:

1. Klik in uw Firebase Console op het tandwiel-icoon naast 'Projectoverzicht' en kies **Projectinstellingen**.
2. Scrol naar beneden naar **Mijn apps** en selecteer of maak een nieuwe **Web-app**.
3. Kopieer het configuratie-object dat Firebase u toont.
4. Open het bestand genaamd `firebase-applet-config.json` in de hoofdmap van uw applicatie en vervang de waarden door die van uw eigen project:

```json
{
  "projectId": "UW_FIREBASE_PROJECT_ID",
  "appId": "UW_FIREBASE_APP_ID",
  "apiKey": "UW_API_KEY",
  "authDomain": "UW_FIREBASE_PROJECT_ID.firebaseapp.com",
  "firestoreDatabaseId": "(default)",
  "storageBucket": "UW_FIREBASE_PROJECT_ID.firebasestorage.app",
  "messagingSenderId": "UW_SENDER_ID"
}
```

---

## 📦 5. Bouwen & Implementeren op Google Cloud Run

Omdat deze applicatie een geavanceerde Express-backend heeft (voor de Gemini AI Chatbot, Make.com triggers, en e-mailnotificaties via Resend), gebruiken we een Docker-container op Google Cloud Run.

### Optie A: Automatisch bouwen via Cloud Build (Aanbevolen)
Met Google Cloud Build kunt u de applicatie rechtstreeks bouwen in de cloud via de Google Cloud CLI:

1. Zorg dat u de [Google Cloud SDK](https://cloud.google.com/sdk) lokaal op uw computer heeft geïnstalleerd en bent ingelogd met:
   ```bash
   gcloud auth login
   ```
2. Stel uw actieve project in:
   ```bash
   gcloud config set project UW_GOOGLE_PROJECT_ID
   ```
3. Schakel de benodigde API's in:
   ```bash
   gcloud services enable run.googleapis.com \
                          cloudbuild.googleapis.com \
                          artifactregistry.googleapis.com
   ```
4. Bouw en push de Docker-afbeelding rechtstreeks naar uw project met één commando:
   ```bash
   gcloud builds submit --tag gcr.io/UW_GOOGLE_PROJECT_ID/prefab-select:latest .
   ```

---

## 🚀 6. Starten op Cloud Run in Nederland (`europe-west4`)

Nadat u de container-afbeelding heeft gebouwd, implementeert u deze op Cloud Run met de juiste omgevingsvariabelen (Environment Variables). 

**Heel belangrijk**: We selecteren hier expliciet `--region=europe-west4` (Eemshaven, Groningen, Nederland) om maximale snelheid te garanderen.

```bash
gcloud run deploy prefab-select \
  --image gcr.io/UW_GOOGLE_PROJECT_ID/prefab-select:latest \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production,FIREBASE_PROJECT_ID=UW_FIREBASE_PROJECT_ID,GEMINI_API_KEY=UW_GEMINI_KEY,RESEND_API_KEY=UW_RESEND_KEY,CONTACT_RECEIVER_EMAIL=offerte@prefabselect.nl,MAKE_WEBHOOK_URL=UW_MAKE_WEBHOOK"
```

### Belangrijke Service Account Rechten (IAM)
Om te zorgen dat uw Cloud Run service toegang heeft tot Firestore:
1. Zoek het e-mailadres op van het service account dat Cloud Run gebruikt (meestal het `Default Compute Service Account` of een specifiek aangemaakt service account).
2. Ga in de Google Cloud Console naar **IAM & Beheer > IAM**.
3. Voeg de rol **Cloud Datastore-gebruiker** (Cloud Datastore User) toe aan dit service account.

---

## 🌐 7. Eigen Domein Koppelen (Custom Domain)

U kunt uw eigen domeinnaam (bijvoorbeeld `prefabselect.nl` of een subdomain zoals `portaal.prefabselect.nl`) rechtstreeks aan uw Cloud Run-applicatie koppelen.

### Stap 7.1: Domein koppelen via Google Cloud Run Console
1. Ga naar de [Cloud Run Console](https://console.cloud.google.com/run).
2. Klik bovenin de pagina op **Aangepaste domeinen beheren** (Manage custom domains).
3. Klik op **Koppeling toevoegen** (Add mapping).
4. Selecteer de gewenste service (`prefab-select`) en voer uw domeinnaam in.
5. Google Cloud toont u nu een set **DNS Records** (meestal een `A`-record of `CNAME`-record).
6. Log in bij uw domeinprovider (waar u uw domeinnaam heeft geregistreerd) en voeg de DNS-records toe onder uw DNS-instellingen.
7. Google verzorgt automatisch een gratis SSL (HTTPS) certificaat. Dit kan 15 minuten tot een paar uur duren om volledig actief te worden.

---

## 🌟 8. Omgevingsvariabelen Overzicht

Zorg ervoor dat de volgende omgevingsvariabelen zijn ingesteld in de containerconfiguratie op Cloud Run:

| Variabele | Doel | Voorbeeld |
| :--- | :--- | :--- |
| **`NODE_ENV`** | Moet altijd op `production` staan. | `production` |
| **`FIREBASE_PROJECT_ID`** | Uw eigen Firebase project-ID. | `prefab-select-prod` |
| **`GEMINI_API_KEY`** | Google Gemini API Sleutel voor de chatbot. | `AIzaSy...` |
| **`RESEND_API_KEY`** | API sleutel van uw Resend account voor e-mails. | `re_abc123...` |
| **`CONTACT_RECEIVER_EMAIL`** | Adres waar offerte-aanvragen naartoe worden gemaild.| `offerte@prefabselect.nl` |
| **`MAKE_WEBHOOK_URL`** | Webhook URL om leads te synchroniseren met Make.com.| `https://hook.us2.make.com/...` |

Gefeliciteerd! Uw applicatie draait nu volledig onafhankelijk, snel en veilig in de Nederlandse Google Cloud regio.
