import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private ROOT_URL = "http://localhost:8000/";

  constructor(
    private http: HttpClient
  ) { }


  getSingleBook = (product_id) => {
    return this.http.get(this.ROOT_URL + 'api/single-book/' + product_id);
  }

  getBooks = (params) => {
    return this.http.get(this.ROOT_URL + 'api/books', {params: this.parseParams(params)});
  }

  paginateBooks = (params) => {
    return this.http.get(this.ROOT_URL + 'api/paginate-books', {params: this.parseParams(params)});
  }
  
  getRandomPicks = (params) => {
    return this.http.get(this.ROOT_URL + 'api/books', {params: this.parseParams(params)});
  }

  getItemsCart = (params) => {
    return this.http.get(this.ROOT_URL + 'api/cart', {params: this.parseParams(params)});
  }

  private parseParams = (params) => {
    let httpParams = new HttpParams()
    Object.keys(params).forEach((paramKey) => {
      let paramVal = params[paramKey];
      if (Array.isArray(paramVal)) {
        paramVal.forEach((arrayVal) => {
          httpParams = httpParams.append(paramKey, arrayVal);
        })
      } else {
        if (paramVal) {
          httpParams = httpParams.set(paramKey, paramVal);
        }
      }
    })
    return httpParams;
  }
}
  
