import { TestBed } from '@angular/core/testing';

import { RouteUnauthService } from './route-unauth.service';

describe('RouteUnauthService', () => {
  let service: RouteUnauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUnauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
