import express from "express";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai";
import admin from "firebase-admin";
import { Resend } from "resend";

dotenv.config();

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

import fsSync from "fs";
import { getFirestore } from "firebase-admin/firestore";

// Find named database ID and project ID if set
let firestoreDbId: string | undefined = process.env.FIRESTORE_DATABASE_ID;
let firebaseProjectId: string | undefined = process.env.FIREBASE_PROJECT_ID;

try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fsSync.existsSync(configPath)) {
    const configJson = JSON.parse(fsSync.readFileSync(configPath, "utf-8"));
    if (configJson.projectId) {
      firebaseProjectId = configJson.projectId;
      console.log("Loaded projectId from firebase-applet-config.json:", firebaseProjectId);
    }
    if (configJson.firestoreDatabaseId) {
      firestoreDbId = configJson.firestoreDatabaseId;
      console.log("Loaded firestoreDatabaseId from firebase-applet-config.json:", firestoreDbId);
    }
  }
} catch (err: any) {
  console.error("Failed to read firebaseconfig from firebase-applet-config.json:", err.message);
}

// Initialize Firebase Admin
try {
  if (firebaseProjectId) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: firebaseProjectId,
    });
    console.log("Firebase Admin successfully initialized on project:", firebaseProjectId);
  } else {
    console.warn("No Firebase Project ID found. Firebase Admin not initialized.");
  }
} catch (error: any) {
  console.error("Firebase Admin initialization failed:", error.message);
}

const db = admin.apps.length 
  ? (firestoreDbId ? getFirestore(admin.apps[0], firestoreDbId) : getFirestore()) 
  : null;

// Local leads cache definition
let localLeads: any[] = [];
const FALLBACK_FILE = path.join(process.cwd(), "leads_fallback.json");

// Save helper
async function saveLocalLeadsToDisk() {
  try {
    await fs.writeFile(FALLBACK_FILE, JSON.stringify(localLeads, null, 2), "utf-8");
  } catch (err: any) {
    console.error("Failed to write leads fallback file:", err.message);
  }
}

// Load / Init helper
async function initLeadsCache() {
  // Load from disk fallback first
  try {
    const data = await fs.readFile(FALLBACK_FILE, "utf-8");
    localLeads = JSON.parse(data);
    console.log(`Loaded ${localLeads.length} leads from disk fallback archive.`);
  } catch (err) {
    // File doesn't exist yet, that's fine
  }

  // Try to sync with Firestore if enabled
  if (db) {
    try {
      console.log("Fetching fresh leads from Firestore...");
      const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
      const firestoreLeads = snapshot.docs.map(doc => {
        const data = doc.data();
        let createdAtStr = new Date().toISOString();
        if (data.createdAt) {
          if (typeof data.createdAt.toDate === "function") {
            createdAtStr = data.createdAt.toDate().toISOString();
          } else if (data.createdAt._seconds) {
            createdAtStr = new Date(data.createdAt._seconds * 1000).toISOString();
          } else {
            createdAtStr = new Date(data.createdAt).toISOString();
          }
        }
        return {
          id: doc.id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          projectType: data.projectType || "",
          message: data.message || "",
          status: data.status || "new",
          emailDeliveryStatus: data.emailDeliveryStatus || undefined,
          emailDeliveryError: data.emailDeliveryError || undefined,
          createdAt: createdAtStr
        };
      });

      // Merge Firestore leads with local leads, avoiding duplicates
      const merged: any[] = [...localLeads];
      for (const fsL of firestoreLeads) {
        if (!merged.some(m => m.id === fsL.id)) {
          merged.push(fsL);
        }
      }
      merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      localLeads = merged;
      await saveLocalLeadsToDisk();
      console.log(`Leads cache successfully initialized. Total merged leads: ${localLeads.length}`);
    } catch (err: any) {
      console.log("Firestore leads initial sync skipped (permissions default), using local cache:", err.message);
      console.log("Proceeding with local files & disk cache.");
    }
  }
}

// Run background init
initLeadsCache();

// Express server configuration
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());

// Initialize AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `
You are the "Prefab Select AI Design Expert". Your goal is to help users design their perfect prefab extension, chalet, or vacation home.
You possess deep knowledge of modular construction, Swiss precision engineering, and modern architecture.

Core Principles:
1. Knowledgeable: You know about Rc-values (6.0), steel frame construction, and high-quality finishes.
2. Aesthetic: You suggest modern, minimalist, and functional designs.
3. Realistic: You advise on permit requirements (vergunningsvrij rules in NL) and practical layouts.
4. Professional: You are helpful, polite, and technical yet accessible.

Context about Prefab Select:
- We build in our own factory (Artisans of Space).
- Placement usually happens in 1-2 days.
- We use high-grade isolation and sustainable materials.
- We offer customized solutions for private homes and business projects.

When asked for design help:
- Ask about the intended use (office, living room, bedroom).
- Ask about dimensions and desired style (modern, classic, industrial).
- Suggest configurations that maximize light (large glass sections, skylights).
- Always mention that for detailed pricing and technical feasibility, they should request a formal quote or consultation via the website.

Translate your expertise into Dutch (the primary language of our site), but if a user speaks English, respond in English.
`;

// API Routes
app.post("/api/ai/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ 
      error: "AI generation failed",
      details: error.message 
    });
  }
});
app.post("/api/leads", async (req, res) => {
  const { 
    name, 
    email, 
    phone, 
    projectType, 
    message,
    kozijnPui,
    kozijnKleur,
    lichtstraat,
    stalenDoorbraak,
    dakIsolatie,
    wandIsolatie,
    vloerIsolatie
  } = req.body;

  console.log("Received lead request:", { name, email, phone, projectType });

  try {
    // 1. Send Email via Resend (Primary Notification with Double-Insurance fallback)
    let emailDeliveryStatus: "pending" | "success" | "failed" | "not_sent" = "not_sent";
    let emailDeliveryError: string | null = null;

    const optSectionHtml = kozijnPui ? `
      <h3>Geselecteerde Configuratiedetails & Specificaties</h3>
      <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; max-width: 600px; border-collapse: collapse; font-family: sans-serif; margin-bottom: 20px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 220px;">Kozijn & Pui Type:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${kozijnPui}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Kleur Kozijn (RAL):</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${kozijnKleur || 'Niet gespecificeerd'}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Lichtstraat:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${lichtstraat || 'Geen'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Stalen Geveldoorbraak:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${stalenDoorbraak || 'Niet gespecificeerd'}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a;">Isolatie Dak (Standaard):</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e3a8a; font-weight: bold;">${dakIsolatie || 'Rc 6.3 (Voldoet ruimschoots)'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a;">Isolatie Wanden (Standaard):</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e3a8a; font-weight: bold;">${wandIsolatie || 'Rc 6.0 (Hybride PIR + Wol)'}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a;">Isolatie Vloer (Standaard):</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e3a8a; font-weight: bold;">${vloerIsolatie || 'Rc 5.0 (Vloerverwarming voorbereid)'}</td>
        </tr>
      </table>
    ` : '';

    if (resend) {
      emailDeliveryStatus = "pending";
      const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "offerte@prefabselect.nl";
      
      // Determine primary sender: use configured, or default to domains/receivers domain if verified, or fallback
      let primarySender = process.env.RESEND_SENDER_EMAIL;
      if (!primarySender) {
        // Default to offerte@prefabselect.nl as requested
        primarySender = "offerte@prefabselect.nl";
      }

      try {
        console.log(`Resend: Attempting to send from custom/domain sender: ${primarySender}`);
        const response = await resend.emails.send({
          from: `Prefab Select <${primarySender}>`,
          to: receiverEmail,
          subject: `Nieuwe aanvraag: ${projectType} van ${name}`,
          html: `
            <h1>Nieuwe Lead Ontvangen</h1>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone}</p>
            <p><strong>Project:</strong> ${projectType}</p>
            ${optSectionHtml}
            <p><strong>Bericht:</strong></p>
            <p>${message || "Geen bericht achtergelaten."}</p>
            <hr />
            <p>Deze aanvraag is opgeslagen in ons dashboard en doorgezet naar Make.com.</p>
          `,
        });

        // Resend API returns error object in body sometimes even if HTTP is 200
        if (response.error) {
          throw new Error(response.error.message || "Resend API returned an error");
        }

        emailDeliveryStatus = "success";
        console.log("Lead notification email sent successfully via primary sender:", primarySender);
      } catch (firstTryError: any) {
        console.warn(`Primary sender ${primarySender} failed: ${firstTryError.message}. Retrying with onboarding@resend.dev...`);
        
        try {
          const response = await resend.emails.send({
            from: `Prefab Select <onboarding@resend.dev>`,
            to: receiverEmail,
            subject: `Nieuwe aanvraag: ${projectType} van ${name}`,
            html: `
              <h1>Nieuwe Lead Ontvangen</h1>
              <p><strong>Naam:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefoon:</strong> ${phone}</p>
              <p><strong>Project:</strong> ${projectType}</p>
              ${optSectionHtml}
              <p><strong>Bericht:</strong></p>
              <p>${message || "Geen bericht achtergelaten."}</p>
              <hr />
              <p>Deze aanvraag is opgeslagen in ons dashboard en doorgezet naar Make.com.</p>
            `,
          });

          if (response.error) {
            throw new Error(response.error.message || "Resend API returned an error on fallback");
          }

          emailDeliveryStatus = "success";
          console.log("Lead notification email sent successfully via fallback sender (onboarding@resend.dev).");
        } catch (fallbackError: any) {
          emailDeliveryStatus = "failed";
          emailDeliveryError = fallbackError?.message || String(fallbackError);
          console.error("Failed to send Resend notification on both primary and fallback senders:", emailDeliveryError);
        }
      }
    } else {
      emailDeliveryStatus = "failed";
      emailDeliveryError = "Resend is niet geconfigureerd in de server omgevingsvariabelen.";
    }

    // 2. Store in Firebase Firestore (Source of Truth)
    let firestoreId = null;
    if (db) {
      try {
        const leadRef = db.collection("leads").doc();
        firestoreId = leadRef.id;
        await leadRef.set({
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "-",
          email,
          phone,
          projectType,
          message: message || "No message provided.",
          kozijnPui: kozijnPui || "",
          kozijnKleur: kozijnKleur || "",
          lichtstraat: lichtstraat || "",
          stalenDoorbraak: stalenDoorbraak || "",
          dakIsolatie: dakIsolatie || "",
          wandIsolatie: wandIsolatie || "",
          vloerIsolatie: vloerIsolatie || "",
          status: "new",
          emailDeliveryStatus,
          emailDeliveryError: emailDeliveryError || "",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Lead stored in Firestore with ID:", firestoreId);
      } catch (fbError: any) {
        console.log("Firestore store skipped/not authorized, using local cache backup:", fbError.message);
      }
    }

    // Generate local fallback ID if Firestore is omitted or failed
    const finalId = firestoreId || `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newLocalLead = {
      id: finalId,
      firstName: name.split(" ")[0] || name,
      lastName: name.split(" ").slice(1).join(" ") || "-",
      email,
      phone,
      projectType,
      message: message || "Geen bericht achtergelaten.",
      kozijnPui: kozijnPui || "",
      kozijnKleur: kozijnKleur || "",
      lichtstraat: lichtstraat || "",
      stalenDoorbraak: stalenDoorbraak || "",
      dakIsolatie: dakIsolatie || "",
      wandIsolatie: wandIsolatie || "",
      vloerIsolatie: vloerIsolatie || "",
      status: "new",
      emailDeliveryStatus,
      emailDeliveryError: emailDeliveryError || "",
      createdAt: new Date().toISOString()
    };
    
    // Unshift to place in front, save to local disk fallbacks immediately
    localLeads.unshift(newLocalLead);
    await saveLocalLeadsToDisk();

    // 3. Sync to Make.com Webhook (Background task)
    let webhookStatus = "not_configured";
    const rawWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (rawWebhookUrl) {
      const webhookUrl = rawWebhookUrl.trim().replace(/^["'](.+)["']$/, '$1');
      webhookStatus = "sending";
      (async () => {
        try {
          console.log(`Attempting to send lead to Make webhook: ${webhookUrl.substring(0, 35)}...`);
          
          await axios.post(webhookUrl, {
            id: finalId,
            name,
            email,
            phone,
            projectType,
            message,
            kozijnPui: kozijnPui || "",
            kozijnKleur: kozijnKleur || "",
            lichtstraat: lichtstraat || "",
            stalenDoorbraak: stalenDoorbraak || "",
            dakIsolatie: dakIsolatie || "",
            wandIsolatie: wandIsolatie || "",
            vloerIsolatie: vloerIsolatie || "",
            source: "Prefab Select Website",
            submittedAt: new Date().toISOString()
          }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000 
          });
          
          console.log("SUCCESS: Lead successfully reached Make.com.");
        } catch (makeError: any) {
          const status = makeError.response?.status;
          console.error(`ERROR: Make.com sync failed with status ${status || 'unknown'}.`);
          console.error("Full error message:", makeError.message);
        }
      })();
    } else {
      console.warn("MAKE_WEBHOOK_URL is missing in environment variables. Lead won't be synced to Make.com.");
    }

    res.status(201).json({ 
      success: true, 
      message: "Lead successfully processed.",
      webhookStatus
    });

  } catch (error: any) {
    console.error("Process lead failed:", error.message);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
});


// GET /api/health to perform status check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
