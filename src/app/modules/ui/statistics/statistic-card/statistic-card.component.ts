import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Record } from '../../../../interfaces';
import { StatisticsDataSet } from '../statistics.types';

@Component({
  selector: 'app-statistic-card',
  template: `<mat-card>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div>
      <dl>
        <dt>{{ statistics[0].label }}</dt>
        <dd>{{ statistics[0].value }}</dd>
        <dt>{{ statistics[1].label }}</dt>
        <dd>{{ statistics[1].value }}</dd>
      </dl>
      <dl>
        <dt>{{ statistics[2].label }}</dt>
        <dd>{{ statistics[2].value }}</dd>
        <dt>{{ statistics[3].label }}</dt>
        <dd>{{ statistics[3].value }}</dd>
      </dl>
    </div>
  </mat-card>`,
  styles: [
    `
      div {
        display: flex;
      }
      dl {
        flex-grow: 1;
      }
      dd {
        font-size: 2.4rem;
        margin: 0px 0 15px;
      }
      dd,
      dt {
        text-align: center;
      }
    `,
  ],
})
export class StatisticCardComponent implements OnChanges {
  @Input() card: new () => any;
  @Input() description: string;
  @Input() record: Record;
  @Input() title: string;
  statistics: StatisticsDataSet;

  ngOnChanges(changes: SimpleChanges) {
    const { record, card } = changes;
    if (record && record.currentValue && this.card) {
      const transformer = new this.card();
      this.statistics = transformer.getStatistics(record.currentValue);
    }
  }
}
