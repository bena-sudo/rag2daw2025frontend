import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkCardComponent } from './chunk-card.component';

describe('ChunkCardComponent', () => {
  let component: ChunkCardComponent;
  let fixture: ComponentFixture<ChunkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChunkCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
