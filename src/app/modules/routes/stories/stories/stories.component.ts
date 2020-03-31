import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Story } from '../../../../interfaces';

@Component({
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  storie$: Observable<Story[]>;

  constructor(private Route: ActivatedRoute) {}

  ngOnInit() {
    this.storie$ = this.Route.data.pipe(map(data => data.stories)) as Observable<Story[]>;
  }
}
