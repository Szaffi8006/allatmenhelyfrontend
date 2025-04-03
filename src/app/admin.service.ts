import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Az összes állat lekérése
  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/animals`);
  }

  // Új állat hozzáadása
  addAnimal(animal: { 
    name: string, 
    type: string, 
    size: string, 
    date_of_birth: string, 
    date_of_admission: string, 
    description: string, 
    gender: string, 
    adopted: boolean, 
    image: string 
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newanimal`, animal);
  }

  // Állat frissítése
  updateAnimal(animal: { 
    name: string, 
    type: string, 
    size: string, 
    date_of_birth: string, 
    date_of_admission: string, 
    description: string, 
    gender: string, 
    adopted: boolean, 
    image: string 
  }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateanimal`, animal);
  }

  // Állat törlése
  deleteAnimal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteanimal/${id}`);
  }
}
