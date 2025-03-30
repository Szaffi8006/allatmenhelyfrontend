import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // A token lekérése a localStorage-ból

    // Ha van token, hozzáadjuk a kérés fejlécéhez
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Bearer token hozzáadása
        }
      });
    }

    return next.handle(req); // A kérés továbbítása
  }
}
