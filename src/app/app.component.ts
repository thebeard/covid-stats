import { Component } from '@angular/core';

import { LoaderService } from './modules/components/loader';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" [opened]="true">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-progress-bar *ngIf="Loader.routeLoader$ | async" mode="indeterminate"></mat-progress-bar>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
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
        max-width: 1300px;
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
    `
  ]
})
export class AppComponent {
  constructor(public Loader: LoaderService) {}
}
