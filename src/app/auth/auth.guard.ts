import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public router: Router){}

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService(new Router());
  const isAuthenticated = authService.checkToken();

  if (!isAuthenticated) {
    authService.router.navigate(['/login']); // Redirect jika tidak ada token
  }

  return isAuthenticated;
};
