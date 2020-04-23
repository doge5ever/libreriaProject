import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items;
  total;

  constructor(
    cartService: CartService,
    private http: HttpService
  ) {
    let params = {
      product_id: cartService.getItemsId(),
      deselect: 'product_desc'
    };

    let total = 0;
    http.getBooks(params)
      .subscribe((results) => {
        this.items = results;
        if (Array.isArray(results)) {
          results.forEach(item => {
            total += item.price_USD
            console.log(total)
          })
        }
        this.total = total;
      });
  }
  
  ngOnInit(): void {
  }

}
