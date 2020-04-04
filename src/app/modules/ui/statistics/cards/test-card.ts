import { PercentPipe } from '@angular/common';

import { BaseCard } from './base-card';
import { Record } from '../../../../interfaces';
import { StatisticsDataSet } from '../statistics.types';
import { environment } from '../../../../../environments/environment';

export class TestCard extends BaseCard {
  private readonly percentPipe = new PercentPipe('en-za');

  getStatistics(record: Record): StatisticsDataSet {
    const { confirmed, recovered, tests } = record;
    return [
      {
        label: 'Conducted',
        value: tests,
      },
      {
        label: 'Positive',
        value: this.percentPipe.transform(confirmed / tests),
      },
      {
        label: 'Negative',
        value: this.percentPipe.transform((tests - confirmed) / tests),
      },
      {
        label: 'Population active',
        value: this.percentPipe.transform((confirmed - recovered) / environment.population, '1.3'),
      },
    ];
  }
}
