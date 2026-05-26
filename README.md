# Prefab Select - Premium Web Applicatie

Welkom bij de broncode van **Prefab Select**. Dit project is een moderne, premium, full-stack webapplicatie gebouwd met **React (Vite)** voor de frontend en een **Express (TypeScript)** server voor de backend. De styling volgt het exclusieve Prefab Select Design Systeem met een modern, minimalistisch en architectonisch ontwerp.

---

## 📁 Project Structuur & Belangrijke Bestanden

Dit ZIP-bestand bevat alle bestanden die nodig zijn om de applicatie lokaal te draaien of te hosten in een Docker-container (zoals Google Cloud Run):

| Bestand / Map | Beschrijving |
| :--- | :--- |
| `Dockerfile` | Het recept voor Docker om de applicatie te bouwen voor productie. |
| `.dockerignore` | Specificeert welke bestanden en mappen **niet** gekopieerd moeten worden naar de Docker image (zoals `node_modules`). |
| `server.ts` | De Express backend-server die API-routes afhandelt en de gecompileerde React-frontend serveert. |
| `package.json` | Bevat de projectinstellingen, scripts (`build`, `start`, `dev`) en alle benodigde bibliotheken. |
| `vite.config.ts` | Configuratie voor Vite (het build-systeem voor de frontend). |
| `tsconfig.json` | TypeScript-configuratie. |
| `src/` | De broncode van de React-frontend (pagina's, componenten, styling). |
| `public/` | Statische bestanden (afbeeldingen, video's, etc.). |
| `firebase.json`, `firestore.rules` | Firebase-configuratie en beveiligingsregels voor databasebeheer. |
| `.env.example` | Een voorbeeld van de omgevingsvariabelen die je kunt instellen. |

---

## 🚀 Hoe draai je dit project lokaal?

Volg deze stappen om de applicatie lokaal op je computer te installeren en te starten:

### Stap 1: Installeer Node.js
Zorg ervoor dat je [Node.js](https://nodejs.org/) (versie 18 of hoger) op je computer hebt geïnstalleerd.

### Stap 2: Installeer de pakketten (Dependencies)
Open je terminal of opdrachtpromp (CMD) in de projectmap en voer het volgende commando uit:
```bash
npm install
```

### Stap 3: Start de ontwikkelomgeving (Dev-modus)
Om de applicatie in levende ontwikkelmodus te starten (waarbij codewijzigingen direct zichtbaar zijn):
```bash
npm run dev
```
Open vervolgens [http://localhost:3000](http://localhost:3000) in je browser.

### Stap 4: Bouwen & Starten voor Productie
Als je de productie-versie lokaal wilt testen zoals deze op de live server draait:
1. Bouw de applicatie:
   ```bash
   npm run build
   ```
2. Start de gecompileerde server:
   ```bash
   npm run start
   ```
De applicatie is nu live op poort `3000` of de poort die is ingesteld via de `PORT`-variabele.

---

## 🐋 Bouwen & Starten met Docker

De meegeleverde `Dockerfile` is speciaal ontworpen en geoptimaliseerd voor cloud-omgevingen zoals Google Cloud Run. De server luistert standaard op poort **`8080`** (de standaardpoort voor Cloud Run).

### Lokaal bouwen met Docker:
```bash
docker build -t prefab-select .
```

### Lokaal draaien van de Docker-container:
```bash
docker run -p 8080:8080 --env-file .env prefab-select
```
Open [http://localhost:8080](http://localhost:8080) om je gecertificeerde container in actie te zien.

---

## 🔒 Firebase & Resend Integratie

Deze applicatie heeft ingebouwde integraties voor **Firebase Admin (database)** en **Resend (voor het versturen van e-mails)**.
Om deze functies te activeren, maak je een `.env` bestand aan in de root-map en vul je de volgende variabelen in:

```env
FIREBASE_PROJECT_ID=jouw-firebase-project-id
RESEND_API_KEY=jouw-resend-api-key
GEMINI_API_KEY=jouw-gemini-api-key
```

*Als deze sleutels niet aanwezig zijn, zal de applicatie nog steeds vlekkeloos opstarten met waarschuwingen in de console.*
