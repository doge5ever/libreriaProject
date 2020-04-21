import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RandombooksService {
  randomPicks;
  params = {
    random: true,
    limit: 5
  };
  constructor(
    private http: HttpService
  ) {
    if (!sessionStorage.getItem('randomBooks')) {
      this.http.getRandomPicks(this.params)
        .subscribe((results) => {
            sessionStorage.setItem('randomBooks', JSON.stringify(results));
        })
    }
    this.randomPicks = JSON.parse(sessionStorage.getItem('randomBooks'));
  }
}
