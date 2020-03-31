import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../../../../interfaces';

@Component({
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resource$: Observable<Resource[]>;

  constructor(private Route: ActivatedRoute) {}

  ngOnInit() {
    this.resource$ = this.Route.data.pipe(map(data => data.resources));
  }
}
