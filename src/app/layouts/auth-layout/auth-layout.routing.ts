import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RouteUnauthService } from 'src/app/services/routeUnauth/route-unauth.service';

export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RouteUnauthService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RouteUnauthService],
  },
];
