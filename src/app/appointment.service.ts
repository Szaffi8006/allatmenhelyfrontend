import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/api/'; 

  constructor(private http: HttpClient) {}

  // Időpont foglalás
  bookAppointment(animalId: number, appointmentTime: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      animal_id: animalId,
      appointment_time: appointmentTime
    });
  }
}
