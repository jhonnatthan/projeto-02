
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ShopComponent } from 'src/app/pages/shop/shop.component';
import { TeamComponent } from './../../pages/team/team.component';

import { RouteAuthService } from 'src/app/services/routeAuth/route-auth.service';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteAuthService],
  },
  { path: 'shop', component: ShopComponent, canActivate: [RouteAuthService] },
  { path: 'team', component: TeamComponent, canActivate: [RouteAuthService] },
];
