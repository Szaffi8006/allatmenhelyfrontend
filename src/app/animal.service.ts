import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:8000/api/adoptable'; 
  private addFavoriteApiUrl = 'http://localhost:8000/api/addfavorite';  


  constructor(private http: HttpClient) {}

  // Állatok lekérése
  getAdoptableAnimals(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl); 
  }
  

  // Kedvenc hozzáadása név alapján
  addFavorite(animalName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addfavorite`, { name: animalName });  // Kérés név alapján
  }

  // Kedvenc törlése az ID alapján
  removeFavorite(animalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removefavorite/${animalId}`);
  }
}