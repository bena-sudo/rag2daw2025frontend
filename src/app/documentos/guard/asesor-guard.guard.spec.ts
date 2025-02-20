import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { asesorGuardGuard } from './asesor-guard.guard';

describe('asesorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => asesorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
