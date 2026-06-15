/**
 * GitHub integration service (mock).
 *
 * Swap `MOCK` calls for the GitHub REST API (https://api.github.com) using an
 * `Authorization: Bearer ${GITHUB_TOKEN}` header, or the Octokit SDK. The method
 * signatures are stable so UI code does not change when going live.
 */

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  defaultBranch: string;
  stars: number;
  openIssues: number;
  language: string;
  updatedAt: string;
}

export interface GitHubBranch { name: string; protected: boolean; ahead: number; behind: number; }
export interface GitHubCommit { sha: string; message: string; author: string; at: string; }
export interface GitHubIssue { number: number; title: string; state: 'open' | 'closed'; labels: string[]; author: string; }
export interface GitHubDeploy { environment: string; status: 'success' | 'in_progress' | 'failure'; ref: string; at: string; }

const delay = <T>(v: T, ms = 280) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const githubService = {
  isConfigured(): boolean {
    return Boolean((import.meta as any).env?.VITE_GITHUB_TOKEN);
  },

  async getRepos(_repoFullName?: string): Promise<GitHubRepo[]> {
    return delay([
      { name: 'prefab-select', fullName: 'offertewestrik/prefab-select', description: 'Premium marketing site + Agency Command Center', defaultBranch: 'main', stars: 8, openIssues: 3, language: 'TypeScript', updatedAt: new Date(Date.now() - 5 * 3600000).toISOString() },
      { name: 'configurator', fullName: 'offertewestrik/configurator', description: '3D prefab configurator (Cloud Run)', defaultBranch: 'main', stars: 4, openIssues: 1, language: 'TypeScript', updatedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
      { name: 'lucky-site', fullName: 'agency/lucky-site', description: 'Lucky Zonwering website', defaultBranch: 'main', stars: 1, openIssues: 3, language: 'JavaScript', updatedAt: new Date(Date.now() - 3600000).toISOString() },
    ]);
  },

  async getBranches(_repo: string): Promise<GitHubBranch[]> {
    return delay([
      { name: 'main', protected: true, ahead: 0, behind: 0 },
      { name: 'claude/awesome-mayer-eo1qjy', protected: false, ahead: 12, behind: 1 },
      { name: 'feature/agency-dashboard', protected: false, ahead: 5, behind: 3 },
    ]);
  },

  async getCommits(_repo: string): Promise<GitHubCommit[]> {
    return delay([
      { sha: '983d76e', message: 'refactor: streamline build process and site config', author: 'Sjoerd', at: new Date(Date.now() - 5 * 3600000).toISOString() },
      { sha: '4146a24', message: 'Merge pull request #3 — prerendering', author: 'Sjoerd', at: new Date(Date.now() - 2 * 86400000).toISOString() },
      { sha: '6d698e8', message: 'Prerendering: 61 statische paginas', author: 'Sjoerd', at: new Date(Date.now() - 3 * 86400000).toISOString() },
    ]);
  },

  async getIssues(_repo: string): Promise<GitHubIssue[]> {
    return delay([
      { number: 12, title: 'Lead formulier valideert telefoon niet', state: 'open', labels: ['bug'], author: 'daan' },
      { number: 11, title: 'Configurator laadt traag op mobiel', state: 'open', labels: ['performance'], author: 'lisa' },
      { number: 9, title: 'SEO: meta descriptions ontbreken', state: 'open', labels: ['seo'], author: 'daan' },
    ]);
  },

  async getDeploys(_repo: string): Promise<GitHubDeploy[]> {
    return delay([
      { environment: 'production', status: 'success', ref: 'main', at: new Date(Date.now() - 6 * 3600000).toISOString() },
      { environment: 'preview', status: 'in_progress', ref: 'feature/agency-dashboard', at: new Date(Date.now() - 600000).toISOString() },
    ]);
  },
};
