import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FeedbackService } from './feedback.service';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackFormDirective } from './feedback-form.directive';

@NgModule({
  declarations: [FeedbackFormComponent, FeedbackFormDirective],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [FeedbackService],
  exports: [FeedbackFormDirective],
})
export class FeedbackModule {}
