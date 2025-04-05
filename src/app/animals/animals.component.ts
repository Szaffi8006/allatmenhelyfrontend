import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: any[] = [];
  appointmentDates: { [key: string]: { date: string, hour: number, minute: number } } = {};
  hours: number[] = [];
  minutes: number[] = [0, 30];
  holidays: string [] = ["2025-01-01", "2025-03-15", "2025-04-21", "2025-05-01", "2025-08-20", "2025-10-23", "2025-12-25", "2025-12-26"];


  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.loadAdoptableAnimals();
    this.hours = Array.from({ length: 12 }, (_, i) => i + 8);
  }

  loadAdoptableAnimals(): void {
    this.animalService.getAdoptableAnimals().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.animals = response.map(animal => ({
            ...animal,
            isFavorite: false
          }));

          // minden állathoz alap appointment adat
          this.animals.forEach(animal => {
            this.appointmentDates[animal.name] = { date: '', hour: 8, minute: 0 };
          });

        } else {
          console.error('Hibás válasz:', response);
        }
      },
      (error) => {
        console.error('Hiba az állatok betöltésekor:', error);
      }
    );
  }

  toggleFavorite(animal: any): void {
    if (animal.isFavorite) {
      this.animalService.removeFavorite(animal.id).subscribe(
        () => {
          animal.isFavorite = false;
        },
        error => console.error('Hiba a kedvenc törlésénél:', error)
      );
    } else {
      this.animalService.addFavorite(animal.name).subscribe(
        () => {
          animal.isFavorite = true;
        },
        error => console.error('Hiba a kedvenchez adásnál:', error)
      );
    }
  }
  bookAppointment(animalName: string): void {
    const appointment = this.appointmentDates[animalName];
  
    // Megnézzük, hogy van-e dátum kiválasztva
    if (!appointment.date) {
      alert('Kérlek adj meg dátumot!');
      return;
    }

    const appointmentDate = new Date(appointment.date);
    const day = appointmentDate.getDay(); // 0 = vasárnap, 1 = hétfő, ..., 6 = szombat
  
    // Feltételek ellenőrzése
    if (
      appointment.hour >= 8 &&
      appointment.hour < 20 &&
      (appointment.minute === 0 || appointment.minute === 30) &&
      day >= 1 && day <= 5
      )
      {
      const hour = appointment.hour.toString().padStart(2, '0');
      const minute = appointment.minute.toString().padStart(2, '0');
      const appointmentTime = `${appointment.date} ${hour}:${minute}`;
  
      this.animalService.bookAppointment(animalName, appointmentTime).subscribe(
        () => {
          alert('Sikeres foglalás!');
        },
        (error) => {
          // A backend válasza a message mezővel
          if (error.error && error.error.message) {
            alert('Hiba a foglalás során: ' + error.error.message);
          } else {
            alert('Ismeretlen hiba történt!');
          }
        }
      );
    } else {
      // Ha az időpont nem érvényes, hibaüzenet
      alert('Csak hétköznapokon, 8:00 és 20:00 között, egész vagy fél órára lehet időpontot foglalni.');
    }
  }
}
