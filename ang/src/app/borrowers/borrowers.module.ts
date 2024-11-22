// src/app/Borrower/Borrower.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // For routing
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,  // Import RouterModule for routing in the Borrower module
    HttpClientModule
  ],
  exports: []  // Make BorrowerComponent available for other parts of the app
})
export class BorrowersModule { }
