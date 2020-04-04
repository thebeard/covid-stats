import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { StatisticCardComponent } from './statistic-card/statistic-card.component';

@NgModule({
  declarations: [StatisticCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [StatisticCardComponent],
})
export class StatisticsModule {}
