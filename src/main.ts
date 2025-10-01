import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

// Importamos y registramos locale chileno
import localeEsCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsCL, 'es-CL');

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CL' } // Ahora todo el app usa formato CLP
  ]
}).catch(err => console.error(err));
