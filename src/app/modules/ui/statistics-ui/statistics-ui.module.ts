import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestStatComponent } from './test-stat/test-stat.component';

@NgModule({
  declarations: [TestStatComponent],
  imports: [CommonModule],
  exports: [TestStatComponent]
})
export class StatisticsUIModule {}
