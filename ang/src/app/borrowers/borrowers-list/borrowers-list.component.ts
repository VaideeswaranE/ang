import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BorrowersService } from './borrowers.service';
import { Borrower, NewBorrower } from './borrowers.model';  // Import Borrower and NewBorrower types
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-borrowers-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './borrowers-list.component.html',
  styleUrls: ['./borrowers-list.component.css']
})
export class BorrowersListComponent implements OnInit {
  borrowers: Borrower[] = [];  // Array of Borrower objects
  newBorrower: NewBorrower = { name: '', phoneNumber: '', dueDate: '' };  // Initialize newBorrower object
  selectedBorrower: Borrower | null = null;  // For editing a borrower
  showAddBorrowerForm: boolean = false;  // Property to control showing the add form


  constructor(
    private borrowersService: BorrowersService,  // Inject BorrowersService to fetch data
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef to trigger change detection
  ) {}

  ngOnInit(): void {
    this.loadBorrowers();  // Load borrowers data when the component is initialized
  }

  loadBorrowers(): void {
    this.borrowersService.getBorrowers().subscribe(
      (data) => {
        console.log('Borrowers data:', data);  // Log data for debugging
        this.borrowers = data;  // Assign fetched data to borrowers array
        this.cdr.detectChanges();  // Trigger manual change detection
      },
      (error) => {
        console.error('Error fetching borrowers', error);  // Handle error in fetching borrowers
      }
    );
  }

  toggleAddBorrowerForm(): void {
    this.showAddBorrowerForm = !this.showAddBorrowerForm; // Toggle form visibility
  }

  addBorrower(): void {
    this.borrowersService.addBorrower(this.newBorrower).subscribe(
      () => {
        this.loadBorrowers();  // Reload borrowers list after adding
        this.newBorrower = { name: '', phoneNumber: '', dueDate: '' };  // Reset form after adding
        this.showAddBorrowerForm = false; // Hide the form after adding
      },
      (error) => {
        console.error('Error adding borrower', error);  // Handle error in adding borrower
      }
    );
  }

  editBorrower(borrower: Borrower): void {
    this.selectedBorrower = { ...borrower };  // Clone borrower object for editing
  }

  updateBorrower(): void {
    if (this.selectedBorrower) {
      this.borrowersService.updateBorrower(this.selectedBorrower).subscribe(
        () => {
          this.loadBorrowers();  // Reload borrowers list after update
          this.selectedBorrower = null;  // Clear selected borrower
        },
        (error) => {
          console.error('Error updating borrower', error);  // Handle error in updating borrower
        }
      );
    }
  }

  deleteBorrower(borrowerId: number): void {
    this.borrowersService.deleteBorrower(borrowerId).subscribe(
      () => this.loadBorrowers(),  // Reload borrowers list after deletion
      (error) => {
        console.error('Error deleting borrower', error);  // Handle error in deleting borrower
      }
    );
  }
}
