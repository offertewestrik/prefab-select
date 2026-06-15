/**
 * Google Analytics 4 integration service (mock).
 *
 * Replace with the GA4 Data API (Analytics Data API v1):
 *   POST https://analyticsdata.googleapis.com/v1beta/properties/{propertyId}:runReport
 * authenticated with a service account (GOOGLE_APPLICATION_CREDENTIALS).
 *
 * Map the report rows into the `AnalyticsSnapshot` type from `../types`.
 */

import { analytics } from '../data/mockData';
import type { AnalyticsSnapshot } from '../types';

const delay = <T>(v: T, ms = 300) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const googleAnalyticsService = {
  isConfigured(): boolean {
    return Boolean((import.meta as any).env?.VITE_GA4_PROPERTY_ID);
  },

  async getSnapshot(companyId: string): Promise<AnalyticsSnapshot | undefined> {
    return delay(analytics.find((a) => a.companyId === companyId));
  },
};
