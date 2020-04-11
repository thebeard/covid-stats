import { Component, Input, ChangeDetectionStrategy, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { DEFAULT_LINE_CHART_OPTIONS } from './line-chart.model';
import { Record } from '../../../../interfaces';
import { BaseChart } from '../charts/base-chart';
import { deepCopy, mergeOptions } from '../../../../app.functions';

@Component({
  selector: 'app-line-chart',
  template: `<app-card [title]="title" [description]="description" [info]="info">
    <canvas baseChart [datasets]="data" [labels]="labels" [options]="resolvedOptions" [legend]="legend" chartType="line"></canvas
  ></app-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnChanges {
  @Input() description: string;
  @Input() chart: BaseChart;
  @Input() info: string;
  @Input() legend = true;
  @Input() options: ChartOptions;
  @Input() records: Record[];
  @Input() title: string;

  data: ChartDataSets[];
  labels: Label[];
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
      this.resolvedOptions = mergeOptions(deepCopy(this.defaultOptions), options);
    } else if (!this.resolvedOptions) {
      this.resolvedOptions = this.defaultOptions;
    }

    if (records && records.length && this.chart) {
      this.data = this.chart.getData(records);
      this.labels = this.chart.getLabels(records);
    }
  }
}
