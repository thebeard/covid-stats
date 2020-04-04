import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { LoaderService } from '../../services';
import { RecordsService } from './records.service';
import { Record } from '../../interfaces';

@Injectable()
export class RecordsResolver implements Resolve<Record[]> {
  constructor(public Loader: LoaderService, private Records: RecordsService) {}

  resolve(): Promise<Record[]> {
    this.Loader.setRouteLoader();
    return this.Records.getRecords().finally(() => {
      this.Loader.setRouteLoader(false);
    });
  }
}
