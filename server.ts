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
      console.error("Firestore leads initial sync skipped:", err.message);
      console.log("Proceeding with local files & disk cache.");
    }
  }
}

// Run background init
initLeadsCache();

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
  const { name, email, phone, projectType, message } = req.body;

  console.log("Received lead request:", { name, email, phone, projectType });

  try {
    // 1. Send Email via Resend (Primary Notification)
    if (resend) {
      try {
        await resend.emails.send({
          from: "Prefab Select <onboarding@resend.dev>",
          to: process.env.CONTACT_RECEIVER_EMAIL || "offerte@prefabselect.nl",
          subject: `Nieuwe aanvraag: ${projectType} van ${name}`,
          html: `
            <h1>Nieuwe Lead Ontvangen</h1>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone}</p>
            <p><strong>Project:</strong> ${projectType}</p>
            <p><strong>Bericht:</strong></p>
            <p>${message || "Geen bericht achtergelaten."}</p>
            <hr />
            <p>Deze aanvraag is opgeslagen in ons dashboard en doorgezet naar Make.com.</p>
          `,
        });
        console.log("Lead notification email sent via Resend.");
      } catch (resendError: any) {
        console.error("Failed to send Resend notification:", resendError.message);
      }
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
          status: "new",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Lead stored in Firestore with ID:", firestoreId);
      } catch (fbError: any) {
        console.error("Failed to store lead in Firestore:", fbError.message);
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
      status: "new",
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

// GET Endpoint to retrieve all leads (with Firestore fallback sync)
app.get("/api/leads", async (req, res) => {
  if (db) {
    try {
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
          createdAt: createdAtStr
        };
      });

      // Merge and filter duplicates
      const merged = [...localLeads];
      for (const fsL of firestoreLeads) {
        const idx = merged.findIndex(m => m.id === fsL.id);
        if (idx !== -1) {
          merged[idx] = fsL;
        } else {
          merged.push(fsL);
        }
      }
      merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      localLeads = merged;
      await saveLocalLeadsToDisk();
    } catch (err: any) {
      console.error("Error reading fresh leads from Firestore, returning cached leads:", err.message);
    }
  }
  res.json(localLeads);
});

// PATCH Endpoint to update lead status
app.patch("/api/leads/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  console.log(`Updating lead ${id} status to ${status}`);

  // Update locally first
  const leadIndex = localLeads.findIndex(l => l.id === id);
  if (leadIndex !== -1) {
    localLeads[leadIndex].status = status;
    await saveLocalLeadsToDisk();
  }

  // Sync to firestore in background if available
  if (db) {
    try {
      const leadRef = db.collection("leads").doc(id);
      const docSnap = await leadRef.get();
      if (docSnap.exists) {
        await leadRef.update({ status });
        console.log(`Successfully updated lead ${id} in Firestore.`);
      } else {
        const localLead = localLeads[leadIndex];
        if (localLead) {
          await leadRef.set({
            firstName: localLead.firstName,
            lastName: localLead.lastName,
            email: localLead.email,
            phone: localLead.phone,
            projectType: localLead.projectType,
            message: localLead.message,
            status,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Created missing lead ${id} in Firestore.`);
        }
      }
    } catch (err: any) {
      console.error(`Firestore lead ${id} update failed (silent bypass):`, err.message);
    }
  }

  res.json({ success: true, message: `Lead status updated to ${status}` });
});

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
