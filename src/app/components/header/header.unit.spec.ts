import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { mockInstrument } from '../../../mocks/mockInstrument';

describe('HeaderComponent (unit) - resumen rápido', () => {
  beforeEach(() => {
    // No TestBed used here; testing logic only
  });

  it('debe crear el componente y exponer headerData', () => {
    const comp = new HeaderComponent();
    comp.selectedInstrumentSignal = mockInstrument as any;

    expect(comp.headerData).to.exist;
  });
});
