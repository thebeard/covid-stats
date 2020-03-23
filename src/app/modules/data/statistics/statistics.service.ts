import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AppStoreService } from '../../../app-store.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class StatisticsService {
  private readonly uri = environment.dailyStatsApi;

  constructor(private Http: HttpClient, private Store: AppStoreService) {}

  getResults(): Promise<any> {
    const stats = this.Store.get('stats');

    if (stats) {
      return Promise.resolve(stats);
    } else {
      const headers = new HttpHeaders({ 'x-apikey': environment.dailyStatsApiKey });
      return this.Http.get(this.uri, { headers })
        .pipe(
          tap(results => {
            this.Store.set({ stats: results });
          })
        )
        .toPromise() as Promise<any>;
    }
  }
}
