import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-test-stat',
  template: `
    <div *ngIf="!!conducted; else noStats">
      <dl>
        <dt>Conducted</dt>
        <dd>{{ conducted }}</dd>
        <dt>Positive</dt>
        <dd>{{ confirmed / conducted | percent }}</dd>
      </dl>
      <dl>
        <dt>Negative</dt>
        <dd>{{ negative / conducted | percent }}</dd>
        <dt>Population active</dt>
        <dd>{{ percPositivePopulation | percent: '1.3' }}</dd>
      </dl>
    </div>
    <ng-template #noStats>
      <p>Insufficient information available to display statistics for this date range.</p>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestStatComponent {
  @Input() conducted: number;
  @Input() confirmed: number;
  @Input() population: number;
  @Input() recovered: number;

  get negative(): number {
    return this.conducted - this.confirmed;
  }

  get percPositivePopulation(): number {
    return (this.confirmed - this.recovered) / this.population;
  }
}
