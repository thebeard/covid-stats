import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [DataComponent],
  imports: [CommonModule, DataRoutingModule, MatButtonModule],
})
export class DataModule {}
