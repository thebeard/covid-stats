import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private routeLoader = new BehaviorSubject(false);
  routeLoader$ = this.routeLoader.asObservable();

  constructor() {}

  setRouteLoader(state = true) {
    this.routeLoader.next(state);
  }
}
