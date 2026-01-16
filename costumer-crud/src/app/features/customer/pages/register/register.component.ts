import { CustomerService } from './../../../../services/customer.service';
import { Component, inject } from '@angular/core';
import { CardModule } from '../../../../shared/modules/card/card.module';

import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { FormComponent } from '../../components/form/form.component';
import { Customer } from './register';
import { Router } from '@angular/router';
import { CUSTOMER_ROUTES_NAME } from '../../routes/routes.model';

@Component({
  selector: 'app-register',
  imports: [CardModule, ButtonsModule, FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  customerService = inject(CustomerService);
  router = inject(Router);

  saveNewCustomer(value: Customer) {
    this.customerService.saveStorage(value);
    this.router.navigate([CUSTOMER_ROUTES_NAME.BASE_URL]);
  }
}
