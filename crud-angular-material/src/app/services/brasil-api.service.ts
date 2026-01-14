import { City } from './../models/brasilApi.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/brasilApi.models';

@Injectable({
  providedIn: 'root',
})
export class BrasilApiService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://brasilapi.com.br/api';

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseURL}/ibge/uf/v1`);
  }

  getCitiesByState(stateCode: string): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.baseURL}/ibge/municipios/v1/${stateCode}?providers=dados-abertos-br,gov,wikipedia`
    );
  }
}
