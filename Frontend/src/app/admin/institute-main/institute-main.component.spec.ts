import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteMainComponent } from './institute-main.component';

describe('InstituteMainComponent', () => {
  let component: InstituteMainComponent;
  let fixture: ComponentFixture<InstituteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
