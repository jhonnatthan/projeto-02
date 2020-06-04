import { TestBed } from '@angular/core/testing';

import { RouteAuthService } from './route-auth.service';

describe('RouteAuthService', () => {
  let service: RouteAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
