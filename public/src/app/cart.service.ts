import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsId = [69, 420];

  constructor(
    private http: HttpService
  ) { }

  addToCart(id) {
    this.itemsId.push(id);
  }

  getItemsId() {
    return this.itemsId;
  }

  clearCart(id) {
    this.itemsId = [];
  }
}
