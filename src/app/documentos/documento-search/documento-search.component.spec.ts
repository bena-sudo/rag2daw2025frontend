import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoSearchComponent } from './documento-search.component';

describe('DocumentoSearchComponent', () => {
  let component: DocumentoSearchComponent;
  let fixture: ComponentFixture<DocumentoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
