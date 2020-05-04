import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    if (!auth.isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
