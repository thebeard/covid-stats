import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoResolver } from '../../data/info-data';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {
    component: ResourcesComponent,
    path: '',
    resolve: {
      resources: InfoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {}
