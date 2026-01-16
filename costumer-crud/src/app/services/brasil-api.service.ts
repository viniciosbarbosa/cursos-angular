import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { City, State } from './models/brasil-api.model';

@Injectable({
  providedIn: 'root',
})
export class BrasilApiService {
  constructor() {}

  http = inject(HttpClient);

  readonly baseURL = 'https://brasilapi.com.br/api';

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseURL}/ibge/uf/v1`);
  }

  getCitiesByState(stateCode: string): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.baseURL}/ibge/municipios/v1/${stateCode}?providers=dados-abertos-br,gov,wikipedia`
    );
  }
}
