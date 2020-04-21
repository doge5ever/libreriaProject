import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsId = [69, 420];

  constructor(
    private http: HttpService
  ) { }

  addToCart(id) {
    if (this.itemsId.includes(id)) {
      alert("This item is already in the cart.");
    } else {
      this.itemsId.push(id);
      alert("Added item to your cart!");
      console.log(this.itemsId);
    }
  }

  getItemsId() {
    return this.itemsId;
  }

  clearCart() {
    this.itemsId = [];
  }
}
