import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkDetailsComponent } from './chunk-details.component';

describe('ChunkDetailsComponent', () => {
  let component: ChunkDetailsComponent;
  let fixture: ComponentFixture<ChunkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChunkDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
