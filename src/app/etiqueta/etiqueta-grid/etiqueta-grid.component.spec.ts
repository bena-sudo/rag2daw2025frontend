import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaGridComponent } from './etiqueta-grid.component';

describe('EtiquetaGridComponent', () => {
  let component: EtiquetaGridComponent;
  let fixture: ComponentFixture<EtiquetaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
