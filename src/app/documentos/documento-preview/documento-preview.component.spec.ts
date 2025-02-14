import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPreviewComponent } from './documento-preview.component';

describe('DocumentoPreviewComponent', () => {
  let component: DocumentoPreviewComponent;
  let fixture: ComponentFixture<DocumentoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
