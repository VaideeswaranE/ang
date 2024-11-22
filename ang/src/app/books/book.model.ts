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

export interface Book {
  coverImage: string | undefined | null; // Add null as an acceptable type
  bookId: number; 
  title: string; 
  author: string; 
  status: string; 
  borrowerId?: number | null; 
  categoryId?: number | null; 
  borrower?: Borrower | null; 
  category?: Category | null; 
}
