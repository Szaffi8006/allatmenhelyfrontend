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

  // Bejelentkezés
  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        console.log('Backend válasz:', response);  // Ellenőrizd a válasz struktúráját

        if (response && response.success && response.data.token) {
          // Ha van token, sikeres a bejelentkezés
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data));
          this.successMessage = 'Sikeres bejelentkezés!';
          this.errorMessage = '';

          // Form kiürítése sikeres bejelentkezés után
          this.clearForm();

          // Navigálás a home oldalra
          this.router.navigate(['/home']).then(() => {
            this.autoClearMessage();
          });
        } else {
          // Ha nem jön a token vagy a válasz nem sikeres
          this.errorMessage = 'Bejelentkezés sikertelen';
          this.successMessage = '';
        }
      },
      (error: any) => {
        // Hiba történt
        this.errorMessage = error?.message || 'Hiba történt a bejelentkezés során';
        this.successMessage = '';
      }
    );
  }

  // Regisztráció
  onRegister() {
    if (!this.isValidEmail(this.registerData.email)) {
      this.errorMessage = 'Kérem, adjon meg egy érvényes e-mail címet.';
      return;
    }

    this.authService.register(this.registerData).subscribe(
      (response: any) => {
        console.log('Backend válasz regisztráció után:', response);

        if (response && response.message) {
          // Ha a válasz tartalmazza a sikeres üzenetet
          this.successMessage = response.message;
          this.errorMessage = '';

          // Form kiürítése sikeres regisztráció után
          this.clearForm();

          // Navigálás a bejelentkezés oldalra
          this.router.navigate(['/login']).then(() => {
            this.autoClearMessage();
          });
        } else {
          // Ha nincs üzenet vagy valami hiba történt
          this.errorMessage = 'Hiba történt a regisztráció során';
          this.successMessage = '';
        }
      },
      (error: any) => {
        // Ha hiba történt
        this.errorMessage = error?.message || 'Hiba történt a regisztráció során';
        this.successMessage = '';
      }
    );
  }

  // űrlap törlés (bejelentkezés és regisztráció)
  clearForm(): void {
    this.registerData = { name: '', email: '', password: '', confirm_password: '' };
    this.loginData = { name: '', password: '' };
  }

  // Üzenet automatikus törlése 3 másodperc után
  autoClearMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  // E-mail validáció
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
