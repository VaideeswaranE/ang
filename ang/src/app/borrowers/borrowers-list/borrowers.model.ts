export interface Borrower {
  borrowerId: number;
  name: string;
  phoneNumber: string;
  dueDate: Date;  // Correctly typed as Date to match the SQL DATE type
}

export interface NewBorrower {
  name: string;
  phoneNumber: string;
  dueDate: string;  // DueDate in NewBorrower should be a string in 'YYYY-MM-DD' format for input
}
