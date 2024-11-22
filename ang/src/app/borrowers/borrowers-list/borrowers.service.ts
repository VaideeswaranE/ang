import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower, NewBorrower } from './borrowers.model';  // Import types

@Injectable({
  providedIn: 'root'
})
export class BorrowersService {
  private apiUrl = 'http://localhost:5187/api/borrowers';  // Ensure this matches your actual API endpoint

  constructor(private http: HttpClient) { }

  getBorrowers(): Observable<Borrower[]> {  // Typed as Borrower[]
    return this.http.get<Borrower[]>(this.apiUrl);
  }

  addBorrower(borrower: NewBorrower): Observable<Borrower> {  // Typed as NewBorrower for adding
    return this.http.post<Borrower>(this.apiUrl, borrower);
  }

  updateBorrower(borrower: Borrower): Observable<Borrower> {  // Typed as Borrower for updating
    return this.http.put<Borrower>(`${this.apiUrl}/${borrower.borrowerId}`, borrower);
  }

  deleteBorrower(borrowerId: number): Observable<void> {  // No response body on DELETE
    return this.http.delete<void>(`${this.apiUrl}/${borrowerId}`);
  }
}
