import { Book } from './books/models/books';

export interface AppState {
  readonly book: Book[];
}
