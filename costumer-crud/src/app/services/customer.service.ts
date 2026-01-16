import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../features/customer/pages/register/register';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  static LOCAL_STORAGE_KEY = 'CUSTOMERS';

  http = inject(HttpClient);
  constructor() {}

  getCustomerById(id: string): Observable<Customer> {
    let storage = this.getStorage();
    let customer = storage.find((c) => c.id === id);
    if (!customer) {
      return throwError(() => new Error('Customer not found'));
    }
    return of(customer);
  }

  getStorage() {
    const repoCostumer = localStorage.getItem(
      CustomerService.LOCAL_STORAGE_KEY
    );

    if (repoCostumer) {
      return JSON.parse(repoCostumer) as Customer[];
    } else {
      const initialCostumers: Customer[] = [];
      localStorage.setItem(
        CustomerService.LOCAL_STORAGE_KEY,
        JSON.stringify(initialCostumers)
      );
      return initialCostumers;
    }
  }

  saveStorage(customer: Customer) {
    let storage = this.getStorage();
    storage.push(customer);
    localStorage.setItem(
      CustomerService.LOCAL_STORAGE_KEY,
      JSON.stringify(storage)
    );
  }

  deleteCustomerData(customer: Customer) {
    const storage = this.getStorage();

    const updated = storage.filter((c) => c.id !== customer.id);
    localStorage.setItem(
      CustomerService.LOCAL_STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  updateCustomerData(customer: Customer) {
    const storage = this.getStorage();

    const updated = storage.map((c) => (c.id === customer.id ? customer : c));

    localStorage.setItem(
      CustomerService.LOCAL_STORAGE_KEY,
      JSON.stringify(updated)
    );
  }
}
