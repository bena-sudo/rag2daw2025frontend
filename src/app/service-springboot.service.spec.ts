import { TestBed } from '@angular/core/testing';

import { ServiceSpringbootService } from './service-springboot.service';

describe('ServiceSpringbootService', () => {
  let service: ServiceSpringbootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSpringbootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
