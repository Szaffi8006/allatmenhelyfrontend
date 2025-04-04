import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-adoptions',
  templateUrl: './admin.adoptions.component.html',
  styleUrls: ['./admin.adoptions.component.css']
})
export class AdminAdoptionsComponent implements OnInit {
  adoptions: any[] = [];
  animals: any[] = [];
  adopters: any[] = [];

  newAdoption = {
    animal_name: '',
    adopter_name: '',
    date_of_adoption: ''
  };

  selectedAdoption: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdoptions();
    this.loadAnimals();
    this.loadAdopters();
  }

  loadAdoptions(): void {
    this.adminService.getAdoptions().subscribe((res: any) => {
      if (res.success) {
        this.adoptions = res.data.map((adoption: any) => {
          return {
            ...adoption,
            date_of_adoption: this.formatDate(adoption.date_of_adoption) // Formázzuk a dátumot
          };
        });
      }
    }, error => {
      console.error('Hiba történt az örökbefogadások betöltésekor:', error);
    });
  }

  loadAnimals(): void {
    this.adminService.getAnimals().subscribe((res: any) => {
      if (res.success) {
        this.animals = res.data;
      }
    }, error => {
      console.error('Hiba történt az állatok betöltésekor:', error);
    });
  }

  loadAdopters(): void {
    this.adminService.getAdopters().subscribe((res: any) => {
      if (res.success) {
        this.adopters = res.data;
      }
    }, error => {
      console.error('Hiba történt az örökbefogadók betöltésekor:', error);
    });
  }

  addAdoption(): void {
    if (this.newAdoption.animal_name && this.newAdoption.adopter_name && this.newAdoption.date_of_adoption) {
      this.adminService.addAdoption(this.newAdoption).subscribe(res => {
        if (res.success) {
          this.adoptions.push({
            ...res.data,
            date_of_adoption: this.formatDate(res.data.date_of_adoption) // Formázzuk a dátumot
          });
          this.newAdoption = { animal_name: '', adopter_name: '', date_of_adoption: '' };
        }
      });
    }
  }

  selectAdoption(adoption: any): void {
    this.selectedAdoption = { 
      id: adoption.id, 
      animal_name: adoption.animal_name,
      adopter_name: adoption.adopter_name,
      date_of_adoption: adoption.date_of_adoption 
    };
  }

  updateAdoption(): void {
    if (this.selectedAdoption) {
      const updatedData = {
        animal_name: this.selectedAdoption.animal_name,
        adopter_name: this.selectedAdoption.adopter_name,
        date_of_adoption: this.selectedAdoption.date_of_adoption
      };
  
      this.adminService.updateAdoption(this.selectedAdoption, updatedData).subscribe(res => {
        if (res.success) {
          this.loadAdoptions(); // újratöltjük a listát
          this.selectedAdoption = null;
        }
      });
    }
  
  }

  // Dátum formázása a kívánt formátumba
  formatDate(date: string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}.${month}.${day}`;
  }
}
