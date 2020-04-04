import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { FeedbackModule } from '../../ui/feedback';
import { TestingRoutingModule } from './testing-routing.module';
import { TestingComponent } from './testing/testing.component';

@NgModule({
  declarations: [TestingComponent],
  imports: [CommonModule, FeedbackModule, MatExpansionModule, TestingRoutingModule],
})
export class TestingModule {}
