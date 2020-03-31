import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { StoriesDataModule } from '../../data/stories-data';
import { StoriesRoutingModule } from './stories-routing.module';

import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [StoriesComponent],
  imports: [CommonModule, MatCardModule, StoriesDataModule, StoriesRoutingModule]
})
export class StoriesModule {}
