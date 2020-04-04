import { Record } from '../../../../interfaces';
import { StatisticsDataSet } from '../statistics.types';

export abstract class BaseCard {
  abstract getStatistics(record: Record): StatisticsDataSet;
}
