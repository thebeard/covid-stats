import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesService } from './stories.service';
import { StoriesResolver } from './stories.resolver';

@NgModule({
  imports: [CommonModule],
  providers: [StoriesService, StoriesResolver]
})
export class StoriesDataModule {}
