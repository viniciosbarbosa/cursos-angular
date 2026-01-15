import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNativeDateAdapter(),
    {
      provide: LOCALE_ID,
      useFactory: () => navigator.language || 'pt-BR',
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => navigator.language || 'pt-BR',
    },
  ],
};
