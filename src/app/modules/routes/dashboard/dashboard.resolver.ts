import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { StatisticsService } from '../../data/statistics';
import { LoaderService } from '../../state/loader';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(private Dashboard: StatisticsService, public Loader: LoaderService) {}

  resolve(): Promise<any> {
    this.Loader.setRouteLoader();
    return this.Dashboard.getResults().finally(() => {
      this.Loader.setRouteLoader(false);
    });
  }
}
