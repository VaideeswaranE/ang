import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule // Import RouterModule for routing in the admin module
  ],
  exports: []  // Make adminComponent available for other parts of the app
})
export class AdminModule { }
