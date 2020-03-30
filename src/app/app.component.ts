import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSliderChange } from '@angular/material/slider';

import { LayoutService } from './modules/state/layout';
import { LoaderService } from './modules/state/loader';
import { StatisticsService } from './modules/data/statistics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('disclaimer') disclaimer: TemplateRef<void>;
  footerExpanded$: Observable<boolean>;
  resultIndex: number;
  // tslint:disable-next-line:max-line-length
  timeLineToolTip = `This timeline control will recall history on the Statistic Cards and Maps. Coming soon: Also recall history on Graph Cards - currently entire history set is shown at once.`;
  sliderMax: number;
  sideNavMode: MatDrawerMode;

  private readonly disclaimerDismissedKey = 'ftc-dsc-dsm';

  constructor(
    private BottomSheet: MatBottomSheet,
    public Layout: LayoutService,
    public Loader: LoaderService,
    public Stats: StatisticsService
  ) {}

  ngOnInit() {
    this.Layout.isDesktop$.subscribe(isDesktop => (this.sideNavMode = isDesktop ? 'side' : 'over'));
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));

    // Only set initially on app start
    this.Stats.resultIndexAtStart$.subscribe(index => {
      this.resultIndex = index;
      this.sliderMax = index;
    });
  }

  ngAfterViewInit() {
    if (!this.disclaimerDismissed()) {
      this.BottomSheet.open(this.disclaimer);
    }
  }

  disclaimerDismissed(): boolean {
    return !!localStorage.getItem(this.disclaimerDismissedKey);
  }

  dismiss() {
    localStorage.setItem(this.disclaimerDismissedKey, '1');
    this.BottomSheet.dismiss();
  }

  updateDate(change: MatSliderChange) {
    this.Stats.setResult(change.value);
  }
}
