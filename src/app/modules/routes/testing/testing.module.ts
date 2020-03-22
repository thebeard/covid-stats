import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';

import { TestingRoutingModule } from './testing-routing.module';

import { TestingComponent } from './testing/testing.component';

@NgModule({
  declarations: [TestingComponent],
  imports: [CommonModule, MatExpansionModule, TestingRoutingModule]
})
export class TestingModule {}
