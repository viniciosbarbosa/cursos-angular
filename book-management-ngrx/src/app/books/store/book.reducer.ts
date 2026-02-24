import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from './book.actions';
import { Book } from '../models/books';

export const initialState: Book[] = [];

export const bookReducer = createReducer(
  initialState,

  on(addBook, (currentState, { book }) => [...currentState, book]),

  on(removeBook, (currentState, { bookId }) =>
    currentState.filter((book) => book.id !== bookId),
  ),
);
