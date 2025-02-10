import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaSearchComponent } from './etiqueta-search.component';

describe('EtiquetaSearchComponent', () => {
  let component: EtiquetaSearchComponent;
  let fixture: ComponentFixture<EtiquetaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
