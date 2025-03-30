import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = { name: this.name, password: this.password };

    this.authService.login(loginData).subscribe(
      (response: any) => {
        console.log("Bejelentkezési válasz:", response);

        if (response.success && response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log("Token elmentve:", localStorage.getItem('token'));
          
          this.successMessage = 'Sikeres bejelentkezés!';
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        } else {
          this.errorMessage = response.message || 'Bejelentkezés sikertelen';
          this.successMessage = '';
        }
      },
      error => {
        console.error("Hiba a bejelentkezéskor:", error);
        this.errorMessage = error.error.message || 'Hiba történt a bejelentkezés során';
        this.successMessage = '';
      }
    );
  }
}
