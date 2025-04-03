import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginStatus: string | null = null; // Bejelentkezési státusz üzenet
  isLoggedIn: boolean = false; // Ellenőrzi, hogy be van-e jelentkezve a felhasználó
  userRole: number = 0; // A felhasználó szerepe (admin, superadmin, stb.)

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
    this.authService.loginStatus$.subscribe(status => {
      this.loginStatus = status;  // Frissíti a státuszt a bejelentkezés után
      this.isLoggedIn = this.authService.isLoggedIn(); // Ellenőrzi, hogy be van-e jelentkezve
      this.userRole = this.authService.getUserRole(); // Frissíti a felhasználó szerepét
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);  // Kijelentkezés után visszairányít a főoldalra
  }

}