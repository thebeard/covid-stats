import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { InfoDataModule } from '../../data/info-data';
import { ResourcesRoutingModule } from './resources-routing-module';

import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [CommonModule, InfoDataModule, MatCardModule, ResourcesRoutingModule]
})
export class ResourcesModule {}
