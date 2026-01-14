import { Injectable } from '@angular/core';
import { Costumer } from '../pages/register/register';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor() {}

  static REPO_COSTUMERS = '_COSTUMERS';

  save(costumer: Costumer) {
    console.log('Saving costumer', costumer);
  }

  getStorage(): Costumer[] {
    const repoCostumer = localStorage.getItem(CostumerService.REPO_COSTUMERS);

    if (repoCostumer) {
      return JSON.parse(repoCostumer) as Costumer[];
    } else {
      const initialCostumers: Costumer[] = [];
      localStorage.setItem(
        CostumerService.REPO_COSTUMERS,
        JSON.stringify(initialCostumers)
      );
      return initialCostumers;
    }
  }

  listCostumers(name: string): Costumer[] {
    return this.getStorage();
  }

  saveStorage(costumers: Costumer) {
    const storage = this.getStorage();
    storage.push(costumers);
    localStorage.setItem(
      CostumerService.REPO_COSTUMERS,
      JSON.stringify(storage)
    );
  }
}
