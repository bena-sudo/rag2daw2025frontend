import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaItemComponent } from './etiqueta-item.component';

describe('EtiquetaItemComponent', () => {
  let component: EtiquetaItemComponent;
  let fixture: ComponentFixture<EtiquetaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
