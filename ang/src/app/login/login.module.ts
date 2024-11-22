
// src/app/login/login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // For routing

@NgModule({
  imports: [
    CommonModule,
    RouterModule  // Import RouterModule for routing in the login module
  ],
  exports: []  // Make LoginComponent available for other parts of the app
})
export class LoginModule { }
