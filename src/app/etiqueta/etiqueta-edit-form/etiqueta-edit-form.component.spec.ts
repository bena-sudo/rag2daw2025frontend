import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaEditFormComponent } from './etiqueta-edit-form.component';

describe('EtiquetaEditFormComponent', () => {
  let component: EtiquetaEditFormComponent;
  let fixture: ComponentFixture<EtiquetaEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
