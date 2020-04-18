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
  pageNumber;
  totalPages;
  readonly pageIndexSize = 7;
  pageIndices;
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

    readonly queryDatabase = () => {
      let params = new HttpParams()
      .set('keywords', this.keywords)
      .set('limit', this.resultsPerPage)
      .set('page', this.pageNumber? this.pageNumber : '1')
      .set('select', 'title')
      .append('select', 'product_id')
      .append('select', 'UPC')
      .append('select','rating')
      .append('select', 'price_USD')
      .append('select', 'availability')

    this.http.get(this.ROOT_URL + 'api/books', {params: params}).subscribe((results) => {
      this.searchResults = results['docs'];
      this.noOfResults = results['total'];
      this.pageNumber = results['page'];
      this.totalPages = results['pages'];
      this.pageIndices = this.generateIndices(this.pageNumber, this.totalPages, this.pageIndexSize);
      })
    }

    readonly generateIndices = (pageNumber, totalPages, pageIndexSize) => {
      let wingSize = (pageIndexSize-1)/2;
      if (pageIndexSize > totalPages) {
        return [...Array(totalPages).keys()].map(elt => elt+1)
      } else if (pageNumber <= wingSize) {
        return [...Array(pageIndexSize).keys()].map(elt => elt+1);
      } else if (pageNumber >= totalPages - wingSize) {
        return [...Array(pageIndexSize).keys()].map(elt => elt+totalPages-pageIndexSize+1);
      } else {
        return [...Array(pageIndexSize).keys()].map(elt => elt+pageNumber-wingSize+1)
      }
    };

  ngOnInit(): void {    

    this.route.params
      .subscribe(params => {
        this.keywords = params.keywords;
        this.queryDatabase();
        window.scroll(0,0)
    });
    this.route.queryParams
      .subscribe(params => {
        this.pageNumber = params.page;
        console.log(this.pageNumber)
        this.queryDatabase();
        window.scroll(0,0)
    });
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

  readonly trackByPageIndices = (pageNumber) => {return pageNumber}

}