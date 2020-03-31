import { TestBed } from '@angular/core/testing';

import { StoriesResolver } from './stories.resolver';

describe('StoriesResolver', () => {
  let service: StoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoriesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
