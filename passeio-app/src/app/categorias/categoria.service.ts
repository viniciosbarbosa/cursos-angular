import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(
      'http://localhost:3000/categorias',
      categoria,
    );
  }

  obterTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${env.apiUrl}/categorias`);
  }
}
