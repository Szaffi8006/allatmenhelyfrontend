import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getUserRole() < 1) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SuperGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getUserRole() < 2) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
