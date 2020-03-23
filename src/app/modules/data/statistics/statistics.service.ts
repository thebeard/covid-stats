import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppStoreService } from '../../../app-store.service';

import { DailyStatistic } from '../../../interfaces';

import { environment } from '../../../../environments/environment';

@Injectable()
export class StatisticsService {
  private readonly uri = environment.dailyStatsApi;

  private result = new BehaviorSubject(null);
  result$ = this.result.asObservable();

  private resultIndex: number;
  private resultIndexAtStart: Subject<number> = new Subject();
  resultIndexAtStart$ = this.resultIndexAtStart.asObservable();

  constructor(private Http: HttpClient, private Store: AppStoreService) {}

  getResults(): Promise<DailyStatistic[]> {
    const stats = this.Store.get('stats');

    if (stats) {
      if (!this.resultSet) {
        const index = stats.length - 1;
        this.setResult(index, stats);
        this.resultIndexAtStart.next(index);
        this.resultIndexAtStart.complete();
      }
      return Promise.resolve(stats);
    } else {
      const headers = new HttpHeaders({ 'x-apikey': environment.dailyStatsApiKey });
      return this.Http.get<DailyStatistic[]>(this.uri, { headers })
        .pipe(
          tap(results => {
            this.Store.set({ stats: results });
            if (!this.resultSet) {
              const index = results.length - 1;
              this.setResult(index, results);
              this.resultIndexAtStart.next(index);
              this.resultIndexAtStart.complete();
            }
          })
        )
        .toPromise() as Promise<any>;
    }
  }

  setResult(index: number, results?: DailyStatistic[]) {
    this.resultIndex = index;
    if (!results) {
      results = this.Store.get('stats');
    }

    if (results) {
      this.result.next(results[this.resultIndex]);
    }
  }

  private get resultSet(): boolean {
    return !!this.resultIndex && !!this.result.getValue();
  }
}
