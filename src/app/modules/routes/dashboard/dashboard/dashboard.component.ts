import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { BaseCard } from '../../../ui/statistics';
import { BaseChart } from '../../../ui/charts';
import { LayoutService } from '../../../../services';
import { RecordsService } from '../../../records';
import { Record } from '../../../../interfaces';
import { ConfirmedExponentialProjectionChart, ConfirmedVsTestsChart, HistoryChart, RelativeDailyNewChart } from '../../../ui/charts';
import { StatusCard, TestCard } from '../../../ui/statistics';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  footerExpanded$: Observable<boolean>;
  historyLabels: Label[];
  projectAhead = 7;
  projectedHistoryLabels: Label[];
  record: Record;
  records: Record[];

  // Statistic Cards
  statusCard: BaseCard;
  testCard: BaseCard;

  // Graphs
  confirmedExponentialProjectionChart: BaseChart;
  confirmedVsTestsChartChart: BaseChart;
  historyChart: BaseChart;
  relativeDailyNewChart: BaseChart;

  // Options
  relativeDailyNewChartOptions: ChartOptions = { tooltips: { callbacks: { label: node => `${node.value}%` } } };

  constructor(private Layout: LayoutService, private Route: ActivatedRoute, private Stats: RecordsService) {}

  ngOnInit() {
    this.Route.data.subscribe(data => {
      this.records = data.records;
      this.initialiseCards(this.records.length - 14, this.projectAhead);
    });

    this.Stats.record$.subscribe(record => (this.record = record));
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));
  }

  updateDate(change: MatSliderChange) {
    this.Stats.setSelectedRecord(change.value);
  }

  private initialiseCards(calculateDay: number, projectAhead: number) {
    this.statusCard = new StatusCard();
    this.testCard = new TestCard();

    this.historyChart = new HistoryChart();
    this.confirmedVsTestsChartChart = new ConfirmedVsTestsChart();
    this.relativeDailyNewChart = new RelativeDailyNewChart();
    this.confirmedExponentialProjectionChart = new ConfirmedExponentialProjectionChart(calculateDay, projectAhead);
  }
}
