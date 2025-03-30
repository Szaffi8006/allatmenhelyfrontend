import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginData = { name: '', password: '' };
  registerData = { name: '', email: '', password: '', confirm_password: '' };
  successMessage: string = '';
  errorMessage: string = '';
  private apiUrl = 'http://localhost:8000/api';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          this.successMessage = 'Sikeres bejelentkezés!';
          this.errorMessage = '';
          this.router.navigate(['/home']);
          this.autoClearMessage();
        } else {
          this.errorMessage = 'Bejelentkezés sikertelen';
        }
      },
      (error: any) => {
        this.errorMessage = error?.message || 'Hiba történt a bejelentkezés során';
        this.successMessage = '';
      }
    );
  }

  onRegister() {
    if (!this.isValidEmail(this.registerData.email)) {
      this.errorMessage = 'Kérem, adjon meg egy érvényes e-mail címet.';
      return;
    }

    this.authService.register(this.registerData).subscribe(
      (response: any) => {
        this.successMessage = 'Sikeres regisztráció! Most már bejelentkezhet.';
        this.errorMessage = '';
        this.clearForm();
        this.autoClearMessage();
      },
      (error: any) => {
        this.errorMessage = error?.message || 'Hiba történt a regisztráció során';
        this.successMessage = '';
      }
    );
  }

  clearForm(): void {
    this.registerData = { name: '', email: '', password: '', confirm_password: '' };
    this.loginData = { name: '', password: '' };
  }

  autoClearMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
