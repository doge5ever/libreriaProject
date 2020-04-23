import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPlaceOrderComponent } from './place-order.component';

describe('CheckoutPlaceOrderComponent', () => {
  let component: CheckoutPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutPlaceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutPlaceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
