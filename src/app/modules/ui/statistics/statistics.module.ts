import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../card';
import { StatisticCardComponent } from './statistic-card.component';

@NgModule({
  declarations: [StatisticCardComponent],
  imports: [CardModule, CommonModule],
  exports: [StatisticCardComponent],
})
export class StatisticsModule {}
