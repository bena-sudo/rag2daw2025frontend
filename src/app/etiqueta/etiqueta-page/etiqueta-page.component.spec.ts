import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaPageComponent } from './etiqueta-page.component';

describe('EtiquetaPageComponent', () => {
  let component: EtiquetaPageComponent;
  let fixture: ComponentFixture<EtiquetaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
