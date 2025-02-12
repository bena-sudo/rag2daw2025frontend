import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasListComponent } from './etiquetas-list.component';

describe('EtiquetasListComponent', () => {
  let component: EtiquetasListComponent;
  let fixture: ComponentFixture<EtiquetasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
