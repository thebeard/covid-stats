import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../data/statistics';
import { DailyStatistic } from '../../../../interfaces';

@Component({
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  private static readonly idealRadius = 300000;

  readonly states = {
    lp: [-23.506069, 29.538475],
    mp: [-25.214639, 30.978874],
    ec: [-32.13447, 26.627685],
    fs: [-29.105316, 26.180624],
    gp: [-26.136523, 28.151946],
    kzn: [-29.667324, 31.027127],
    nw: [-26.258978, 25.702772],
    nc: [-29.739381, 21.253545],
    wc: [-33.415906, 20.407637]
  };

  radiusFactor = 0;
  someStates: boolean;
  statistic: DailyStatistic;

  constructor(private Stats: StatisticsService) {}

  private determineSomeStates(statistic: DailyStatistic) {
    if (!statistic) {
      return false;
    }
    return Object.keys(this.states).some(state => !!statistic[state] && !!statistic[state].confirmed);
  }

  ngOnInit() {
    this.Stats.result$.subscribe(statistic => {
      this.statistic = statistic;
      this.someStates = this.determineSomeStates(statistic);
    });

    this.Stats.getRadiusFactor(Object.keys(this.states), MapsComponent.idealRadius).then(
      radiusFactor => (this.radiusFactor = radiusFactor)
    );
  }
}
