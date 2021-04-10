import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedformsComponent } from './submittedforms.component';

describe('SubmittedformsComponent', () => {
  let component: SubmittedformsComponent;
  let fixture: ComponentFixture<SubmittedformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
