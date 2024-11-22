import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { CategoriesService } from './categories.service'; 
import { Category } from './categories.model'; // Corrected import to use 'categories.model'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is included
})
export class CategoriesListComponent {
  categories: Category[] = [];
  newCategory: Category = { categoryId: 0, categoryName: '' };
  selectedCategory: Category | null = null;
  showAddCategoryForm = false;

  constructor(private categoriesService: CategoriesService) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleAddCategoryForm() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  addCategory() {
    this.categoriesService.addCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { categoryId: 0, categoryName: '' };
      this.showAddCategoryForm = false;
    });
  }

  editCategory(category: Category) {
    this.selectedCategory = { ...category };
  }

  updateCategory() {
    if (this.selectedCategory) {
      this.categoriesService.updateCategory(this.selectedCategory).subscribe(() => {
        this.loadCategories();
        this.selectedCategory = null;
      });
    }
  }

  deleteCategory(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      this.loadCategories();
    });
  }
}
