import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';  // Hozzá kell adni az auth szolgáltatást

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: any[] = [];
  userLoggedIn: boolean = false;  // Ellenőrzi, hogy a felhasználó be van-e jelentkezve

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAnimals();
    this.userLoggedIn = this.authService.isLoggedIn();  // Ellenőrzi, hogy be van-e jelentkezve a felhasználó
  }

  loadAnimals() {
    this.http.get('http://localhost:8000/api/adoptable').subscribe((data: any) => {
      this.animals = data;
    });
  }

  toggleFavorite(animalId: number) {
    if (this.userLoggedIn) {
      // Kedvenc hozzáadása vagy eltávolítása
      // Ezt a funkciót az API-hoz is hozzá kell adni, hogy frissítse a kedvencek listáját
      console.log(`Toggle favorite for animal with ID: ${animalId}`);
    } else {
      alert("Be kell jelentkezned, hogy kedvencet adhass hozzá!");
    }
  }

  bookAppointment(animalId: number) {
    if (this.userLoggedIn) {
      // Időpontfoglalás logika
      console.log(`Booking appointment for animal with ID: ${animalId}`);
    } else {
      alert("Be kell jelentkezned, hogy időpontot foglalhass!");
    }
  }
}
