import { ChartDataSets } from 'chart.js';

import { BaseChart } from './base-chart';
import { Record } from '../../../../interfaces';

export class RelativeDailyNewChart extends BaseChart {
  private static mapGrowthChart(records: Record[], key: string, record: Record, index: number): number {
    if (index === 0) {
      return 0;
    } else {
      return +((record[key] / records[index - 1][key] - 1) * 100).toFixed(2);
    }
  }

  getData(records: Record[]): ChartDataSets[] {
    const dataSets = [
      {
        data: records.map(RelativeDailyNewChart.mapGrowthChart.bind(null, records, 'confirmed')) as number[],
        label: 'Confirmed',
      },
    ];
    dataSets[0].data[0] = dataSets[0].data[1];

    return dataSets;
  }
}
