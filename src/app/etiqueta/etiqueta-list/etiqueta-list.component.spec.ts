import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaListComponent } from './etiqueta-list.component';

describe('EtiquetaListComponent', () => {
  let component: EtiquetaListComponent;
  let fixture: ComponentFixture<EtiquetaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
