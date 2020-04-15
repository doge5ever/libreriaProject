import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keywords;
  greaterThanValue;
  lessThanValue;
  inBetweenValue1;
  inBetweenValue2;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {    
    this.route.params
      .subscribe(params => {
        this.keywords = params.keywords;
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
}
