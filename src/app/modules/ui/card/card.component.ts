import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<mat-card>
    <h3>
      {{ title }}
      <mat-icon *ngIf="info" [matTooltip]="info">info</mat-icon>
    </h3>
    <p>{{ description }}</p>
    <div>
      <ng-content></ng-content>
    </div>
  </mat-card>`,
  styles: [
    `
      div {
        display: flex;
      }
      h3 mat-icon {
        vertical-align: top;
      }
      p {
        text-align: center;
        font-size: 0.85rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() description: string;
  @Input() info: string;
  @Input() title: string;
}
