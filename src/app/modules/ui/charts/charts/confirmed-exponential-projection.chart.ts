import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { BaseProjectionChart } from './base-projection-chart';
import { Record } from '../../../../interfaces';

export class ConfirmedExponentialProjectionChart extends BaseProjectionChart {
  getData(records: Record[]): ChartDataSets[] {
    const exponentialConfirmed = [records[0].confirmed],
      division = records[this.calculateDay].confirmed / records[0].confirmed,
      factor = 1 + Math.log(division) / this.calculateDay;

    for (let i = 1; i < records.length + this.projectAhead; i++) {
      exponentialConfirmed.push(Math.floor(exponentialConfirmed[i - 1] * factor));
    }

    // Generate national summary with exponential chart data
    return [
      { data: [...records.map(record => record.confirmed), ...Array(this.projectAhead)], label: 'Confirmed' },
      { data: exponentialConfirmed, label: 'Projection' },
    ];
  }

  getLabels(records: Record[]): Label[] {
    const historyLabels = records.map(record => {
      const date = new Date(record.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    const lastDate = new Date(records[records.length - 1].date),
      projectedLabels = Array(this.projectAhead)
        .fill(null)
        .map(() => {
          lastDate.setDate(lastDate.getDate() + 1);
          return `${lastDate.getDate()}/${lastDate.getMonth() + 1}`;
        });

    return [...historyLabels, ...projectedLabels];
  }
}
