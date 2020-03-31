import { TestBed } from '@angular/core/testing';

import { AppInterceptor } from './app-interceptor';

describe('AppInterceptor', () => {
  let service: AppInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
