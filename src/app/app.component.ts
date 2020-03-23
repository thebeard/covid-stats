import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LayoutService } from './modules/state/layout';
import { LoaderService } from './modules/state/loader';
import { StatisticsService } from './modules/data/statistics';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav [mode]="sideNavMode" [opened]="Layout.isOpen$ | async">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-progress-bar *ngIf="Loader.routeLoader$ | async" mode="indeterminate"></mat-progress-bar>
        <main>
          <router-outlet></router-outlet>
        </main>
        <footer [class.open]="footerExpanded$ | async">
          <mat-slider min="0" [max]="sliderMax" step="1" [value]="resultIndex" (input)="updateDate($event)"></mat-slider>
          <span>
            {{ (Stats.result$ | async)?.date | date }}
          </span>
        </footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <mat-icon (click)="Layout.toggleNav()" *ngIf="(Layout.isOpen$ | async) === false">menu</mat-icon>
    <mat-icon (click)="Layout.toggleNav()" *ngIf="Layout.isOpen$ | async">menu_open</mat-icon>
  `,
  styles: [
    `
      mat-sidenav {
        position: fixed;
      }
      mat-sidenav-content {
        min-height: 100vh;
      }
      main {
        min-height: 100vh;
        margin: 0 auto;
        box-sizing: border-box;
        background: #f2f3f4;
        padding: 15px;
      }
      footer {
        position: fixed;
        z-index: 2;
        bottom: 0;
        left: 0px;
        right: 0;
        padding: 0 15px 15px;
        background: #fff;
        box-shadow: 0 0 10px 2px rgba(1, 1, 1, 0.1);
        transition: left 0.1s ease-in-out;
        text-align: center;
      }
      footer.open {
        left: 222px;
      }
      footer span {
        display: block;
        margin-top: -10px;
        font-weight: 300;
      }
      @media screen and (min-width: 769px) {
        main {
          padding: 15px 30px;
        }
      }
      .mat-progress-bar {
        position: fixed;
        height: 5px;
      }
      .mat-slider {
        width: 50%;
        max-width: 550px;
      }
      .mat-icon {
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 1;
        cursor: pointer;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  footerExpanded$: Observable<boolean>;
  resultIndex: number;
  sliderMax: number;
  sideNavMode: MatDrawerMode;

  constructor(public Layout: LayoutService, public Loader: LoaderService, public Stats: StatisticsService) {}

  ngOnInit() {
    this.Layout.isDesktop$.subscribe(isDesktop => (this.sideNavMode = isDesktop ? 'side' : 'over'));
    this.footerExpanded$ = this.Layout.isDesktop$.pipe(switchMap(isDesktop => (!isDesktop ? of(false) : this.Layout.isOpen$)));

    // Only set initially on app start
    this.Stats.resultIndexAtStart$.subscribe(index => {
      this.resultIndex = index;
      this.sliderMax = index;
    });
  }

  updateDate(change: MatSliderChange) {
    this.Stats.setResult(change.value);
  }
}
