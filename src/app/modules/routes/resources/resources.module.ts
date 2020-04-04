import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ResourcesRoutingModule } from './resources-routing-module';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesService } from './resources.service';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [CommonModule, MatCardModule, ResourcesRoutingModule],
  providers: [ResourcesResolver, ResourcesService],
})
export class ResourcesModule {}
