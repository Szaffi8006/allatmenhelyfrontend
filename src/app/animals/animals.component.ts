import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { FavoriteService } from '../favorite.service';  
import { AppointmentService } from '../appointment.service';  

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: any[] = [];  // Örökbefogadható állatok listája

  constructor(
    private animalService: AnimalService,
    private favoriteService: FavoriteService,
    private appointmentService: AppointmentService  
  ) {}

  ngOnInit(): void {
    this.loadAdoptableAnimals();  
  }

  // Örökbefogadható állatok betöltése
  loadAdoptableAnimals(): void {
    this.animalService.getAdoptableAnimals().subscribe(
      (response: any) => {
        console.log('Kapott válasz:', response);
        if (Array.isArray(response)) {
          this.animals = response.map(animal => ({
            ...animal,
            isFavorite: false // Kezdetben minden állat nincs kedvencként jelölve
          }));
        } else {
          console.error('Hibás válaszformátum:', response);
        }
      },
      (error) => {
        console.error('Hiba az állatok betöltésekor:', error);
      }
    );
  }

  // Toggle kedvenc hozzáadása vagy eltávolítása
  toggleFavorite(animal: any): void {
    if (animal.isFavorite) {
      // Kedvenc törlése ID alapján
      this.favoriteService.removeFavorite(animal.id).subscribe(
        () => {
          animal.isFavorite = false;
          console.log(`Kedvenc törölve: ${animal.name}`);
        },
        error => console.error('Hiba a kedvenc törlésénél:', error)
      );
    } else {
      // Kedvencként jelölés NÉV alapján
      this.favoriteService.addFavorite(animal.name).subscribe(
        response => {
          animal.isFavorite = true;
          console.log(response.message); // Backend üzenet kiírása
        },
        error => console.error('Hiba a kedvenc hozzáadásánál:', error)
      );
    }
  }

  // Időpontfoglalás függvény
  bookAppointment(animal: any, date: string): void {
    this.appointmentService.bookAppointment(animal.id, date).subscribe(
      response => {
        console.log('Időpont foglalva:', response);
      },
      error => {
        console.error('Hiba az időpontfoglalásnál:', error);
      }
    );
  }
}
