import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionRolComponent } from './informacion-rol.component';

describe('InformacionRolComponent', () => {
  let component: InformacionRolComponent;
  let fixture: ComponentFixture<InformacionRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
