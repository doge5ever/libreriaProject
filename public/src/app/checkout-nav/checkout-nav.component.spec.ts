import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutNavComponent } from './checkout-nav.component';

describe('CheckoutformComponent', () => {
  let component: CheckoutNavComponent;
  let fixture: ComponentFixture<CheckoutNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
