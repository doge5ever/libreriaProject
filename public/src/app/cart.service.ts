import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  constructor(
    private http: HttpService
  ) { }

  addToCart(id) {
    this.items.push(id);
  }

  getItems(id) {
    let params = {
      select: [],
      product_id: this.items
    }
    return this.http.getItemsCart(params);
  }

  clearCart(id) {
    this.items = [];
  }
}
