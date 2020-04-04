import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsResolver } from '../../records';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    component: MapsComponent,
    path: '',
    resolve: {
      records: RecordsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
