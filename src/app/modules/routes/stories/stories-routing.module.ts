import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesResolver } from './stories.resolver';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  {
    component: StoriesComponent,
    path: '',
    resolve: {
      stories: StoriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule {}
