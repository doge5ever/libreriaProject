import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  booksYouMightLike; 

  constructor(
    private http: HttpService
  ) {
    let params = {
      random: true,
      limit: 5
    };

    if (!sessionStorage.getItem('randomBooks')) {
      this.http.getRandomPicks(params).toPromise()
        .then((results) => {
          sessionStorage.setItem('randomBooks', JSON.stringify(results));
        })
        .then(() => {
          this.booksYouMightLike = JSON.parse(sessionStorage.getItem('randomBooks'));
        })
    } else {
    this.booksYouMightLike = JSON.parse(sessionStorage.getItem('randomBooks'));
    }
  }

  ngOnInit(): void {
    window.scroll(0,0)
  }

}

