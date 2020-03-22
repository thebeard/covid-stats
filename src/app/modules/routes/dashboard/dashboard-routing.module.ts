import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardResolver } from './dashboard.resolver';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    resolve: {
      results: DashboardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardResolver]
})
export class DashboardRoutingModule {}
