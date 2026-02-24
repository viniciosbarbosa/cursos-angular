import { createReducer, on } from '@ngrx/store';
import {
  addBook,
  addBookFailure,
  addBookSuccess,
  removeBook,
} from './book.actions';
import { Book } from '../models/books';

export const initialState: Book[] = [];

export const bookReducer = createReducer(
  initialState,

  on(addBook, (currentState) => {
    return currentState;
  }),
  on(addBookSuccess, (currentState, { book }) => [...currentState, book]),

  on(addBookFailure, (currentState, { error }) => {
    console.log(error);
    return currentState;
  }),

  on(removeBook, (currentState, { bookId }) =>
    currentState.filter((book) => book.id !== bookId),
  ),
);
