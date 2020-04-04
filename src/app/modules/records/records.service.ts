import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppStore } from '../../app.store';
import { Record } from '../../interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecordsService {
  private readonly uri = `${environment.api}/daily-stats`;
  private recordIndex: number;

  private record = new BehaviorSubject(null);
  record$ = this.record.asObservable();

  private recordIndexAtStart: Subject<number> = new Subject();
  recordIndexAtStart$ = this.recordIndexAtStart.asObservable();

  private stale: Subject<boolean> = new Subject();
  stale$ = this.stale.asObservable();

  private static getRadiusFactorForRecords(records: Record[], states: string[], idealRadius: number): number {
    // Reduce to max in data set
    const maxInDataSet = records.reduce((maxDataSet, statistic) => {
      // Reduce to max in daily
      const maxInDaily = states.reduce((maxDaily, stateCode) => {
        const state: Record = statistic[stateCode],
          confirmed = state && state.confirmed ? state.confirmed : 0;

        return confirmed > maxDaily ? confirmed : maxDaily;
      }, 0);

      return maxInDaily > maxDataSet ? maxInDaily : maxDataSet;
    }, 0);

    return idealRadius / maxInDataSet;
  }

  constructor(private Http: HttpClient, private Store: AppStore) {
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
    const records = await this.getRecords();
    return RecordsService.getRadiusFactorForRecords(records, states, idealRadius);
  }

  getRecords(force = false): Promise<Record[]> {
    if (force) {
      this.Store.clearAll();
      this.recordIndex = undefined;
      this.record.next(undefined);
      this.recordIndexAtStart.next(undefined);
      this.stale.next(false);
    }

    const store = this.Store.get('records');

    if (store) {
      if (!this.recordSet) {
        const index = store.length - 1;
        this.setSelectedRecord(index, store);
        this.recordIndexAtStart.next(index);
        this.recordIndexAtStart.complete();
      }
      return Promise.resolve(store);
    } else {
      return this.Http.get<Record[]>(this.uri)
        .pipe(
          tap(records => {
            records.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            this.Store.set({
              records,
              synced: new Date().getTime(),
            });
            if (!this.recordSet) {
              const index = records.length - 1;
              this.setSelectedRecord(index, records);
              this.recordIndexAtStart.next(index);
              this.recordIndexAtStart.complete();
              this.stale.next(false);
            }
          })
        )
        .toPromise() as Promise<Record[]>;
    }
  }

  getSyncTime(): string {
    const date = new Date(this.Store.get('synced'));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  setSelectedRecord(index: number, records?: Record[]) {
    this.recordIndex = index;
    if (!records) {
      records = this.Store.get('records');
    }

    if (records) {
      this.record.next(records[this.recordIndex]);
    }
  }

  private get recordSet(): boolean {
    return !!this.recordIndex && !!this.record.getValue();
  }
}
