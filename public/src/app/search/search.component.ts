import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  readonly pageIndexSize = 7;
  pageIndices;

  // TWO-WAY BINDED FILTER FORM VALUES
  greaterThanValue;
  lessThanValue;
  inBetweenValue1;
  inBetweenValue2;
  
  qParams;
  readonly fixedqParams = {
    limit: 5,
    deselect: 'product_desc'};
  results;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private cartService: CartService
    ) {
      this.qParams = {};
      this.results = {};
     }

  ngOnInit(): void {    
    this.route.queryParams
      .subscribe(params => {
        this.updateqParams(params);
        this.http.paginateBooks(Object.assign({}, this.qParams, this.fixedqParams))
          .subscribe((results) => {
            this.results = results;
            this.pageIndices = this.generateIndices(this.results.page, this.results.pages, this.pageIndexSize);
        })
        window.scroll(0,0)
    });
  }

  updateqParams = (params) => {
    this.qParams.keywords = params.keywords;    
    this.qParams.page = params.page ? params.page : 1 ;
    this.qParams.tag = params.tag;
    this.qParams.rating = params.rating;
    this.qParams.minPrice = params.minPrice;
    this.qParams.maxPrice = params.maxPrice;
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

  addToCart = (id) => {
    this.cartService.addToCart(id);
  }
  
  onClickSubmit = (form) => {
    this.qParams.tag = form.value.tag;
    this.qParams.rating = form.value.rating;
    switch (form.value.price) {
      case "greaterThan":
        this.qParams.minPrice = form.value.greaterThanValue ? form.value.greaterThanValue : undefined;
        this.qParams.maxPrice = undefined;
        break;
      case "lessThan":
        this.qParams.minPrice = undefined;
        this.qParams.maxPrice = form.value.lessThanValue ? form.value.lessThanValue : undefined;
        break;
      case "inBetween":
        this.qParams.minPrice = form.value.inBetweenValue1 ? form.value.inBetweenValue1 : undefined;
        this.qParams.maxPrice = form.value.inBetweenValue2 ? form.value.inBetweenValue2 : undefined;
    }
    this.router.navigate(['/search'], {
      queryParams: Object.assign({}, this.qParams, {page: 1}),
    });
    console.log('Submitted the form with the following values: ', form.value)
    form.reset();
  }

  navigateParams = (input) => {
    switch (input) {
      case 'first':
        return Object.assign({}, this.qParams, {page: 1})
      case 'previous':
        return Object.assign({}, this.qParams, {page: +this.qParams.page-1})
      case 'next':
        return Object.assign({}, this.qParams, {page: +this.qParams.page+1})
      case 'last':
        return Object.assign({}, this.qParams, {page: +this.results.pages})
      default:
        return Object.assign({}, this.qParams, {page: +input})
    }
  }
}