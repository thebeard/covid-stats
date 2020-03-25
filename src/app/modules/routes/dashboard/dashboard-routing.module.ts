import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsResolver } from '../../data/statistics';

const routes: Routes = [
  {
    component: DashboardComponent,
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
export class DashboardRoutingModule {}
