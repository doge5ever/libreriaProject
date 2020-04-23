import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutformComponent } from './checkoutform/checkoutform.component';
import { CheckoutSignInComponent } from './checkout-sign-in/checkout-sign-in.component';
import { CheckoutShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { CheckoutPlaceOrderComponent } from './place-order/place-order.component'

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent, children: [
    { path: '', component: CheckoutformComponent, children: [
      { path: 'sign-in', component: CheckoutSignInComponent},
      { path: 'shipping-and-payment', component: CheckoutShippingAndPaymentComponent},
      { path: 'place-order', component: CheckoutPlaceOrderComponent},
      { path: '', redirectTo: 'sign-in', pathMatch: 'prefix'}
    ]}
  ]},
  { path: '', component: ShopComponent, children: [
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
