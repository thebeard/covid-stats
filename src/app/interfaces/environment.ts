export interface Environment {
  asana?: {
    apiUrl: string;
    assignee: string;
    pat: string;
    project: string;
    workspace: string;
  };
  dailyStatsApi?: string;
  dailyStatsApiKey?: string;
  googleApiKey?: string;
  production: boolean;
}
