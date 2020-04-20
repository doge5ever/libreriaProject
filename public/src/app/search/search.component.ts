import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private ROOT_URL = "http://localhost:8000/";

  readonly pageIndexSize = 7;
  pageIndices;

  // FILTER FORM VALUES
  greaterThanValue;
  lessThanValue;
  inBetweenValue1;
  inBetweenValue2;
  
  qParams;
  fixedqParams;
  results;

  updateqParams = (params) => {
    this.qParams.keywords = params.keywords;    
    this.qParams.page = params.page ? params.page : 1 ;
    this.qParams.tag = params.tag;
    this.qParams.rating = params.rating;
    this.qParams.minPrice = params.minPrice;
    this.qParams.maxPrice = params.maxPrice;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    ) {
      this.qParams = {};
      this.fixedqParams = {
        limit: 5,
        deselect: 'product_desc'};
      this.results = {};
     }

  ngOnInit(): void {    
    this.route.queryParams
      .subscribe(params => {
        console.log("This is the params: ", params)
        this.updateqParams(params);
        this.queryDatabase();
        window.scroll(0,0)
    });
  }

  queryDatabase = () => {
    let params = new HttpParams()
    let allParams = Object.assign({}, this.qParams, this.fixedqParams);
    Object.keys(allParams).forEach((paramKey) => {
      let paramVal = allParams[paramKey];
      if (Array.isArray(paramVal)) {
        paramVal.forEach((arrayVal) => {
          params = params.append(paramKey, arrayVal);
        })
      } else {
        if (paramVal) {
          params = params.set(paramKey, paramVal);
        }
      }
    })

    this.http.get(this.ROOT_URL + 'api/books', {params: params}).subscribe((results) => {
    this.results = results;
    this.pageIndices = this.generateIndices(this.results.page, this.results.pages, this.pageIndexSize);
    })
  }

  readonly generateIndices = (page, totalPages, pageIndexSize) => {
    let wingSize = (pageIndexSize-1)/2;
    if (pageIndexSize > totalPages) {
      return [...Array(totalPages).keys()].map(elt => elt+1)
    } else if (page <= wingSize) {
      return [...Array(pageIndexSize).keys()].map(elt => elt+1);
    } else if (page >= totalPages - wingSize) {
      return [...Array(pageIndexSize).keys()].map(elt => elt+totalPages-pageIndexSize+1);
    } else {
      return [...Array(pageIndexSize).keys()].map(elt => elt+page-wingSize)
    }
  };

  clearField = (option) => {
    switch (option) {
      case 'greaterThan':
        this.lessThanValue = '';
        this.inBetweenValue1 = '';
        this.inBetweenValue2 = '';
        break;
      case 'lessThan':
        this.greaterThanValue = '';
        this.inBetweenValue1 = '';
        this.inBetweenValue2 = '';
        break;
      case 'inBetween':
        this.greaterThanValue = '';
        this.lessThanValue = '';
        break;
    }
  }

  onClickSubmit = (form) => {
    this.qParams.tag = form.tag;
    this.qParams.rating = form.rating;
    switch (form.price) {
      case "greaterThan":
        this.qParams.minPrice = form.greaterThanValue;
        break;
      case "lessThan":
        this.qParams.maxPrice = form.lessThanValue;
        break;
      case "inBetween":
        this.qParams.minPrice = form.inBetweenValue1;
        this.qParams.maxPrice = form.inBetweenValue2;
    }
    this.router.navigate(['/search'], {
      queryParams: this.qParams,
    });
    console.log(this.results)
    console.log(`Filter values sent:
    minPrice: ${this.qParams.minPrice}
    maxPrice: ${this.qParams.maxPrice}
    tag: ${this.qParams.tag}
    rating: ${this.qParams.rating}`)
  }

  navigateParams = (input) => {
    switch (input) {
      case 'first':
        return Object.assign({}, this.qParams, {page: 1})
      case 'previous':
        return Object.assign({}, this.qParams, {page: this.qParams.page-1})
      case 'next':
        return Object.assign({}, this.qParams, {page: this.qParams.page+1})
      case 'last':
        return Object.assign({}, this.qParams, {page: this.results.pages})
      default:
        return Object.assign({}, this.qParams, {page: input})
    }
  }
}