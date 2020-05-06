import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http'
import { TextMaskModule } from 'angular2-text-mask';

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
import { MainComponent } from './main/main.component';
import { HeadersecuredComponent } from './headersecured/headersecured.component';
import { FootersecuredComponent } from './footersecured/footersecured.component';
import { CheckoutNavComponent } from './checkout-nav/checkout-nav.component';
import { CheckoutLogInComponent } from './checkout-login/checkout-login.component';
import { CheckoutShippingAndPaymentComponent } from './checkout-shipping-and-payment/checkout-shipping-and-payment.component';
import { CheckoutPlaceOrderComponent } from './checkout-place-order/checkout-place-order.component';
import { CheckoutService } from './checkout.service';
import { CartService } from './cart.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

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
    MainComponent,
    HeadersecuredComponent,
    FootersecuredComponent,
    CheckoutNavComponent,
    CheckoutLogInComponent,
    CheckoutShippingAndPaymentComponent,
    CheckoutPlaceOrderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    HttpService,
    CartService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
