import { Injectable } from '@angular/core';
import { instrumentsSignal, selectedInstrumentSignal, Instrument } from '../state/app.state';

@Injectable({ providedIn: 'root' })
export class InstrumentService {

  loadInstruments() {
    // Ejemplo con datos fijos. Reemplazar con fetch a JSON
    const data: Instrument[] = [
      { id: '1', name: 'IPSA', price: 1000, variation: 1.5 },
      { id: '2', name: 'IGPA', price: 5000, variation: -0.8 },
      { id: '3', name: 'NASDAQ', price: 15000, variation: 2.2 }
    ];
    instrumentsSignal.set(data);
    selectedInstrumentSignal.set(data[0]); // seleccionamos el primero por defecto
  }
}
