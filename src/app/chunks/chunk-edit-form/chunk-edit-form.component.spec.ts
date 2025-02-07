import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkEditFormComponent } from './chunk-edit-form.component';

describe('ChunkEditFormComponent', () => {
  let component: ChunkEditFormComponent;
  let fixture: ComponentFixture<ChunkEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChunkEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
