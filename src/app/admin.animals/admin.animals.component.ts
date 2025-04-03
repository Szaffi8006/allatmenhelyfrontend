import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-animals',
  templateUrl: './admin.animals.component.html',
  styleUrls: ['./admin.animals.component.css']
})
export class AdminAnimalsComponent implements OnInit {
  animals: any[] = [];
  newAnimal: any = {
      name: '',
      type: '',
      size: '',
      date_of_birth: '',
      date_of_admission: '',
      description: '',
      gender: '',
      image: '',
      adopted: false
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
      this.loadAnimals();
  }

  loadAnimals() {
    this.adminService.getAnimals().subscribe((response: any) => {
        console.log('Válasz a backend-től:', response);  // Ellenőrizd a válasz formátumát
        if (response.success && Array.isArray(response.data)) {
            this.animals = response.data.map((animal: any) => ({ ...animal, edited: false }));
        } else {
            console.error('A válasz nem tartalmazza a várt adatokat:', response);
        }
    }, error => {
        console.error('Hiba történt az állatok betöltésekor:', error);
    });
  }

  onSubmit() {
      this.adminService.addAnimal(this.newAnimal).subscribe(() => {
          this.loadAnimals();
          this.newAnimal = {
              name: '',
              type: '',
              size: '',
              date_of_birth: '',
              date_of_admission: '',
              description: '',
              gender: '',
              image: '',
              adopted: false
          };
      });
  }

  onEdit(animal: any) {
      animal.edited = true;
  }

  updateAnimal(animal: any) {
      this.adminService.updateAnimal(animal).subscribe(() => {
          animal.edited = false;
      });
  }

  deleteAnimal(id: number) {
      if (confirm('Biztosan törölni szeretnéd?')) {
          this.adminService.deleteAnimal(id).subscribe(() => {
              this.animals = this.animals.filter(a => a.id !== id);
          });
      }
  }
}
