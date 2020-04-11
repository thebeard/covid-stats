import { ChartDataSets } from 'chart.js';

import { BaseChart } from './base-chart';
import { Record } from '../../../../interfaces';

export class HistoryChart extends BaseChart {
  getData(records: Record[]): ChartDataSets[] {
    return [
      { data: records.map(record => record.confirmed - record.recovered - record.deaths), label: 'Active' },
      { data: records.map(record => record.recovered), label: 'Recovered' },
      { data: records.map(record => record.deaths), label: 'Fatalities' },
    ];
  }
}
