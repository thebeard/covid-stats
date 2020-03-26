import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DailyStatistic } from '../../../../interfaces';
import { mapStyles } from './map-container.styles';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent {
  @Input() states: { [index: string]: [number, number] };
  @Input() statistic: DailyStatistic;
  @Input() radiusFactor: number;

  readonly mapStyles = mapStyles;

  getLabel(province: string): string {
    return `${this.getConfirmedByProvince(province)} (${province.toUpperCase()})`;
  }

  getRadius(province: string): number {
    return this.getConfirmedByProvince(province) * this.radiusFactor;
  }

  hasStat(province: string): boolean {
    return this.statistic && this.statistic[province] && this.statistic[province].confirmed;
  }

  get statesIterator(): [string, [number, number]][] {
    if (!this.states) {
      return [];
    }
    return Object.entries(this.states);
  }

  private getConfirmedByProvince(province: string): number {
    // Direct statistic get here protected by hasStat in template
    return this.statistic[province].confirmed;
  }
}
