// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Book } from '../book.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BookService {
//   private apiUrl = 'http://localhost:5187/api/Books';

//   constructor(private http: HttpClient) {}

//   getBooks(): Observable<Book[]> {
//     return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
//   }

//   searchBooks(query: string): Observable<Book[]> {
//     return this.http.get<Book[]>(`${this.apiUrl}/search?query=${query}`).pipe(catchError(this.handleError));
//   }

//   addBook(book: Book): Observable<Book> {
//     return this.http.post<Book>(this.apiUrl, book).pipe(catchError(this.handleError));
//   }

//   updateBook(id: number, book: Book): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, book).pipe(catchError(this.handleError));
//   }

//   deleteBook(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error(`Server error: ${error.message}`);
//     return throwError(() => new Error('Something went wrong! Please try again.'));
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5187/api/Books';

  constructor(private http: HttpClient) {}

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Get a single book by ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('status', book.status);
    formData.append('borrowerId', book.borrowerId?.toString() || '');
    formData.append('categoryId', book.categoryId?.toString() || '');
    if (book.coverImage) {
      formData.append('coverImage', new Blob([atob(book.coverImage)], { type: 'image/png' }), 'cover.png');
    }
  
    return this.http.post<Book>(this.apiUrl, formData).pipe(catchError(this.handleError));
  }
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.bookId}`, book).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }
  
  

  // // Update an existing book
  // updateBook(id: number, book: Book): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, book).pipe(catchError(this.handleError));
  // }


  // // Delete a book
  // deleteBook(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse) {
    console.error(`Server error: ${error.message}`);
    return throwError(() => new Error('Something went wrong! Please try again.'));
  }
}
