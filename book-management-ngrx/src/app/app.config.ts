import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { bookReducer } from './books/store/book.reducer';
import { provideHttpClient } from '@angular/common/http';
import { AppState } from './app.state';
import { BookEffects } from './books/store/book.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideEffects([BookEffects]),
    provideStore<AppState>({ book: bookReducer }),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
  ],
};
