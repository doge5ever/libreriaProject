import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keywords;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.route.queryParams
      .subscribe(params => {
        this.keywords = params.keywords;
    });
  }
}
