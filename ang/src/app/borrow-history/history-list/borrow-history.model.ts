export interface BorrowHistory {
    historyId: number;
    borrowerId: number;
    borrowerName: string; // For display purposes
    bookId: number;
    bookTitle: string; // For display purposes
    borrowDate: Date;
    returnDate?: Date;
  }
  
  export interface NewBorrowHistory {
    borrowerId: number;
    bookId: number;
    borrowDate: string; // Input as 'YYYY-MM-DD'
  }
  