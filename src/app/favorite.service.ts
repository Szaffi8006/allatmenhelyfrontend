import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8000/api';  // A backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Token és Authorization header készítése
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Token lekérése a localStorage-ból
    if (!token) {
      // Ha nincs token, akkor átirányítjuk a bejelentkezési oldalra
      this.router.navigate(['/login']);
      throw new Error('Bejelentkezés szükséges!');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Header beállítása
  }

  // Kedvenc hozzáadása
  addFavorite(name: string): Observable<any> {
    // Az addFavorite metódus egyszerűsített adatküldés a backend felé
    return this.http.post(`${this.apiUrl}/addfavorite`, { name }, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // Hibakezelés: ha nem sikerült a kérés, vagy más probléma lépett fel
          console.error('Hiba történt: ', error);
          return throwError(error);
        })
      );
  }

  // Kedvenc törlése
  removeFavorite(animalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removefavorite/${animalId}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // Hibakezelés
          console.error('Hiba történt: ', error);
          return throwError(error);
        })
      );
  }
}
