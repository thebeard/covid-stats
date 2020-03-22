import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-test-stat',
  template: `
    <div>
      <dl>
        <dt>Conducted</dt>
        <dd>{{ conducted }}</dd>
        <dt>Positive</dt>
        <dd>{{ confirmed }}</dd>
      </dl>
      <dl>
        <dt>Negative</dt>
        <dd>{{ negative }}</dd>
        <dt>% of population Active</dt>
        <dd>{{ percPositivePopulation }}</dd>
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

  get percPositivePopulation(): string {
    return (((this.confirmed - this.recovered) / this.population) * 100).toFixed(4);
  }
}
