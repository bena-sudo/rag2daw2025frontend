import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoItemComponent } from './documento-item.component';

describe('DocumentoItemComponent', () => {
  let component: DocumentoItemComponent;
  let fixture: ComponentFixture<DocumentoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
