import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http'

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { HttpService } from './http.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { HeadersecuredComponent } from './headersecured/headersecured.component';
import { FootersecuredComponent } from './footersecured/footersecured.component';
import { CheckoutformComponent } from './checkoutform/checkoutform.component';
import { CheckoutSignInComponent } from './checkout-sign-in/checkout-sign-in.component';
import { CheckoutShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { CheckoutPlaceOrderComponent } from './place-order/place-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    BookComponent,
    PagenotfoundComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    HeadersecuredComponent,
    FootersecuredComponent,
    CheckoutformComponent,
    CheckoutSignInComponent,
    CheckoutShippingAndPaymentComponent,
    CheckoutPlaceOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   
    FormsModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
