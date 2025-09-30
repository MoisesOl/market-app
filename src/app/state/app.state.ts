import { signal } from '@angular/core';

export interface Instrument {
  id: string;
  name: string;
  price: number;
  variation: number;
  [key: string]: any;
}

// Señales globales
export const instrumentsSignal = signal<Instrument[]>([]);
export const selectedInstrumentSignal = signal<Instrument | null>(null);
