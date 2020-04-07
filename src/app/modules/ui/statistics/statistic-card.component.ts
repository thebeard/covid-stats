import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { BaseCard } from './cards/base-card';
import { Record } from '../../../interfaces';
import { StatisticsDataSet } from './statistics.types';

@Component({
  selector: 'app-statistic-card',
  template: ` <app-card [title]="title" [description]="description">
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
  </app-card>`,
  styles: [
    `
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticCardComponent implements OnChanges {
  @Input() card: BaseCard;
  @Input() description: string;
  @Input() record: Record;
  @Input() title: string;
  statistics: StatisticsDataSet;

  ngOnChanges(changes: SimpleChanges) {
    const { record } = changes;
    if (record && record.currentValue && this.card) {
      this.statistics = this.card.getStatistics(record.currentValue);
    }
  }
}
