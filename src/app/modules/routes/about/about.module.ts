import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { FeedbackModule } from '../../ui/feedback';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, CommonModule, FeedbackModule],
})
export class AboutModule {}
