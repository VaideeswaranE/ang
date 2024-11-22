export interface Category {
    categoryId: number;
    categoryName: string;
  }
  
  export interface Borrower {
    borrowerId: number;
    name: string;
    phoneNumber: string;
    dueDate: string;
  }
  
//   export interface Book {
//     bookId: number;
//     title: string;
//     author: string;
//     status: string;
//     borrowerId?: number | null;
//     categoryId?: number | null;
//     borrower?: Borrower | null;
//     category?: Category | null;
//   }
export interface Book {
    bookId: number; // Required
    title: string; // Required
    author: string; // Required
    status: string; // Required
    borrowerId?: number | null; // Optional
    categoryId?: number | null; // Optional
    borrower?: Borrower | null; // Optional
    category?: Category | null; // Optional
  }
  