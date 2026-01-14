import { Injectable } from '@angular/core';
import { Costumer } from '../pages/register/register';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor() {}

  static REPO_COSTUMERS = '_COSTUMERS';

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

  getCostumerById(id: string): Costumer | undefined {
    const costumer = this.getStorage().find((costumer) => costumer.id === id);
    return costumer;
  }

  listCostumers(nameSearch: string): Costumer[] {
    const costumers = this.getStorage();
    if (!nameSearch) {
      return costumers;
    }
    return costumers.filter(
      (costumer) => costumer.name?.indexOf(nameSearch) !== -1
    );
  }

  updateCostomer(costumers: Costumer[]) {
    localStorage.setItem(
      CostumerService.REPO_COSTUMERS,
      JSON.stringify(costumers)
    );
  }

  deleteCostumer(id: string): Costumer[] {
    const storage = this.getStorage();
    const newCostumerList = storage.filter((c) => c.id !== id);
    localStorage.setItem(
      CostumerService.REPO_COSTUMERS,
      JSON.stringify(newCostumerList)
    );

    return newCostumerList;
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
