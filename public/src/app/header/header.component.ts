import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  keywords;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickSubmit = (form) => {
    this.keywords = form.keywords
    this.router.navigate(['/search'], {queryParams: {keywords: this.keywords}});
  }
}
