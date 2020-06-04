import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteAuthService implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.storageService.get('@app:activedUser') ? true : false;
  }

  canActivate(): boolean {
    const isAuth = this.isAuthenticated();

    console.log('Auth', isAuth);
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
