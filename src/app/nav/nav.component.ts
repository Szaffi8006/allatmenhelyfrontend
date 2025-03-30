import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  loginStatus: string | null = null;

  constructor(public authService: AuthService) {
    // Feliratkozunk az üzenetre
    this.authService.loginStatus$.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
