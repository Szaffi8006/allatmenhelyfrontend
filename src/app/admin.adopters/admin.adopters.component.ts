import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; 

@Component({
  selector: 'app-admin.adopters',
  templateUrl: './admin.adopters.component.html',
  styleUrls: ['./admin.adopters.component.css']
})
export class AdminAdoptersComponent implements OnInit {
  adopters: any[] = []; // Az örökbefogadók listája
  newAdopter = {
    name: '',
    phone_number: '',
    e_mail: '',
    city: '',

  };
  selectedAdopter: any = null; // Kiválasztott örökbefogadó szerkesztéshez
  usernameToMakeAdmin: string = ''; // Admin jogot kérő felhasználónév

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Örökbefogadók betöltése
    this.adminService.getAdopters().subscribe(
      (response: any) => {
        if (response.success) {
          this.adopters = response.data; // Ha sikeres, elmentjük az adatokat
        }
      },
      error => {
        console.error('Hiba történt az örökbefogadók betöltésekor', error);
      }
    );
  }

  selectAdopter(adopter: any): void {
    this.selectedAdopter = { ...adopter }; // Szerkesztéshez másolatot készítünk
  }

  // Új örökbefogadó hozzáadása
  addAdopter(): void {
    if (this.newAdopter.name && this.newAdopter.e_mail && this.newAdopter.phone_number && this.newAdopter.city) {
      this.adminService.addAdopter(this.newAdopter).subscribe(
        response => {
          console.log('Új örökbefogadó hozzáadva:', response);
          this.adopters.push(response.data); // Új örökbefogadó hozzáadása a listához
          this.newAdopter = { name: '', e_mail: '', phone_number: '', city: '' }; // Űrlap tisztítása
        },
        error => {
          console.error('Hiba történt az új örökbefogadó hozzáadásakor', error);
        }
      );
    }
  }  

  updateAdopter(): void {
    if (this.selectedAdopter) {
      // Frissítjük az örökbefogadót
      this.adminService.updateAdopter(this.selectedAdopter).subscribe(
        response => {
          console.log('Sikeres frissítés:', response);
          this.selectedAdopter = null; // Szerkesztés után töröljük a kiválasztott örökbefogadót
        },
        error => {
          console.error('Hiba történt a frissítés során', error);
        }
      );
    }
  }
}
