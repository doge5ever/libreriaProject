import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  randomBooks; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  private ROOT_URL = "http://localhost:8000/";

  getRandomPicks = () => {
    let params = new HttpParams()
      .set('random', 'true')
      .set('length', '5')
      .set('select', 'title')
      .append('select', 'UPC');
    this.randomBooks = this.http.get(this.ROOT_URL + 'api/books', {params: params}).subscribe((data) => {
      console.log(params)
      console.log(data)
    })
  }
}

