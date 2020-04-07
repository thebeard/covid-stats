import { ChartDataSets } from 'chart.js';

import { BaseChart } from './base-chart';
import { Record } from '../../../../interfaces';

export class ConfirmedVsTestsChart extends BaseChart {
  getData(records: Record[]): ChartDataSets[] {
    return [
      { data: records.map(record => record.confirmed), label: 'Confirmed' },
      { data: records.map(record => record.tests), label: 'Tests' },
    ];
  }
}
