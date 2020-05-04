import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainComponent } from './main/main.component';

import { CheckoutformComponent } from './checkoutform/checkout-form.component';
import { CheckoutLogInComponent } from './checkout-login/checkout-login.component';
import { CheckoutShippingAndPaymentComponent } from './checkout-shipping-and-payment/checkout-shipping-and-payment.component';
import { CheckoutPlaceOrderComponent } from './checkout-place-order/checkout-place-order.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent, children: [
    { path: '', component: CheckoutformComponent, children: [
      { path: 'login', component: CheckoutLogInComponent},
      { path: 'shipping-and-payment', component: CheckoutShippingAndPaymentComponent},
      { path: 'place-order', component: CheckoutPlaceOrderComponent},
      { path: '', redirectTo: 'login', pathMatch: 'prefix'}
    ]}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
  
  { path: '', component: MainComponent, children: [
    { path: '', component: LandingComponent },
    { path: 'search', component: SearchComponent },
    { path: 'book/:product_id', component: BookComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', component: PagenotfoundComponent}
  ]}
  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
