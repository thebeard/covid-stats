import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesResolver } from './resources.resolver';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {
    component: ResourcesComponent,
    path: '',
    resolve: {
      resources: ResourcesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
