import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service'; 

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];  // Kedvenc állatok tárolása

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getFavorites();  // Kedvencek lekérése az oldalon való betöltéskor
  }

  // Kedvencek lekérése
  getFavorites(): void {
    this.favoriteService.getFavorites().subscribe(
      (response) => {
        this.favorites = response;  // A válaszban lévő kedvenceket eltesszük
      },
      (error) => {
        console.error('Hiba történt a kedvencek lekérésekor:', error);
      }
    );
  }

  // Kedvenc hozzáadása vagy eltávolítása
  toggleFavorite(animal: any): void {
    console.log('Kedvenc hozzáadása:', animal.animal.name); // Kiíratjuk az állat nevét, amit küldeni fogunk
    this.favoriteService.addFavorite(animal.animal.name).subscribe(
      (response) => {
        console.log('Kedvenc sikeresen hozzáadva:', response);
        this.getFavorites();  // Frissítjük a kedvenc listát
      },
      (error) => {
        console.error('Hiba történt a kedvenc hozzáadásakor:', error);
      }
    );
  }

  // Kedvenc törlése
  removeFavorite(animalId: number): void {
    this.favoriteService.removeFavorite(animalId).subscribe(
      (response) => {
        console.log('Kedvenc sikeresen eltávolítva:', response);
        this.getFavorites();  // Frissítjük a kedvenc listát
      },
      (error) => {
        console.error('Hiba történt a kedvenc eltávolításakor:', error);
      }
    );
  }
}
