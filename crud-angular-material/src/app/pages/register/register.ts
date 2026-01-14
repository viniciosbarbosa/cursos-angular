import { v4 as uuidv4 } from 'uuid';

export class Costumer {
  id?: string;
  name?: string;
  cpf?: string;
  birthDate?: string;
  email?: string;
  state?: string;
  city?: string;
  static newClient() {
    const costumer = new Costumer();
    costumer.id = uuidv4();
    return costumer;
  }
}
