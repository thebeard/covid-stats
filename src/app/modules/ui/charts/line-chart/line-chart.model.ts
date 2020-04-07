import { InjectionToken, Provider } from '@angular/core';
import { ChartOptions } from 'chart.js';

const defaultLineChartOptions = {
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

export const DEFAULT_LINE_CHART_OPTIONS = new InjectionToken<ChartOptions>('Default line chart options');

export const DefaultLineChartOptionsProvider: Provider = {
  provide: DEFAULT_LINE_CHART_OPTIONS,
  useValue: defaultLineChartOptions,
};
