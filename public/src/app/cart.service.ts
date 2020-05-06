import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsId: BehaviorSubject<Array<number>>;
  cartItems: Array<Object>;
  total: number;

  constructor(
    private http: HttpService
  ) {

    this.itemsId = new BehaviorSubject([]);

    this.itemsId.subscribe((arr) => {
      let params = {
        product_id: arr,
        deselect: 'product_desc'
      };

      http.getBooks(params).subscribe((results: Array<Object>) => {
        this.cartItems = results;
        this.getTotal();
      });
      
    })
  }

  addToCart(id) {
    let currentValue = this.itemsId.value;
    if (currentValue.includes(id)) {
      alert("This item is already in the cart.");
    } else {
      this.itemsId.next([...currentValue, id]);
      alert("Added item to your cart!");
    }
  }

  deleteItemInCart(id) {
    let currentValue = this.itemsId.value;
    if (currentValue.includes(id)) {
      let newValue = currentValue.filter((element) => {element !== id});
      this.itemsId.next(newValue);
    } else {
      console.log(`Product id ${id} is not in the cart.`);
    }
  }

  clearCart() {
    this.itemsId.next([]);
    alert("Cart is cleared.")
  }

  getTotal = (): void => {
    let total = 0;
    console.log(this.cartItems);
    this.cartItems.forEach((item: {price_USD: number}) => {
      total += item.price_USD;
    })
    this.total = total;
  }
}

