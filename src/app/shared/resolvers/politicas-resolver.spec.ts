import { TestBed } from '@angular/core/testing';

import { PoliticasResolver } from './politicas-resolver';

describe('PoliticasResolverService', () => {
  let service: PoliticasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticasResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
