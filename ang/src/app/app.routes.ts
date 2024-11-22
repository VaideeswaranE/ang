import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login/login-admin/login-admin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { BorrowersListComponent } from './borrowers/borrowers-list/borrowers-list.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { BorrowHistoryComponent } from './borrow-history/history-list/history-list.component';
import { BookListComponent } from './books/books-list/books-list.component';

export const routes: Routes = [
    {path: '', redirectTo: '/adminlogin', pathMatch: 'full' },
    {path: 'Home', component:AppComponent},
    {path: 'adminlogin', component:LoginAdminComponent},
    {path: 'login', component:AdminListComponent},
    {path: 'borrowers', component:BorrowersListComponent},
    {path: 'categories', component:CategoriesListComponent},
    {path: 'borrow-history', component:BorrowHistoryComponent},
    {path: 'book-list', component:BookListComponent}    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  export const RoutingComponent = [AppComponent,AdminListComponent,LoginAdminComponent,BorrowersListComponent,CategoriesListComponent,BorrowHistoryComponent,BookListComponent]
