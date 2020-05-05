import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService,
    private http: HttpService
  ) { }
  
  ngOnInit(): void {
  }

}
