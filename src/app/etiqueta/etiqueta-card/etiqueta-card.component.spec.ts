import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaCardComponent } from './etiqueta-card.component';

describe('EtiquetaCardComponent', () => {
  let component: EtiquetaCardComponent;
  let fixture: ComponentFixture<EtiquetaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
