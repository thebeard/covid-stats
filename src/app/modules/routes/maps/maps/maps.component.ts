import { Component, OnInit } from '@angular/core';

import { RecordsService } from '../../../records';
import { Record } from '../../../../interfaces';
import { states, States } from '../maps.model';

@Component({
  templateUrl: './maps.component.html',
})
export class MapsComponent implements OnInit {
  private static readonly idealRadius = 300000;
  radiusFactor = 0;
  someStates: boolean;
  readonly states: States = states;
  statistic: Record;

  constructor(private Stats: RecordsService) {}

  private determineSomeStates(statistic: Record) {
    if (!statistic) {
      return false;
    }
    return Object.keys(this.states).some(state => !!statistic[state] && !!statistic[state].confirmed);
  }

  ngOnInit() {
    this.Stats.record$.subscribe(statistic => {
      this.statistic = statistic;
      this.someStates = this.determineSomeStates(statistic);
    });

    this.Stats.getRadiusFactor(Object.keys(this.states), MapsComponent.idealRadius).then(
      radiusFactor => (this.radiusFactor = radiusFactor)
    );
  }
}
