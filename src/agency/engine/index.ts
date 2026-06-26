/**
 * Automation engine — public API.
 *
 * Deploy target: call `runOnce(store, { mode })` from a scheduled trigger
 * (Firebase Cloud Functions `onSchedule('every 15 minutes')` or a Cloud Run
 * endpoint hit by Cloud Scheduler). Implement `EngineStore` against Firestore.
 * See AUTOMATION.md for the full deployment + connector guide.
 */

export * from './types';
export * from './brain';
export * from './agents';
export * from './runner';
