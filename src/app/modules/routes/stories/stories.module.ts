import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';

import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [StoriesComponent],
  imports: [CommonModule, StoriesRoutingModule]
})
export class StoriesModule {}
