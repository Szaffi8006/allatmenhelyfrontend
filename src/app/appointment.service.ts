import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/api';  // A backend URL-je

  constructor(private http: HttpClient) {}

  // Időpontfoglalás
  bookAppointment(animalName: string, appointmentTime: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, { name: animalName, appointment_time: appointmentTime });
  }
}
