import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

import { LayoutService } from '../../../components/layout/layout.service';

import { DailyStatistic } from '../../../../interfaces/daily-statistic';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  footerExpanded$: Observable<boolean>;
  historyLabels: Label[];

  readonly lineChartColors: Color[] = [{ borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' }];
  readonly lineChartLegend = true;
  readonly lineChartOptions: ChartOptions = { responsive: true };
  readonly lineChartType = 'line';

  nationalSummaryChartData: ChartDataSets[];
  nationalSummaryChartWithExponential: ChartDataSets[];
  nationalSummaryChartWithTestsData: ChartDataSets[];
  nationalGrowthChartData: ChartDataSets[];

  readonly population = 60000000;

  result: DailyStatistic;
  resultIndex = 0;
  results: DailyStatistic[];

  constructor(private Layout: LayoutService, private Route: ActivatedRoute) {}

  ngOnInit() {
    this.Route.data.subscribe(data => {
      this.results = data.results;
      this.setResult(this.results.length - 1);
      this.initialiseCharts();
    });

    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));
  }

  updateDate(change: MatSliderChange) {
    this.setResult(change.value);
  }

  private initialiseCharts() {
    // Configure national confirmed cases exponential dataset
    const exponentialConfirmed = [this.results[0].confirmed];
    for (let i = 1; i < this.results.length; i++) {
      exponentialConfirmed.push(exponentialConfirmed[i - 1] * 2);
    }

    // Generate national summary chart data
    this.nationalSummaryChartData = [
      { data: this.results.map(result => result.confirmed), label: 'Confirmed' },
      { data: this.results.map(result => result.confirmed - result.recovered - result.deaths), label: 'Active' },
      { data: this.results.map(result => result.deaths), label: 'Deaths' },
      { data: this.results.map(result => result.recovered), label: 'Recovered' }
    ];

    // Generate national summary with exponential chart data
    this.nationalSummaryChartWithExponential = [
      { data: this.results.map(result => result.confirmed), label: 'Confirmed' },
      { data: exponentialConfirmed, label: 'Exponential' }
    ];

    // Generate national summary with tests conducted data
    this.nationalSummaryChartWithTestsData = [
      { data: this.results.map(result => result.confirmed), label: 'Confirmed' },
      { data: this.results.map(result => result.testsConducted), label: 'Tests' }
    ];

    // Generate national growth chart
    this.nationalGrowthChartData = [
      {
        data: this.results.map(this.mapGrowthChart.bind(this)) as number[],
        label: 'Daily growth'
      }
    ];
    this.nationalGrowthChartData[0].data[0] = this.nationalGrowthChartData[0].data[1];

    // Generate labels for use in multiple charts
    this.historyLabels = this.results.map(result => {
      const date = new Date(result.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });
  }

  private mapGrowthChart(result: DailyStatistic, index: number): number {
    if (index === 0) {
      return 0;
    } else {
      return +((result.confirmed / this.results[index - 1].confirmed - 1) * 100).toFixed(2);
    }
  }

  private setResult(index: number) {
    this.resultIndex = index;
    this.result = this.results[this.resultIndex];
  }
}
