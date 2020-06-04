import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteUnauthService implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.storageService.get('@app:activedUser') ? true : false;
  }

  canActivate(): boolean {
    const isAuth = this.isAuthenticated();

    console.log('Unauth', isAuth);

    if (isAuth) {
      this.router.navigate(['/dashboard']);
    }
    return !isAuth;
  }
}
