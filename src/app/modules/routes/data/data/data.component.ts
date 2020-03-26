import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../data/statistics';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../state/loader';
import { DailyStatistic } from '../../../../interfaces';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  statistics: DailyStatistic[];
  syncing = false;
  syncTime: string;

  constructor(private Loader: LoaderService, private Route: ActivatedRoute, private Stats: StatisticsService) {}

  ngOnInit() {
    this.syncTime = this.Stats.getSyncTime();
  }

  refreshData() {
    this.syncing = true;
    this.Loader.setRouteLoader();
    this.Stats.getResults(true).then(statistics => {
      this.statistics = statistics;
      this.syncTime = this.Stats.getSyncTime();
      this.syncing = false;
      this.Loader.setRouteLoader(false);
    });
  }
}
