// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { BookService } from './books.service';
// import { Book } from '../book.model';

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './books-list.component.html',
//   styleUrls: ['./books-list.component.css'],
// })
// export class BookListComponent implements OnInit {
//   books: Book[] = [];
//   searchQuery: string = '';
//   errorMessage: string = '';

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void {
//     this.loadBooks();
//   }

//   loadBooks(): void {
//     this.bookService.getBooks().subscribe({
//       next: (data) => (this.books = data),
//       error: (error) => (this.errorMessage = error.message),
//     });
//   }

//   searchBooks(): void {
//     if (this.searchQuery.trim()) {
//       this.bookService.searchBooks(this.searchQuery).subscribe({
//         next: (data) => (this.books = data),
//         error: (error) => (this.errorMessage = error.message),
//       });
//     } else {
//       this.loadBooks(); // Reload all books if search query is empty
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { BookService } from './books.service';
// import { Book } from '../book.model';

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './books-list.component.html',
//   styleUrls: ['./books-list.component.css'],
// })
// export class BookListComponent implements OnInit {
//   books: Book[] = [];
//   selectedBook: Book | null = null;
//   newBook: Book = {
//     bookId: 0,
//     title: '',
//     author: '',
//     status: 'Available',
//     borrowerId: null,
//     categoryId: null,
//     borrower: null,
//     category: null,
//   };
//   errorMessage: string = '';

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void {
//     this.loadBooks();
//   }

//   // Load all books
//   loadBooks(): void {
//     this.bookService.getBooks().subscribe({
//       next: (data) => (this.books = data),
//       error: (error) => (this.errorMessage = error.message),
//     });
//   }

//   // Add a new book
//   addBook(): void {
//     this.bookService.addBook(this.newBook).subscribe({
//       next: (book) => {
//         this.books.push(book);
//         this.newBook = { ...this.newBook, title: '', author: '' }; // Reset form
//       },
//       error: (error) => (this.errorMessage = error.message),
//     });
//   }

//   // Select a book for editing
//   editBook(book: Book): void {
//     this.selectedBook = { ...book };
//   }

//   // Update the selected book
//   updateBook(): void {
//     if (this.selectedBook) {
//       this.bookService.updateBook(this.selectedBook.bookId, this.selectedBook).subscribe({
//         next: () => {
//           const index = this.books.findIndex((b) => b.bookId === this.selectedBook?.bookId);
//           if (index > -1) this.books[index] = this.selectedBook;
//           this.selectedBook = null;
//         },
//         error: (error) => (this.errorMessage = error.message),
//       });
//     }
//   }

//   // Delete a book
//   deleteBook(id: number): void {
//     this.bookService.deleteBook(id).subscribe({
//       next: () => {
//         this.books = this.books.filter((b) => b.bookId !== id);
//       },
//       error: (error) => (this.errorMessage = error.message),
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;

  newBook: Book = {
    bookId: 0, // Default value
    title: '',
    author: '',
    status: 'Available',
    borrowerId: null,
    categoryId: null,
    borrower: null,
    category: null,
  };

  errorMessage: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (error) => (this.errorMessage = error.message),
    });
  }

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe({
      next: (book: Book) => {
        this.books.push(book);
        this.newBook = {
          bookId: 0,
          title: '',
          author: '',
          status: 'Available',
          borrowerId: null,
          categoryId: null,
          borrower: null,
          category: null,
        };
      },
      error: (error) => (this.errorMessage = error.message),
    });
  }

  editBook(book: Book): void {
    this.selectedBook = { ...book };
  }

  updateBook(): void {
    if (this.selectedBook) {
      // Ensure selectedBook matches the Book interface
      const updatedBook: Book = {
        bookId: this.selectedBook.bookId ?? 0, // Default to 0 if undefined
        title: this.selectedBook.title ?? '', // Default to empty string
        author: this.selectedBook.author ?? '', // Default to empty string
        status: this.selectedBook.status ?? 'Available', // Default status
        borrowerId: this.selectedBook.borrowerId ?? null, // Nullable
        categoryId: this.selectedBook.categoryId ?? null, // Nullable
        borrower: this.selectedBook.borrower ?? null, // Nullable
        category: this.selectedBook.category ?? null, // Nullable
      };
  
      // Debugging: Log selectedBook and updatedBook
      console.log('Selected Book:', this.selectedBook);
      console.log('Updated Book:', updatedBook);
  
      this.bookService.updateBook(updatedBook.bookId, updatedBook).subscribe({
        next: () => {
          const index = this.books.findIndex((b) => b.bookId === updatedBook.bookId);
          if (index > -1) this.books[index] = { ...updatedBook };
          this.selectedBook = null;
        },
        error: (error) => (this.errorMessage = error.message),
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter((b) => b.bookId !== id);
      },
      error: (error) => (this.errorMessage = error.message),
    });
  }
}
