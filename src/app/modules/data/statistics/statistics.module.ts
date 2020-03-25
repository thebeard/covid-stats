import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [CommonModule],
  providers: [StatisticsResolver, StatisticsService]
})
export class StatisticsModule {}
