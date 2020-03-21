import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  private readonly uri = environment.dailyStatsApi;

  constructor(private Http: HttpClient) {}

  getResults(): Promise<any> {
    const headers = new HttpHeaders({ 'x-apikey': environment.dailyStatsApiKey });
    return this.Http.get(this.uri, { headers }).toPromise() as Promise<any>;
  }
}
