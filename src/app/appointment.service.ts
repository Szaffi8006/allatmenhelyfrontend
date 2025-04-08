import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8000/api'; // Backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Token lekérése a localStorage-ból
    if (!token) {
      // Ha nincs token, akkor átirányítjuk a bejelentkezési oldalra
      this.router.navigate(['/login']);
      throw new Error('Bejelentkezés szükséges!');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Header beállítása
  }

  // Időpontok lekérése
  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Hiba történt a kedvencek lekérésekor:', error);
          return throwError(error);
        })
      );
  }

  // Időpont törlése
  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteappointment/${appointmentId}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Hiba történt: ', error);
          return throwError(error);
        })
      );
  }

  //Időpont frissítése
    updateAppointment(id: number, appointment: { name: string; appointment_time: string }): Observable<any> {
      return this.http.put(`${this.apiUrl}/updateappointment/${id}`,  appointment);
    }
  
}
