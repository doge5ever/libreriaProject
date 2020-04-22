import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersecuredComponent } from './headersecured.component';

describe('HeadersecuredComponent', () => {
  let component: HeadersecuredComponent;
  let fixture: ComponentFixture<HeadersecuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersecuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersecuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
