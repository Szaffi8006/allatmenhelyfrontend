import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const registerData = { 
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword
    };

    this.authService.register(registerData).subscribe(
      (response: any) => {
        console.log("Regisztrációs válasz:", response);

        if (response.success) {
          this.successMessage = 'Sikeres regisztráció!';
          this.errorMessage = '';
          this.router.navigate(['/login']);

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        } else {
          this.errorMessage = response.message || 'Regisztráció sikertelen';
          this.successMessage = '';
        }
      },
      error => {
        console.error("Hiba a regisztráció során:", error);
        this.errorMessage = error.error.message || 'Hiba történt a regisztráció során';
        this.successMessage = '';
      }
    );
  }
}
