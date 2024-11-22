/*import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {

}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AdminService } from '../admin.service';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Use the necessary modules
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  constructor(private adminService: AdminService) { }

  // Add logic for displaying admins, if necessary
}
