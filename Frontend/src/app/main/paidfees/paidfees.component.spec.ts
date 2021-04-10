import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidfeesComponent } from './paidfees.component';

describe('PaidfeesComponent', () => {
  let component: PaidfeesComponent;
  let fixture: ComponentFixture<PaidfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidfeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
