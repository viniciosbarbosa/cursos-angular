import { v4 as uuidv4 } from 'uuid';

export class Customer {
  id?: string;
  name?: string;
  cpf?: string;
  phone?: string;
  birthDay?: string;
  email?: string;
  state?: string;
  city?: string;

  static newClient() {
    const customer = new Customer();
    customer.id = uuidv4();
    return customer;
  }
}
