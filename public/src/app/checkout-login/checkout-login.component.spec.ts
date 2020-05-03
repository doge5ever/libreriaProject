import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLogInComponent } from './checkout-login.component';

describe('CheckoutLogInComponent', () => {
  let component: CheckoutLogInComponent;
  let fixture: ComponentFixture<CheckoutLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
