import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/routes/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./modules/routes/resources/resources.module').then(m => m.ResourcesModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./modules/routes/maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./modules/routes/testing/testing.module').then(m => m.TestingModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./modules/routes/stories/stories.module').then(m => m.StoriesModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
