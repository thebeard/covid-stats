import { BaseCard } from './base-card';
import { Record } from '../../../../interfaces';
import { StatisticsDataSet } from '../statistics.types';

export class StatusCard extends BaseCard {
  getStatistics(record: Record): StatisticsDataSet {
    const { confirmed, recovered, deaths } = record;
    return [
      {
        label: 'Confirmed',
        value: confirmed,
      },
      {
        label: 'Active',
        value: confirmed - recovered - deaths,
      },
      {
        label: 'Fatalities',
        value: deaths,
      },
      {
        label: 'Recovered',
        value: recovered,
      },
    ];
  }
}
