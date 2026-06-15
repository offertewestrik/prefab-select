/**
 * Firebase project monitoring service (mock).
 *
 * In production this data comes from the Firebase Admin SDK / Google Cloud
 * Monitoring APIs (run server-side in a Cloud Function, never in the browser):
 *   - Firestore usage:   Cloud Monitoring metrics
 *   - Functions health:  Cloud Functions API + logs
 *   - Hosting:           Firebase Hosting REST API
 *   - Storage:           Cloud Storage usage metrics
 *
 * The browser calls your own `/api/firebase/status?projectId=...` endpoint,
 * which proxies the Admin SDK. Keep service-account credentials server-side.
 */

const delay = <T>(v: T, ms = 320) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export type ServiceHealth = 'operational' | 'degraded' | 'down';

export interface FirebaseProjectStatus {
  projectId: string;
  database: { status: ServiceHealth; reads: number; writes: number; docs: number };
  hosting: { status: ServiceHealth; lastDeploy: string; domain: string };
  functions: { status: ServiceHealth; invocations: number; errorRate: number };
  storage: { status: ServiceHealth; usedGb: number; files: number };
  errors: { id: string; level: 'warn' | 'error'; message: string; at: string }[];
  logs: { at: string; message: string }[];
}

export const firebaseAdminService = {
  isConfigured(): boolean {
    return Boolean((import.meta as any).env?.VITE_FIREBASE_PROJECT_ID);
  },

  async getProjectStatus(projectId: string): Promise<FirebaseProjectStatus> {
    return delay({
      projectId,
      database: { status: 'operational', reads: 184200, writes: 12400, docs: 9820 },
      hosting: { status: 'operational', lastDeploy: new Date(Date.now() - 6 * 3600000).toISOString(), domain: 'prefabselect.nl' },
      functions: { status: 'degraded', invocations: 8420, errorRate: 1.8 },
      storage: { status: 'operational', usedGb: 3.4, files: 1240 },
      errors: [
        { id: 'e1', level: 'error', message: 'sendQuoteEmail: Resend rate limit (429) — 2x in laatste uur', at: new Date(Date.now() - 1800000).toISOString() },
        { id: 'e2', level: 'warn', message: 'createLead: ontbrekend telefoonveld in 3 documenten', at: new Date(Date.now() - 5400000).toISOString() },
      ],
      logs: [
        { at: new Date(Date.now() - 600000).toISOString(), message: 'createLead executed (142ms)' },
        { at: new Date(Date.now() - 900000).toISOString(), message: 'sendQuoteEmail executed (310ms)' },
        { at: new Date(Date.now() - 1500000).toISOString(), message: 'dailyReport scheduled function completed' },
      ],
    });
  },
};
