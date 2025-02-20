import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoEditFormComponent } from './documento-edit-form.component';

describe('DocumentoEditFormComponent', () => {
  let component: DocumentoEditFormComponent;
  let fixture: ComponentFixture<DocumentoEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
