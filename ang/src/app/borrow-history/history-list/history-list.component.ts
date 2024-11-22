import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BorrowHistoryService } from './borrow-history.service';
import { BorrowHistory, NewBorrowHistory } from './borrow-history.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-borrow-history',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class BorrowHistoryComponent implements OnInit {
  borrowHistoryList: BorrowHistory[] = [];
  newBorrowHistory: NewBorrowHistory = { borrowerId: 0, bookId: 0, borrowDate: '' };
  selectedBorrowHistory: BorrowHistory | null = null;
  showAddBorrowHistoryForm: boolean = false;

  constructor(
    private borrowHistoryService: BorrowHistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBorrowHistory();
  }

  loadBorrowHistory(): void {
    this.borrowHistoryService.getBorrowHistory().subscribe(
      (data) => {
        this.borrowHistoryList = data;
        this.cdr.detectChanges();
      },
      (error) => console.error('Error fetching borrow history:', error)
    );
  }

  toggleAddBorrowHistoryForm(): void {
    this.showAddBorrowHistoryForm = !this.showAddBorrowHistoryForm;
  }

  addBorrowHistory(): void {
    this.borrowHistoryService.addBorrowHistory(this.newBorrowHistory).subscribe(
      () => {
        this.loadBorrowHistory();
        this.newBorrowHistory = { borrowerId: 0, bookId: 0, borrowDate: '' };
        this.showAddBorrowHistoryForm = false;
      },
      (error) => console.error('Error adding borrow history:', error)
    );
  }

  editBorrowHistory(history: BorrowHistory): void {
    this.selectedBorrowHistory = { ...history };
  }

  deleteBorrowHistory(historyId: number): void {
    this.borrowHistoryService.deleteBorrowHistory(historyId).subscribe(
      () => this.loadBorrowHistory(),
      (error) => console.error('Error deleting borrow history:', error)
    );
  }
}
