import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSliderChange } from '@angular/material/slider';

import { LayoutService, LoaderService } from './services';
import { RecordsService } from './modules/records';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private static readonly disclaimerDismissedKey = 'ftc-dsc-dsm';

  @ViewChild('disclaimer') disclaimer: TemplateRef<void>;
  footerExpanded$: Observable<boolean>;
  recordIndex: number;
  // tslint:disable-next-line:max-line-length
  timeLineToolTip = `This timeline control will recall history on the Statistic Cards and Maps. Coming soon: Also recall history on Graph Cards - currently entire history set is shown at once.`;
  sliderMax: number;
  sideNavMode: MatDrawerMode;

  private static disclaimerDismissed(): boolean {
    return !!localStorage.getItem(AppComponent.disclaimerDismissedKey);
  }

  constructor(
    private BottomSheet: MatBottomSheet,
    public Layout: LayoutService,
    public Loader: LoaderService,
    public Records: RecordsService
  ) {}

  ngOnInit() {
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));
    this.Layout.isDesktop$.subscribe(isDesktop => (this.sideNavMode = isDesktop ? 'side' : 'over'));

    // Only set initially on app start
    this.Records.recordIndexAtStart$.subscribe(index => {
      this.recordIndex = index;
      this.sliderMax = index;
    });
  }

  ngAfterViewInit() {
    if (!AppComponent.disclaimerDismissed()) {
      this.BottomSheet.open(this.disclaimer);
    }
  }

  dismiss() {
    localStorage.setItem(AppComponent.disclaimerDismissedKey, '1');
    this.BottomSheet.dismiss();
  }

  updateDate(change: MatSliderChange) {
    this.Records.setSelectedRecord(change.value);
  }
}
