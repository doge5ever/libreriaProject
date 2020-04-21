import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;

  constructor(
    cartService: CartService,
    private http: HttpService
  ) {
    let params = {
      product_id: cartService.getItemsId(),
      deselect: 'product_desc'
    };

    http.getBooks(params)
      .subscribe((results)=>{
        this.items = results;
      });
    console.log(this.items);
  }

  ngOnInit(): void {
  }

}
