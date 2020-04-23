import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSignInComponent } from './checkout-sign-in.component';

describe('CheckoutSignInComponent', () => {
  let component: CheckoutSignInComponent;
  let fixture: ComponentFixture<CheckoutSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
