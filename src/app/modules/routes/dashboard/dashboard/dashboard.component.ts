import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { LayoutService } from '../../../state/layout';
import { StatisticsService } from '../../../data/statistics';

import { DailyStatistic } from '../../../../interfaces';

import { environment } from '../../../../../environments/environment';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  calculateDay = 9;
  footerExpanded$: Observable<boolean>;
  historyLabels: Label[];
  projectAhead = 5;
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
            maxTicksLimit: 6
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5
          }
        }
      ]
    }
  };
  readonly lineChartOptionsPercentage = Object.assign({}, this.lineChartOptions, {
    tooltips: {
      callbacks: {
        label: node => `${node.value}%`
      }
    }
  });
  readonly lineChartType = 'line';

  nationalSummaryChartData: ChartDataSets[];
  nationalSummaryChartWithExponential: ChartDataSets[];
  nationalSummaryChartWithTestsData: ChartDataSets[];
  nationalGrowthChartData: ChartDataSets[];

  readonly population = 59109333;

  result: DailyStatistic;
  results: DailyStatistic[];

  constructor(private Layout: LayoutService, private Route: ActivatedRoute, private Stats: StatisticsService) {}

  ngOnInit() {
    this.Route.data.subscribe(data => {
      this.results = data.results;
      this.initialiseCharts();
    });

    this.Stats.result$.subscribe(result => (this.result = result));
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));
  }

  calculateExponentialChart() {
    if (!this.projectAhead) {
      return;
    }

    const exponentialConfirmed = [this.results[0].confirmed],
      division = this.results[this.calculateDay].confirmed / this.results[0].confirmed,
      factor = 1 + Math.log(division) / this.calculateDay;

    for (let i = 1; i < this.results.length + this.projectAhead; i++) {
      exponentialConfirmed.push(Math.floor(exponentialConfirmed[i - 1] * factor));
    }

    // Generate national summary with exponential chart data
    this.nationalSummaryChartWithExponential = [
      { data: [...this.results.map(result => result.confirmed), ...Array(this.projectAhead)], label: 'Confirmed' },
      { data: exponentialConfirmed, label: 'Projection' }
    ];

    const lastDate = new Date(this.results[this.results.length - 1].date),
      projectedLabels = Array(this.projectAhead)
        .fill(null)
        .map(() => {
          lastDate.setDate(lastDate.getDate() + 1);
          return `${lastDate.getDate()}/${lastDate.getMonth() + 1}`;
        });

    this.projectedHistoryLabels = [...this.historyLabels, ...projectedLabels];
  }

  updateDate(change: MatSliderChange) {
    this.Stats.setResult(change.value);
  }

  private initialiseCharts() {
    // Generate national summary chart data
    this.nationalSummaryChartData = [
      { data: this.results.map(result => result.confirmed), label: 'Confirmed' },
      { data: this.results.map(result => result.confirmed - result.recovered - result.deaths), label: 'Active' },
      { data: this.results.map(result => result.deaths), label: 'Fatalities' },
      { data: this.results.map(result => result.recovered), label: 'Recovered' }
    ];

    // Generate national summary with tests conducted data
    this.nationalSummaryChartWithTestsData = [
      { data: this.results.map(result => result.confirmed), label: 'Confirmed' },
      { data: this.results.map(result => result.testsConducted), label: 'Tests' }
    ];

    // Generate national growth chart
    this.nationalGrowthChartData = [
      {
        data: this.results.map(this.mapGrowthChart.bind(this, 'confirmed')) as number[],
        label: 'Confirmed'
      }
    ];
    this.nationalGrowthChartData[0].data[0] = this.nationalGrowthChartData[0].data[1];

    // Generate labels for use in multiple charts
    this.historyLabels = this.results.map(result => {
      const date = new Date(result.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    this.calculateExponentialChart();
  }

  private mapGrowthChart(key: string, result: DailyStatistic, index: number): number {
    if (index === 0) {
      return 0;
    } else {
      return +((result[key] / this.results[index - 1][key] - 1) * 100).toFixed(2);
    }
  }
}
