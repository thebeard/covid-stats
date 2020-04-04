import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsResolver } from '../../records';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  {
    component: DataComponent,
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
export class DataRoutingModule {}
