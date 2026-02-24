import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  addBook(book: Book): Observable<Book> {
    return of(book);
  }

  removeBook(bookId: string): Observable<Book> {
    return throwError(() => new Error('Book not added'));
  }
}
