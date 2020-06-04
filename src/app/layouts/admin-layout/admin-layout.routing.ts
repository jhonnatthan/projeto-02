import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ShopComponent } from 'src/app/pages/shop/shop.component';
import { RouteAuthService } from 'src/app/services/routeAuth/route-auth.service';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteAuthService],
  },
  { path: 'shop', component: ShopComponent, canActivate: [RouteAuthService] },
  // { path: 'user-profile',   component: UserProfileComponent },
  // { path: 'tables',         component: TablesComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent }
];
