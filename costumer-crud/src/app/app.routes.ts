import { Routes } from '@angular/router';
import { CUSTOMER_ROUTES_NAME } from './features/customer/routes/routes.model';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: CUSTOMER_ROUTES_NAME.BASE_URL,
    loadChildren: () =>
      import('./features/customer/routes/routes').then(
        (m) => m.CUSTOMER_ROUTES
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
