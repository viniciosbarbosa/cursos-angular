import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./books/book-list/book-list.component').then(
        (m) => m.BookListComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
];
