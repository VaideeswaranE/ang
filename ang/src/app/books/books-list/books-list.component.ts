import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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

  newBook: Book = this.initializeNewBook();

  errorMessage: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // Initialize a new book object
  initializeNewBook(): Book {
    return {
      bookId: 0,
      title: '',
      author: '',
      status: 'Available',
      borrowerId: null,
      categoryId: null,
      borrower: null,
      category: null,
      coverImage: null, // Added for cover image support
    };
  }

  // Load all books
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (error) => (this.errorMessage = error.message),
    });
  }

  // Handle cover image input
  onCoverImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.newBook.coverImage = reader.result?.toString().split(',')[1]; // Extract Base64 string
      };

      reader.readAsDataURL(file); // Read file as Base64
    }
  }
  updateBook(): void {
    if (this.selectedBook) {
      // Call the service to update the book details
      this.bookService.updateBook(this.selectedBook).subscribe(
        (updatedBook) => {
          // Update the book list with the new details
          const index = this.books.findIndex(book => book.bookId === updatedBook.bookId);
          if (index > -1) {
            this.books[index] = updatedBook;
          }
          this.selectedBook = null; // Clear the selection
          console.log('Book updated successfully:', updatedBook);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  deleteBook(bookId: number): void {
    // Call the service to delete the book
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        // Remove the book from the list
        this.books = this.books.filter(book => book.bookId !== bookId);
        console.log('Book deleted successfully');
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }
  
  

  // Add a new book
  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe({
      next: (book: Book) => {
        this.books.push(book);
        this.newBook = this.initializeNewBook(); // Reset new book form
      },
      error: (error) => (this.errorMessage = error.message),
    });
  }
}
