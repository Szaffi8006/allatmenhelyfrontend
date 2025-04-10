import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin.animals',
  templateUrl: './admin.animals.component.html',
  styleUrls: ['./admin.animals.component.css']
})
export class AdminAnimalsComponent implements OnInit {
  animals: any[] = [];
  types: string[] = ['kutya', 'macska'];
  sizes: string[] = ['kicsi', 'közepes', 'nagy'];
  genders: string[] = ['hím', 'nőstény'];
  
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

  onSubmit(form: any) {
    if (form.invalid) {
      console.log('Az űrlap érvénytelen!');
      return;
    }
  
    this.adminService.addAnimal(this.newAnimal).subscribe({
      next: (response) => {
        console.log('Állat sikeresen hozzáadva', response);
        this.loadAnimals();  // lista frissítés
        form.resetForm();    // form ürít + validáció alaphelyzet
      },
      error: (error) => {
        console.error('Hiba történt:', error);
      }
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
