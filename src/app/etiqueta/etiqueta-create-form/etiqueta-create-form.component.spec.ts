import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaCreateFormComponent } from './etiqueta-create-form.component';

describe('EtiquetaCreateFormComponent', () => {
  let component: EtiquetaCreateFormComponent;
  let fixture: ComponentFixture<EtiquetaCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
