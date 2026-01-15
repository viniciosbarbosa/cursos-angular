import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, inject } from '@angular/core';
import { ButtonsModule } from '../../../shared/modules/buttons/buttons.module';
import { CardModule } from '../../../shared/modules/card/card.module';
import { MatMenuModule } from '@angular/material/menu';

import { Router, RouterModule } from '@angular/router';
import { CUSTOMER_ROUTES_NAME } from '../../customer/routes/routes.model';

@Component({
  selector: 'app-header',
  imports: [
    ButtonsModule,
    CardModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);

  registerPage() {
    this.router.navigate([
      CUSTOMER_ROUTES_NAME.BASE_URL,
      CUSTOMER_ROUTES_NAME.REGISTER,
    ]);
  }

  searchPage() {
    this.router.navigate([CUSTOMER_ROUTES_NAME.BASE_URL]);
  }
}
