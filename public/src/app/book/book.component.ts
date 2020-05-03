import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  product_id;
  book;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private cartservice: CartService
  ) {
    this.book = {}
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.route.params
      .subscribe((params) => {
        this.product_id = params.product_id;
      });

    this.http.getSingleBook(this.product_id)
      .subscribe((doc) => {
        this.book = doc
      })
  }

  addToCart = (id) => {
    this.cartservice.addToCart(id);
  }
}
