import { Component, Inject, OnChanges, ChangeDetectionStrategy, SimpleChanges, Input } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';

import { BaseProjectionChart } from '../charts/base-projection-chart';
import { DEFAULT_LINE_CHART_OPTIONS } from '../line-chart/line-chart.model';
import { Label } from 'ng2-charts';
import { Record } from '../../../../interfaces';

@Component({
  selector: 'app-line-chart-advanced',
  templateUrl: './line-chart-advanced.component.html',
  styleUrls: ['./line-chart-advanced.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartAdvancedComponent implements OnChanges {
  @Input() description: string;
  @Input() chart: BaseProjectionChart;
  @Input() legend = true;
  @Input() options: ChartOptions;
  @Input() records: Record[];
  @Input() title: string;

  calculateDay: number;
  data: ChartDataSets[];
  labels: Label[];
  projectAhead: number;
  resolvedOptions: ChartOptions;

  constructor(@Inject(DEFAULT_LINE_CHART_OPTIONS) private defaultOptions: ChartOptions) {}

  ngOnChanges(changes: SimpleChanges) {
    let options: ChartOptions, records: Record[];
    if (changes.options && changes.options.currentValue) {
      options = changes.options.currentValue;
    }
    if (changes.records && changes.records.currentValue) {
      records = changes.records.currentValue;
    }

    if (options) {
      this.resolvedOptions = { ...this.defaultOptions, ...options };
    } else if (!this.resolvedOptions) {
      this.resolvedOptions = this.defaultOptions;
    }

    if (records && this.chart) {
      this.calculateDay = this.chart.getCalculateDay();
      this.projectAhead = this.chart.getProjectAhead();
      this.calculateExponentialChart();
    }
  }

  calculateExponentialChart() {
    this.data = this.chart.getData(this.records);
    this.labels = this.chart.getLabels(this.records);
  }

  onCalculateDayUpdate() {
    this.chart.updateCalculateDay(this.calculateDay);
    this.calculateExponentialChart();
  }

  onProjectAheadUpdate() {
    this.chart.updateProjectAhead(this.projectAhead);
    this.calculateExponentialChart();
  }
}
