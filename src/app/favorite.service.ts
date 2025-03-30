// favorite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8000/api';  // Az API URL-je

  constructor(private http: HttpClient) {}

  // Kedvenc hozzáadása
  addFavorite(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addfavorite`, { name });
  }

  // Kedvenc törlése az ID alapján
  removeFavorite(animalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removefavorite/${animalId}`);
  }
}
