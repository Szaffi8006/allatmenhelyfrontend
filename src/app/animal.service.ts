import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:8000/api'; 


  constructor(private http: HttpClient, private router: Router) {}

  // Állatok lekérése
  getAdoptableAnimals(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/adoptable`,); 
  }
  
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
    // Az addFavorite metódus most a name értéket küldi el
    return this.http.post(`${this.apiUrl}/addfavorite`, { name }, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
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
          console.error('Hiba történt: ', error);
          return throwError(error);
        })
      );
  }  
  bookAppointment(animalName: string, appointmentTime: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newappointment`, {
      appointment_time: appointmentTime,
      name: animalName,
      headers: this.getHeaders
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message);  
        }
        return response;
      })
    );
  }
    
}