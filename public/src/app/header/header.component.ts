import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  onClickSubmit = (form) => {
    this.router.navigate(['/search'], {queryParams: {keywords: form.keywords}});
  }
}
