import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-animals',
  templateUrl: './admin.animals.component.html',
  styleUrls: ['./admin.animals.component.css']
})
export class AdminAnimalsComponent {
  newAnimal = {
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

  onSubmit() {
    this.adminService.addAnimal(this.newAnimal).subscribe(
      (response) => {
        console.log('Állat hozzáadva:', response);
        // További műveletek, például a sikeres hozzáadás utáni visszajelzés.
      },
      (error) => {
        console.error('Hiba az állat hozzáadásakor:', error);
      }
    );
  }
}
