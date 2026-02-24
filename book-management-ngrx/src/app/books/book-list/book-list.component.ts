import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Book } from '../models/books';
import { AppState } from '../../app.state';
import { addBook, removeBook } from '../store/book.actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [AsyncPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  private store = inject(Store<AppState>);
  books$: Observable<Book[]> = this.store.pipe(select('book'));

  addBook(id: string, title: string, author: string) {
    this.store.dispatch(
      addBook({
        book: {
          id,
          title,
          author,
        },
      }),
    );
  }

  removeBook(id: string) {
    this.store.dispatch(
      removeBook({
        bookId: id,
      }),
    );
  }
}
