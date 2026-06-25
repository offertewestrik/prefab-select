// Server-only Firebase Admin initialisatie.
// Geeft een Firestore-instance terug, of null als Firebase niet is ingesteld
// (de site blijft dan gewoon werken; leads worden dan alleen gemaild).

import "server-only";
import admin from "firebase-admin";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cached: Firestore | null | undefined;

export function getDb(): Firestore | null {
  if (cached !== undefined) return cached;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) {
    console.warn(
      "[firebase] FIREBASE_PROJECT_ID ontbreekt — leads worden alleen gemaild, niet opgeslagen."
    );
    cached = null;
    return cached;
  }

  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId,
      });
      console.log("[firebase] Admin geïnitialiseerd voor project:", projectId);
    }
    const dbId = process.env.FIRESTORE_DATABASE_ID;
    cached = dbId
      ? getFirestore(admin.apps[0]!, dbId)
      : getFirestore();
  } catch (err) {
    console.error("[firebase] Initialisatie mislukt:", (err as Error).message);
    cached = null;
  }
  return cached;
}

export const LEADS_COLLECTION = "leads";

// Re-export voor serverTimestamp e.d.
export { admin };
