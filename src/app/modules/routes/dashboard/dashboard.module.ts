import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatisticsModule } from '../../data/statistics';
import { StatisticsUIModule } from '../../ui/statistics-ui';

import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../../../../environments/environment';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AgmCoreModule.forRoot({ apiKey: environment.googleApiKey }),
    CommonModule,
    ChartsModule,
    DashboardRoutingModule,
    MatCardModule,
    MatSliderModule,
    StatisticsModule,
    StatisticsUIModule
  ]
})
export class DashboardModule {}
