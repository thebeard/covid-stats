import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

import { LayoutService } from './modules/components/layout/layout.service';
import { LoaderService } from './modules/components/loader';

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
      @media screen and (min-width: 769px) {
        main {
          padding: 15px 30px;
        }
      }
      .mat-progress-bar {
        position: fixed;
        height: 5px;
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
export class AppComponent {
  sideNavMode: MatDrawerMode;

  constructor(public Layout: LayoutService, public Loader: LoaderService) {
    this.Layout.isDesktop$.subscribe(isDesktop => (this.sideNavMode = isDesktop ? 'side' : 'over'));
  }
}
