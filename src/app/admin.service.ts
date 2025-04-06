import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

    // Token és Authorization header készítése
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');  // Token lekérése a localStorage-ból
      if (!token) {
        // Ha nincs token, akkor átirányítjuk a bejelentkezési oldalra
        this.router.navigate(['/login']);
        throw new Error('Admin jogosultság szükséges!');
      }
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Header beállítása
    }

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
    return this.http.put<any>(`${this.baseUrl}/updateanimal`, animal, { headers: this.getHeaders() });
  }

  // Állat törlése
  deleteAnimal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteanimal/${id}`, { headers: this.getHeaders() });
  }

  // Az összes felhasználó lekérése
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  // Egy felhasználó lekérése
  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user?id=${id}`, { headers: this.getHeaders() });
  }

  // Felhasználó frissítése
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateuser`, user, { headers: this.getHeaders() });
  }

  // Admin jogosultság adása egy felhasználónak
  giveAdmin(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin`, { name: username }, { headers: this.getHeaders() });
  }

    // Örökbefogadók listázása
    getAdopters(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/adopters`, { headers: this.getHeaders() });
    }
  
    // Örökbefogadó frissítése
    updateAdopter(adopter: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/updateadopter`, adopter, { headers: this.getHeaders() });
    }
  
    // Új örökbefogadó hozzáadása
    addAdopter(adopter: { name: string, phone_number: string, e_mail: string, city: string }): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/newadopter`, adopter, { headers: this.getHeaders() });
    }
    
    //Örökbefogadások lekérdezése
    getAdoptions(): Observable<any> {
      return this.http.get(`${this.baseUrl}/adoptions`,  { headers: this.getHeaders() });
    }
    
    //Új örökbefogadás
    addAdoption(adoption: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/newadoption`, adoption,  { headers: this.getHeaders() });
    }
    
    //Örökbefogadás módosítása
    updateAdoption(updatedData: { id: number; animal_name: string; adopter_name: string; date_of_adoption: string }): Observable<any> {
      return this.http.put(`${this.baseUrl}/updateadoption`, updatedData,  { headers: this.getHeaders() });
    }

    //Foglalások lekérése
    getAnyAppointments(): Observable<any> {
      return this.http.get(`${this.baseUrl}/anyappointments`,  { headers: this.getHeaders() });
    }
    
    //Foglalás törlése
    deleteAppointment(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/deleteanyappointment/${id}`,  { headers: this.getHeaders() });
    }   
}