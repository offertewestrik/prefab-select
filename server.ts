import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import admin from "firebase-admin";
import { Resend } from "resend";

dotenv.config();

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize Firebase Admin
try {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log("Firebase Admin successfully initialized.");
  } else {
    console.warn("FIREBASE_PROJECT_ID not found. Firebase Admin not initialized.");
  }
} catch (error: any) {
  console.error("Firebase Admin initialization failed:", error.message);
}

const db = admin.apps.length ? admin.firestore() : null;

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
            <p>Deze aanvraag is ook opgeslagen in Firebase en doorgestuurd naar Make.com.</p>
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

    // 3. Sync to Make.com Webhook (Background task)
    let webhookStatus = "not_configured";
    const rawWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (rawWebhookUrl) {
      // Clean up the URL: trim whitespace and remove potential wraparound quotes
      const webhookUrl = rawWebhookUrl.trim().replace(/^["'](.+)["']$/, '$1');
      
      webhookStatus = "sending";
      (async () => {
        try {
          console.log(`Attempting to send lead to Make webhook: ${webhookUrl.substring(0, 35)}...`);
          
          await axios.post(webhookUrl, {
            id: firestoreId,
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
          const data = makeError.response?.data;
          
          console.error(`ERROR: Make.com sync failed with status ${status || 'unknown'}.`);
          console.error("Full error message:", makeError.message);
          
          if (status === 404) {
            console.error("DEBUG INFO: A 404 error means the URL is invalid. Please double-check the MAKE_WEBHOOK_URL in your environment settings.");
            console.error(`Current URL being used (masked): ${webhookUrl.substring(0, 15)}...${webhookUrl.substring(webhookUrl.length - 10)}`);
          }
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

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
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
