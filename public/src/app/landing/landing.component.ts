import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  private ROOT_URL = "http://localhost:8000/";
  booksYouMightLike; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRandomPicks();
  }


  getRandomPicks = () => {
    let params = new HttpParams()
      .set('random', 'true')
      .set('length', '5');

    this.http.get(this.ROOT_URL + 'api/books', {params: params}).subscribe((data) => {
      this.booksYouMightLike = data;
    })
  }
}

