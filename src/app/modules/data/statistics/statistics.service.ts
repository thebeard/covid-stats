import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppStoreService } from '../../../app-store.service';

import { DailyStatistic } from '../../../interfaces';

import { environment } from '../../../../environments/environment';

@Injectable()
export class StatisticsService {
  private readonly uri = environment.dailyStatsApi;
  private resultIndex: number;

  private result = new BehaviorSubject(null);
  result$ = this.result.asObservable();

  private resultIndexAtStart: Subject<number> = new Subject();
  resultIndexAtStart$ = this.resultIndexAtStart.asObservable();

  private stale: Subject<boolean> = new Subject();
  stale$ = this.stale.asObservable();

  constructor(private Http: HttpClient, private Store: AppStoreService) {
    interval(60000).subscribe(() => {
      const difference = new Date().getTime() - this.Store.get('synced');
      if (difference / 1000 / 60 / 60 > 4) {
        this.stale.next(true);
      } else {
        this.stale.next(false);
      }
    });
  }

  async getRadiusFactor(states: string[], idealRadius: number): Promise<number> {
    const statistics = await this.getResults();

    // Reduce to max in data set
    const maxInDataSet = statistics.reduce((maxDataSet, statistic) => {
      // Reduce to max in daily
      const maxInDaily = states.reduce((maxDaily, stateCode) => {
        const state: DailyStatistic = statistic[stateCode],
          confirmed = state && state.confirmed ? state.confirmed : 0;

        return confirmed > maxDaily ? confirmed : maxDaily;
      }, 0);

      return maxInDaily > maxDataSet ? maxInDaily : maxDataSet;
    }, 0);

    return idealRadius / maxInDataSet;
  }

  getResults(force = false): Promise<DailyStatistic[]> {
    if (force) {
      this.Store.clearAll();
      this.resultIndex = undefined;
      this.result.next(undefined);
      this.resultIndexAtStart.next(undefined);
      this.stale.next(false);
    }

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
            results.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            this.Store.set({
              stats: results,
              synced: new Date().getTime()
            });
            if (!this.resultSet) {
              const index = results.length - 1;
              this.setResult(index, results);
              this.resultIndexAtStart.next(index);
              this.resultIndexAtStart.complete();
              this.stale.next(false);
            }
          })
        )
        .toPromise() as Promise<any>;
    }
  }

  getSyncTime(): string {
    const date = new Date(this.Store.get('synced'));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
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
