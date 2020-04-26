import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.css']
})
export class FieldErrorsComponent implements OnInit {
  @Input() fieldName: string;
  @Input() errorType: string; 

  constructor() { }

  ngOnInit(): void {
  }

}
