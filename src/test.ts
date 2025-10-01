import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Declaración para webpack's require (used below via require.context)
declare const require: any;

// Init the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Registrar locale 'es' para pipes (ej. CurrencyPipe) en tests
registerLocaleData(localeEs, 'es-CL');

// Require all the .spec files
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
