import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesService } from './stories.service';
import { StoriesResolver } from './stories.resolver';
import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [StoriesComponent],
  imports: [CommonModule, MatCardModule, StoriesRoutingModule],
  providers: [StoriesResolver, StoriesService]
})
export class StoriesModule {}
