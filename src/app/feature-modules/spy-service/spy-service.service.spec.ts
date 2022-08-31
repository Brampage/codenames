import { TestBed } from '@angular/core/testing';

import { SpyServiceService } from './spy-service.service';

describe('SpyServiceService', () => {
  let service: SpyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
