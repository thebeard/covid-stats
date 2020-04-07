import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Record } from '../../../../interfaces';

export abstract class BaseChart {
  abstract getData(records: Record[]): ChartDataSets[];
  getLabels(records: Record[]): Label[] {
    return records.map(record => {
      const date = new Date(record.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });
  }
}
