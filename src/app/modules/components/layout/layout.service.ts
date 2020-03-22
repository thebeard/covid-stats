import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutService {
  isDesktop$: Observable<boolean>;
  isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private BreakPoint: BreakpointObserver) {
    this.isDesktop$ = this.BreakPoint.observe(['(min-width: 769px)']).pipe(
      map(result => result.matches),
      tap(isDesktop => this.isOpen$.next(isDesktop))
    );
  }

  toggleNav() {
    this.isOpen$.next(!this.isOpen$.getValue());
  }
}
