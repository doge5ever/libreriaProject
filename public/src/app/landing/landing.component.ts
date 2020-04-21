import { Component, OnInit } from '@angular/core';
import { RandombooksService } from '../randombooks.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  booksYouMightLike; 

  constructor(
    private randomService: RandombooksService
  ) {
    this.booksYouMightLike = randomService.randomPicks
  }

  ngOnInit(): void {
    window.scroll(0,0)
  }
}

