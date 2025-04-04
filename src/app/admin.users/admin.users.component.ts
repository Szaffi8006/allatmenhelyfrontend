import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';  

@Component({
  selector: 'app-admin.users',
  templateUrl: './admin.users.component.html',
  styleUrls: ['./admin.users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  usernameToMakeAdmin: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();  // Felhasználók betöltése az oldal inicializálásakor
  }

  // Felhasználók lekérése
  loadUsers(): void {
    this.adminService.getUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

  // Felhasználó frissítése
  updateUser(): void {
    if (this.selectedUser) {
      this.adminService.updateUser(this.selectedUser).subscribe(response => {
        console.log('User updated:', response);
        this.loadUsers();  // Lista frissítése a módosítás után
      });
    }
  }

  // Admin jogosultság adása
  giveAdminRights(): void {
    this.adminService.giveAdmin(this.usernameToMakeAdmin).subscribe(response => {
      console.log('Admin rights given:', response);
      this.loadUsers();  // Felhasználók lista frissítése admin jog megadása után
    });
  }
}  