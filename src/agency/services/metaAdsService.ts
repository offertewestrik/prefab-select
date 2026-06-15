/**
 * Meta (Facebook/Instagram) Ads integration service (mock).
 *
 * Replace with the Meta Marketing API:
 *   GET https://graph.facebook.com/v19.0/{ad-account-id}/insights
 *   ?fields=campaign_name,spend,reach,clicks,actions,purchase_roas
 *   &access_token={META_ADS_ACCESS_TOKEN}
 *
 * Map the response into the `Campaign` type from `../types`.
 */

import { campaigns } from '../data/mockData';
import type { Campaign } from '../types';

const delay = <T>(v: T, ms = 300) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const metaAdsService = {
  isConfigured(): boolean {
    return Boolean((import.meta as any).env?.VITE_META_ADS_ACCESS_TOKEN);
  },

  async getCampaigns(companyId: string): Promise<Campaign[]> {
    return delay(campaigns.filter((c) => c.companyId === companyId && c.platform === 'Meta Ads'));
  },

  async getAccountSummary(companyId: string) {
    const list = campaigns.filter((c) => c.companyId === companyId && c.platform === 'Meta Ads');
    const spend = list.reduce((s, c) => s + c.spend, 0);
    const leads = list.reduce((s, c) => s + c.leads, 0);
    const reach = list.reduce((s, c) => s + c.reach, 0);
    const clicks = list.reduce((s, c) => s + c.clicks, 0);
    const roas = list.length ? list.reduce((s, c) => s + c.roas, 0) / list.length : 0;
    return delay({ spend, leads, reach, clicks, roas, costPerLead: leads ? Math.round(spend / leads) : 0 });
  },
};
