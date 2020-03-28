import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Directive({
  selector: '[appFeedbackForm]'
})
export class FeedbackFormDirective {
  @Input() subject = 'General Feedback';
  @HostBinding('style') style = 'cursor: pointer;';
  @HostListener('click') click() {
    this.Dialog.open(FeedbackFormComponent, {
      data: {
        subject: this.subject
      }
    });
  }

  constructor(private Dialog: MatDialog) {}
}
