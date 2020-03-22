import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';

import { environment } from '../../environments/environment';
import { StatisticsModule } from '../statistics/statistics.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AgmCoreModule.forRoot({ apiKey: environment.googleApiKey }),
    CommonModule,
    ChartsModule,
    DashboardRoutingModule,
    MatCardModule,
    MatSliderModule,
    StatisticsModule
  ],
  providers: [DashboardService]
})
export class DashboardModule {}
