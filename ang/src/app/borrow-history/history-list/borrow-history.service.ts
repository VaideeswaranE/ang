import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorrowHistory, NewBorrowHistory } from './borrow-history.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowHistoryService {
  private apiUrl = 'http://localhost:5187/api/borrowHistory';

  constructor(private http: HttpClient) {}

  getBorrowHistory(): Observable<BorrowHistory[]> {
    return this.http.get<BorrowHistory[]>(this.apiUrl);
  }

  addBorrowHistory(history: NewBorrowHistory): Observable<BorrowHistory> {
    return this.http.post<BorrowHistory>(this.apiUrl, history);
  }

  deleteBorrowHistory(historyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${historyId}`);
  }
}
