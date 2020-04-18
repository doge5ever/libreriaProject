import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private ROOT_URL = "http://localhost:8000/";
  keywords: string;
  searchResults: Object;
  noOfResults;
  page;
  totalPages;
  greaterThanValue;
  lessThanValue;
  inBetweenValue1;
  inBetweenValue2;
  readonly resultsPerPage = '5';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {    

    this.route.params
      .subscribe(params => {
        this.keywords = params.keywords;
        this.page = params.page;
    });

    let params = new HttpParams()
      .set('keywords', this.keywords)
      .set('limit', this.resultsPerPage)
      .set('page', this.page? this.page : '1')
      .set('select', 'title')
      .set('select', 'UPC')
      .append('select','rating')
      .append('select', 'price_USD')
      .append('select', 'availability')

    this.http.get(this.ROOT_URL + 'api/books', {params: params}).subscribe((results) => {
      this.searchResults = results['docs'];
      this.noOfResults = results['total'];
      this.page = results['page'];
      this.totalPages = results['pages'];
    })
    
  }

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
    var val1;
    var val2;

    switch (form.price) {
      case "greaterThan":
        val1 = form.greaterThanValue;
        break;
      case "lessThan":
        val1 = form.lessThanValue;
        break;
      case "inBetween":
        val1 = form.inBetweenValue1;
        val2 = form.inBetweenValue2;
    }
    this.router.navigate(['/search', this.keywords], {queryParams: {val1: val1, val2: val2}});
    console.log("Filter values sent- val1:", val1, ", val2:", val2)
  }
}