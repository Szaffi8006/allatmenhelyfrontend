import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private loginStatusSubject = new BehaviorSubject<string | null>(null);  // Login státusz

  constructor(private http: HttpClient) {}

  get loginStatus$() {
    return this.loginStatusSubject.asObservable();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response.success && response.data?.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('isAdmin', response.data.isAdmin.toString());
          this.loginStatusSubject.next('Sikeres bejelentkezés'); // Sikeres bejelentkezés
        } else {
          this.loginStatusSubject.next('Hiba a bejelentkezés során');  // Hibás bejelentkezés
        }
      })
    );
  }
  
  logout(): void {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.http.post<any>(`${this.apiUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .subscribe({
        next: (response) => {
          console.log('Sikeres kijelentkezés:', response);
      
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          this.loginStatusSubject.next('Sikeres kijelentkezés');
        },
        error: (error) => {
          console.error('Hiba kijelentkezés közben:', error);
        }
      });
    }  
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): number {
    return parseInt(localStorage.getItem('isAdmin') || '0', 10);
  }  

  getUserId(): number | null {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

}
