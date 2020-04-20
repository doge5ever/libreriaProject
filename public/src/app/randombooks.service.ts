import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RandombooksService {
  params = {
    random: true,
    limit: 5
  };
  constructor(
    private http: HttpService
  ) { }

  randomPicks = this.http.getRandomPicks(this.params)
}
