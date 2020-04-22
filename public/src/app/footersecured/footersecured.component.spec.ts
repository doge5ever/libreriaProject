import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootersecuredComponent } from './footersecured.component';

describe('FootersecuredComponent', () => {
  let component: FootersecuredComponent;
  let fixture: ComponentFixture<FootersecuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootersecuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootersecuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
