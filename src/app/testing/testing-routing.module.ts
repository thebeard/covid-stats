import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  {
    component: TestingComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule {}
