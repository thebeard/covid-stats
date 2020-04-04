import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../../../records';

import { LoaderService } from '../../../../services';
import { Record } from '../../../../interfaces';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [
    `
      ul {
        li {
          margin-bottom: 8px;
        }
      }
      code {
        font-size: 9px;
      }
    `,
  ],
})
export class DataComponent implements OnInit {
  records: Record[];
  syncing = false;
  syncTime: string;

  constructor(private Loader: LoaderService, private Records: RecordsService) {}

  ngOnInit() {
    this.syncTime = this.Records.getSyncTime();
  }

  refreshData() {
    this.syncing = true;
    this.Loader.setRouteLoader();
    this.Records.getRecords(true).then(records => {
      this.records = records;
      this.syncTime = this.Records.getSyncTime();
      this.syncing = false;
      this.Loader.setRouteLoader(false);
    });
  }
}
