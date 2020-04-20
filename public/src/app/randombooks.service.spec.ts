import { TestBed } from '@angular/core/testing';

import { RandombooksService } from './randombooks.service';

describe('RandombooksService', () => {
  let service: RandombooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandombooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
