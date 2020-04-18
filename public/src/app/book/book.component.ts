import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  private ROOT_URL = "http://localhost:8000/";
  product_id;
  book;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    window.scroll(0,0);
    this.route.params
      .subscribe((params) => {
        this.product_id = params.product_id;
      });

    this.http.get(this.ROOT_URL + 'api/single-book/' + this.product_id)
      .subscribe((doc) => {
        this.book = doc
      })

  }

}
