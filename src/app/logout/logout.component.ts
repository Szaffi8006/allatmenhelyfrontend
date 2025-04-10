import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // A logout metódust az ngOnInit-ben hívjuk meg, hogy a komponens inicializálása után történjen meg
    this.logout();
  }

  logout() {
    // Tokent és egyéb adatok törlése
    this.authService.logout();

    // Átirányítás a bejelentkezési oldalra
    this.router.navigate(['/login']);
  }
}
