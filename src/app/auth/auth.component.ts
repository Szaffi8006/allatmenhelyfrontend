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
        if (error.status === 404) {
          // Ha 404-es hiba történt
          this.errorMessage = 'Hiba a bejelentkezés során, ellenőrizd a bejelentkezési adatokat.';
        } else if (error.status === 401) {
          // Ha 401-es hiba (nem jogosultság) történik
          this.errorMessage = 'Hibás bejelentkezési adatok!';
        } else {
          // Általános hibaüzenet
          this.errorMessage = error?.message || 'Hiba történt a bejelentkezés során';
        }
        this.successMessage = '';
      }
    );
  }

  // Regisztráció
  onRegister() {
    // Ellenőrizzük, hogy a név kitöltött-e
    if (!this.registerData.name) {
      this.errorMessage = 'A név megadása kötelező!';
      return;
    }

    // Ellenőrizzük, hogy az email érvényes-e
    if (!this.isValidEmail(this.registerData.email)) {
      this.errorMessage = 'Kérem, adjon meg egy érvényes e-mail címet.';
      return;
    }

    // Ellenőrizzük, hogy a jelszavak megegyeznek-e
    if (this.registerData.password !== this.registerData.confirm_password) {
      this.errorMessage = 'A jelszavaknak egyezniük kell!';
      return;
    }

    // Ellenőrizzük, hogy a jelszó elég erős-e (pl. legalább 8 karakter, kis- és nagybetűk, számok)
    if (!this.isValidPassword(this.registerData.password)) {
      this.errorMessage = 'A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis- és nagybetűt, valamint számokat.';
      return;
    }

    // Küldjük a regisztrációs adatokat a backendnek
    this.authService.register(this.registerData).subscribe(
      (response: any) => {
        console.log('Backend válasz regisztráció után:', response); // A válasz részleteinek logolása

        // Ha van üzenet a válaszban, akkor sikeres regisztrációt kezelünk
        if (response && response.message) {
          this.successMessage = response.message || 'Sikeres regisztráció!'; // Sikeres üzenet
          this.errorMessage = '';

          // Űrlap törlése
          this.clearForm();

          // Várunk 1-2 másodpercet, hogy a felhasználó láthassa az üzenetet
          setTimeout(() => {
            // Átirányítjuk a felhasználót a bejelentkezési oldalra
            this.router.navigate(['/login']).then(() => {
              this.autoClearMessage(); // Üzenet törlés automatikusan
            });
          }, 2000); // 2 másodperc várakozás
        } else {
          this.errorMessage = response?.message || 'Hiba történt a regisztráció során';
          this.successMessage = '';
        }
      },
      (error: any) => {
        console.error('Hiba a regisztráció során:', error); // Hiba naplózása

        // Backend hibák kezelése
        if (error?.error?.data) {
          this.handleBackendErrors(error.error.data); // Hibák kezelése
        } else {
          this.errorMessage = error?.message || 'Hiba történt a regisztráció során';
        }
        this.successMessage = '';
      }
    );
  }

  // Backend hibák kezelése (például már létező név vagy email)
  handleBackendErrors(errors: any): void {
    const errorMessages = [];

    // Ha van név hibája
    if (errors.name) {
      errorMessages.push(errors.name.join(' '));
    }

    // Ha van email hibája
    if (errors.email) {
      errorMessages.push(errors.email.join(' '));
    }

    // Hibaüzenetek összefűzése
    this.errorMessage = errorMessages.join(' ');
  }

  // űrlap törlés
  clearForm(): void {
    // this.registerData = { name: '', email: '', password: '', confirm_password: '' };
    this.loginData = { name: '', password: '' };
  }

  // Üzenet automatikus törlése 3 másodperc után
  autoClearMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  //Kijelentkezés

  logout() {
    // Tokent és egyéb adatok törlése
    this.authService.logout();

    // Átirányítás a bejelentkezési oldalra
    this.router.navigate(['/home']);
  }

  // E-mail validáció
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Jelszó validálása (minimum 8 karakter, tartalmaz kis- és nagybetűt, számot)
  isValidPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  }

}
