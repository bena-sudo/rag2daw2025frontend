import { TestBed } from '@angular/core/testing';
import { sseService } from './sse.service';



describe('sseService', () => {
  let service: sseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(sseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
