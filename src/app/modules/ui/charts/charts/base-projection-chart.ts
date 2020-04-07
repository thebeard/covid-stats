import { BaseChart } from './base-chart';

export abstract class BaseProjectionChart extends BaseChart {
  constructor(protected calculateDay: number, protected projectAhead) {
    super();
  }

  getCalculateDay(): number {
    return this.calculateDay;
  }

  getProjectAhead(): number {
    return this.projectAhead;
  }

  updateCalculateDay(calculateDay: number) {
    this.calculateDay = calculateDay;
  }

  updateProjectAhead(daysAhead: number) {
    this.projectAhead = daysAhead;
  }
}
