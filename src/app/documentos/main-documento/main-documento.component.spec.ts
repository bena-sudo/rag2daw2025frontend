import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocumentoComponent } from './main-documento.component';

describe('MainDocumentoComponent', () => {
  let component: MainDocumentoComponent;
  let fixture: ComponentFixture<MainDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
