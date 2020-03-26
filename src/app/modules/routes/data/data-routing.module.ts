import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsResolver } from '../../data/statistics';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  {
    component: DataComponent,
    path: '',
    resolve: {
      statistics: StatisticsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {}
