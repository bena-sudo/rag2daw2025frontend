import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionDocumentosComponent } from './evolucion-documentos.component';

describe('EvolucionDocumentosComponent', () => {
  let component: EvolucionDocumentosComponent;
  let fixture: ComponentFixture<EvolucionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolucionDocumentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolucionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
