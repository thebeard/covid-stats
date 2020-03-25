import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsResolver } from '../../data/statistics';

import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    component: MapsComponent,
    path: '',
    resolve: {
      results: StatisticsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule {}
