import { TestBed } from '@angular/core/testing';

import { InfoResolver } from './info.resolver';

describe('InfoResolver', () => {
  let service: InfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
