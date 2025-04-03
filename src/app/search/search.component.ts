import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // A keresési paraméterek, amelyeket a felhasználó ad meg
  searchParams = {
    type: '',
    gender: '',
    size: '',
    age: ''
  };

  // A keresési eredmények tárolása
  animals: any[] = [];

  constructor(private searchService: SearchService) {}

  // Keresési művelet
  onSearch() {
    // A keresési paramétereket elküldjük a service-nek
    this.searchService.searchAnimals(this.searchParams).subscribe(
      (animals: any[]) => {
        // A keresési eredmények kezelése
        this.animals = animals;
        console.log(animals); // A találatok konzolra írása
      },
      error => {
        // Hiba kezelése
        console.error('Hiba történt a keresés során:', error);
      }
    );
  }
}
