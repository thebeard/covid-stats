import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [CommonModule],
  providers: [StatisticsService]
})
export class StatisticsModule {}
