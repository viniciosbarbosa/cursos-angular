import { Component, inject } from '@angular/core';

import { CardModule } from '../../shared/modules/card/card.module';
import { Router, RouterModule } from '@angular/router';
import { CUSTOMER_ROUTES_NAME } from '../customer/routes/routes.model';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);

  registerCustomer() {
    this.router.navigate([
      CUSTOMER_ROUTES_NAME.BASE_URL,
      CUSTOMER_ROUTES_NAME.REGISTER,
    ]);
  }

  listCustomer() {
    this.router.navigate([CUSTOMER_ROUTES_NAME.BASE_URL]);
  }

  editCustomer() {
    this.router.navigate([
      CUSTOMER_ROUTES_NAME.BASE_URL,
      '123',
      CUSTOMER_ROUTES_NAME.EDIT,
    ]);
  }
}
