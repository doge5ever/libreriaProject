import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShippingAndPaymentComponent } from './checkout-shipping-and-payment.component';

describe('CheckoutShippingAndPaymentComponent', () => {
  let component: CheckoutShippingAndPaymentComponent;
  let fixture: ComponentFixture<CheckoutShippingAndPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutShippingAndPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShippingAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
