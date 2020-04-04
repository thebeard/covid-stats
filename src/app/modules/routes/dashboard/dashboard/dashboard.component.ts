import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { LayoutService } from '../../../../services';
import { RecordsService } from '../../../records';
import { Record } from '../../../../interfaces';
import { environment } from '../../../../../environments/environment';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  calculateDay: number;
  footerExpanded$: Observable<boolean>;
  historyLabels: Label[];
  projectAhead = 7;
  projectedHistoryLabels: Label[];
  showControls = environment.production ? false : true;

  readonly lineChartLegend = true;
  readonly lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
        },
      ],
    },
  };
  readonly lineChartOptionsPercentage = Object.assign({}, this.lineChartOptions, {
    tooltips: {
      callbacks: {
        label: node => `${node.value}%`,
      },
    },
  });
  readonly lineChartType = 'line';

  nationalSummaryChartData: ChartDataSets[];
  nationalSummaryChartWithExponential: ChartDataSets[];
  nationalSummaryChartWithTestsData: ChartDataSets[];
  nationalGrowthChartData: ChartDataSets[];

  readonly population = 59109333;

  record: Record;
  records: Record[];

  constructor(private Layout: LayoutService, private Route: ActivatedRoute, private Stats: RecordsService) {}

  ngOnInit() {
    this.Route.data.subscribe(data => {
      this.records = data.records;
      this.calculateDay = this.records.length - 14;
      this.initialiseCharts();
    });

    this.Stats.record$.subscribe(record => (this.record = record));
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));
  }

  calculateExponentialChart() {
    if (!this.projectAhead) {
      return;
    }

    const exponentialConfirmed = [this.records[0].confirmed],
      division = this.records[this.calculateDay].confirmed / this.records[0].confirmed,
      factor = 1 + Math.log(division) / this.calculateDay;

    for (let i = 1; i < this.records.length + this.projectAhead; i++) {
      exponentialConfirmed.push(Math.floor(exponentialConfirmed[i - 1] * factor));
    }

    // Generate national summary with exponential chart data
    this.nationalSummaryChartWithExponential = [
      { data: [...this.records.map(record => record.confirmed), ...Array(this.projectAhead)], label: 'Confirmed' },
      { data: exponentialConfirmed, label: 'Projection' },
    ];

    const lastDate = new Date(this.records[this.records.length - 1].date),
      projectedLabels = Array(this.projectAhead)
        .fill(null)
        .map(() => {
          lastDate.setDate(lastDate.getDate() + 1);
          return `${lastDate.getDate()}/${lastDate.getMonth() + 1}`;
        });

    this.projectedHistoryLabels = [...this.historyLabels, ...projectedLabels];
  }

  updateDate(change: MatSliderChange) {
    this.Stats.setSelectedRecord(change.value);
  }

  private initialiseCharts() {
    // Generate national summary chart data
    this.nationalSummaryChartData = [
      { data: this.records.map(record => record.confirmed), label: 'Confirmed' },
      { data: this.records.map(record => record.confirmed - record.recovered - record.deaths), label: 'Active' },
      { data: this.records.map(record => record.deaths), label: 'Fatalities' },
      { data: this.records.map(record => record.recovered), label: 'Recovered' },
    ];

    // Generate national summary with tests conducted data
    this.nationalSummaryChartWithTestsData = [
      { data: this.records.map(record => record.confirmed), label: 'Confirmed' },
      { data: this.records.map(record => record.tests), label: 'Tests' },
    ];

    // Generate national growth chart
    this.nationalGrowthChartData = [
      {
        data: this.records.map(this.mapGrowthChart.bind(this, 'confirmed')) as number[],
        label: 'Confirmed',
      },
    ];
    this.nationalGrowthChartData[0].data[0] = this.nationalGrowthChartData[0].data[1];

    // Generate labels for use in multiple charts
    this.historyLabels = this.records.map(record => {
      const date = new Date(record.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    this.calculateExponentialChart();
  }

  private mapGrowthChart(key: string, record: Record, index: number): number {
    if (index === 0) {
      return 0;
    } else {
      return +((record[key] / this.records[index - 1][key] - 1) * 100).toFixed(2);
    }
  }
}
