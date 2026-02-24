import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookActions from './book.actions';
import { BookService } from '../service/book.service';
import { mergeMap, map, catchError } from 'rxjs';
import { of } from 'rxjs';
import { Book } from '../models/books';

@Injectable()
export class BookEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BookService);

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.addBook),
      mergeMap((action) =>
        this.bookService.addBook(action.book).pipe(
          map((book: Book) => bookActions.addBookSuccess({ book })),
          catchError((error) => of(bookActions.addBookFailure({ error }))),
        ),
      ),
    ),
  );
}
