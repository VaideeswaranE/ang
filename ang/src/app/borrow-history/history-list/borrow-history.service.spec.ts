import { TestBed } from '@angular/core/testing';

import { BorrowHistoryService } from './borrow-history.service';

describe('BorrowHistoryService', () => {
  let service: BorrowHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
