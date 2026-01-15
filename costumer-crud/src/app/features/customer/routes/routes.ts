import { Routes } from '@angular/router';
import { ListComponent } from '../pages/list/list.component';
import { RegisterComponent } from '../pages/register/register.component';
import { EditComponent } from '../pages/edit/edit.component';
import { CUSTOMER_ROUTES_NAME } from './routes.model';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: CUSTOMER_ROUTES_NAME.REGISTER, component: RegisterComponent },
  { path: ':id/' + CUSTOMER_ROUTES_NAME.EDIT, component: EditComponent },
];
