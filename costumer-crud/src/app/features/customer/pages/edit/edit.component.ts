import { Component, inject, OnInit } from '@angular/core';
import { FormModule } from '../../../../shared/modules/form/form.module';
import { CardModule } from '../../../../shared/modules/card/card.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { Customer } from '../register/register';
import { CustomerService } from '../../../../services/customer.service';
import { CUSTOMER_ROUTES_NAME } from '../../routes/routes.model';

@Component({
  selector: 'app-edit',
  imports: [FormModule, CardModule, RouterModule, FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  customerService = inject(CustomerService);
  idCustomer = '';
  customerData!: Customer;
  updateCustomer(event: Customer) {
    this.customerService.updateCustomerData(event);
    this.route.navigate([CUSTOMER_ROUTES_NAME.BASE_URL]);
  }

  ngOnInit(): void {
    this.getIdByRoute();
  }

  getIdByRoute() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.idCustomer = id;
      this.getCustomerById(id);
    });
  }

  getCustomerById(id: string) {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customerData = customer;
        console.log(this.customerData);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
