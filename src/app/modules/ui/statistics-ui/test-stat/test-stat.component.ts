import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-test-stat',
  template: `
    <div>
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
        <dd>{{ percPositivePopulation | percent: '1.4' }}</dd>
      </dl>
    </div>
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
