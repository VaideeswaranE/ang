import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:5187/api/categories'; // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<{ categoryId: number; categoryName: string }[]> {
    return this.http.get<{ categoryId: number; categoryName: string }[]>(this.apiUrl);
  }

  // Add a new category
  addCategory(category: { categoryId: number; categoryName: string }): Observable<void> {
    return this.http.post<void>(this.apiUrl, category);
  }

  // Update an existing category
  updateCategory(category: { categoryId: number; categoryName: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${category.categoryId}`, category);
  }

  // Delete a category by ID
  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}
