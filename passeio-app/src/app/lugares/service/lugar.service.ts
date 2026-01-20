import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from '../lugar';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LugarService {
  constructor(private http: HttpClient) {}

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(`${env.apiUrl}/lugares`, lugar);
  }

  obterTodos(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(`${env.apiUrl}/lugares`);
  }

  filtrar(nome: string, categaria: string): Observable<Lugar[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome_like', nome);
    }
    if (categaria && categaria !== '-1') {
      params = params.set('categoria', categaria);
    }

    return this.http.get<Lugar[]>(`${env.apiUrl}/lugares`, { params });
  }
}
