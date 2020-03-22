import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { LoaderService } from '../../components/loader';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(private Dashboard: DashboardService, public Loader: LoaderService) {}

  resolve(): Promise<any> {
    this.Loader.setRouteLoader();
    return this.Dashboard.getResults().finally(() => {
      this.Loader.setRouteLoader(false);
    });
  }
}
