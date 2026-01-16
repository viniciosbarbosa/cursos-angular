import { CustomerService } from './../../../../services/customer.service';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from '../../../../shared/modules/card/card.module';
import { FormModule } from '../../../../shared/modules/form/form.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { Customer } from '../register/register';
import { CUSTOMER_ROUTES_NAME } from '../../routes/routes.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CardModule, FormModule, ButtonsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private fb = inject(FormBuilder);
  public customerList: Customer[] = [];
  router = inject(Router);
  customerService = inject(CustomerService);
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const customerName = this.form.value.name ?? '';
    console.log(customerName);
    this.customerService
      .getCustomerByName(customerName)
      .subscribe((response) => {
        this.customerList = response;
      });
  }

  deleterCustomer(customer: Customer) {
    if (customer) {
      this.customerService.deleteCustomerData(customer);
      this.customerList = this.customerService.getStorage();
    }
  }

  updateCustomer(id: string | undefined) {
    if (id) {
      this.router.navigate([
        CUSTOMER_ROUTES_NAME.BASE_URL,
        id,
        CUSTOMER_ROUTES_NAME.EDIT,
      ]);
    }
  }

  registerCustomer() {
    this.router.navigate([
      CUSTOMER_ROUTES_NAME.BASE_URL,
      CUSTOMER_ROUTES_NAME.REGISTER,
    ]);
  }

  getCustomers() {
    this.customerList = this.customerService.getStorage();
  }
  ngOnInit(): void {
    this.getCustomers();
  }
}
