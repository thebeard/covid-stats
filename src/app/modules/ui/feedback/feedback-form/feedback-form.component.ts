import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  feedback: FormGroup;
  loading = false;
  sent = false;
  subject: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: { subject: string }, private Feedback: FeedbackService, private Snackbar: MatSnackBar) {
    this.subject = data.subject;
  }

  ngOnInit() {
    this.feedback = new FormGroup({
      email: new FormControl(null, Validators.email),
      name: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }

  send() {
    this.loading = true;
    const { email, name, message } = this.feedback.value;
    this.Feedback.sendFeedback(email, name, this.subject, message)
      .then(() => {
        this.Snackbar.open('Message sent successfully', null, { duration: 2000 });
        this.feedback.reset();
        this.feedback.updateValueAndValidity();
        this.sent = true;
      })
      .catch(() => {
        this.Snackbar.open('Message not sent. Please try again later.', 'Dismiss');
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
