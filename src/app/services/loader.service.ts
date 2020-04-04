import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private routeLoader = new BehaviorSubject(false);
  routeLoader$ = this.routeLoader.asObservable();

  setRouteLoader(state = true) {
    this.routeLoader.next(state);
  }
}
