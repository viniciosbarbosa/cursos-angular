import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000  ';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart`);
  }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/cart`, product);
  }

  cleanCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart`);
  }
}
