import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Resource } from '../../../../interfaces';

@Component({
  template: `
    <h1>Resources</h1>
    <h2>Coronavirus Information</h2>
    <section>
      <a *ngFor="let resource of resource$ | async" [href]="resource.link" target="_blank">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ resource.title }}</mat-card-title>
            <mat-card-subtitle>{{ resource.publisher }}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image [src]="resource.img_url" [alt]="resource.img_alt" />
          <mat-card-content>
            <p>
              {{ resource.description }}
            </p>
          </mat-card-content>
        </mat-card>
      </a>
    </section>
  `,
  styles: [
    `
      a {
        text-decoration: none;
      }

      section {
        display: flex;
        margin-left: -15px;
        margin-right: -15px;
        flex-wrap: wrap;
      }

      .mat-card {
        max-width: 320px;
        margin: 0 15px 30px;
      }
    `,
  ],
})
export class ResourcesComponent implements OnInit {
  resource$: Observable<Resource[]>;

  constructor(private Route: ActivatedRoute) {}

  ngOnInit() {
    this.resource$ = this.Route.data.pipe(map(data => data.resources));
  }
}
