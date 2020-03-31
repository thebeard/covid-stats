export interface Environment {
  asana?: {
    apiUrl: string;
    assignee: string;
    pat: string;
    project: string;
    workspace: string;
  };
  api?: string;
  apiKey?: string;
  googleApiKey?: string;
  production: boolean;
}
