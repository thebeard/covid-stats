import { TestBed } from '@angular/core/testing';

import { StatisticsResolver } from './statistics.resolver';

describe('StatisticsResolver', () => {
  let service: StatisticsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
